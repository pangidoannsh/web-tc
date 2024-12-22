import { Dispatch, FC, FormEvent, SetStateAction } from 'react';
import { FormTaskType, UserType } from '../../interfaces';
import { DatePicker, Dropdown, Radio } from 'antd';
import { Icon } from '@iconify/react/dist/iconify.js';
import InputField from '../ui/InputField';
import { inputLabel } from '../ui/InputLabel';
import Select from '../ui/Select';
import FileUpload from '../ui/FileUpload';
import { UploadChangeParam } from 'antd/es/upload';
import { API_URL } from '../../const';
import { useSession } from '../../providers/SessionProvider';
import moment from 'moment';
import Button from '../ui/Button';

const statusOptions = [
    {
        label: "To Do",
        value: "TODO"
    },
    {
        label: "In Progress",
        value: "IN_PROGRESS"
    },
    {
        label: "Done",
        value: "DONE"
    },
    {
        label: 'Closed',
        value: 'CLOSED',
    }
]

const taskTypeOpt = [
    {
        label: "All",
        value: "ALL",
    },
    {
        label: "Member",
        value: "MEMBERS",
    },
    {
        label: "Personal",
        value: "PERSONAL",
    },
]
interface Props {
    value: FormTaskType
    setValue: Dispatch<SetStateAction<FormTaskType>>
    onSubmit?: (e: FormEvent<HTMLFormElement>) => void
    submitText?: string
    className?: string
    nameEditable?: boolean
    groupMembers: UserType[]
}

const FormTask: FC<Props> = ({ value, setValue, onSubmit, submitText = "Submit", className, nameEditable = true, groupMembers }) => {
    const { session } = useSession()

    function handleChangeFileUpload(info: UploadChangeParam) {
        if (info.file.status === "done") {
            if (info.fileList.length === 0) return
            setValue(prev => ({
                ...prev,
                documents: [...prev.documents ?? [], {
                    id: info.file.uid,
                    name: info.file.name,
                    type: info.file.type,
                    path: info.file.response.data.path,
                }]
            }))
        }
        else if (info.file.status === "error") {
            console.log("error", info);
        }
        else if (info.file.status === "removed") {
            const fileRemovedId = info.file.uid
            setValue(prev => ({
                ...prev,
                documents: prev.documents?.filter(doc => doc.id !== fileRemovedId)
            }))
        }
    }

    return (
        <form onSubmit={onSubmit} className={`flex flex-col gap-4 ${className}`}>
            <div className="flex gap-2 items-center">
                <span className='font-semibold'>In list</span>
                <Dropdown
                    trigger={["click"]}
                    placement='bottomLeft'
                    menu={{
                        items: statusOptions.map(status => (
                            {
                                key: status.value,
                                label: (
                                    <div key={status.value} className={`flex items-center gap-2 cursor-pointer px-4 py-2 text-sm font-semibold text-slate-60
                                    ${value.status === status.value ? 'bg-sky-100 text-primary-500' : ' hover:text-primary-500'}`}
                                        onClick={() => {
                                            setValue(prev => ({ ...prev, status: status.value }))
                                        }}>
                                        {status.label}
                                    </div>
                                )
                            }
                        )),
                        selectable: true,
                        onClick: data => {
                            setValue(prev => ({ ...prev, endType: data.key }))
                        },
                        defaultSelectedKeys: [value.end_type],
                    }}>
                    <button className={`bg-primary-500 py-1 px-4 rounded-md text-xs flex items-center gap-1 text-white`}>
                        <span>{statusOptions.find(status => status.value === value.status)?.label}</span>
                        <Icon icon="ic:baseline-keyboard-arrow-down" className="text-sm" />
                    </button>
                </Dropdown>
            </div>
            {
                nameEditable && <InputField label={inputLabel("Name")} placeholder='Task Name' onChange={e => setValue(prev => ({ ...prev, name: e.target.value }))}
                    value={value.name} className='rounded-md' />
            }
            <div className="flex flex-col gap-2">
                {inputLabel("Task Type")}
                <Radio.Group onChange={({ target }) => { setValue(prev => ({ ...prev, assign_type: target.value })) }} value={value.assign_type}>
                    {taskTypeOpt.map(type => (<Radio key={type.value} value={type.value}>{type.label}</Radio>))}
                </Radio.Group>
            </div>
            {
                value.assign_type !== "ALL" &&
                <Select mode='multiple' disabled={value.group_id === null} value={value.members ?? []} placeolder='Select a members' label={inputLabel("Members")}
                    options={groupMembers?.map(member => ({
                        label: member.name,
                        value: member.id,
                    }))} onChange={data => setValue(prev => ({ ...prev, members: data as string[] }))}
                />
            }
            <div className="flex flex-col gap-2">
                {inputLabel("Deadline")}
                <DatePicker suffixIcon={<Icon icon="lets-icons:date-today-duotone" className='text-lg' />} value={value.end_task ? moment(value.end_task) : null}
                    onChange={(_, dateString) => setValue(prev => ({ ...prev, end_task: dateString as string }))} />
            </div>
            <InputField as='textarea' label={inputLabel("Description")} placeholder='Description' onChange={e => setValue(prev => ({ ...prev, description: e.target.value }))}
                value={value.description} className='rounded-md' />
            <FileUpload label={inputLabel("Upload Dokumen")} multiple
                action={`${API_URL}media`}
                headers={{ authorization: `Bearer ${session?.accessToken}` }}
                onChange={handleChangeFileUpload} />
            <Button>
                {submitText}
            </Button>
        </form>
    );
};

export default FormTask;