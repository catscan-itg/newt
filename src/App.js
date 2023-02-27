import './App.css';
import Header from "./containers/Header"
import Main from "./containers/Main"
import Footer from "./containers/Footer"
import {useCallback, useEffect, useMemo, useState} from "react";
import useFetchData from "./hooks/useFetchData";
import Error from "./containers/Error";
import Loading from "./containers/Loading";
import useWebSocket from "./hooks/useWebSocket";

function App() {

    const [tenantId, setTenantId] = useState(1);

    const {websocketEndData, websocketCreateData} = useWebSocket();
    console.log('1?', websocketEndData);
    console.log('2?', websocketCreateData);

    const fetchDataProps = useMemo(() => ({
        method: "GET",
        url: `https://micros1-ro.play-online.com/missions/tournaments/list?tenant_id=${tenantId}`,
        headers: new Headers({
            'accept': 'application/json'
        }),
        options: {}
    }), [tenantId])

    const {receivedData, loading, error} = useFetchData(fetchDataProps);
    const hasReceivedData = useMemo(() => !!receivedData && Array.isArray(receivedData) && receivedData.length > 0, [receivedData]);

    const handleTenantChange = useCallback(({target: {value}}) => {
        !!value && !isNaN(parseInt(value)) && setTenantId(value)
    }, [setTenantId])

    const headerProps = useMemo(() => {
        if (hasReceivedData) {
            const {name, tournaments} = receivedData[0]
            const {meta: {ui: {avatar_image: {url}}}} = tournaments[0]
            return {
                name,
                url,
                handleTenantChange,
                tenantId
            }
        }
        return {
            handleTenantChange,
            tenantId
        }
    }, [hasReceivedData, receivedData, handleTenantChange, tenantId])

    const mainProps = useMemo(() => ({
        tenantId,
        receivedData
    }), [receivedData, tenantId])

    return (
        <>
            <Header {...headerProps} />
            {
                !!error ? <Error error={error}/> :
                    loading ? <Loading/> :
                        hasReceivedData &&
                        <Main {...mainProps}/>
            }
            <Footer/>
        </>
    );
}

export default App;
