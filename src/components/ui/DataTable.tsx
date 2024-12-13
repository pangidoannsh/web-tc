import { Table } from "antd";
import InputField from "./InputField";
import { useEffect, useState } from "react";
import { TablePaginationType } from "../../interfaces";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ColumnType } from "antd/es/table";
import { useDebounce } from "use-debounce";
import { api } from "../../config/api";
import { useNotif } from "../../providers/NotifProvider";

export interface DataTableUtils {
    reload: () => void
}
interface Props<T> {
    url: string
    data: T[]
    setData: (data: T[]) => void
    columns: ColumnType[]
    responseMaping?: (data: any) => T
    getUtils?: (utils: DataTableUtils) => void
}

const defaultColumns: ColumnType[] = [
    {
        title: '#',
        dataIndex: 'no',
        key: 'no',
        align: 'center',
        width: 'max-content'
    },
]
const DataTable = <T,>({ data, setData, columns, url, responseMaping, getUtils }: Props<T>) => {
    const { showErrorNotification } = useNotif()
    const [searchText, setSearchText] = useState("")
    const [searchValue] = useDebounce(searchText, 500);

    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState<TablePaginationType>({
        current: 1,
        total: 0,
        totalPages: 0,
        pageSize: 10,
        page: 1,
    })

    function fetchData(page: number, size: number, query?: string) {
        setLoading(true)
        api.get(`${url}?page=${page}&size=${size}&query=${query ?? ""}`).then(res => {
            const resData = res.data.data
            setPagination(prev => ({ ...prev, current: resData.currentPage + 1, totalPages: resData.totalPages, total: resData.totalItems }))
            setData(resData.items.map((item: any) => responseMaping?.(item) ?? item))
        }).catch(err => {
            showErrorNotification({ message: "Terjadi Kesalahan", description: err.response.data.message })
        }).finally(() => setLoading(false))
    }

    function _onChangePage(page: number, pageSize: number) {
        setPagination(prev => ({ ...prev, current: page, pageSize }))
        fetchData(page - 1, pageSize)
    }

    useEffect(() => {
        if (searchValue === "") {
            fetchData(pagination.page - 1, pagination.pageSize)
        } else {
            fetchData(0, pagination.pageSize, searchValue)
        }
        getUtils?.({
            reload: () => fetchData(pagination.page - 1, pagination.pageSize)
        })
    }, [searchValue])
    return (
        <div>
            <div className="flex items-center justify-between flex-row-reverse gap-2 mb-3">
                <InputField className='rounded-lg' placeholder='Search' containerClassName='!w-96'
                    prefix={<Icon icon="ep:search" className='text-2xl text-slate-300' />} onChange={e => setSearchText(e.target.value)} />
            </div>
            <Table columns={[...defaultColumns, ...columns] as ColumnType<T>[]}
                dataSource={data.map((item, index) => ({ ...item, no: ((pagination.current - 1) * pagination.pageSize) + index + 1 }))} pagination={{
                    ...pagination,
                    onChange: _onChangePage
                }} loading={loading} />
        </div>
    );
};

export default DataTable;