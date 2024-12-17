import { FC, useEffect, useRef, useState } from 'react';
import { ChatMessageType, ChatRoom, TypeChat, UserType } from '../interfaces';
import ChatList from '../components/chat/ChatList';
import SidebarHeader from '../components/chat/SidebarHeader';
import ChatContent from '../components/chat/ChatContent';
import { api } from '../config/api';
import ContactContent from '../components/chat/ContactContent';
import SockJS from "sockjs-client";
import { API_URL, STOMP_URL } from '../const';
import { Client } from '@stomp/stompjs';
import { useSession } from '../providers/SessionProvider';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { UploadChangeParam, UploadProps } from 'antd/es/upload';
import { useNotif } from '../providers/NotifProvider';
import { Spin } from 'antd';
import Layout from '../components/Layout';

const ChatsPage: FC = () => {
    const isMounted = useRef(false)
    const socketClient = useRef<Client | null>(null)
    const searchContactRef = useRef<HTMLInputElement | null>(null)
    const chatActionInputRef = useRef<HTMLTextAreaElement | null>(null)
    const { session } = useSession()
    const { showErrorNotification } = useNotif()
    const [selectedChat, setSelectedChat] = useState<ChatRoom | null>(null);
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const [chatLists, setChatLists] = useState<ChatRoom[]>([])
    const [openContact, setOpenContact] = useState(false)
    const [contactList, setContactList] = useState<UserType[]>([])
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    const [messageInput, setMessageInput] = useState("")

    const [openPreviewFile, setOpenPreviewFile] = useState(false)
    const [previewImage, setPreviewImage] = useState<string>();
    const [fileUpload, setFileUpload] = useState<File | null>(null)
    const [responseFile, setResponseFile] = useState<string | null>(null)
    const [autoScrollingChatContainer, setAutoScrollingChatContainer] = useState(true)
    const [loading, setLoading] = useState(false)

    function handleChangeFileUpload(info: UploadChangeParam) {
        if (info.file.status === "done") {
            if (info.fileList.length === 0) return
            const file = info.fileList[0].originFileObj as File;
            setFileUpload(file);
            const previewUrl = URL.createObjectURL(file);
            setPreviewImage(previewUrl);
            setOpenPreviewFile(true)
            chatActionInputRef.current?.focus()
            setLoading(false)
            setResponseFile(info.file.response.data.path);
        } else if (info.file.status === "uploading") {
            setLoading(true)
        }
        else if (info.file.status === "error") {
            setLoading(false)
            console.log(info);

            showErrorNotification({ message: "Terjadi Kesalahan", description: "Gagal Upload File" })
        }
    }

    const chatRoom = async (chatRoomId: string) => {
        api.get("chat/room/" + chatRoomId + "/messages").then(res => {
            setMessages(res?.data?.data);
        })
    };

    function getUserDetail(id: string) {
        api.get("users/detail/" + id).then(res => {
            setSelectedUser(res?.data?.data);
        })
    }
    function getChatList() {
        api.get("chat/room").then(res => {
            const data: ChatRoom[] = res.data.data;
            setChatLists(data.sort((a, b) => moment(b.latestChatMessage.timestamp).isBefore(moment(a.latestChatMessage.timestamp)) ? -1 : 1))
        }).catch(err => {
            console.log(err);
        })
    }

    function handleClickItemChat(chat: ChatRoom) {
        if (chat.chatRoomId === selectedChat?.chatRoomId) return
        setOpenPreviewFile(false)
        setSelectedChat(chat)
        setMessages([])
        const user = contactList.find(c => c.id === chat.senderId)
        chatRoom(chat.chatRoomId)
        if (user) {
            setSelectedUser(user)
        } else {
            getUserDetail(chat.senderId)
        }
        chatActionInputRef.current?.focus()
    }

    function handleNewChat(user: UserType) {
        setSelectedUser(user)

        const chat = chatLists.find(c => c.senderId === user.id || c.recipientId === user.id)
        setOpenPreviewFile(false)

        if (chat) {
            setSelectedChat(chat)
            chatRoom(chat.chatRoomId)
        } else {
            setSelectedChat(null)
            setMessages([])
        }
        setOpenContact(false)
        chatActionInputRef.current?.focus()
    }

    function openContactContent() {
        setOpenContact(true)
        searchContactRef.current?.focus()
    }

    function getContactList() {
        api.get("users/contact/list").then(res => setContactList(res.data.data))
    }

    function _sendMessage(content: any, type: TypeChat) {
        const clientChatId = uuidv4()
        const newMessage: ChatMessageType = {
            id: uuidv4(),
            chatRoomId: selectedChat?.chatRoomId || "",
            clientChatId,
            senderId: session?.user?.id || "",
            recipientId: selectedUser?.id || "",
            content,
            status: "SENT",
            replyChatId: "",
            timestamp: new Date().toISOString(),
            type,
            reply: false,
        }

        setMessages(prev => [newMessage, ...prev])

        socketClient.current?.publish({
            destination: "/app/personal/chat",
            body: JSON.stringify({
                clientChatId,
                senderId: session?.user?.id,
                recipientId: selectedUser?.id,
                content,
                isReply: false,
                replyChatId: "",
                type,
                path: "",
                localPath: "",
            }),
        })
        getChatList()
    }

    function handleSendMessage() {
        setAutoScrollingChatContainer(true)
        if (openPreviewFile) {
            if (!fileUpload) return
            _sendMessage(`${fileUpload.name}||${responseFile}${messageInput.trim() != "" ? `||${messageInput}` : ""}`, "FILE")
            setOpenPreviewFile(false)
            setPreviewImage("")

        } else {
            _sendMessage(messageInput, "TEXT")
        }
        setMessageInput("")
    }

    const uploadFileProps: UploadProps = {
        action: `${API_URL}chat/room/${selectedChat?.chatRoomId}/upload`,
        headers: { authorization: `Bearer ${session?.accessToken}` },
        onChange: handleChangeFileUpload,
    }

    useEffect(() => {
        const sock = new SockJS(STOMP_URL);
        const newClient = new Client({
            webSocketFactory: () => sock,
            onConnect: () => {
                newClient.subscribe(
                    `/user/${session?.user?.id}/queue/messages`,
                    async (message) => {
                        setAutoScrollingChatContainer(false)
                        const body = JSON.parse(message.body);
                        if (body.chatRoomId === selectedChat?.chatRoomId) {
                            setMessages(prev => [...prev, body])
                        }
                        getChatList()
                    }
                );

            },
            onStompError: (frame) => {
                console.error("Broker error:", frame.headers["message"]);
            },
        })
        newClient.activate();
        socketClient.current = newClient
        setAutoScrollingChatContainer(true)

        return () => {
            sock.close()
            newClient.deactivate()
        }
    }, [selectedChat])

    useEffect(() => {
        if (!isMounted.current) {
            getChatList()
            getContactList()
        }
        return () => {
            isMounted.current = true
        }
    }, [])

    return (
        <Layout>
            <div className="flex flex-1 h-full overflow-auto md:overflow-hidden relative">
                {loading && <div className="absolute h-full w-full bg-sky-50 flex justify-center items-center">
                    <div className="bg-white rounded-md p-4 flex gap-2 items-center">
                        <Spin spinning={loading} size="large" />
                        <span className='text-slate-600 font-semibold'>Loading</span>
                    </div>
                </div>}
                {/* Sidebar */}
                <div className={`relative w-max overflow-hidden flex-shrink-0`}>
                    <div className={`pt-4 ps-4 md:ps-6 flex flex-col gap-2 h-full md:w-[360px] 3xl:w-[460px] border-r border-slate-200 `}>
                        {/* Header */}
                        <SidebarHeader onClickOpenContact={openContactContent} />
                        {/* Chat List */}
                        <ChatList data={chatLists} selectedChat={selectedChat} onClickItem={handleClickItemChat} />
                    </div>
                    <ContactContent isOpen={openContact} setIsOpen={setOpenContact} onNewChat={handleNewChat} contact={contactList} searchRef={searchContactRef} />
                </div>
                <ChatContent messages={messages} user={selectedUser} onSendMessage={handleSendMessage} messageInput={messageInput} setMessageInput={setMessageInput}
                    chatActionInputRef={chatActionInputRef} onChangeFile={handleChangeFileUpload} uploadProps={uploadFileProps} openPreviewFile={openPreviewFile}
                    setOpenPreviewFile={setOpenPreviewFile} previewFilePath={previewImage} autoScrolling={autoScrollingChatContainer}
                />
            </div>
        </Layout>
    );
};

export default ChatsPage;