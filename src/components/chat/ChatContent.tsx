import { FC, useEffect, useRef } from 'react';
import { ChatMessageType, UserType } from '../../interfaces';
import Avatar from '../ui/Avatar';
import { Icon } from '@iconify/react/dist/iconify.js';
import ChatActionBar from './ChatActionBar';
import Logo from "../../assets/images/logo.png"
import ChatBubble from './ChatBubble';
import moment from 'moment';
import { groupByTime } from '../../utils';
import { UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import PreviewFile from './PreviewFile';

interface Props {
    user: UserType | null
    messages: ChatMessageType[]
    onSendMessage: () => void
    messageInput: string
    setMessageInput: React.Dispatch<React.SetStateAction<string>>
    chatActionInputRef?: React.RefObject<HTMLTextAreaElement>
    onChangeFile: (info: UploadChangeParam<UploadFile<any>>) => void
    uploadProps: UploadProps
    openPreviewFile: boolean
    setOpenPreviewFile: (open: boolean) => void
    previewFilePath?: string
}
const ChatContent: FC<Props> = ({ messages, user, onSendMessage, messageInput, setMessageInput, chatActionInputRef, uploadProps, openPreviewFile, previewFilePath, setOpenPreviewFile }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const groupMessage = Object.entries(
        groupByTime("timestamp", messages)
    )

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [groupMessage]);

    return <div className='flex-1 bg-ternary'>
        {user ?
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
                        <button><Icon icon="fluent:call-20-regular" className='text-2xl' /></button>
                        <button><Icon icon="mynaui:video" className='text-2xl' /></button>
                    </div>
                </div>
                {/* ChatBody */}
                <div className="flex-1 flex flex-col h-full relative overflow-hidden">
                    <div className="flex-1 overflow-auto v-scroll py-3" ref={containerRef} >
                        {groupMessage.map(item => (
                            <div key={item[0]} className="flex flex-col ">
                                <div className="flex justify-center mb-2">
                                    <div className='rounded-lg px-3 py-2 bg-white text-slate-400 w-max text-xs'>{item[0]}</div>
                                </div>
                                <div>
                                    {item[1].map(message => <ChatBubble key={message.id} message={{
                                        id: message.id,
                                        text: message.content,
                                        isSender: message.senderId !== user.id,
                                        time: moment(message.timestamp).format("hh:mm A")
                                    }} type={message.type} />)}
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* ChatActionBar */}
                    <ChatActionBar uploadProps={uploadProps} message={messageInput} setMessage={setMessageInput} onSubmit={onSendMessage} inputRef={chatActionInputRef} />
                    <PreviewFile filePath={previewFilePath} setOpen={setOpenPreviewFile} open={openPreviewFile}
                        message={messageInput} setMessage={setMessageInput} onSubmit={onSendMessage} inputRef={chatActionInputRef}
                    />
                </div>
            </div> :
            <div className='h-full w-full flex flex-col gap-3 justify-center items-center'>
                <img src={Logo} className='w-40' />
                <div className='text-2xl font-semibold text-slate-500'>Select a chat to start messaging</div>
            </div>
        }
    </div>
};

export default ChatContent;

{/* <PreviewFile filePath={previewFilePath} setOpen={setOpenPreviewFile} open={openPreviewFile}
                message={messageInput} setMessage={setMessageInput} onSubmit={onSendMessage} inputRef={chatActionInputRef}
            /> */}