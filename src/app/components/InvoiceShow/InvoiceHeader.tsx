import { useContext } from 'react'
import { InvoiceContext } from 'app/context'
import styles from './InvoiceShow.module.css'

const InvoiceHeader = () => {
  const { invoice } = useContext(InvoiceContext)
  return invoice?.id ? (
    <h1 className={styles.invoiceHeader}>Invoice #{invoice.id}</h1>
  ) : null
}

export default InvoiceHeader
