import { FC, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import DataTable from '../../components/ui/DataTable';
import { ColumnType } from 'antd/es/table';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useParams } from 'react-router-dom';
import { api } from '../../config/api';
import { DetailGroupType } from '../../interfaces';
import { jsonToDetailGroupType } from '../../utils';

type ParamsType = {
    id: string
}
const columns: ColumnType[] = [
    {
        title: 'Task Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Description',
        dataIndex: 'admin',
        key: 'admin',
    },
    {
        title: 'Group',
        dataIndex: 'group',
        key: 'group',
    },
    {
        title: 'Progress',
        dataIndex: 'progress',
        key: 'progress',
    },
    {
        title: 'Deadline',
        dataIndex: 'deadline',
        key: 'deadline',
    },
    {
        title: 'Data Created',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
    {
        title: <Icon icon="solar:settings-linear" className='mx-auto text-xl' />,
        align: 'center',
        dataIndex: 'action',
        key: 'action',
    },
];

const GroupTasksPage: FC = () => {
    const { id } = useParams<ParamsType>()
    const [group, setGroup] = useState<DetailGroupType | null>(null)
    const [tasks, setTasks] = useState<any>([])
    useEffect(() => {
        api.get(`group/detail/${id}`).then(res => {
            setGroup(jsonToDetailGroupType(res.data.data));
        })
    }, [])

    return (
        <Layout>
            <div className="p-6 ">
                <h2 className='font-semibold text-xl mt-4 mb-5'>Task {group?.name}</h2>
                <DataTable<any>
                    setData={setTasks}
                    url={`group/${id}/tasks`}
                    columns={columns}
                    data={tasks}
                />
            </div>
        </Layout>
    );
};

export default GroupTasksPage;