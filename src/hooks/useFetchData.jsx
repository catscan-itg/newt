import { useState, useEffect, useCallback } from 'react';

const useFetchData = ({
    url,
    method = 'GET',
    headers = new Headers(),
    options = {}
}) => {

    const [loading, setLoading] = useState(false);
    const [receivedData, setReceivedData] = useState({});
    const [error, setError] = useState(undefined);

    const getData = useCallback((abortController) => {
        setLoading(true);
        (async () => {
            try {
                const response = await fetch(url, {
                    method,
                    headers,
                    signal: abortController.signal,
                    ...options
                });

                if (!response.ok) {
                    throw new Error(`Fetch request failed with status code ${response.status} and response text ${response.statusText}`);
                }

                const data = await response.json();
                setReceivedData(data);
            } catch (err) {
                switch (err.name) {
                    case "TimeoutError":
                        setError(err);
                        console.error("Timeout: It took more than 5 seconds to get the result!");
                        break;
                    case "TypeError":
                        setError(err);
                        console.error("AbortSignal.timeout() method is not supported");
                        break;
                    case "AbortError":
                        break;
                    default:
                        setError(err);
                        console.error(`Error: type: ${err.name}, message: ${err.message}`);
                }
            } finally {
                setLoading(false);
            }
        })()
    }, [url, method, headers, options])

    useEffect(() => {
        const abortController = new AbortController();
        console.count('fetch')

        getData(abortController);
        
        return () => {
            setError(undefined);
            abortController.abort()
        };
    }, [getData]);

    return { receivedData, loading, error };
}


export default useFetchData;