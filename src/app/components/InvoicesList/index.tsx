import React from 'react'
import { useApi } from 'api'
import { Invoice } from 'types'
import { useEffect, useCallback, useState } from 'react'
import Table from '../Table'

const InvoicesList = (): React.ReactElement => {
  const api = useApi()

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
      },
      {
        Header: 'Customer',
        accessor: (row: Invoice) =>
          row.customer &&
          `${row.customer.first_name} ${row.customer.last_name}`,
      },
      {
        Header: 'Address',
        accessor: (row: Invoice) =>
          row.customer &&
          `${row.customer.address} ${row.customer?.zip_code} ${row.customer?.city}`,
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

  return <Table columns={columns} data={invoicesList} />
}

export default InvoicesList
