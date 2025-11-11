import { useContext } from 'react'
import { InvoiceContext } from 'app/context'
import { calculateTotal } from './utils'

const InvoiceTotals = () => {
  const { invoice } = useContext(InvoiceContext)
  return invoice ? (
    <div className="totalWrapper">
      <table className="unstyledTable tableRight">
        <tbody>
          <tr>
            <th>Tax</th>
            <td>{calculateTotal(invoice, 'unit_tax')}</td>
          </tr>
          <tr>
            <th>Total</th>
            <td>{calculateTotal(invoice, 'unit_price')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  ) : null
}

export default InvoiceTotals
