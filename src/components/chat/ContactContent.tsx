import { Icon } from '@iconify/react/dist/iconify.js';
import { FC } from 'react';
import InputField from '../ui/InputField';
import { UserType } from '../../interfaces';
import ContactList from './ContactList';

interface Props {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    onNewChat: (contact: UserType) => void
    contact: UserType[]
    searchRef?: React.RefObject<HTMLInputElement>
}
const ContactContent: FC<Props> = ({ isOpen, setIsOpen, onNewChat, contact, searchRef }) => (
    <div className={`absolute top-0 left-0 pt-4 ps-6 flex flex-col gap-2 bg-white w-[360px] 3xl:w-[460px] border-r border-slate-200 h-full duration-200 pe-4
    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex gap-3 items-center">
            <button onClick={() => setIsOpen(false)}>
                <Icon icon="majesticons:arrow-left" className='text-2xl text-slate-500' />
            </button>
            <h4 className='font-semibold text-lg'>Chat Baru</h4>
        </div>
        <InputField ref={searchRef} className='rounded-lg text-sm' placeholder='Search' containerClassName='mt-2'
            prefix={<Icon icon="ep:search" className='text-xl text-slate-300' />} />
        <ContactList data={contact} onClickItem={onNewChat} />
    </div>
);

export default ContactContent;