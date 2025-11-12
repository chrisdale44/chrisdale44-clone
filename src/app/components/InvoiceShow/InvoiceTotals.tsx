import { useContext } from 'react'
import { InvoiceContext } from 'app/context'
import { calculateTotal, formatCurrency } from './utils'

const InvoiceTotals = () => {
  const { invoice, newInvoiceLines } = useContext(InvoiceContext)
  return invoice ? (
    <div className="totalWrapper">
      <table className="unstyledTable tableRight">
        <tbody>
          <tr>
            <th>Total Tax</th>
            <td>
              {formatCurrency(
                calculateTotal(
                  [...invoice.invoice_lines, ...newInvoiceLines],
                  'unit_tax'
                )
              )}
            </td>
          </tr>
          <tr>
            <th>Total</th>
            <td>
              {formatCurrency(
                calculateTotal(
                  [...invoice.invoice_lines, ...newInvoiceLines],
                  'unit_price'
                )
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ) : null
}

export default InvoiceTotals
