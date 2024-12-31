import { FC, Fragment, useEffect, useRef, useState } from 'react';
import { ChatMessage, ChatRoom, UserType } from '../../interfaces';
import Avatar from '../ui/Avatar';
import { Icon } from '@iconify/react/dist/iconify.js';
import ChatActionBar from './ChatActionBar';
import Logo from "../../assets/images/logo.png"
import ChatBubble from './ChatBubble';
import { formatDateChatDivider, groupByTime } from '../../utils';
import { UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import PreviewFile from './PreviewFile';
import ImageModal from './ImageModal';
import { MEDIA_URL } from '../../const';
import CallModal from './CallModal';
import Dragger from 'antd/es/upload/Dragger';
import dayjs from 'dayjs';
import { useSession } from '../../providers/SessionProvider';

interface Props {
    room: ChatRoom | null
    user: UserType | null
    messages: ChatMessage[]
    onSendMessage: () => void
    messageInput: string
    setMessageInput: React.Dispatch<React.SetStateAction<string>>
    chatActionInputRef: React.RefObject<HTMLTextAreaElement>
    onChangeFile: (info: UploadChangeParam<UploadFile<any>>) => void
    uploadProps: UploadProps
    openPreviewFile: boolean
    setOpenPreviewFile: (open: boolean) => void
    previewFilePath?: string
    autoScrolling: boolean
}
let counter = 0
const ChatContent: FC<Props> = ({ messages, user, onSendMessage, messageInput, setMessageInput, chatActionInputRef, uploadProps, openPreviewFile, previewFilePath,
    setOpenPreviewFile, autoScrolling, room }) => {
    const { session } = useSession()
    const containerRef = useRef<HTMLDivElement>(null);
    const [openCall, setOpenCall] = useState(false)
    const [isDraggingFile, setIsDraggingFile] = useState(false)
    const [showImage, setShowImage] = useState({
        open: false,
        src: ""
    })

    const groupMessage = Object.entries(
        groupByTime("timestamp", messages)
    )

    function showImageFullscreen(src: string) {
        setShowImage({
            open: true,
            src: MEDIA_URL + src
        })
    }
    const handleDragEnter = () => {
        // onDragEnter?.()
        if (counter++ === 0) {
            setIsDraggingFile(true)
        }
        console.log(counter);

    }
    const handleDrop = () => {
        setIsDraggingFile(false);
    }
    const handleDragLeave = () => {
        if (--counter === 0) {
            setIsDraggingFile(false)
        }
    }
    useEffect(() => {
        if (containerRef.current && autoScrolling) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]);

    return <div className='md:flex-1 bg-ternary w-[90vw] md:w-full relative'
        onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}
    >
        {user ?
            <>
                <Dragger className={`absolute z-50 w-full h-full flex items-center justify-center bg-white/80 ${!isDraggingFile ? "hidden" : ""}`} {...uploadProps}
                    onDrop={handleDrop} openFileDialogOnClick={false} multiple={false} >
                    <div className='text-slate-500 text-2xl font-semibold'>Drop file here</div>
                </Dragger>
                <div className="flex flex-col h-full">
                    {/* HeaderBar */}
                    <div className="flex justify-between bg-white items-center p-4 pe-8">
                        <div className="flex gap-3 items-center">
                            <Avatar name={user?.name ?? ""} imageUrl={null} />
                            <div>
                                <div className="font-semibold text-slate-950">
                                    {user?.name}
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                    <div className="circle-shape bg-green-500" />
                                    <div className="text-slate-500 text-xs">Active Now</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 text-slate-800">
                            <button onClick={() => setOpenCall(true)}><Icon icon="fluent:call-20-regular" className='text-2xl' /></button>
                            <button><Icon icon="mynaui:video" className='text-2xl' /></button>
                        </div>
                    </div>
                    {/* ChatBody */}
                    <div className="flex-1 h-full overflow-hidden relative">
                        <div className="h-full overflow-auto v-scroll py-3" ref={containerRef} >
                            {groupMessage.map(item => (
                                <Fragment key={item[0]}>
                                    <div className="flex justify-center mb-2">
                                        <div className='rounded-lg px-3 py-2 bg-white text-slate-400 w-max text-xs'>{formatDateChatDivider(item[0])}</div>
                                    </div>
                                    <div>
                                        {item[1].map(message => <ChatBubble key={message.id} type={message.type} onClickImage={showImageFullscreen}
                                            message={{
                                                id: message.id,
                                                text: message.content,
                                                isSender: message.sender_id === session?.user?.id,
                                                time: dayjs(message.timestamp).format("hh:mm A"),
                                                path: message.path,
                                                userName: message.sender_name
                                            }} />)}
                                    </div>
                                </Fragment>
                            ))}
                        </div>
                        <PreviewFile filePath={previewFilePath} setOpen={setOpenPreviewFile} open={openPreviewFile} />
                    </div>
                    {/* ChatActionBar */}
                    <ChatActionBar uploadProps={uploadProps} message={messageInput} setMessage={setMessageInput} onSubmit={onSendMessage}
                        inputRef={chatActionInputRef} />
                    <ImageModal open={showImage.open} setOpen={open => setShowImage(prev => ({ ...prev, open }))} src={showImage.src} />
                </div>
            </> :
            <div className='h-full w-full flex flex-col gap-3 justify-center items-center'>
                <img src={Logo} className='w-40' />
                <div className='text-2xl font-semibold text-slate-500 text-center'>Select a chat to start messaging</div>
            </div>
        }
        <CallModal open={openCall} room={room} username={user?.name!} onEndCall={() => setOpenCall(false)} />
    </div>
};

export default ChatContent;