import { FC, FormEvent, useEffect, useState } from 'react';
import { FormTicketType, TicketType } from '../../interfaces';
import { api } from '../../config/api';
import FormTicket, { formToPayload } from './FormTicket';
import { Icon } from '@iconify/react/dist/iconify.js';

interface Props {
    ticket?: TicketType | null
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    onSuccess?: () => void
}

const titleModal = (
    <div className='flex gap-2 items-center text-slate-800'>
        <Icon icon="solar:ticket-broken" className='text-xl' />
        <span className='font-semibold'>Edit Ticket</span>
    </div>
);

const DEFAULT_FORM: FormTicketType = {
    name: '',
    category: 'VISIT',
    type: 'maintenance',
    description: '',
    media: []
}

const EditTicket: FC<Props> = ({ ticket, isOpen, setIsOpen, onSuccess }) => {
    const [formValue, setFormValue] = useState<FormTicketType>(DEFAULT_FORM)

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (ticket) {
            api.put(`tickets/${ticket?.id}`, formToPayload(formValue)).then(() => {
                onSuccess && onSuccess()
            })
        }
    }
    useEffect(() => {
        if (ticket) {
            api.get(`tickets/detail/${ticket.id}`).then(res => {
                const resData = res.data.data
                setFormValue({
                    name: resData.item,
                    category: resData.category,
                    type: resData.itemType,
                    description: resData.description,
                })
            })
        }
    }, [ticket])

    return (
        <FormTicket isOpen={isOpen} onClose={() => setIsOpen(false)} titleModal={titleModal} value={formValue} onSubmit={handleSubmit} loading={false} setValue={setFormValue} />
    );
};

export default EditTicket;