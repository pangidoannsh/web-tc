import { createContext, FC, useContext } from 'react';
import { notification } from "antd"

interface Props {
    children?: React.ReactNode
}
interface NotifContextType {
    showNotification: (args: NotifArgs) => void
    showErrorNotification: (args: NotifArgs) => void
}

interface NotifArgs {
    message: string,
    description?: string
    duration?: number
    type?: "success" | "info" | "warning" | "error"
}

const NotifContext = createContext<NotifContextType>({
    showNotification: () => { },
    showErrorNotification: () => { }
});

const NotifProvider: FC<Props> = ({ children }) => {
    const [api, contextHolder] = notification.useNotification();

    function showNotification(args: NotifArgs) {
        api.open({
            duration: 3,
            ...args,
        })
    }

    function showErrorNotification(args: NotifArgs) {
        api.error({
            duration: 1,
            ...args,
        })
    }
    return (
        <NotifContext.Provider value={{ showNotification, showErrorNotification }}>
            {contextHolder}
            {children}
        </NotifContext.Provider>
    );
};

export const useNotif = (): NotifContextType => {
    const context = useContext(NotifContext)
    if (!context) {
        throw new Error("useNotif must be used within an SessionProvider");
    }

    return context
}

export default NotifProvider;