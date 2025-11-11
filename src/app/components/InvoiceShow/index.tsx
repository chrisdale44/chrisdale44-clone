import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import { useApi } from 'api'
import { Invoice } from 'types'
import Table from '../Table'

import styles from './InvoiceShow.module.css'

const InvoiceShow = () => {
  const { id } = useParams<{ id: string }>()
  const api = useApi()
  const [invoice, setInvoice] = useState<Invoice>()

  useEffect(() => {
    api.getInvoice(id).then(({ data }) => {
      setInvoice(data)
    })
  }, [api, id])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Product',
        accessor: 'label',
      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
      },
      {
        Header: 'Price',
        accessor: 'product.unit_price',
      },
      {
        Header: 'Tax',
        accessor: 'product.unit_tax',
      },
      {
        Header: 'VAT',
        accessor: 'product.vat_rate',
      },
      {
        Header: 'Total',
        accessor: 'price',
      },
    ],
    []
  )

  return invoice ? (
    <div>
      <h1 className={styles.invoiceHeader}>Invoice #{invoice.id}</h1>

      {invoice?.customer && (
        <div className={styles.detailsWrapper}>
          <div>
            <table className={`table ${styles.unstyledTable}`}>
              <tr>
                <th>Billed to</th>
                <td>
                  {`${invoice.customer.first_name} ${invoice.customer.first_name} `}{' '}
                </td>
              </tr>
              <tr>
                <th style={{ verticalAlign: 'top' }}>Address</th>
                <td>
                  {invoice.customer.address}
                  <br />
                  {invoice.customer.city}
                  <br />
                  {invoice.customer.zip_code}
                  <br />
                  {invoice.customer.country_code}
                </td>
              </tr>
            </table>
          </div>
          <div>
            <table
              className={`table ${styles.tableRight} ${styles.unstyledTable}`}
            >
              <tr>
                <th>Invoice date</th>
                <td>{invoice.date}</td>
              </tr>
              <tr>
                <th>Deadline</th>
                <td>{invoice.deadline}</td>
              </tr>
              <tr>
                <th>Paid</th>
                <td>{invoice.paid ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <th>Finalized</th>
                <td>{invoice.finalized ? 'Yes' : 'No'}</td>
              </tr>
            </table>
          </div>
        </div>
      )}

      {invoice?.invoice_lines && (
        <Table columns={columns} data={invoice.invoice_lines} />
      )}

      {invoice && (
        <div className={styles.totalWrapper}>
          <table className={`${styles.unstyledTable} ${styles.tableRight}`}>
            <tbody>
              <tr>
                <th>Tax</th>
                <td>{invoice.tax}</td>
              </tr>
              <tr>
                <th>Total</th>
                <td>{invoice.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <pre>{JSON.stringify(invoice ?? '', null, 2)}</pre>
    </div>
  ) : null
}

export default InvoiceShow
