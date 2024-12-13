import { FC, useState } from 'react';
import Layout from '../../components/Layout';
import { UserType } from '../../interfaces';
import { api } from '../../config/api';
import { jsonToUserType } from '../../utils';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Popover, Switch } from 'antd';
import { ColumnType } from 'antd/es/table';
import CreateUser from '../../components/users/CreateUser';
import EditUser from '../../components/users/EditUser';
import Avatar from '../../components/ui/Avatar';
import { useNotif } from '../../providers/NotifProvider';
import DataTable, { DataTableUtils } from '../../components/ui/DataTable';

const columns: ColumnType[] = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
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


const UsersPage: FC = () => {
    const [tableUtils, setTableUtils] = useState<DataTableUtils | null>(null)
    const { showNotification } = useNotif();
    const [users, setUsers] = useState<UserType[]>([]);
    const [editingUser, setEditingUser] = useState<UserType>()
    const [isEditingProcess, setIsEditingProcess] = useState(false)
    const [openPopover, setopenPopover] = useState<string | null>(null)

    async function _handleSwitchStatus(id: string, checked: boolean) {
        setUsers(prev => prev.map(user => user.id == id ? { ...user, status: checked } : user))
        const result = await _updateStatusUser(id, checked);
        if (!result) setUsers(prev => prev.map(user => user.id == id ? { ...user, status: !checked } : user))
    }

    async function _updateStatusUser(userId: string, isChecked: boolean): Promise<boolean> {
        let isSuccess = false;
        await api.put(`/users/edit/status/${userId}`, { status: isChecked ? 1 : 0 }).then(res => {
            console.log(res.data);
            isSuccess = true
        }).catch(err => {
            console.log(err);
        })
        return isSuccess
    }

    function _deleteUser(userId: string) {
        api.delete(`/users/delete/${userId}`).then(res => {
            console.log(res.data);
            tableUtils?.reload()
            setopenPopover(null)
            showNotification({
                message: "Success",
                description: "User berhasil dihapus",
                type: "success"
            })
        }).catch(err => {
            console.log(err);
        })
    }

    function _handleClickedit(user: UserType) {
        setIsEditingProcess(true)
        setEditingUser(user)
    }

    function addNewUser(data: UserType) {
        setUsers(prev => [data, ...prev]);
        tableUtils?.reload()
    }

    function updateUser(data: UserType) {
        setUsers(prev => prev.map(user => user.id === data.id ? data : user))
    }

    function userTemplate(data: UserType): any {
        const { status, role, id, name } = data
        return {
            ...data,
            key: id,
            name: <div className='flex items-center gap-2'>
                <Avatar name={name as string} borderRadius={16} imageUrl={data.avatar} size={48} />
                <span className='font-semibold text-slate-800'>{name}</span>
            </div>,
            role: role == "ROLE_ADMIN" ? "Admin" : "User",
            status: <Switch checked={status as boolean} onChange={(checked: boolean) => _handleSwitchStatus(id, checked)} />,
            action: <div className='flex gap-2 justify-center'>
                <button onClick={() => _handleClickedit(data)}>
                    <Icon icon="cuida:edit-outline" className='text-primary-500 text-2xl' />
                </button>
                <Popover
                    open={openPopover === id}
                    onOpenChange={(visible) => setopenPopover(visible ? id : null)}
                    content={<div className='px-3 pb-3'>
                        <p>Apakah anda yakin ingin menghapus data ini?</p>
                        <div className='flex justify-end gap-2 mt-3'>
                            <button className='bg-slate-200 py-1 px-3 rounded-lg' onClick={() => setopenPopover(null)}>Cancel</button>
                            <button className='bg-red-500 py-1 px-3 rounded-lg text-white' onClick={() => _deleteUser(id)}>Delete</button>
                        </div>
                    </div>}
                    title={<div className='flex gap-2 items-center px-3 pt-3'>
                        <Icon icon="ph:warning-fill" className='text-red-500 text-xl' />
                        <span>Hapus data user?</span>
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
            <div className="p-6 px-8 h-full overflow-auto v-scroll">
                <CreateUser onSuccess={addNewUser} />
                <h2 className='font-semibold text-xl mt-4 mb-5'>Data User</h2>
                <DataTable<UserType>
                    getUtils={setTableUtils}
                    url='/users/list'
                    columns={columns}
                    data={users.map(userTemplate)}
                    setData={setUsers}
                    responseMaping={jsonToUserType}
                />
            </div>
            <EditUser user={editingUser} onSuccess={updateUser} isOpen={isEditingProcess} setIsOpen={setIsEditingProcess} />
        </Layout>
    );
};

export default UsersPage;