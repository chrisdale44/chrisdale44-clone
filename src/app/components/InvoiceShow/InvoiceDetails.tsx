import { useContext } from 'react'
import DatePicker from 'react-datepicker'
import { InvoiceContext } from 'app/context'
import styles from './InvoiceShow.module.css'

const InvoiceDetailsTable = () => {
  const { invoice, editMode } = useContext(InvoiceContext)

  return invoice ? (
    <table className={`table ${styles.tableRight} ${styles.unstyledTable}`}>
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
              <select value={invoice.paid ? 'yes' : 'no'} onChange={() => {}}>
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
  ) : null
}

export default InvoiceDetailsTable
