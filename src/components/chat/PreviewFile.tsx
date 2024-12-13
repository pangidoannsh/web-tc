import { Icon } from '@iconify/react/dist/iconify.js';
import { FC } from 'react';
import MessageInput from './MessageInput';

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
    filePath?: string
    message: string
    setMessage: React.Dispatch<React.SetStateAction<string>>
    onSubmit?: () => void
    inputRef?: React.RefObject<HTMLTextAreaElement>
}
const PreviewFile: FC<Props> = ({ setOpen, filePath, open, message, setMessage, onSubmit, inputRef }) => {
    return (
        <div className={`bg-white flex flex-col p-6 justify-center absolute w-full h-full duration-200 left-0 bottom-0
         ${open ? "translate-y-0" : "translate-y-full"}`}>
            <div className="flex justify-start">
                <button onClick={() => setOpen(false)} className='w-max'>
                    <Icon icon={"material-symbols:close-rounded"} className='text-2xl text-slate-500' />
                </button>
            </div>
            <div className="flex-1 flex items-center justify-center h-full">
                <img src={filePath ?? ""} className='max-h-full' />
            </div>
            {/* <div className="flex items-center gap-3 px-6">
                <MessageInput value={message} setValue={setMessage} onSubmit={onSubmit} ref={inputRef} />
                <button onClick={onSubmit} className='bg-gradient-to-br from-[#50ABED] to-[#1B80C7] rounded-xl p-1.5'>
                    <Icon icon="lsicon:send-outline" className='text-white text-2xl' />
                </button>
            </div> */}
        </div>
    );
};

export default PreviewFile;