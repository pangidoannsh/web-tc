import { FC } from 'react';
import Avatar from '../ui/Avatar';
import { ChatType } from '../../interfaces';
import { chatTimeFormat } from '../../utils';
import { Icon } from '@iconify/react/dist/iconify.js';

interface Props {
    data: ChatType
    isActived: boolean
    onClick: () => void
}
const ChatItem: FC<Props> = ({ data, isActived, onClick }) => {
    const getText = () => {
        if (data.type === "FILE") {
            const splitMessage = data.lastMessage.split("||")
            return splitMessage[2] != null && splitMessage[2] != "" ? splitMessage[2] : "File"
        }

        return data.lastMessage
    }
    return (
        <div onClick={onClick} className={`px-2 pt-2 pb-3 border-b border-slate-200 flex gap-3 items-center w-full cursor-pointer 
        ${isActived ? "bg-sky-100" : "hover:bg-sky-50"}`}>
            <div className="col-span-1">
                <Avatar name={data.name} imageUrl={data.image} />
            </div>
            <div className="flex flex-col gap-2 w-full overflow-hidden">
                <div className="flex justify-between">
                    <div className="font-semibold text-sm text-slate-900">{data.name}</div>
                    <div className="text-2xs font-semibold text-slate-400">{chatTimeFormat(data.lastMessageTime)}</div>
                </div>
                <div className="flex justify-between items-end w-full overflow-hidden">
                    <div className={`font-medium text-xs truncate ${data.isUnread ? "text-slate-600" : "text-slate-400"}`} title={data.type == "FILE" ? getText() : data.lastMessage}>
                        {data.type === "FILE" ?
                            <div className='flex items-center'>
                                <Icon icon="basil:document-solid" className='text-base text-slate-500 flex-shrink-0' />
                                <div className='truncate'>{getText()}</div>
                            </div>
                            : data.lastMessage
                        }
                    </div>
                    {data.isUnread && <div className='bg-sky-100 text-primary-main py-0.5 px-1 rounded-full text-2xs h-max min-w-5 text-center'>{data.unreadCount}</div>}
                </div>
            </div>
        </div>
    );
};

export default ChatItem;