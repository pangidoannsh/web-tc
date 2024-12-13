import { Icon } from '@iconify/react/dist/iconify.js';
import { FC } from 'react';
import InputField from '../ui/InputField';
import FilterTab from '../ui/FilterTab';

const filters = [
    {
        id: "all",
        label: "Semua",
        isActived: true
    },
    {
        id: "not_read",
        label: "Belum dibaca",
        isActived: false
    },
    {
        id: "group",
        label: "Group",
        isActived: false
    },
]

interface Props {
    onClickOpenContact: () => void
}
const SidebarHeader: FC<Props> = ({ onClickOpenContact }) => {
    return (
        <div className="flex h-max flex-col gap-4 pe-4">
            <div className="flex justify-between items-center">
                <div className="flex gap-1">
                    <h2 className='font-semibold text-xl'>Chats</h2>
                    <div className='bg-sky-100 text-primary-main py-0.5 px-1 rounded-full text-2xs h-max'>10</div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={onClickOpenContact}>
                        <Icon icon="fluent:chat-add-16-regular" className=' text-slate-500 text-2xl' />
                    </button>
                    <button>
                        <Icon icon="ix:context-menu" className='text-base text-slate-700' />
                    </button>
                </div>
            </div>
            <InputField className='rounded-lg' placeholder='Search'
                prefix={<Icon icon="ep:search" className='text-2xl text-slate-300' />} />
            <div className="flex gap-2">
                {filters.map(filter => <FilterTab key={filter.id} isActived={filter.isActived} label={filter.label} />)}
            </div>
        </div>
    );
};

export default SidebarHeader;