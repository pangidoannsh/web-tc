import { FC } from 'react';
import { NavMenuType } from '../../interfaces';
import { Icon } from '@iconify/react/dist/iconify.js';
import CurveShape from './CurveShape';
import { Link } from 'react-router-dom';

interface Props {
    menu: NavMenuType
    isActived: boolean
    isOpenSidebar: boolean
}
const MenuItem: FC<Props> = ({ menu, isActived, isOpenSidebar }) => {
    return (
        <Link to={menu.path} className={`rounded-l-full h-full flex gap-6 items-center px-7 py-2.5 relative cursor-pointer ${isActived ? "bg-white text-primary-main" : "text-white"}`}>
            <div className="w-6">
                <Icon icon={menu.icon} className='text-2xl' />
            </div>
            {isOpenSidebar ? <span className='font-semibold text-sm h-6 overflow-hidden'>{menu.label}</span> : ""}
            {isActived ? (<>
                <CurveShape className='top-0 -translate-y-6' />
                <CurveShape className='bottom-0 translate-y-6 -rotate-90' />
            </>) : ""}
        </Link>
    );
};

export default MenuItem;