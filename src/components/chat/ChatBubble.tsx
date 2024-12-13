import { FC } from 'react';
import { MessageType } from '../../interfaces';
import { BASE_URL } from '../../const';

interface Props {
    message: MessageType
    type: string
}
const ChatBubble: FC<Props> = ({ message, type }) => {
    const { text, isSender, time } = message;
    return (
        <div className={`flex flex-col gap-2 px-4 py-3 ${isSender ? "items-end" : "items-start"}`}>
            <div className={`p-1 rounded-2xl text-sm min-w-7 ${isSender ? "bg-primary-main text-white rounded-tr-none" : "text-slate-800 bg-slate-300 rounded-tl-none"} max-w-[70%]`}>
                {type == "FILE" ? <img src={BASE_URL + message.text.split("||")[1]} className='bg-white rounded-xl' /> : <div className='p-2'>{text}</div>}
            </div>
            <div className={`text-xs text-slate-500 `}>{time}</div>
        </div>
    );
};

export default ChatBubble;