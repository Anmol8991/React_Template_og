import React, { useMemo } from 'react'
import { Badge } from 'components/ui'
import { DataTable } from 'components/shared'
import { setTableData } from '../store/dataSlice'
import { statusColor } from './OrderTable'
import cloneDeep from 'lodash/cloneDeep'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'

const DepositWithdrawalTable = ({ data, loading, tableData }) => {
    const dispatch = useDispatch()

    const columns = useMemo(
        () => [
            {
                header: 'Transaction Id',
                accessorKey: 'id',
                cell: (props) => {
                    const row = props.row.original
                    return <span>TxID-{row.id}</span>
                },
            },
            {
                header: 'Date',
                accessorKey: 'date',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {dayjs.unix(row.date).format('MM/DD/YYYY')}
                        </div>
                    )
                },
            },
            {
                header: 'Amount',
                accessorKey: 'amount',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{row.amount} USD</span>
                },
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (props) => {
                    const { status } = props.row.original
                    return (
                        <div className="flex items-center gap-2">
                            <Badge className={statusColor[status]?.dotClass} />
                            <span
                                className={`capitalize font-semibold ${statusColor[status]?.textClass}`}
                            >
                                {statusColor[status]?.label}
                            </span>
                        </div>
                    )
                },
            },
        ],
        []
    )

    const onPaginationChange = (page) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    return (
        <DataTable
            columns={columns}
            data={data}
            loading={loading}
            pagingData={tableData}
            onPaginationChange={onPaginationChange}
            onSelectChange={onSelectChange}
            onSort={onSort}
        />
    )
}

export default DepositWithdrawalTable
