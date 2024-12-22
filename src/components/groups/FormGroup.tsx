import { ChangeEvent, Dispatch, FC, FormEvent, ReactNode, SetStateAction } from 'react';
import { FormGroupType } from '../../interfaces';
import { Modal } from 'antd';
import InputField from '../ui/InputField';
import { inputLabel } from '../ui/InputLabel';
import { Icon } from '@iconify/react/dist/iconify.js';
import Select from '../ui/Select';
import Button from '../ui/Button';

interface Props {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void
    titleModal: ReactNode,
    loading: boolean,
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
    value?: FormGroupType
    submitText?: string
    users?: string[]
    setValue?: Dispatch<SetStateAction<FormGroupType>>
}

const FormGroup: FC<Props> = ({ isOpen, setIsOpen, titleModal, loading, onSubmit, submitText = "Submit", users = [], value, setValue }) => {
    function onChangeName(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if (!setValue) return
        setValue(prev => ({ ...prev, name: e.target.value }))
    }
    function onChangeAdmin(value: string | string[]) {
        if (!setValue) return
        setValue(prev => ({ ...prev, admin: (value as string) }));
    }
    function onChangeMember(value: string | string[]) {
        if (!setValue) return
        setValue(prev => ({ ...prev, member: (value as string[]) }));
    }
    return (
        <Modal open={isOpen} onCancel={() => setIsOpen(false)} title={titleModal} footer={null} >
            <form onSubmit={onSubmit} className='flex flex-col gap-4 mt-5'>
                <InputField placeholder='Masukkan Nama Group' label={inputLabel("Nama Group")} name='name' className='rounded-md' value={value?.name}
                    onChange={onChangeName} />
                <Select options={users.map(user => ({ label: user, value: user }))} placeolder='Pilih Admin Group' label={inputLabel("Admin Group")}
                    onChange={onChangeAdmin} value={value?.admin} />
                <Select options={users.map(user => ({ label: user, value: user }))} placeolder='List Member' label={inputLabel("Member Group")} mode='multiple'
                    onChange={onChangeMember} value={value?.member} />
                <Button type='submit'>
                    {loading ? <Icon icon="eos-icons:loading" className='text-2xl mx-auto w-max' /> : submitText}
                </Button>
            </form>
        </Modal>
    );
}

export default FormGroup;