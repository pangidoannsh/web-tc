import { Icon } from '@iconify/react/dist/iconify.js';
import { FC } from 'react';

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
    filePath?: string
}
const PreviewFile: FC<Props> = ({ setOpen, filePath, open, }) => {
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
        </div>
    );
};

export default PreviewFile;