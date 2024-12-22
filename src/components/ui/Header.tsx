import { FC, useState } from 'react';
import { Icon } from "@iconify/react"
import Avatar from './Avatar';
import { useSession } from '../../providers/SessionProvider';
import { Modal, Popover } from 'antd';
import { Link } from 'react-router-dom';

interface Props {
    onClickShrink: () => void
    isShrink: boolean
}

const Header: FC<Props> = ({ onClickShrink, isShrink }) => {
    const { session } = useSession();
    const user = session?.user!;
    const [showLogoutDialoge, setShowLogoutDialoge] = useState(false);
    const { logout } = useSession();

    return (
        <header className='flex justify-between w-full items-center px-6 p-4 border-b border-slate-200'>
            <div className="flex gap-6 items-center">
                <button onClick={onClickShrink} className='hidden sm:block'>
                    <Icon icon="icon-park-outline:menu-unfold-one" className={`duration-200 text-primary-main text-2xl ${isShrink ? '' : 'rotate-180'}`} />
                </button>
            </div>
            <div className="flex gap-6 items-center">
                <button>
                    <Icon icon="mdi:bell-notification" className='text-primary-main text-2xl' />
                </button>
                <div className="flex gap-4 items-center">
                    <Avatar name={user.name} imageUrl={user.avatar} size={30} borderRadius={10} />
                    <Popover trigger="click" arrow={false} placement='bottomRight'
                        content={
                            <div className='flex flex-col py-3 w-72'>
                                <div className='flex flex-col gap-1'>
                                    <div className='px-4 font-bold text-xs'>Settings</div>
                                    <Link to="/profile" className='text-xs font-medium text-slate-500 hover:text-primary-500 hover:bg-sky-100 flex items-center gap-2 px-4 py-2 dropdown-item'>
                                        <span>Profile</span>
                                    </Link>
                                    <Link to="/system-settings" className='text-xs font-medium text-slate-500 hover:text-primary-500 hover:bg-sky-100 flex items-center gap-2 px-4 py-2 dropdown-item'>
                                        <span>System</span>
                                    </Link>
                                </div>
                                <hr />
                                <button className='text-xs font-medium text-slate-500 hover:text-primary-500 hover:bg-sky-100 flex items-center gap-2 px-4 py-2 dropdown-item' onClick={() => setShowLogoutDialoge(true)}>
                                    <span>Logout</span>
                                </button>
                            </div>
                        }>
                        <button className='flex gap-2 items-center text-slate-500'>
                            <div className='text-sm font-medium'>{user.name}</div>
                            <Icon icon="octicon:chevron-down-24" className='text-lg' />
                        </button>
                    </Popover>
                </div>
            </div>
            <Modal title="Logout" open={showLogoutDialoge} style={{ width: 'max-content' }} onClose={() => setShowLogoutDialoge(false)} footer={null}>
                <p>Apakah anda yakin ingin logout?</p>
                <div className="flex gap-3 justify-end mt-4">
                    <button className="bg-slate-200 text-slate-900 font-semibold px-3 py-2 rounded-lg" onClick={() => setShowLogoutDialoge(false)}>Batal</button>
                    <button className="bg-red-500 text-white font-semibold p-3 rounded-lg" onClick={() => logout()}>Logout</button>
                </div>
            </Modal>
        </header>
    );
};

export default Header;