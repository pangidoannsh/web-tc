import { FC } from 'react';
import { UserType } from '../../interfaces';
import Avatar from '../ui/Avatar';

interface Props {
    data: UserType[]
    onClickItem?: (contact: UserType) => void
}
const ContactList: FC<Props> = ({ data, onClickItem }) => (
    <div className='flex flex-col mt-3 overflow-auto v-scroll'>
        {data.map(contact => (
            <div key={contact.id} onClick={() => onClickItem?.(contact)} className={`px-2 py-3 border-t border-slate-200 flex gap-3 items-center w-full cursor-pointer hover:bg-sky-50`}>
                <Avatar name={contact.name} imageUrl={contact.avatar} />
                <div className="flex flex-col flex-1 gap-1">
                    <div className="font-semibold text-sm text-slate-900">{contact.name}</div>
                    <div className="font-semibold text-xs text-slate-400">{contact.username}</div>
                </div>
            </div>
        ))}
    </div>
);

export default ContactList;