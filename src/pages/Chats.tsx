import { FC, useEffect, useRef, useState } from 'react';
import { ChatMessage, ChatRoom, ChatRoomType, TypeChat, UserType } from '../interfaces';
import ChatList from '../components/chat/ChatList';
import SidebarHeader from '../components/chat/SidebarHeader';
import ChatContent from '../components/chat/ChatContent';
import { api } from '../config/api';
import ContactContent from '../components/chat/ContactContent';
import { API_URL, STOMP_URL } from '../const';
import { useSession } from '../providers/SessionProvider';
import { UploadChangeParam, UploadProps } from 'antd/es/upload';
import { useNotif } from '../providers/NotifProvider';
import { Spin } from 'antd';
import Layout from '../components/Layout';
import dayjs from 'dayjs';

const ChatsPage: FC = () => {
    const isMounted = useRef(false)
    const searchContactRef = useRef<HTMLInputElement | null>(null)
    const chatActionInputRef = useRef<HTMLTextAreaElement | null>(null)
    const { session } = useSession()
    const { showErrorNotification } = useNotif()
    const [selectedChat, setSelectedChat] = useState<ChatRoom | null>(null);
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const [chatLists, setChatLists] = useState<ChatRoom[]>([])
    const [openContact, setOpenContact] = useState(false)
    const [contactList, setContactList] = useState<UserType[]>([])
    const [messages, setMessages] = useState<ChatMessage[]>([])
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

    const getMessagesChatRoom = async (room_id: string, type: ChatRoomType) => {
        if (type === "group") {
            api.get("chat/group/" + room_id).then(res => {
                setMessages(res?.data?.data.messages ?? []);
                const room = res?.data?.data.room
                setSelectedUser({
                    id: room.id,
                    name: room.name,
                    avatar: room.avatar,
                    role: "ROLE_USER",
                    status: true,
                    username: room.name
                })
            })
        } else {
            api.get("chat/room/" + room_id).then(res => {
                setMessages(res?.data?.data.messages ?? []);
            })
        }
    };

    function getUserDetail(id: string) {
        api.get("users/detail/" + id).then(res => {
            setSelectedUser(res?.data?.data);
        })
    }
    function getChatList() {
        api.get("chat/room").then(res => {
            const data: ChatRoom[] = res.data.data ?? [];
            setChatLists(data.sort((a, b) => dayjs(b.last_message.timestamp).isBefore(dayjs(a.last_message.timestamp)) ? -1 : 1))
        }).catch(err => {
            console.log(err);
        })
    }

    function handleClickItemChat(chat: ChatRoom) {
        if (chat.room_id === selectedChat?.room_id) return
        setOpenPreviewFile(false)
        setSelectedChat(chat)
        setMessages([])
        const user = contactList.find(c => c.id === chat.id)
        getMessagesChatRoom(chat.room_id, chat.type)
        if (chat.type == "personal") {
            if (user) {
                setSelectedUser(user)
            } else {
                getUserDetail(chat.id)
            }
        }
        chatActionInputRef.current?.focus()
    }

    function handleNewChat(user: UserType) {
        setSelectedUser(user)

        const chat = chatLists.find(c => c.id === user.id || c.last_message.recipient_id === user.id)
        setOpenPreviewFile(false)

        if (chat) {
            setSelectedChat(chat)
            getMessagesChatRoom(chat.room_id, "personal")
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
        api.get("users/contact/list").then(res => setContactList(res.data.data ?? []))
    }

    function _sendMessage(content: any, type: TypeChat, path?: string | null) {
        const newMessage = {
            content,
            is_reply: 0,
            path,
            reply_chat_Id: "",
            sender_id: session?.user?.id || "",
            sender_name: session?.user?.name || "",
            type,
        }
        if (selectedChat) {
            let endpoint = "chat/room/" + selectedChat?.room_id;

            if (selectedChat.type === "group") {
                endpoint = "chat/group/" + selectedChat?.room_id
            }

            api.post(endpoint, newMessage).then(_ => {
                // CURRENT REFRESH ALL
                getChatList()
            }).catch(err => {
                console.log(err);
            })
        } else {
            // For send message at first time
            api.post("chat/first/" + selectedUser!.id, newMessage)
        }

    }

    function handleSendMessage() {
        setAutoScrollingChatContainer(true)
        if (openPreviewFile) {
            if (!fileUpload) return
            const extensionFile = fileUpload.type.split("/")[0]
            _sendMessage(messageInput, extensionFile.toUpperCase() as TypeChat, responseFile)
            setOpenPreviewFile(false)
            setPreviewImage("")
        } else {
            _sendMessage(messageInput, "TEXT")
        }
        setMessageInput("")
    }

    const uploadFileProps: UploadProps = {
        action: `${API_URL}media`,
        headers: { authorization: `Bearer ${session?.accessToken}` },
        onChange: handleChangeFileUpload,
    }

    useEffect(() => {
        const socket = new WebSocket(STOMP_URL + `/notification?access_token=${session?.accessToken}`)
        socket.onclose = () => {
            console.log('websocket closed');
        }
        socket.onmessage = (res) => {
            if (!res) return

            const resData = JSON.parse(res.data)
            console.log(resData);
            if (resData.type === "NEW_CHAT") {
                setChatLists(prev => [...prev, resData.data])
            } else {
                if (resData.data.type === "CHAT") {
                    setMessages(prev => [...prev, resData.data])
                }
            }
        }
    }, [])

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
                <ChatContent room={selectedChat} messages={messages} user={selectedUser} onSendMessage={handleSendMessage} messageInput={messageInput} setMessageInput={setMessageInput}
                    chatActionInputRef={chatActionInputRef} onChangeFile={handleChangeFileUpload} uploadProps={uploadFileProps} openPreviewFile={openPreviewFile}
                    setOpenPreviewFile={setOpenPreviewFile} previewFilePath={previewImage} autoScrolling={autoScrollingChatContainer}
                />
            </div>
        </Layout>
    );
};

export default ChatsPage;