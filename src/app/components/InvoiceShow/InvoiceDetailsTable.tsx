import { useContext } from 'react'
import DatePicker from 'react-datepicker'
import { InvoiceContext } from 'app/context'
import { HandleUpdateDate, HandleUpdateBoolean } from './types'
import { YES, NO } from './constants'
import { formatDate } from './utils'

type InvoiceDetailsTableProps = {
  handleUpdateDate: HandleUpdateDate
  handleUpdateBoolean: HandleUpdateBoolean
}

const InvoiceDetailsTable = ({
  handleUpdateDate,
  handleUpdateBoolean,
}: InvoiceDetailsTableProps) => {
  const { invoice, editMode } = useContext(InvoiceContext)

  return invoice ? (
    <table className="table tableRight unstyledTable">
      <tbody>
        {invoice?.date && (
          <tr>
            <th>Invoice date</th>
            <td>
              {editMode && !invoice?.finalized ? (
                <DatePicker
                  selected={new Date(invoice.date)}
                  onChange={(date) => {
                    if (date) handleUpdateDate('date', formatDate(date))
                  }}
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
              {editMode && !invoice?.finalized ? (
                <DatePicker
                  selected={new Date(invoice.deadline)}
                  onChange={(date) => {
                    if (date) handleUpdateDate('deadline', formatDate(date))
                  }}
                />
              ) : (
                invoice.deadline
              )}
            </td>
          </tr>
        )}
        <tr>
          <th>Finalized</th>
          <td className="capitalize">
            {editMode && !invoice?.finalized ? (
              <select
                value={invoice.finalized ? YES : NO}
                onChange={(e) =>
                  handleUpdateBoolean(
                    'finalized',
                    e.currentTarget.value === YES
                  )
                }
              >
                <option value={YES}>Yes</option>
                <option value={NO}>No</option>
              </select>
            ) : invoice.finalized ? (
              YES
            ) : (
              NO
            )}
          </td>
        </tr>
        <tr>
          <th>Paid</th>
          <td className="capitalize">
            {editMode ? (
              <select
                value={invoice.paid ? YES : NO}
                onChange={(e) =>
                  handleUpdateBoolean('paid', e.currentTarget.value === YES)
                }
              >
                <option value={YES}>Yes</option>
                <option value={NO}>No</option>
              </select>
            ) : invoice.paid ? (
              YES
            ) : (
              NO
            )}
          </td>
        </tr>
      </tbody>
    </table>
  ) : null
}

export default InvoiceDetailsTable
