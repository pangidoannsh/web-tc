import { Modal } from 'antd';
import { Dispatch, FC, FormEvent, SetStateAction } from 'react';
import FormTask from './FormTask';
import { FormTaskType, TaskType, UserType } from '../../interfaces';
import { api } from '../../config/api';

interface Props {
    open: boolean
    formValue: FormTaskType
    setFormValue: Dispatch<SetStateAction<FormTaskType>>
    onCancel?: () => void
    onCreated?: (newTask: TaskType) => void
    groupMembers: UserType[]
}

const titleModal = (title: string) => (
    <div className='font-semibold text-primary-main'>
        {title}
    </div>
)
const CreateTask: FC<Props> = ({ open, formValue, setFormValue, onCancel, onCreated, groupMembers }) => {
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // console.log(formValue);
        console.log({
            ...formValue,
            documents: formValue.documents?.map(doc => ({
                name: doc.name,
                type: doc.type,
                path: doc.path
            }))
        });

        api.post("task/create", {
            ...formValue,
            documents: formValue.documents?.map(doc => ({
                name: doc.name,
                type: doc.type,
                path: doc.path
            }))
        }).then(res => {
            console.log(res);
            onCreated?.(res.data.data)

        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <Modal open={open} title={titleModal("Create New Task")} onCancel={onCancel} footer={null}>
            <FormTask setValue={setFormValue} value={formValue} onSubmit={handleSubmit} groupMembers={groupMembers} />
        </Modal>
    );
};

export default CreateTask;