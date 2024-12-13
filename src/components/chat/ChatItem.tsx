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
    return (
        <div onClick={onClick} className={`px-2 pt-2 pb-3 border-b border-slate-200 flex gap-3 items-center w-full cursor-pointer ${isActived ? "bg-sky-100" : "hover:bg-sky-50"}`}>
            <Avatar name={data.name} imageUrl={data.image} />
            <div className="flex flex-col flex-1 gap-2">
                <div className="flex justify-between">
                    <div className="font-semibold text-sm text-slate-900">{data.name}</div>
                    <div className="text-2xs font-semibold text-slate-400">{chatTimeFormat(data.lastMessageTime)}</div>
                </div>
                <div className="flex justify-between items-end">
                    <div className={`font-medium text-xs ${data.isUnread ? "text-slate-600" : "text-slate-400"}`}>{data.type === "FILE" ?
                        <div className='flex items-center'>
                            <Icon icon="basil:document-solid" className='text-base text-slate-500' />
                            <span className='text-xs text-inherit'>File</span>
                        </div>
                        : data.lastMessage}
                    </div>
                    {data.isUnread && <div className='bg-sky-100 text-primary-main py-0.5 px-1 rounded-full text-2xs h-max min-w-5 text-center'>{data.unreadCount}</div>}
                </div>
            </div>
        </div>
    );
};

export default ChatItem;