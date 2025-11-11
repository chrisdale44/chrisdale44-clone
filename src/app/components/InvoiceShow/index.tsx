import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { useApi } from 'api'
import { InvoiceContext } from '../../context'
import { Invoice } from 'types'
import InvoiceHeader from './InvoiceHeader'
import CustomerDetailsTable from './CustomerDetailsTable'
import InvoiceDetailsTable from './InvoiceDetailsTable'
import InvoiceLinesTable from './InvoiceLinesTable'
import InvoiceTotals from './InvoiceTotals'
import FooterButtons from './FooterButtons'
import {
  HandleUpdateBoolean,
  HandleUpdateDate,
  HandleUpdateCustomer,
  HandleUpdateProduct,
  HandleUpdateQuantity,
} from './types'

const InvoiceShow = () => {
  const { id } = useParams<{ id: string }>()
  const api = useApi()
  const navigate = useNavigate()
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

  const handleUpdateDate: HandleUpdateDate = (key, dateString) => {
    setInvoice((prevState) => {
      if (prevState) return { ...prevState, [key]: dateString }
    })
  }

  const handleUpdateBoolean: HandleUpdateBoolean = (key, value) => {
    setInvoice((prevState) => {
      if (prevState) return { ...prevState, [key]: value }
    })
  }

  const handleUpdateCustomer: HandleUpdateCustomer = (customer) => {
    setInvoice((prevState) => {
      if (!customer || !prevState) return
      return { ...prevState, customer }
    })
  }

  const handleUpdateProduct: HandleUpdateProduct = (invoiceLineId, product) => {
    setInvoice((prevState) => {
      if (prevState && product) {
        return {
          ...prevState,
          invoice_lines: prevState.invoice_lines.map((line) =>
            line.id === invoiceLineId
              ? {
                  ...line,
                  product_id: product.id,
                  product: product,
                  label: product.label,
                  vat_rate: product.vat_rate,
                  unit: product.unit,
                  price: (
                    parseFloat(product.unit_price) * line.quantity
                  ).toString(),
                  tax: (
                    parseFloat(product.unit_tax) * line.quantity
                  ).toString(),
                }
              : line
          ),
        }
      }
    })
  }

  const handleUpdateQuantity: HandleUpdateQuantity = (
    invoiceLineId,
    quantity
  ) => {
    setInvoice((prevState) => {
      if (prevState) {
        return {
          ...prevState,
          invoice_lines: prevState.invoice_lines.map((line) =>
            line.id === invoiceLineId
              ? {
                  ...line,
                  quantity,
                  price: (
                    parseFloat(line.product.unit_price) * line.quantity
                  ).toString(),
                  tax: (
                    parseFloat(line.product.unit_tax) * line.quantity
                  ).toString(),
                }
              : line
          ),
        }
      }
    })
  }

  const handleAddInvoiceLine = () => {}

  const handleUpdateInvoice = () => {
    if (!invoice) return

    const payload = {
      ...invoice,
      customer_id: invoice.customer_id ?? undefined,
      invoice_lines_attributes: invoice.invoice_lines.map((line) => ({
        ...line,
        _destroy: line.quantity < 1 ? true : false,
      })),
    }

    api.putInvoice(id, { invoice: payload }).then(({ data }) => {
      setInvoice(data)
      setEditMode(false)
    })
  }

  const handleDeleteInvoice = () => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      api.deleteInvoice(id).then(() => {
        navigate('/')
      })
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
