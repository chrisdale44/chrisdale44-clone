import { useContext } from 'react'
import { InvoiceContext } from 'app/context'
import { calculateTotal, calculateTotalTax } from './utils'

const InvoiceTotals = () => {
  const { invoice } = useContext(InvoiceContext)
  return invoice ? (
    <div className="totalWrapper">
      <table className="unstyledTable tableRight">
        <tbody>
          <tr>
            <th>Tax</th>
            <td>{invoice.tax ? invoice.tax : calculateTotalTax(invoice)}</td>
          </tr>
          <tr>
            <th>Total</th>
            <td>{invoice.total ? invoice.tax : calculateTotal(invoice)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  ) : null
}

export default InvoiceTotals
