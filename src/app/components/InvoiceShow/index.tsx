import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useApi } from 'api'
import { InvoiceContext } from '../../context'
import { Invoice, Customer } from 'types'
import InvoiceHeader from './InvoiceHeader'
import CustomerDetails from './CustomerDetails'
import InvoiceDetails from './InvoiceDetails'
import InvoiceLines from './InvoiceLines'
import InvoiceTotals from './InvoiceTotals'
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

  const toggleEditMode = () => {
    setEditMode((prev) => !prev)
  }

  const handleCustomerChange = (customer: Customer | null): Customer | void => {
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

  const handleNewRow = () => {}

  return invoice ? (
    <InvoiceContext.Provider value={{ invoice, editMode }}>
      <form>
        <input
          type="button"
          onClick={toggleEditMode}
          value={`Toggle edit mode: ${editMode ? 'on' : 'off'}`}
        />

        <InvoiceHeader />

        <div className={styles.detailsWrapper}>
          <div>
            <CustomerDetails handleCustomerChange={handleCustomerChange} />
          </div>
          <div>
            <InvoiceDetails />
          </div>
        </div>

        <InvoiceLines />

        {editMode && (
          <input type="button" onClick={handleNewRow} value={`Add product +`} />
        )}

        <InvoiceTotals />

        <pre>{JSON.stringify(invoice ?? '', null, 2)}</pre>
      </form>
    </InvoiceContext.Provider>
  ) : null
}

export default InvoiceShow
