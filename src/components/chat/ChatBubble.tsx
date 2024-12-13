import { FC } from 'react';
import { MessageType } from '../../interfaces';
import { BASE_URL } from '../../const';

interface Props {
    message: MessageType
    type: string
}
const ChatBubble: FC<Props> = ({ message, type }) => {
    const { text, isSender, time } = message;
    const messageContent = message.text.split("||");
    return (
        <div className={`flex flex-col gap-2 px-4 py-3 ${isSender ? "items-end" : "items-start"}`}>
            <div className={`p-1 rounded-2xl text-sm min-w-7 max-w-[70%] 
                ${isSender ? "bg-primary-main text-white rounded-tr-none" : "text-slate-800 bg-slate-300 rounded-tl-none"}`}>
                {type == "FILE" ? <>
                    <img src={BASE_URL + messageContent[1]} className='bg-white rounded-xl max-w-[40%]' />
                    {messageContent[2] &&
                        <div className='my-2 px-1'>
                            {messageContent[2]}
                        </div>
                    }
                </> : <div className='p-2'>{text}</div>}
            </div>
            <div className={`text-xs text-slate-500 `}>{time}</div>
        </div>
    );
};

export default ChatBubble;