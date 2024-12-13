import { createContext, Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import { SessionType, UserType } from '../interfaces';
import { SESSION_TOKEN, USER_DATA } from '../const';

interface SessionProviderProps {
    children: React.ReactNode
}

interface SessionContextType {
    session: SessionType | null
    setSession: Dispatch<SetStateAction<SessionType | null>>
    logout: (onSuccses?: () => void) => void
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
    const [session, setSession] = useState<SessionType | null>(() => {
        const accessToken = localStorage.getItem(SESSION_TOKEN)
        const user = localStorage.getItem(USER_DATA);
        if (user) {
            return accessToken ? { accessToken, user: JSON.parse(user) as UserType } : null;
        } else {
            return accessToken ? { accessToken } : null;
        }
    })

    function logout(onSuccess?: () => void) {
        localStorage.removeItem(SESSION_TOKEN)
        localStorage.removeItem(USER_DATA)
        setSession(null)
        onSuccess && onSuccess()
    }

    return (
        <SessionContext.Provider value={{ session, setSession, logout }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = (): SessionContextType => {
    const context = useContext(SessionContext)
    if (!context) {
        throw new Error("useSession must be used within an SessionProvider");
    }

    return context
}

export default SessionProvider;