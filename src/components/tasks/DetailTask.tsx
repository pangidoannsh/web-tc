import { FC, useEffect, useState } from 'react';
import { FormTaskType, TaskType, UserType } from '../../interfaces';
import { Modal } from 'antd';
import FormTask from './FormTask';
import { DEFAULT_FORM } from '../../pages/admin/Tasks';
import InlineEdit from '../ui/InlineEdit';
import ActivityLog from './ActivityLog';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useLayout } from '../Layout';

interface Props {
    task: TaskType | null
    open: boolean
    onUpdate?: (task: TaskType) => void
    onClose: () => void
    groupId: string
    groupMembers: UserType[]
}
const DetailTask: FC<Props> = ({ open, task, onClose, groupId, groupMembers }) => {
    const [formValue, setFormValue] = useState<FormTaskType>(DEFAULT_FORM)
    const { width } = useLayout()
    function _updateData() {
        console.log(formValue);

    }
    useEffect(() => {
        if (task) {
            setFormValue({
                name: task.name,
                end_task: task.end_task,
                end_type: task.end_type,
                status: task.status,
                group_id: groupId,
                description: task.description,
                documents: task.documents,
                members: task.members?.map(member => member.id) ?? [],
                assign_type: task.assign_type
            })

        }
    }, [task])

    return (
        <Modal open={open} footer={null} onCancel={onClose} closable={false} width={`${width > 1280 ? "50vw" : "75vw"}`}
            title={
                <div className='flex items-center gap-2'>
                    <div className="flex-1 flex gap-1 items-center">
                        <Icon icon="fluent:task-list-square-person-20-regular" className='flex-shrink-0 text-primary-main text-2xl' />
                        <InlineEdit text={formValue.name} setText={text => setFormValue(prev => ({ ...prev, name: text }))} className='font-semibold text-primary-main' />
                    </div>
                    <button className='flex-shrink-0' onClick={onClose}>
                        <Icon icon="ic:round-close" className='text-slate-500 text-2xl' />
                    </button>
                </div>
            }>
            <div className="flex gap-6 mt-2">
                <FormTask value={formValue} setValue={setFormValue} onSubmit={_updateData} className='flex-1' nameEditable={false} submitText='Update' groupMembers={groupMembers} />
                <ActivityLog className='lg:w-[340px]' />
            </div>
        </Modal>
    );
};

export default DetailTask;