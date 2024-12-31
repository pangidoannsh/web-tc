import { FC, ReactNode } from 'react';
import Layout from './Layout';
import { NavMenuType } from '../interfaces';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link, useLocation } from 'react-router-dom';
import { useSession } from '../providers/SessionProvider';

interface Props {
    children?: ReactNode
    className?: string
}

const menus: NavMenuType[] = [
    {
        label: "Profile",
        icon: "cuida:edit-outline",
        path: "/profile",
    },
    {
        label: "System Settings",
        icon: "tdesign:system-setting",
        path: "/system-settings",
        access: ["ROLE_ADMIN"]
    },
]
const SettingsLayout: FC<Props> = ({ children, className }) => {
    const { session } = useSession()
    const user = session?.user!
    const location = useLocation()
    return (
        <Layout>
            <div className="flex h-full">
                <div className="flex-shrink-0 min-w-max w-[320px] px-9 py-7 flex flex-col gap-9 border-r border-slate-200">
                    {menus.filter(item => item.access?.includes(user?.role) || !item.access).map(menu => <Link key={menu.path} to={menu.path} className={`flex items-center ${menu.path === location.pathname ? "text-slate-900" : "text-slate-500"}`}>
                        <div className="flex-1 flex gap-6 items-center">
                            <Icon icon={menu.icon} className='text-2xl' />
                            <span className='font-semibold'>{menu.label}</span>
                        </div>
                        {menu.path === location.pathname && <Icon icon="material-symbols:chevron-right-rounded" className='text-2xl' />}
                    </Link>)}
                </div>
                <div className={`flex-1 px-10 py-6 ${className}`}>
                    {children}
                </div>
            </div>
        </Layout>
    );
};

export default SettingsLayout;