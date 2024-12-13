import { FC, ReactNode, useState } from 'react';
import Sidebar from './navMenu/Sidebar';
import Header from './ui/Header';

interface Props {
    children?: ReactNode
}
const Layout: FC<Props> = ({ children }) => {
    const localStorage = window.localStorage;

    const [openSidebar, setOpenSidebar] = useState<boolean>(() => {
        const isOpenSidebar = localStorage.getItem("_open_sidebar") ?? "true";
        return isOpenSidebar === "true";
    })

    function handelShirnk() {
        setOpenSidebar(prev => !prev);
        localStorage.setItem("_open_sidebar", (!openSidebar).toString());
    }
    return (
        // 3xl:max-w-[1600px] 3xl:mx-auto
        <main className='bg-background-gradient from p-6 h-screen flex gap-0'>
            <Sidebar isOpen={openSidebar} />
            <div className="bg-white rounded-3xl overflow-hidden flex-1 flex flex-col h-full">
                <Header onClickShrink={handelShirnk} isShrink={openSidebar} />
                {children}
            </div>
        </main>
    );
};

export default Layout;