import { FC } from 'react';
import Logo from "../../assets/images/logo.png"
import { NavMenuType } from '../../interfaces';
import MenuItem from './MenuItem';
import { useLocation } from 'react-router-dom';

interface Props {
    isOpen: boolean
}
const menus: NavMenuType[] = [
    {
        label: "Dashboard",
        icon: "mdi:view-dashboard-edit",
        path: "/dashboard",
    },
    {
        label: "Data User",
        icon: "fluent:book-contacts-24-regular",
        path: "/users",
    },
    {
        label: "Data Group",
        icon: "mdi:account-group",
        path: "/groups",
    },
    {
        label: "Chats",
        icon: "fluent:chat-16-regular",
        path: "/chats",
    },
    {
        label: "Task Manager",
        icon: "fluent:task-list-square-person-20-regular",
        path: "/tasks",
    },
    {
        label: "Reports",
        icon: "icon-park-outline:table-report",
        path: "/reports",
    },
    {
        label: "Tickets",
        icon: "icon-park-outline:tickets-checked",
        path: "/tickets",
    },

]
const Sidebar: FC<Props> = ({ isOpen }) => {
    const location = useLocation()
    return (
        <nav className={`${isOpen ? "w-[200px]" : "w-[80px]"} duration-200 h-full flex flex-col items-center`}>
            <div className='flex gap-3 items-center px-1 py-3 border-b-[0.5px] border-white w-max'>
                <img src={Logo} className='w-9' />
                {isOpen ? <div className="font-bold text-lg text-white">Tactical Chat</div> : ""}
            </div>
            <ul className='flex flex-col gap-5 mt-8 w-full'>
                {menus.map(menu => <MenuItem isActived={location.pathname.includes(menu.path)} menu={menu} isOpenSidebar={isOpen} />)}
            </ul>
        </nav>
    );
};

export default Sidebar;