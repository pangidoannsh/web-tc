import { FC, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Dropdown, Upload } from 'antd';
import { UploadProps } from 'antd/es/upload';
import MessageInput from './MessageInput';

interface Props {
    message: string
    setMessage: React.Dispatch<React.SetStateAction<string>>
    onSubmit?: () => void
    inputRef: React.RefObject<HTMLTextAreaElement>
    uploadProps: UploadProps
}
const ChatActionBar: FC<Props> = ({ message, setMessage, onSubmit, inputRef, uploadProps }) => {
    const [openMenuUpload, setOpenMenuUpload] = useState(false)
    return (
        <div className='bg-white p-3 flex items-center gap-2 relative' >
            <Dropdown trigger={['click']} onOpenChange={(open) => setOpenMenuUpload(open)} menu={{
                items: [
                    {
                        key: 'image',
                        label: (
                            <Upload {...uploadProps} accept='image/*' maxCount={1} showUploadList={false} className='w-full'>
                                <div className="px-2">
                                    <button className="flex gap-2 items-center p-2 pe-6 hover:bg-slate-200 rounded-md w-full">
                                        <Icon icon="ic:round-image" className='text-2xl text-sky-500' />
                                        <span className='text-sm text-slate-600'>Gambar</span>
                                    </button>
                                </div>
                            </Upload>
                        ),
                    },
                    {
                        key: 'file',
                        label: (
                            <Upload
                                {...uploadProps} maxCount={1} showUploadList={false}>
                                <div className="px-2">
                                    <button className="flex gap-2 items-center p-2 pe-6 hover:bg-slate-200 rounded-md">
                                        <Icon icon="basil:document-solid" className='text-2xl text-purple-500' />
                                        <span className='text-sm text-slate-600'>Dokumen</span>
                                    </button>
                                </div>
                            </Upload>
                        ),
                    }
                ]
            }}>
                <button className={`${openMenuUpload ? "bg-slate-100" : ""} rounded-full p-3`}>
                    <Icon icon="octicon:paperclip-16" className='text-2xl text-slate-400' />
                </button>
            </Dropdown>
            <MessageInput value={message} setValue={setMessage} onSubmit={onSubmit} inputRef={inputRef}
                suffix={<button><Icon icon="fluent:mic-20-regular" className='text-2xl' /></button>}
            />
            <button onClick={onSubmit} className='bg-gradient-to-br from-[#50ABED] to-[#1B80C7] rounded-xl p-1.5'>
                <Icon icon="lsicon:send-outline" className='text-white text-2xl' />
            </button>
        </div>
    );
};

export default ChatActionBar;