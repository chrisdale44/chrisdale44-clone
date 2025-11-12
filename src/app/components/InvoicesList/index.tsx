import React from 'react'
import { useApi } from 'api'
import { Invoice } from 'types'
import { useEffect, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SortableTable from '../SortableTable'

const InvoicesList = (): React.ReactElement => {
  const api = useApi()
  const navigate = useNavigate()

  const [invoicesList, setInvoicesList] = useState<Invoice[]>([])

  const fetchInvoices = useCallback(async () => {
    const { data } = await api.getInvoices()
    setInvoicesList(data.invoices)
  }, [api])

  useEffect(() => {
    fetchInvoices()
  }, [fetchInvoices])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Invoice ID',
        accessor: 'id',
        Cell: ({ value }: { value: Invoice['id'] }) => (
          <a href={`/invoice/${value}`}>{value}</a>
        ),
      },
      {
        Header: 'Customer',
        accessor: (row: Invoice) =>
          row.customer &&
          `${row.customer.first_name} ${row.customer.last_name}`,
      },
      {
        Header: 'Address',
        accessor: (row: Invoice) => {
          if (!row.customer) return
          const { address, city, zip_code, country_code } = row.customer
          return `${address}, ${city}, ${zip_code}, ${country_code}`
        },
      },
      {
        Header: 'Total',
        accessor: 'total',
      },
      {
        Header: 'Tax',
        accessor: 'tax',
      },
      {
        Header: 'Finalized',
        accessor: (row: Invoice) => (row.finalized ? 'Yes' : 'No'),
      },
      {
        Header: 'Paid',
        accessor: (row: Invoice) => (row.paid ? 'Yes' : 'No'),
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Deadline',
        accessor: 'deadline',
      },
    ],
    []
  )

  return (
    <div className="tableWrapper">
      <button onClick={() => navigate('/invoice')} className="topNavButton">
        Create new invoice
      </button>
      <SortableTable columns={columns} data={invoicesList} />
    </div>
  )
}

export default InvoicesList
