import {useEffect, useMemo, useState} from 'react';
import PropTypes from "prop-types";
import io from "socket.io-client";

const useWebSocket = (url, opt) => {
    const socket = useMemo(() => io(url, opt),[url, opt])

    const [websocketEndData, setWebsocketEndData] = useState([])
    const [websocketCreateData, setWebsocketCreateData] = useState([])
    const [connected, setConnected] = useState(socket.connected)
    const [pong, setPong] = useState(null)

    useEffect(() => {
        socket.on('connect', () => {
            setConnected(true)
            console.log(`heartbeat // connected ${connected}`)
        })
        socket.on('disconnect', () => {
            setConnected(false)
            console.log(`heartbeat // connected ${connected}`)
        })

        socket.on('pong', () => {
            setPong(new Date().toLocaleDateString('ro-RO'))
            console.log(`heartbeat // pong ${pong}`)
        })

        socket.connect();

        socket.on('tournament_end', data => setWebsocketEndData(data))
        socket.on('tournament_created', data => setWebsocketCreateData(data))

        return () => {
            socket.off('connect')
            socket.off('disconnect')
            socket.off('pong')
        }

    }, [websocketEndData, websocketCreateData, socket, connected, pong])

    return {websocketEndData, websocketCreateData}
}


export default useWebSocket;

useWebSocket.defaultProps = {
    url: 'https://micros1-ro.play-online.com',
    opt: {
        transports: ['websocket'],
        path: '/ws',
        query: {tenantId: 1, protocol: 'sio1'},
        autoConnect: false
    }
}

useWebSocket.propTypes = {
    url: PropTypes.string,
    opt: PropTypes.any
}
