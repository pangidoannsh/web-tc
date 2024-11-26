import { FC } from 'react';
import { Icon } from "@iconify/react"
import Avatar from './Avatar';

interface Props {
    onClickShrink: () => void
}
const Header: FC<Props> = ({ onClickShrink }) => {
    return (
        <header className='flex justify-between w-full items-center px-8 py-4 border-b border-slate-200'>
            <div className="flex gap-6 items-center">
                <button onClick={onClickShrink}>
                    <Icon icon="icon-park-outline:menu-unfold-one" className='text-primary-main text-2xl' />
                </button>
            </div>
            <div className="flex gap-6 items-center">
                <button>
                    <Icon icon="mdi:bell-notification" className='text-primary-main text-2xl' />
                </button>
                <div className="flex gap-4 items-center">
                    <Avatar name='Randy Dude' size={30} borderRadius={10} />
                    <button className='flex gap-2 items-center text-slate-500'>
                        <div className='text-sm font-medium'>Randy Dude</div>
                        <Icon icon="octicon:chevron-down-24" className='text-lg' />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;