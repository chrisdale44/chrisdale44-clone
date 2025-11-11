import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { useApi } from 'api'
import { InvoiceContext } from '../../context'
import InvoiceHeader from './InvoiceHeader'
import CustomerDetailsTable from './CustomerDetailsTable'
import InvoiceDetailsTable from './InvoiceDetailsTable'
import InvoiceLinesTable from './InvoiceLinesTable'
import InvoiceTotals from './InvoiceTotals'
import FooterButtons from './FooterButtons'
import { useInvoiceHandlers } from 'app/hooks/useInvoiceHandlers'
import { Invoice } from 'types'

const InvoiceShow = () => {
  const { id } = useParams<{ id: string }>()
  const api = useApi()
  const navigate = useNavigate()
  const [invoice, setInvoice] = useState<Invoice>()
  const [editMode, setEditMode] = useState<boolean>(false)
  const {
    handleUpdateDate,
    handleUpdateBoolean,
    handleUpdateCustomer,
    handleUpdateProduct,
    handleUpdateQuantity,
  } = useInvoiceHandlers(setInvoice)

  useEffect(() => {
    api.getInvoice(id).then(({ data }) => {
      setInvoice(data)
    })
  }, [api, id])

  const toggleEditMode = () => {
    setEditMode((prev) => !prev)
  }

  const handleAddInvoiceLine = () => {}

  const handleUpdateInvoice = async () => {
    if (!invoice) return

    const payload = {
      ...invoice,
      customer_id: invoice.customer_id ?? undefined,
      invoice_lines_attributes: invoice.invoice_lines.map((line) => ({
        ...line,
        _destroy: line.quantity < 1,
      })),
    }

    try {
      const { data } = await api.putInvoice(id, { invoice: payload })
      setInvoice(data)
      setEditMode(false)
    } catch (error) {
      console.error('Failed to update invoice:', error)
    }
  }

  const handleDeleteInvoice = async () => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      try {
        await api.deleteInvoice(id)
        navigate('/')
      } catch (error) {
        console.error('Failed to delete invoice:', error)
      }
    }
  }

  return invoice ? (
    <InvoiceContext.Provider value={{ invoice, editMode }}>
      <form>
        <InvoiceHeader />

        <div className="detailsWrapper">
          <div>
            <CustomerDetailsTable handleUpdateCustomer={handleUpdateCustomer} />
          </div>
          <div>
            <InvoiceDetailsTable
              handleUpdateDate={handleUpdateDate}
              handleUpdateBoolean={handleUpdateBoolean}
            />
          </div>
        </div>

        <InvoiceLinesTable
          handleUpdateProduct={handleUpdateProduct}
          handleUpdateQuantity={handleUpdateQuantity}
        />

        {editMode && !invoice?.finalized ? (
          <input
            type="button"
            onClick={handleAddInvoiceLine}
            value={`Add product +`}
          />
        ) : null}

        <InvoiceTotals />

        <FooterButtons
          toggleEditMode={toggleEditMode}
          handleUpdateInvoice={handleUpdateInvoice}
          handleDeleteInvoice={handleDeleteInvoice}
        />

        <pre>{JSON.stringify(invoice ?? '', null, 2)}</pre>
      </form>
    </InvoiceContext.Provider>
  ) : null
}

export default InvoiceShow
