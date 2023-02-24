import { useMemo, useState } from "react";
import useFetchData from "../hooks/useFetchData";
import Loading from "../containers/Loading";
import Error from "../containers/Error";
import useMediaQuery from "../hooks/useMediaQuery";
import { getFiltered } from "../utlis/getFiltered"

const Main = ({ useSearch = true, useChooseTenant = true }) => {

    const [searchVal, setSearchVal] = useState('');
    const [tenantId, setTenantId] = useState(1);

    const fetchDataProps = useMemo(() => ({
        method: "GET",
        url: `https://micros1-ro.play-online.com/missions/tournaments/list?tenant_id=${tenantId}`,
        headers: new Headers({
            'accept': 'application/json'
        }),
        options: {}
    }), [tenantId])

    const handleTenantChange = ({target: {value}}) => {
        !isNaN(value) && setTenantId(value)
    }

    const { receivedData, loading, error } = useFetchData(fetchDataProps);
    const hasReceivedData = useMemo(() => !!receivedData && Array.isArray(receivedData) && receivedData.length > 0, [receivedData]);

    return (
        <main>
            {
                useSearch &&
                <div>
                    <label>Search: </label>
                    <input value={searchVal} onChange={({ target: { value } }) => setSearchVal(value)} />
                </div>
            }
            {
                useChooseTenant &&
                <div>
                    <label>Choose Tenant: </label>
                    <input value={tenantId} type={"number"} step={1} min={1} onChange={handleTenantChange} />
                </div>
            }
            <div>
                {
                    !!error ? <Error error={error} /> :
                        loading ? <Loading /> :
                            hasReceivedData && receivedData
                                .map(({ tournaments }) =>
                                    getFiltered(tournaments, searchVal).map(({ name, id }) =>
                                        <div key={`tournament-${id}`}>
                                            {name}
                                        </div>
                                    )
                                )
                }
            </div>
        </main>
    )
}

export default Main;