import { FC, FormEvent, useState } from 'react';
import FormTicket, { formToPayload } from './FormTicket';
import { FormTicketType } from '../../interfaces';
import { api } from '../../config/api';
import { Icon } from '@iconify/react/dist/iconify.js';

const titleModal = (
    <div className='flex gap-2 items-center text-slate-800'>
        <Icon icon="solar:ticket-linear" className='text-xl' />
        <span className='font-semibold'>Tambah Ticket</span>
    </div>
);

interface Props {
    onSuccess?: () => void
}
const DEFAULT_FORM: FormTicketType = {
    name: '',
    category: 'VISIT',
    type: 'maintenance',
    description: '',
    media: []
}
const CreateTicket: FC<Props> = ({ onSuccess }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [formValue, setFormValue] = useState<FormTicketType>(DEFAULT_FORM)
    const _resetForm = () => setFormValue(DEFAULT_FORM)
    const [loading, setLoading] = useState(false)

    function _onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(formValue);
        setLoading(true)
        api.post("tickets/create", formToPayload(formValue)).then(() => {
            onSuccess && onSuccess()
            setIsOpen(false)
            _resetForm()
        }).catch(err => {
            console.log(err);

        }).finally(() => setLoading(false))
    }
    return (
        <>
            <button className='bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg text-sm' onClick={() => setIsOpen(true)}>
                Tambah Ticket
            </button>
            <FormTicket isOpen={isOpen} onClose={() => setIsOpen(false)} titleModal={titleModal} value={formValue} onSubmit={_onSubmit} loading={loading} setValue={setFormValue} />
        </>
    );
};

export default CreateTicket;