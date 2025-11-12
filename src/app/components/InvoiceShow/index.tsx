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
import { emptyInvoice, emptyInvoiceLine } from '../../constants'
import {
  validateForm,
  generateInvoiceUpdatePayload,
  generateInvoiceCreatePayload,
} from '../../utils'

import { Invoice, NewInvoiceLine } from 'types'

const InvoiceShow = () => {
  const { id } = useParams<{ id: string }>()
  const api = useApi()
  const navigate = useNavigate()
  const [invoice, setInvoice] = useState<Invoice>()
  const [editMode, setEditMode] = useState<boolean>(false)
  const [newInvoiceLines, setNewInvoiceLines] = useState<NewInvoiceLine[]>([])
  const {
    handleUpdateDate,
    handleUpdateBoolean,
    handleUpdateCustomer,
    handleUpdateProduct,
    handleUpdateQuantity,
  } = useInvoiceHandlers({ setInvoice, setNewInvoiceLines, newInvoiceLines })

  useEffect(() => {
    if (id) {
      api.getInvoice(id).then(({ data }) => {
        setInvoice(data)
      })
    } else {
      setInvoice(emptyInvoice)
      setEditMode(true)
    }
  }, [api, id])

  const toggleEditMode = () => {
    setEditMode((prev) => !prev)
  }

  const handleAddInvoiceLine = () => {
    setNewInvoiceLines((prev) => [
      ...prev,
      {
        ...emptyInvoiceLine,
        id: Date.now(),
      },
    ])
  }

  const submitForm = async () => {
    if (!invoice) return

    if (id) {
      try {
        const payload = generateInvoiceUpdatePayload(invoice, newInvoiceLines)
        const { data } = await api.putInvoice(id, {
          invoice: payload,
        })
        setInvoice(data)
      } catch (error) {
        console.error('Failed to update invoice:', error)
      }
    } else {
      try {
        const payload = generateInvoiceCreatePayload(invoice, newInvoiceLines)
        const { data } = await api.postInvoices(null, {
          invoice: payload,
        })
        navigate(`/invoice/${data.id}`)
      } catch (error) {
        console.error('Failed to create new invoice:', error)
      }
    }
    setEditMode(false)
    setNewInvoiceLines([])
  }

  const handleSaveInvoice = () => {
    if (!invoice) return

    if (validateForm(invoice)) {
      submitForm()
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
    <InvoiceContext.Provider
      value={{
        invoice,
        newInvoiceLines,
        editMode,
      }}
    >
      <button onClick={() => navigate('/')} className="topNavButton">
        Back
      </button>
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
          handleSaveInvoice={handleSaveInvoice}
          handleDeleteInvoice={handleDeleteInvoice}
        />

        {/* <pre>{JSON.stringify(invoice ?? '', null, 2)}</pre> */}
      </form>
    </InvoiceContext.Provider>
  ) : null
}

export default InvoiceShow
