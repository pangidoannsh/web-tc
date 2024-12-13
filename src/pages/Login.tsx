import { FC, FormEvent, useRef } from 'react';
import InputField from '../components/ui/InputField';
import { Navigate, useNavigate } from 'react-router-dom';
import { api } from '../config/api';
import { useSession } from '../providers/SessionProvider';
import { REFRESH_TOKEN, SESSION_TOKEN, USER_DATA } from '../const';
import { jsonToUserType } from '../utils';
import { useNotif } from '../providers/NotifProvider';

const LoginPage: FC = () => {
    const navigate = useNavigate()
    const { session, setSession } = useSession()
    const { showNotification, showErrorNotification } = useNotif()

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    function _pushReplace(path: string) {
        navigate(path, { replace: true })
    }

    function _handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        api.post("/users/login", {
            username: usernameRef.current?.value,
            password: passwordRef.current?.value
        }).then(res => {
            const accessToken = res.data.data.accessToken
            const refreshToken = res.data.data.refreshToken
            const user = jsonToUserType(res.data.data);
            setSession({ accessToken, user, refreshToken })

            localStorage.setItem(USER_DATA, JSON.stringify(user));
            localStorage.setItem(SESSION_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);
            showNotification({
                message: "Login Berhasil",
                description: "Selamat Datang " + user.name,
            })
            if (user.role == "ROLE_ADMIN") {
                _pushReplace("/dashboard")
            } else {
                _pushReplace("/chats")
            }
        }).catch(err => {
            console.log(err);
            showErrorNotification({
                message: "Login Gagal",
                description: err.response.data.message,
            })
        });
    }

    if (session?.user) {
        if (session.user.role == "ROLE_ADMIN") {
            _pushReplace("/dashboard")
        } else {
            _pushReplace("/chats")
        }
        return <Navigate to={session?.user.role == "ROLE_ADMIN" ? "/dashboard" : "/chats"} />
    } else {
        return (
            <div className='flex h-screen items-center justify-center flex-col gap-16'>
                <h1 className='text-4xl font-bold'>Login</h1>
                <form onSubmit={_handleSubmit} className='flex flex-col gap-6 w-[460px]'>
                    <InputField ref={usernameRef} placeholder='Username' className='rounded-xl w-full py-3' />
                    <InputField ref={passwordRef} placeholder='Password' className='rounded-xl w-full py-3' type='password' />
                    <button className='text-white text-lg font-extrabold rounded-xl bg-gradient-to-br from-[#50ABED] to-[#1B80C7] p-3'>
                        Masuk
                    </button>
                </form>
            </div>
        );
    }
};

export default LoginPage;