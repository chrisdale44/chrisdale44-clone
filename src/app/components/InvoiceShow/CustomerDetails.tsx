import { useContext } from 'react'
import { InvoiceContext } from 'app/context'
import CustomerAutocomplete from '../CustomerAutocomplete'
import { Customer } from 'types'
import styles from './InvoiceShow.module.css'

type CustomerDetailsProps = {
  handleCustomerChange: (customer: Customer | null) => Customer | void
}

const CustomerDetails = ({ handleCustomerChange }: CustomerDetailsProps) => {
  const { invoice, editMode } = useContext(InvoiceContext)
  return invoice?.customer ? (
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
  ) : null
}

export default CustomerDetails
