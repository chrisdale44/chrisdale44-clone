import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import DatePicker from 'react-datepicker'
import Table from '../Table'
import CustomerAutocomplete from '../CustomerAutocomplete'
import ProductAutocomplete from '../ProductAutocomplete'

import { useApi } from 'api'
import { Invoice, Customer, Product } from 'types'

import styles from './InvoiceShow.module.css'

const InvoiceShow = () => {
  const { id } = useParams<{ id: string }>()
  const api = useApi()
  const [invoice, setInvoice] = useState<Invoice>()
  const [editMode, setEditMode] = useState<boolean>(false)

  useEffect(() => {
    api.getInvoice(id).then(({ data }) => {
      setInvoice(data)
    })
  }, [api, id])

  const columns = [
    {
      Header: 'Product',
      accessor: 'product',
      Cell: ({ value }: { value: Product }) =>
        editMode ? (
          <ProductAutocomplete value={value} onChange={() => {}} />
        ) : (
          value.label
        ),
    },
    {
      Header: 'Quantity',
      accessor: 'quantity',
      Cell: ({ value }: { value: number }) =>
        editMode ? (
          <input
            type="number"
            min="0"
            max="100"
            step="1"
            defaultValue={value}
          />
        ) : (
          value
        ),
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
      accessor: (originalRow: Invoice['invoice_lines'][0]) =>
        parseInt(originalRow.product.unit_price) * originalRow.quantity,
    },
  ]

  const toggleEditMode = () => {
    setEditMode((prev) => !prev)
  }

  const handleCustomerChange = (customer: Customer | null) => {
    if (!customer) return
    setInvoice((prev): Invoice | undefined => {
      if (!prev) {
        // return { customer }
        return undefined
      } else {
        return { ...prev, customer }
      }
    })
  }

  const calculateTotal = (invoice: Invoice) => {
    let total = 0
    invoice.invoice_lines.forEach((line) => {
      total += parseInt(line.product.unit_price) * line.quantity
    })
    return total
  }

  const calculateTotalTax = (invoice: Invoice) => {
    let total = 0
    invoice.invoice_lines.forEach((line) => {
      total += parseInt(line.product.unit_tax) * line.quantity
    })
    return total
  }

  const handleNewRow = () => {}

  return invoice ? (
    <form>
      <input
        type="button"
        onClick={toggleEditMode}
        value={`Toggle edit mode: ${editMode ? 'on' : 'off'}`}
      />
      <h1 className={styles.invoiceHeader}>Invoice #{invoice.id}</h1>

      {invoice?.customer && (
        <div className={styles.detailsWrapper}>
          <div>
            <table className={`table ${styles.unstyledTable}`}>
              <tbody>
                <tr>
                  <th>Billed to</th>
                  <td>
                    {editMode ? (
                      <CustomerAutocomplete
                        value={invoice.customer}
                        onChange={handleCustomerChange}
                      />
                    ) : (
                      `${invoice.customer.first_name} ${invoice.customer.last_name}`
                    )}
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
              </tbody>
            </table>
          </div>
          <div>
            <table
              className={`table ${styles.tableRight} ${styles.unstyledTable}`}
            >
              <tbody>
                {invoice?.date && (
                  <tr>
                    <th>Invoice date</th>
                    <td>
                      {editMode ? (
                        <DatePicker
                          selected={new Date(invoice.date)}
                          onChange={(date) => console.log(date)}
                        />
                      ) : (
                        invoice.date
                      )}
                    </td>
                  </tr>
                )}
                {invoice?.deadline && (
                  <tr>
                    <th>Deadline</th>
                    <td>
                      {editMode ? (
                        <DatePicker
                          selected={new Date(invoice.deadline)}
                          onChange={(date) => console.log(date)}
                        />
                      ) : (
                        invoice.deadline
                      )}
                    </td>
                  </tr>
                )}
                <tr>
                  <th>Paid</th>
                  <td>
                    {editMode ? (
                      <select
                        value={invoice.paid ? 'yes' : 'no'}
                        onChange={() => {}}
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    ) : invoice.paid ? (
                      'Yes'
                    ) : (
                      'No'
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Finalized</th>
                  <td>
                    {editMode ? (
                      <select
                        value={invoice.finalized ? 'yes' : 'no'}
                        onChange={() => {}}
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    ) : invoice.finalized ? (
                      'Yes'
                    ) : (
                      'No'
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {invoice?.invoice_lines && (
        <Table columns={columns} data={invoice.invoice_lines} />
      )}

      {editMode && (
        <input type="button" onClick={handleNewRow} value={`Add product +`} />
      )}

      {invoice && (
        <div className={styles.totalWrapper}>
          <table className={`${styles.unstyledTable} ${styles.tableRight}`}>
            <tbody>
              <tr>
                <th>Tax</th>
                <td>
                  {invoice.tax ? invoice.tax : calculateTotalTax(invoice)}
                </td>
              </tr>
              <tr>
                <th>Total</th>
                <td>{invoice.total ? invoice.tax : calculateTotal(invoice)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <pre>{JSON.stringify(invoice ?? '', null, 2)}</pre>
    </form>
  ) : null
}

export default InvoiceShow
