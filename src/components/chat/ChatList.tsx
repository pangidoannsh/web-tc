import { FC } from 'react';
import ChatItem from './ChatItem';
import { ChatRoom } from '../../interfaces';
import { useSession } from '../../providers/SessionProvider';

interface Props {
    selectedChat: ChatRoom | null
    onClickItem: (chat: ChatRoom) => void
    data: ChatRoom[]
}
const ChatList: FC<Props> = ({ selectedChat, onClickItem, data }) => {
    const { session } = useSession()
    return (
        <div className='flex-1 overflow-auto v-scroll pe-0.5'>
            {data.map(chat => <ChatItem key={chat.id} data={
                {
                    id: chat.chatRoomId,
                    isUnread: chat.senderId !== session?.user?.id,
                    lastMessage: chat.latestChatMessage.content,
                    lastMessageTime: chat.latestChatMessage.timestamp,
                    name: chat.senderName,
                    type: chat.latestChatMessage.type
                }
            } isActived={selectedChat?.id === chat.id} onClick={() => onClickItem(chat)} />)}
        </div>
    );
};

export default ChatList;