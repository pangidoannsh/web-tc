import { Navigate, Outlet } from 'react-router-dom'
import { LOGIN_URL } from '../const'
import { useSession } from '../providers/SessionProvider'

const AuthRoutes = () => {
    const { session } = useSession()

    return session?.accessToken ? <Outlet /> : <Navigate to={LOGIN_URL} replace />
}

export default AuthRoutes