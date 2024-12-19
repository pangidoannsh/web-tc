import { FC, useEffect, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import Avatar from '../ui/Avatar';
import ModalDraggable from '../ui/ModalDraggable';
import { WebSocket } from 'ws';

interface Props {
    open: boolean
    username: string
    image?: string
    onEndCall: () => void
}

const CallModal: FC<Props> = ({ open, username, image, onEndCall }) => {
    const [fullscreen, setFullscreen] = useState(false)

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

    useEffect(() => {
        if (!open) {
            setFullscreen(false)
        } else {
            // const ws = new WebSocket
        }
    }, [open]);

    return (
        <ModalDraggable
            open={open}
            fullScreen={fullscreen}
            className='bg-glass'
            header={
                <div className={`flex flex-col w-full text-primary-main relative ${!fullscreen ? "cursor-move" : ""}`}>
                    <div className="font-medium text-xl text-center">{username}</div>
                    <div className="text-sm text-center">24:15:00</div>
                    <button className='absolute right-0 top-0' onClick={() => setFullscreen(prev => !prev)}>
                        <Icon icon={fullscreen ? "lucide:minimize-2" : "lucide:maximize-2"} className='text-2xl text-primary-main' />
                    </button>
                </div>
            }
        >
            <div className="flex-1 flex items-center">
                <Avatar name={username} imageUrl={image} borderRadius={999} size={144} />
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