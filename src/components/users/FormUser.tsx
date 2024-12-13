import { Modal } from 'antd';
import { Dispatch, FC, FormEvent, ReactNode, SetStateAction } from 'react';
import InputField from '../ui/InputField';
import { Icon } from '@iconify/react/dist/iconify.js';
import { inputLabel } from '../ui/InputLabel';
import { FormUserType } from '../../interfaces';

interface Props {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void
    titleModal: ReactNode,
    loading: boolean,
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
    value: FormUserType
    setValue: Dispatch<SetStateAction<FormUserType>>
    submitText?: string
}

const FormUser: FC<Props> = ({ isOpen, setIsOpen, titleModal, loading, onSubmit, value, setValue, submitText = "Submit" }) => (
    <Modal open={isOpen} title={titleModal} footer={null} onCancel={() => setIsOpen(false)}>
        <form onSubmit={onSubmit} className='flex flex-col gap-4 mt-5'>
            <InputField placeholder='Masukkan Nama' label={inputLabel("Nama")} name='name' className='rounded-md' value={value.name}
                onChange={e => setValue(prev => ({ ...prev, name: e.target.value }))} />
            <InputField placeholder='Masukkan Username' label={inputLabel("Username")} name='username' className='rounded-md' value={value.username}
                onChange={e => setValue(prev => ({ ...prev, username: e.target.value }))} />
            <InputField label={inputLabel("Password")} name='password' type='password' className='rounded-md' value={value.password}
                onChange={e => setValue(prev => ({ ...prev, password: e.target.value }))} />
            <InputField label={inputLabel("Confirm Password")} name='confirm_password' type='password' className='rounded-md' value={value.confirmPassword}
                onChange={e => setValue(prev => ({ ...prev, confirmPassword: e.target.value }))} />
            {/* <FileUpload description="Max 10 MB files are allowed" label="Picture" name='avatar' beforeUpload={(file) => { setImage(file); return false; }} /> */}
            <button type='submit' className='bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg text-sm'>
                {loading ? <Icon icon="eos-icons:loading" className='text-2xl mx-auto w-max' /> : submitText}
            </button>
        </form>
    </Modal>
);

export default FormUser;