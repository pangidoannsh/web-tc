import { FC, useState } from 'react';
import { GroupType } from '../../interfaces';
import { Popover } from 'antd';
import { Icon } from '@iconify/react/dist/iconify.js';

interface Props {
    selected?: GroupType
    groups: GroupType[]
    onSelect: (group: GroupType) => void
}
const GroupList: FC<Props> = ({ selected, groups, onSelect }) => {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <Popover
                open={open}
                trigger="click"
                placement='bottomLeft'
                arrow={false}
                content={
                    <div className='flex flex-col py-4'>
                        {groups.map(group => (
                            <div key={group.id} className={`flex items-center gap-2 cursor-pointer px-4 py-2 text-sm font-semibold text-slate-60
                                ${selected?.id === group.id ? 'bg-sky-100 text-primary-500' : ' hover:text-primary-500'}`}
                                onClick={() => {
                                    onSelect(group)
                                    setOpen(false)
                                }}>
                                {group.name}
                            </div>
                        ))}
                    </div>
                }>
                <button className='flex gap-2 mb-4' onClick={() => setOpen(true)}>
                    <span className='font-semibold text-lg'>{selected?.name ?? ""}</span>
                    <div className="p-1 rounded-full bg-slate-100">
                        <Icon icon="ic:round-keyboard-arrow-down" className='text-lg text-slate-500' />
                    </div>
                </button>
            </Popover>
        </div>
    );
};

export default GroupList;