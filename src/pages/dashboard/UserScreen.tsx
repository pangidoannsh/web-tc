import { FC, useEffect } from 'react';
import { STOMP_URL } from '../../const';
import { useSession } from '../../providers/SessionProvider';

const UserScreen: FC = () => {
    const { session } = useSession()
    useEffect(() => {
        const socket = new WebSocket(`${STOMP_URL}/user/${session?.user?.id}/queue/messages`)
        socket.onopen = () => {
            console.log("WebSocket connected");

            const subscriptionMessage = JSON.stringify({
                action: "subscribe",
                userId: session?.user?.id,
                topic: `/user/${session?.user?.id}/queue/messages`,
            });
            socket.send(subscriptionMessage);
        };
        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
    }, [])

    return (
        <div>
        </div>
    );
};

export default UserScreen;