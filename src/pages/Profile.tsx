import { FC, useEffect, useState } from 'react';
import SettingsLayout from '../components/SettingsLayout';
import { useSession } from '../providers/SessionProvider';
import { UserType } from '../interfaces';
import Avatar from '../components/ui/Avatar';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';

const ProfilePage: FC = () => {
    const { session } = useSession()
    const [user, setUser] = useState<UserType | undefined>()
    const [password, setPassword] = useState({
        old: "",
        new: "",
        confirm: "",
    })
    useEffect(() => {
        setUser(session?.user)
    }, [session])

    return (
        <SettingsLayout className='flex flex-col max-w-xl gap-6'>
            <div className=''>
                <h2 className='font-semibold text-xl text-primary-main'>Profile</h2>
                <div className="flex justify-center">
                    <Avatar name={user?.name ?? ""} imageUrl={user?.avatar ?? null} size={100} borderRadius={24} />
                </div>
                <div className="flex flex-col gap-4 mt-6">
                    <InputField label="Name" className='rounded-md' value={user?.name} onChange={e => user && setUser(prev => ({ ...prev!, name: e.target.value }))} />
                    <Button>Save</Button>
                </div>
            </div>
            <hr />
            <div className="">
                <h2 className='font-semibold text-xl text-primary-main'>Change Password</h2>
                <div className="flex flex-col gap-4 mt-6">
                    <InputField label="Old Password" className='rounded-md' value={password.old} onChange={e => setPassword(prev => ({ ...prev, old: e.target.value }))} />
                    <InputField label="New Password" className='rounded-md' value={password.new} onChange={e => setPassword(prev => ({ ...prev, new: e.target.value }))} />
                    <InputField label="Confirm Password" className='rounded-md' value={password.confirm} onChange={e => setPassword(prev => ({ ...prev, confirm: e.target.value }))} />
                    <Button>Update</Button>
                </div>
            </div>
        </SettingsLayout>
    );
};

export default ProfilePage;