import { FC } from 'react';
import { MessageType } from '../../interfaces';
import { BASE_URL } from '../../const';

interface Props {
    message: MessageType
    type: string
    onClickImage?: (src: string) => void
}
const ChatBubble: FC<Props> = ({ message, type, onClickImage }) => {
    const { text, isSender, time } = message;
    const messageContent = message.text.split("||");

    return (
        <div className={`px-5 py-1 w-full`}>
            <div className={`p-1 rounded-2xl text-sm min-w-10 w-fit ${isSender ? "ms-auto" : "me-auto"} max-w-[80%] md:max-w-[70%] lg:max-w-[50%] relative
        ${isSender ? "bg-primary-main text-white rounded-tr-none" : "text-slate-800 bg-slate-300 rounded-tl-none"}`}>
                <div className={`absolute top-0 ${isSender ? "-right-[6px] text-primary-main" : "-left-[6px] text-slate-300"}`}>
                    {isSender ? prefix : prefixPeer}
                </div>
                {type == "FILE" ? (
                    <>
                        <div className='max-h-[25vw] rounded-xl w-max overflow-hidden cursor-pointer' onClick={() => onClickImage?.(messageContent[1])}>
                            <img src={BASE_URL + messageContent[1]} className='bg-white max-w-[20vw]' />
                        </div>
                        {messageContent[2] && (
                            <div className='w-full my-2 px-2 max-w-[20vw]'>
                                {messageContent[2]}
                            </div>
                        )}
                    </>
                ) : (
                    <div className='p-2 w-full'>{text}</div>
                )}
            </div>
            <div className={`text-xs text-slate-500 mt-2 w-max ${isSender ? "ms-auto" : "me-auto"}`}>{time}</div>
        </div>
    );
};

const prefix = (
    <svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enableBackground="new 0 0 8 13">
        <title>tail-out</title>
        <path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path>
        <path fill="currentColor" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path>
    </svg>

)
const prefixPeer = (
    <svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enableBackground="new 0 0 8 13">
        <title>tail-in</title>
        <path opacity="0.13" fill="#0000000" d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"></path>
        <path fill="currentColor" d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"></path>
    </svg>

)
export default ChatBubble;