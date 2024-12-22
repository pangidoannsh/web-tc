import { Modal } from 'antd';
import { Dispatch, FC, FormEvent, ReactNode, SetStateAction } from 'react';
import { FormTicketType } from '../../interfaces';
import InputField from '../ui/InputField';
import { Icon } from '@iconify/react/dist/iconify.js';
import { DefaultOptionType } from 'antd/es/select';
import { inputLabel } from '../ui/InputLabel';
import Select from '../ui/Select';
import Button from '../ui/Button';

const ticketTypeOptions: DefaultOptionType[] = [
    {
        value: "maintenance",
        label: "Maintenance"
    },
    {
        value: "bug",
        label: "Bug"
    }
]

const categoryTypeOptions: DefaultOptionType[] = [
    {
        value: "VISIT",
        label: "VISIT"
    },
    {
        value: "SUPPORT",
        label: "SUPPORT"
    },
]

interface Props {
    isOpen: boolean,
    onClose: () => void
    titleModal: ReactNode,
    loading: boolean,
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
    value?: FormTicketType
    submitText?: string
    setValue?: Dispatch<SetStateAction<FormTicketType>>
}
export function formToPayload(formValue: FormTicketType) {
    return {
        item: formValue.name,
        description: formValue.description,
        itemType: formValue.type,
        category: formValue.category
    }
}
const FormTicket: FC<Props> = ({ isOpen, onClose, titleModal, loading, onSubmit, submitText = "Submit", value, setValue }) => {
    return (
        <Modal open={isOpen} onCancel={onClose} footer={null} title={titleModal}>
            <form onSubmit={onSubmit} className='flex flex-col gap-4 mt-5'>
                <InputField name='name' label={inputLabel("Name")} value={value?.name} placeholder='Ticket Name'
                    onChange={(e) => setValue?.(prev => ({ ...prev, name: e.target.value }))} className='rounded-md' />
                <div className="flex gap-4">
                    <Select options={ticketTypeOptions} label={inputLabel("Type")} className='flex-1' value={value?.type} onChange={(value) => setValue?.(prev => ({ ...prev, type: value as string }))} />
                    <Select options={categoryTypeOptions} label={inputLabel("Category")} className='flex-1' value={value?.category} onChange={(value) => setValue?.(prev => ({ ...prev, type: value as string }))} />
                </div>
                <InputField as='textarea' name='description' label={inputLabel("Description", false)} value={value?.description} className='rounded-md' placeholder='Description'
                    onChange={(e) => setValue?.(prev => ({ ...prev, description: e.target.value }))} />
                <Button type='submit'>
                    {loading ? <Icon icon="eos-icons:loading" className='text-2xl mx-auto w-max' /> : submitText}
                </Button>
            </form>
        </Modal>
    );
};

export default FormTicket;