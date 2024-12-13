import { FC } from 'react';
import Layout from '../../components/Layout';
import { useSession } from '../../providers/SessionProvider';
import UserScreen from './UserScreen';
import AdminScreen from './AdminScreen';

const Home: FC = () => {
    const { session } = useSession();
    if (session) {
        return (
            <Layout>
                {session?.user?.role === "ROLE_ADMIN" ? <AdminScreen /> : <UserScreen />}
            </Layout>
        );
    }
}

export default Home;