import { FC, useEffect, useState } from 'react';
import { useSession } from '../../providers/SessionProvider';
import { WEB_RTC } from '../../const';

const AdminScreen: FC = () => {
    const { session } = useSession()
    // const [websocket, setWebsocket] = useState<WebSocket | null>(null)
    useEffect(() => {
        try {
            const ws = new WebSocket(WEB_RTC)
            // const ws = new WebSocket(`wss://vpn101-3000.forgeforce.org/ws/notification?access_token=${session?.accessToken}`)
            console.log(ws);

            ws.onopen = (e) => {
                console.log(e);
            }
            // ws.onerror(err => {
            //     console.log(err);
            // })
        } catch (e) {
            console.log(e);
        }

        // setWebsocket(ws)
    }, [])

    return (
        <div>

        </div>
    );
};

export default AdminScreen;