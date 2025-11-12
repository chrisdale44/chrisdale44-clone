import { useContext } from 'react'
import { InvoiceContext } from 'app/context'
import CustomerAutocomplete from '../CustomerAutocomplete'
import { HandleUpdateCustomer } from 'types'

type CustomerDetailsProps = {
  handleUpdateCustomer: HandleUpdateCustomer
}

const CustomerDetailsTable = ({
  handleUpdateCustomer,
}: CustomerDetailsProps) => {
  const { invoice, editMode } = useContext(InvoiceContext)

  return (
    <table className="table unstyledTable">
      <tbody>
        <tr>
          <th>Billed to</th>
          <td>
            {editMode && !invoice?.finalized ? (
              <CustomerAutocomplete
                value={invoice?.customer ? invoice.customer : null}
                onChange={handleUpdateCustomer}
              />
            ) : invoice?.customer ? (
              `${invoice.customer.first_name} ${invoice.customer.last_name}`
            ) : null}
          </td>
        </tr>
        {invoice?.customer ? (
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
        ) : null}
      </tbody>
    </table>
  )
}

export default CustomerDetailsTable
