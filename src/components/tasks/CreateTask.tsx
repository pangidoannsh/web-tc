import { Modal } from 'antd';
import { FC } from 'react';

interface Props {
    open: boolean
}

const titleModal = (title: string) => (
    <div className='font-semibold text-primary-main'>
        {title}
    </div>
)
const CreateTask: FC<Props> = ({ open }) => {
    return (
        <Modal open={open} title={titleModal("Create New Task")}>

        </Modal>
    );
};

export default CreateTask;