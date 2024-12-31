import { FC, useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import Avatar from '../ui/Avatar';
import ModalDraggable from '../ui/ModalDraggable';
import { STOMP_URL } from '../../const';
import { ChatRoom } from '../../interfaces';
import { useSession } from '../../providers/SessionProvider';
import { api } from '../../config/api';
import Timer from '../ui/Timer';

interface Props {
    open: boolean
    username: string
    image?: string
    room: ChatRoom | null
    onEndCall: () => void
}

const CallModal: FC<Props> = ({ open, username, image, onEndCall, room }) => {
    const { session } = useSession()
    const { user } = session!
    const [fullscreen, setFullscreen] = useState(false)
    const [peers, setPeers] = useState<any[]>([])
    const [connections, setConnections] = useState<any>([])
    const actionButtons = [
        {
            icon: "ic:round-mic"
        },
        {
            icon: "iconoir:sound-high-solid"
        },
        {
            icon: "fluent:video-48-filled"
        },
        {
            icon: "fluent:chat-28-filled",
            color: "#1971FF"
        },
        {
            icon: "fluent:call-end-16-filled",
            color: "#EA3736",
            onClick: onEndCall
        },
    ]
    const videosRef = useRef<Record<string, HTMLVideoElement | null>>({});

    const createRTCPeer = (urls: string[]) => {
        const servers = {
            iceServers: [
                {
                    urls,
                },
            ],
        };
        return new RTCPeerConnection(servers)
    }

    const createOffer = (destination: string, sdp: any) => JSON.stringify({
        type: "sdp-offer",
        peer_name: user?.name,
        payload: {
            destination_id: destination,
            source_id: user?.id,
            sdp
        }
    });

    const createAnswer = (destination: string, sdp: any) => JSON.stringify({
        type: "sdp-answer",
        peer_name: user?.name,
        payload: {
            destination_id: destination,
            source_id: user?.id,
            sdp
        }
    });

    const createIceCandidate = (destination: string, candidate: any) => JSON.stringify({
        type: "ice-candidate",
        peer_name: user?.name,
        payload: {
            destination_id: destination,
            source_id: user?.id,
            ice_candidate: candidate
        }
    });

    useEffect(() => {
        if (!open) {
            setFullscreen(false)
        } else {
            if (room) {

                api.get(`rtc/create-room/personal/${room.room_id}`)
                    .then(res => {
                        const ws = new WebSocket(STOMP_URL + `/rtc/room/${res.data.room_id}?access_token=${session?.accessToken}`);
                        let localStream: any | null = null

                        const onSignal = async (ev: any) => {
                            console.log(ev);

                            const data = JSON.parse(ev.data);
                            const type = data.type;
                            const payload = data.payload;

                            switch (type) {
                                case "join-response":
                                    console.log("join-response: ", payload)
                                    break;
                                case "new-peer":
                                    console.log("new-peer")

                                    let pc = createRTCPeer(['stun:stun1.l.google.com:19302', "stun:stun2.l.google.com:19302"]);
                                    localStream.getTracks().forEach((track: any) => pc.addTrack(track, localStream));
                                    const remoteStream = new MediaStream();
                                    pc.ontrack = ev => ev.streams[0].getTracks().forEach(track => remoteStream.addTrack(track));

                                    setConnections((prev: any) => ({ ...prev, [payload.id]: { pc: pc, candidates: [] } }))

                                    pc.onicecandidate = ev => {
                                        if (ev.candidate) {
                                            connections[payload.id].candidates.push(JSON.stringify(ev.candidate.toJSON()));
                                        }
                                    };

                                    const offer = await pc.createOffer();
                                    await pc.setLocalDescription(offer);

                                    const offerSdp = btoa(JSON.stringify(pc.localDescription));
                                    ws.send(createOffer(payload.id, offerSdp));


                                    setPeers(prev => [...prev, {
                                        name: payload.name,
                                        id: payload.id,
                                        stream: remoteStream
                                    }])
                                    break;
                                case "sdp-offer":
                                    console.log("sdp-offer: ", payload)

                                    let pc2 = createRTCPeer(['stun:stun3.l.google.com:19302', "stun:stun4.l.google.com:19302"]);
                                    localStream.getTracks().forEach((track: any) => pc2.addTrack(track, localStream));
                                    const remoteStream2 = new MediaStream();
                                    pc2.ontrack = ev => ev.streams[0].getTracks().forEach(track => remoteStream2.addTrack(track));

                                    pc2.onicecandidate = ev => {
                                        console.log("onIceCandidate")
                                        ev.candidate && ws.send(createIceCandidate(payload.source_id, JSON.stringify(ev.candidate.toJSON())));
                                    };

                                    await pc2.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(payload.sdp))))

                                    const answer = await pc2.createAnswer();
                                    await pc2.setLocalDescription(answer);

                                    const answerEncoded = btoa(JSON.stringify(pc2.localDescription));
                                    ws.send(createAnswer(payload.source_id, answerEncoded));

                                    setConnections((prev: any) => ({ ...prev, [payload.source_id]: { pc: pc2, candidates: [] } }))
                                    setPeers(prev => [...prev, {
                                        name: payload.name,
                                        id: payload.id,
                                        stream: remoteStream2
                                    }])
                                    break;
                                case "sdp-answer":
                                    console.log("sdp-answer:", payload)
                                    let answerSdp = new RTCSessionDescription(JSON.parse(atob(payload.sdp)));
                                    await connections[payload.source_id].pc.setRemoteDescription(answerSdp);
                                    console.log("candidates to send: ", connections[payload.source_id].candidates.length);
                                    connections[payload.source_id].candidates.forEach((value: any) => ws.send(createIceCandidate(payload.source_id, value)));
                                    break;
                                case "ice-candidate":
                                    console.log("ice-candidate: ", payload);
                                    await connections[payload.source_id].pc.addIceCandidate(JSON.parse(payload.ice_candidate))
                                    break
                                case "peer-leave":
                                    setPeers(prev => prev.filter(peer => peer.id !== payload))
                                    connections[payload].close()
                                    connections[payload] = undefined;
                                    break
                                case "room-not-found":
                                    console.log("ROOM NOT FOUND: ", res.data.room_id);

                                    // window.location.replace(`/not-found.html`)
                                    ws.close()
                                    break
                            }
                        }

                        ws.onopen = async _ => {
                            localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                            setPeers(prev => [...prev, {
                                name: user?.name,
                                id: user?.id,
                                stream: localStream
                            }])
                            console.log(localStream);

                            ws.send(JSON.stringify({
                                type: "join-request",
                                peer_name: user?.name,
                            }));
                        }

                        ws.onmessage = onSignal
                    })
            }
        }
    }, [open, room]);

    useEffect(() => {
        peers.forEach((peer: any) => {
            const videoElement = videosRef.current[peer.id];
            if (videoElement) {
                videoElement.srcObject = peer.stream;
            }
        })
    }, [peers])

    return (
        <ModalDraggable
            open={open}
            fullScreen={fullscreen}
            className='bg-glass'
            header={
                <div className={`flex flex-col w-full text-primary-main relative ${!fullscreen ? "cursor-move" : ""}`}>
                    <div className="font-medium text-xl text-center">{username}</div>
                    <div className="text-sm text-center"><Timer /></div>
                    <button className='absolute right-0 top-0' onClick={() => setFullscreen(prev => !prev)}>
                        <Icon icon={fullscreen ? "lucide:minimize-2" : "lucide:maximize-2"} className='text-2xl text-primary-main' />
                    </button>
                </div>
            }
        >
            {/* <div className="flex-1 flex items-center">
                <Avatar name={username} imageUrl={image} borderRadius={999} size={144} />
            </div> */}
            <div className="flex-1 grid grid-cols-2">
                {peers.map(peer => <div key={peer.id} className={`${peers.length === 1 ? "col-span-2" : ""}`}>
                    <video ref={(el) => (videosRef.current[peer.id] = el)} autoPlay className="w-full h-full object-cover" controls={false} />
                </div>)}
            </div>
            {/* Action Button */}
            <div className="flex items-center gap-6">
                {actionButtons.map(button => (
                    <button key={button.icon} className="action-button" style={{ background: button.color }} onClick={button.onClick}>
                        <Icon icon={button.icon} className={`text-2xl ${button.color ? "text-white" : "text-primary-main"}`} />
                    </button>
                ))}
            </div>
        </ModalDraggable>
    );
};

export default CallModal;