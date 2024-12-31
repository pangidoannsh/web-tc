import { Icon } from '@iconify/react/dist/iconify.js';
import { ColumnType } from 'antd/es/table';
import { FC, useState } from 'react';
import { TicketType } from '../../interfaces';
import DataTable, { DataTableUtils } from '../../components/ui/DataTable';
import Layout from '../../components/Layout';
import { Popover } from 'antd';
import CreateTicket from '../../components/tickets/CreateTicket';
import { api } from '../../config/api';
import { useNotif } from '../../providers/NotifProvider';
import EditTicket from '../../components/tickets/EditTicket';
import dayjs from 'dayjs';

const columns: ColumnType[] = [
    {
        title: 'Nama Barang',
        dataIndex: 'item',
        key: 'item',
    },
    {
        title: 'Tipe Barang',
        dataIndex: 'itemType',
        key: 'itemType',
    },
    {
        title: 'Deskripsi',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Kategori',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
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

type EditTicketStateType = {
    isOpen: boolean
    ticket?: TicketType | null
}
const TicketsPage: FC = () => {
    const { showNotification } = useNotif()
    const [tickets, setTickets] = useState<TicketType[]>([])
    const [tableUtils, setTableUtils] = useState<DataTableUtils>()
    const [openPopover, setopenPopover] = useState<string | null>(null)
    const [editingTicket, setEditingTicket] = useState<EditTicketStateType>({
        isOpen: false,
        ticket: null
    })

    function _onClickEditTicket(ticket: TicketType) {
        setEditingTicket({
            isOpen: true,
            ticket
        })
    }

    function _deleteTicket(id: string) {
        api.delete(`/tickets/close/${id}`).then(() => {
            tableUtils?.reload()
            setopenPopover(null)
            showNotification({
                message: "Success",
                description: "Ticket berhasil dihapus",
                type: "success"
            })
        }).catch(err => {
            console.log(err);
        })
    }

    function dataTemplate(data: TicketType): any {
        const { id } = data
        return {
            ...data,
            key: id,
            status: <div className={`flex gap-1 justify-center w-max items-center px-3 py-1 rounded-lg
            ${data.status === 'OPEN' ? 'text-primary-main bg-primary-100' : 'bg-slate-100 text-slate-500'}`}>
                {data.status}
            </div>,
            createdAt: dayjs(data.createdAt).locale('id').format('DD MMMM YYYY'),
            action: <div className='flex gap-2 justify-center'>
                <button onClick={() => _onClickEditTicket(data)}>
                    <Icon icon="cuida:edit-outline" className='text-primary-500 text-2xl' />
                </button>
                <Popover
                    open={openPopover === id}
                    onOpenChange={(visible) => setopenPopover(visible ? id : null)}
                    content={<div className='px-3 pb-3'>
                        <p>Apakah anda yakin ingin menghapus data ini?</p>
                        <div className='flex justify-end gap-2 mt-3'>
                            <button className='bg-slate-200 py-1 px-3 rounded-lg' onClick={() => setopenPopover(null)}>Cancel</button>
                            <button className='bg-red-500 py-1 px-3 rounded-lg text-white' onClick={() => _deleteTicket(id)}>Delete</button>
                        </div>
                    </div>}
                    title={<div className='flex gap-2 items-center px-3 pt-3'>
                        <Icon icon="ph:warning-fill" className='text-red-500 text-xl' />
                        <span>Hapus data ticket?</span>
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
                <CreateTicket onSuccess={() => tableUtils?.reload()} />
                <h2 className='font-semibold text-xl mt-4 mb-5'>Data Ticket</h2>
                <DataTable<TicketType>
                    url="tickets/list/paginated"
                    columns={columns}
                    data={tickets.map(dataTemplate)}
                    setData={setTickets}
                    getUtils={setTableUtils}
                />
            </div>
            <EditTicket isOpen={editingTicket.isOpen} setIsOpen={isOpen => setEditingTicket(prev => ({ ...prev, isOpen }))} ticket={editingTicket.ticket}
                onSuccess={() => tableUtils?.reload()} />
        </Layout>
    );
};

export default TicketsPage;