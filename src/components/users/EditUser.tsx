import { FC, FormEvent, useEffect, useState } from 'react';
import FormUser from './FormUser';
import { Icon } from '@iconify/react/dist/iconify.js';
import { FormUserType, UserType } from '../../interfaces';
import { api } from '../../config/api';

interface Props {
    user?: UserType | undefined
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    onSuccess: (user: UserType) => void
}
const titleModal = (
    <div className='flex gap-2 items-center text-slate-800'>
        <Icon icon="basil:user-solid" className='text-xl' />
        <span className='font-semibold'>Edit User</span>
    </div>
);

const EditUser: FC<Props> = ({ user, isOpen, setIsOpen, onSuccess }) => {
    const [loading, setLoading] = useState(false)
    const [formValue, setFormValue] = useState<FormUserType>({
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
    })
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const payload = new FormData(e.currentTarget);

        if (payload.get("password") !== payload.get("confirm_password")) {
            //show alert here
            return
        }

        if (user) {
            setLoading(true)
            api.put(`/users/edit/${user.id}`, {
                name: payload.get("name"),
                username: payload.get("username"),
                password: payload.get("password"),
            }).then(res => {
                onSuccess(res.data.data)
                setIsOpen(false);
            }).catch(err => {
                console.log(err);
            }).finally(() => setLoading(false))
        }
    }

    useEffect(() => {
        setFormValue({
            name: user?.name || '',
            username: user?.username || '',
            password: '',
            confirmPassword: '',
        })
    }, [user])

    return (
        <FormUser isOpen={isOpen} setIsOpen={setIsOpen} titleModal={titleModal} value={formValue} setValue={setFormValue} onSubmit={handleSubmit} loading={loading} submitText='Update' />
    );
};

export default EditUser;