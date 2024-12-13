import { FC, FormEvent, useEffect, useState } from 'react';
import { api } from '../../config/api';
import { FormGroupType, GroupType, UserType } from '../../interfaces';
import { Icon } from '@iconify/react/dist/iconify.js';
import FormGroup from './FormGroup';
import { jsonToUserType } from '../../utils';

interface Props {
    onSuccess: (group: GroupType) => void
}

const titleModal = (
    <div className='flex gap-2 items-center text-slate-800'>
        <Icon icon="basil:user-solid" className='text-xl' />
        <span className='font-semibold'>Tambah User</span>
    </div>
);

const CreateGroup: FC<Props> = ({ onSuccess }) => {
    const [users, setUsers] = useState<UserType[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState<FormGroupType>({
        name: '',
        admin: '',
        member: []
    })

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true)
        api.post("/group/create", form).then(res => {
            const newGroup = res.data.data
            onSuccess(newGroup)
            setIsOpen(false);
        }).catch(err => {
            console.log(err);
        }).finally(() => setLoading(false))
    }

    useEffect(() => {
        api.get('/users/list').then(res => {
            setUsers(res.data.data.items.map(jsonToUserType))

        }).catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <>
            <button className='bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg text-sm' onClick={() => setIsOpen(true)}>
                Tambah Group
            </button>
            <FormGroup isOpen={isOpen} setIsOpen={setIsOpen} titleModal={titleModal} loading={loading} onSubmit={handleSubmit} users={users.map(user => user.username)}
                setValue={setForm} value={form} />
        </>
    );
};

export default CreateGroup;