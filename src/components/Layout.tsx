import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import Sidebar from './navMenu/Sidebar';
import Header from './ui/Header';

interface Props {
    children?: ReactNode
}

interface LayoutContextType {
    width: number
    setWidth: React.Dispatch<React.SetStateAction<number>>
}
const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

const Layout: FC<Props> = ({ children }) => {
    const localStorage = window.localStorage;
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [openSidebar, setOpenSidebar] = useState<boolean>(() => {
        const isOpenSidebar = localStorage.getItem("_open_sidebar") ?? "true";
        return isOpenSidebar === "true" && window.innerWidth > 768;
    })

    function handelShirnk() {
        setOpenSidebar(prev => !prev);
        localStorage.setItem("_open_sidebar", (!openSidebar).toString());
    }

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])

    return (
        <LayoutContext.Provider value={{ width: screenWidth, setWidth: setScreenWidth }}>
            <main className='bg-background-gradient from p-3 md:p-6 h-screen flex gap-0'>
                <Sidebar isOpen={openSidebar} />
                <div className="bg-white rounded-3xl overflow-hidden flex-1 flex flex-col h-full relative -translate-x-[0.5px]">
                    <Header onClickShrink={handelShirnk} isShrink={openSidebar} />
                    {children}
                </div>
            </main>
        </LayoutContext.Provider>
    );
};

export const useLayout = (): LayoutContextType => {
    const context = useContext(LayoutContext)
    if (!context) {
        throw new Error("useLayout must be used within an Layout");
    }

    return context
}
export default Layout;