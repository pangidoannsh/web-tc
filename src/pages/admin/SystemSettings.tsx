import { FC, ReactNode, useState } from 'react';
import SettingsLayout from '../../components/SettingsLayout';
import { Checkbox } from 'antd';
import InputField from '../../components/ui/InputField';
import { SystemSettingsType } from '../../interfaces';
import Button from '../../components/ui/Button';

const SystemSettingsPage: FC = () => {
    const [settings, setSettings] = useState<SystemSettingsType>({
        waSupport: true,
        waLoggedIn: true,
        waMessageDelay: 5,
        discordSupport: true,
        discrodToken: "abc",
        waNumber: "123"
    })

    function onChangeWaDelay(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        // if (typeof e.target.value !== "number") return
        setSettings(prev => ({ ...prev, waMessageDelay: parseInt(e.target.value) }))
    }
    const settingMenu = (label: ReactNode, value: ReactNode) => (
        <div className='flex gap-2 items-center'>
            <div className="flex-1 text-sm text-slate-600">{label}</div>
            <div>{value}</div>
        </div>
    )
    return (
        <SettingsLayout>
            <div className='px-10 py-6 max-w-xl'>
                <h2 className='font-semibold text-xl text-primary-main'>System Settings</h2>
                <h4 className='font-medium text-primary-main mt-10'>Whatsapp</h4>
                <div className="flex flex-col gap-3 mt-3">
                    {settingMenu("Whatsapp Support", <Checkbox checked={settings.waSupport} />)}
                    {settingMenu(<>
                        <div>Wa Logged In</div>
                        <div className='text-xs font-medium text-primary-main mt-0.5'>Whatsapp Number: {settings.waNumber}</div>
                    </>, <div>
                        <button className='text-primary-500 font-bold py-1 hover:bg-sky-50 rounded-md px-2 duration-200'>Login</button>
                    </div>)}
                    {settingMenu("Whatsapp Message Delay (seconds)",
                        <div className='flex'>
                            <InputField className='rounded-md w-10 text-sm !py-1 !px-2 overflow-hidden' value={settings.waMessageDelay.toString()}
                                onChange={onChangeWaDelay} type='number' />
                        </div>
                    )}
                </div>
                <h4 className='font-medium text-primary-main mt-10'>Discord</h4>
                <div className="flex flex-col gap-3 mt-3">

                    {settingMenu("Whatsapp Support", <Checkbox checked={settings.discordSupport} />)}

                    {settingMenu("Whatsapp Message Delay (seconds)",
                        <div className='flex'>
                            <InputField as='textarea' className='rounded-md text-sm !py-1 !px-2 overflow-hidden' value={settings.discrodToken}
                                onChange={e => setSettings(prev => ({ ...prev, discrodToken: e.target.value }))} />
                        </div>
                    )}
                </div>
                <Button className='w-full mt-6'>
                    Save
                </Button>
            </div>
        </SettingsLayout>
    );
};

export default SystemSettingsPage;