import { FC, FormEvent, useEffect, useState } from 'react';
import FormGroup from './FormGroup';
import { FormGroupType, GroupType } from '../../interfaces';
import { api } from '../../config/api';

interface Props {
    group?: GroupType | undefined
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    onSuccess?: () => void
}

const EditGroup: FC<Props> = ({ isOpen, setIsOpen, onSuccess, group }) => {
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState<FormGroupType>({
        name: '',
        admin: '',
        member: []
    })
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        onSuccess?.()
    }

    useEffect(() => {
        if (group) {
            api.get(`/group/detail/${group?.id}`).then(res => {
                const resData = res.data.data
                setForm({
                    admin: resData.admin,
                    name: resData.name,
                    member: resData.member
                })
            })
        }
    }, [group])

    return (
        <FormGroup onSubmit={handleSubmit} isOpen={isOpen} setIsOpen={setIsOpen} titleModal='Edit Group' submitText='Update' loading={loading} value={form} setValue={setForm} />
    );
};

export default EditGroup;