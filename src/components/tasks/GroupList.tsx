import { FC } from 'react';
import { GroupType } from '../../interfaces';
import { Dropdown } from 'antd';
import { Icon } from '@iconify/react/dist/iconify.js';

interface Props {
    selected?: GroupType
    groups: GroupType[]
    onSelect: (group: GroupType) => void
}
const GroupList: FC<Props> = ({ selected, groups, onSelect }) => {
    return (
        <div>
            <Dropdown trigger={['click']}
                menu={{
                    items: groups.map(group => ({
                        key: group.id,
                        onClick: () => onSelect(group),
                        label: (
                            <div className={`flex items-center gap-2 cursor-pointer px-4 py-2 text-sm font-semibold text-slate-60
                            ${selected?.id === group.id ? 'bg-sky-100 text-primary-500' : ' hover:text-primary-500'}`}>
                                {group.name}
                            </div>
                        )
                    }))
                }}>
                <button className='flex gap-2 mb-4'>
                    <span className='font-semibold text-lg'>{selected?.name ?? ""}</span>
                    <div className="p-1 rounded-full bg-slate-100">
                        <Icon icon="ic:round-keyboard-arrow-down" className='text-lg text-slate-500' />
                    </div>
                </button>
            </Dropdown>
        </div>
    );
};

export default GroupList;