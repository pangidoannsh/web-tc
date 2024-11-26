import { FC } from 'react';
import Layout from '../components/Layout';
import { Icon } from '@iconify/react/dist/iconify.js';
import InputField from '../components/ui/InputField';
import FilterTab from '../components/ui/FilterTab';

const filters = [
    {
        id: "all",
        label: "Semua",
        isActived: true
    },
    {
        id: "not_read",
        label: "Belum dibaca",
        isActived: false
    },
    {
        id: "group",
        label: "Group",
        isActived: false
    },
]
const ChatsPage: FC = () => {
    return (
        <Layout>
            <div className="flex h-full">
                <div className="pt-4 ps-6 pe-4 flex flex-col gap-2 w-[360px] border-r border-slate-200 ">
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-1">
                                <h2 className='font-semibold text-xl'>Chats</h2>
                                <div className='bg-sky-100 text-primary-main py-0.5 px-1 rounded-full text-2xs h-max'>10</div>
                            </div>
                            <button>
                                <Icon icon="ix:context-menu" className='text-base text-slate-700' />
                            </button>
                        </div>
                        <InputField className='rounded-lg' placeholder='Search'
                            prefix={<Icon icon="ep:search" className='text-2xl text-slate-300' />} />
                        <div className="flex gap-2">
                            {filters.map(filter => <FilterTab isActived={filter.isActived} label={filter.label} />)}
                        </div>
                    </div>
                    {/* Chat List */}
                </div>
                <div className="flex-1">

                </div>
            </div>
        </Layout>
    );
};

export default ChatsPage;