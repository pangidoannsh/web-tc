import { Modal } from 'antd';
import { FC } from 'react';

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
    src: string
}
const ImageModal: FC<Props> = ({ open, setOpen, src }) => {
    return (
        <Modal open={open} onCancel={() => setOpen(false)} footer={null} width="max-content" closable={false} wrapClassName='custom-space'>
            <div className="flex justify-center">
                <img src={src} alt='show image' className='max-h-[90vh] border border-slate-100' />
            </div>
        </Modal>
    );
};

export default ImageModal;