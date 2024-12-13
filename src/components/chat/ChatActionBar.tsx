import { FC, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Popover, Upload } from 'antd';
import { UploadProps } from 'antd/es/upload';
import MessageInput from './MessageInput';

interface Props {
    message: string
    setMessage: React.Dispatch<React.SetStateAction<string>>
    onSubmit?: () => void
    inputRef?: React.RefObject<HTMLTextAreaElement>
    uploadProps: UploadProps
}
const ChatActionBar: FC<Props> = ({ message, setMessage, onSubmit, inputRef, uploadProps }) => {
    const [openMenuUpload, setOpenMenuUpload] = useState(false)

    return (
        <div className='bg-white p-3 flex items-center gap-2 relative' >
            <Popover open={openMenuUpload} arrow={false} placement='topLeft'
                content={<UploadMenu props={{
                    ...uploadProps,
                    onChange: (info) => {
                        uploadProps.onChange?.(info)
                        setOpenMenuUpload(false)
                    }
                }} />}>
                <div className="absolute -top-1 left-6" />
            </Popover>
            <button onClick={() => setOpenMenuUpload(prev => !prev)} className={`${openMenuUpload ? "bg-slate-100" : ""} rounded-full p-3`}>
                <Icon icon="octicon:paperclip-16" className='text-2xl text-slate-400' />
            </button>
            <MessageInput value={message} setValue={setMessage} onSubmit={onSubmit} ref={inputRef}
                suffix={<button><Icon icon="fluent:mic-20-regular" className='text-2xl' /></button>}
            />
            <button onClick={onSubmit} className='bg-gradient-to-br from-[#50ABED] to-[#1B80C7] rounded-xl p-1.5'>
                <Icon icon="lsicon:send-outline" className='text-white text-2xl' />
            </button>
        </div>
    );
};

interface UploadMenuProps {
    props: UploadProps
}
const UploadMenu: FC<UploadMenuProps> = ({ props }) => {
    return (
        <div className='flex flex-col p-2'>
            <Upload {...props} accept='image/*' maxCount={1} showUploadList={false} className='w-full'>
                <button className="flex gap-2 items-center p-2 pe-6 hover:bg-slate-200 rounded-md w-full">
                    <Icon icon="ic:round-image" className='text-2xl text-sky-500' />
                    <span className='text-sm text-slate-600'>Gambar</span>
                </button>
            </Upload>
            <Upload
                {...props}
                maxCount={1} showUploadList={false}>
                <button className="flex gap-2 items-center p-2 pe-6 hover:bg-slate-200 rounded-md">
                    <Icon icon="basil:document-solid" className='text-2xl text-purple-500' />
                    <span className='text-sm text-slate-600'>Dokumen</span>
                </button>
            </Upload>
        </div>
    );
}

export default ChatActionBar;