import { Icon } from '@iconify/react/dist/iconify.js';
import { FC, FormEvent, useState } from 'react';
import { api } from '../../config/api';
import { FormUserType, UserType } from '../../interfaces';
import FormUser from './FormUser';

interface Props {
    onSuccess: (user: UserType) => void
}
const titleModal = (
    <div className='flex gap-2 items-center text-slate-800'>
        <Icon icon="basil:user-solid" className='text-xl' />
        <span className='font-semibold'>Tambah User</span>
    </div>
);


const CreateUser: FC<Props> = ({ onSuccess }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [formValue, setFormValue] = useState<FormUserType>({
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
    })
    // const [image, setImage] = useState<File>()
    const [loading, setLoading] = useState(false)
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // payload.append("avatar", image!);
        if (formValue.password !== formValue.confirmPassword) return
        setLoading(true)
        api.post("/users/create", formValue).then(res => {
            const newUser = res.data.data
            onSuccess(newUser)
            setIsOpen(false);
            setFormValue({ name: '', username: '', password: '', confirmPassword: '' })
        }).catch(err => {
            console.log(err);

        }).finally(() => setLoading(false))
    }

    return (
        <>
            <button className='bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg text-sm' onClick={() => setIsOpen(true)}>
                Tambah User
            </button>
            <FormUser value={formValue} setValue={setFormValue} isOpen={isOpen} setIsOpen={setIsOpen} titleModal={titleModal} loading={loading} onSubmit={handleSubmit} />
        </>
    );
};

export default CreateUser;