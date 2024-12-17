import { FC, useState } from 'react';
import Layout from '../../components/Layout';
import { Popover, Switch } from 'antd';
import { ColumnType } from 'antd/es/table';
import { api } from '../../config/api';
import { GroupType } from '../../interfaces';
import { Icon } from '@iconify/react/dist/iconify.js';
import { jsonToGroupType } from '../../utils';
import CreateGroup from '../../components/groups/CreateGroup';
import EditGroup from '../../components/groups/EditGroup';
import DataTable, { DataTableUtils } from '../../components/ui/DataTable';
import moment from 'moment';
import { Link } from 'react-router-dom';


const columns: ColumnType[] = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Admin Group',
        dataIndex: 'admin',
        key: 'admin',
    },
    {
        title: 'Total Member',
        dataIndex: 'totalMember',
        key: 'totalMember',
    },
    {
        title: 'Date Create',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
    {
        title: 'Task',
        dataIndex: 'totalTask',
        key: 'totalTask',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: <Icon icon="solar:settings-linear" className='mx-auto text-xl' />,
        align: 'center',
        dataIndex: 'action',
        key: 'action',
    },
];

const GroupsPage: FC = () => {
    const [tableUtils, setTableUtils] = useState<DataTableUtils | null>(null)
    const [groups, setGroups] = useState<GroupType[]>([])
    const [visiblePopover, setVisiblePopover] = useState<string | null>(null);
    const [editingGroup, setEditingGroup] = useState<GroupType | undefined>()
    const [isEditingProcess, setIsEditingProcess] = useState(false)

    async function _handleSwitchStatus(id: string, checked: boolean) {
        setGroups(prev => prev.map(group => group.id == id ? { ...group, status: checked } : group))
        const result = await _updateStatusGroup(id, checked);
        if (!result) setGroups(prev => prev.map(user => user.id == id ? { ...user, status: !checked } : user))
    }

    async function _updateStatusGroup(groupId: string, isChecked: boolean): Promise<boolean> {
        let isSuccess = false;
        await api.put(`/group/edit/status/${groupId}`, { status: isChecked ? 1 : 0 }).then(res => {
            console.log(res.data);
            isSuccess = true
        }).catch(err => {
            console.log(err);
        })
        return isSuccess
    }

    function _deleteGroup(groupId: string) {
        api.delete(`/group/delete/${groupId}`).then(res => {
            console.log(res.data);
            tableUtils?.reload()
            setVisiblePopover(null)
        }).catch(err => {
            console.log(err);
        })
    }

    function addNewGroup(data: GroupType) {
        console.log(data);
        tableUtils?.reload()
    }

    function _handleClickEdit(data: GroupType) {
        setEditingGroup(data);
        setIsEditingProcess(true)
    }

    function groupTemplate(data: GroupType): any {
        const { status, id, totalTaskDone, totalTaskInProgress, totalTaskTodo } = data
        const totalTask = totalTaskDone + totalTaskInProgress + totalTaskTodo
        return {
            ...data,
            key: id,
            totalTask: <Link to={`/groups/${id}/tasks`} className='bg-primary-100 flex gap-1 justify-center w-max items-center text-primary-main px-3 py-1 rounded-lg'>
                <Icon icon="hugeicons:task-01" className='text-lg' />
                <span className='text-sm font-semibold'>{totalTask}</span>
            </Link>,
            status: <Switch checked={status} onChange={(checked: boolean) => _handleSwitchStatus(id, checked)} />,
            createdAt: moment(data.createdAt).format('DD MMMM YYYY'),
            action: <div className='flex gap-2 justify-center'>
                <button onClick={() => _handleClickEdit(data)}>
                    <Icon icon="cuida:edit-outline" className='text-primary-500 text-2xl' />
                </button>
                <Popover
                    open={visiblePopover === id}
                    onOpenChange={(visible) => setVisiblePopover(visible ? id : null)}
                    content={<div>
                        <p>Apakah anda yakin ingin menghapus group ini?</p>
                        <div className='flex justify-end gap-2 mt-3'>
                            <button className='bg-slate-200 py-1 px-3 rounded-lg' onClick={() => setVisiblePopover(null)}>Cancel</button>
                            <button className='bg-red-500 py-1 px-3 rounded-lg text-white' onClick={() => _deleteGroup(id)}>Delete</button>
                        </div>
                    </div>}
                    title={<div className='flex gap-2 items-center'>
                        <Icon icon="ph:warning-fill" className='text-red-500 text-xl' />
                        <span>Hapus group?</span>
                    </div>}
                    trigger="click"
                    placement="bottom"
                >
                    <button>
                        <Icon icon="basil:trash-outline" className="text-red-500 text-2xl" />
                    </button>
                </Popover>
            </div>
        }
    }

    return (
        <Layout>
            <div className="p-6 ">
                <CreateGroup onSuccess={addNewGroup} />
                <h2 className='font-semibold text-xl mt-4 mb-5'>Data Group</h2>
                <DataTable<GroupType>
                    getUtils={setTableUtils}
                    setData={setGroups}
                    url="/group/list"
                    columns={columns}
                    data={groups.map(groupTemplate)}
                    responseMaping={jsonToGroupType}
                />
            </div>
            <EditGroup group={editingGroup} isOpen={isEditingProcess} setIsOpen={setIsEditingProcess} onSuccess={() => tableUtils?.reload()} />
        </Layout>
    );
};

export default GroupsPage;