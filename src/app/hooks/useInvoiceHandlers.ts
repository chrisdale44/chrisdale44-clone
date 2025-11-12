import {
  HandleUpdateBoolean,
  HandleUpdateDate,
  HandleUpdateCustomer,
  HandleUpdateProduct,
  HandleUpdateQuantity,
} from 'types'
import { Invoice, NewInvoiceLine } from 'types'

type useInvoiceHandlersProps = {
  setInvoice: React.Dispatch<React.SetStateAction<Invoice | undefined>>
  setNewInvoiceLines: React.Dispatch<React.SetStateAction<NewInvoiceLine[]>>
  newInvoiceLines: NewInvoiceLine[]
}

export const useInvoiceHandlers = ({
  setInvoice,
  setNewInvoiceLines,
  newInvoiceLines,
}: useInvoiceHandlersProps) => {
  const handleUpdateDate: HandleUpdateDate = (key, dateString) => {
    setInvoice((prev) => (prev ? { ...prev, [key]: dateString } : prev))
  }

  const handleUpdateBoolean: HandleUpdateBoolean = (key, value) => {
    setInvoice((prev) => (prev ? { ...prev, [key]: value } : prev))
  }

  const handleUpdateCustomer: HandleUpdateCustomer = (customer) => {
    setInvoice((prev) =>
      prev && customer ? { ...prev, customer, customer_id: customer.id } : prev
    )
  }

  const handleUpdateProduct: HandleUpdateProduct = (invoiceLineId, product) => {
    if (!product) return

    const updateLine = (line: any) =>
      line.id === invoiceLineId
        ? {
            ...line,
            product_id: product.id,
            product,
            label: product.label,
            vat_rate: product.vat_rate,
            unit: product.unit,
            price: line.quantity
              ? (parseFloat(product.unit_price) * line.quantity).toString()
              : undefined,
            tax: line.quantity
              ? (parseFloat(product.unit_tax) * line.quantity).toString()
              : undefined,
          }
        : line

    if (newInvoiceLines.some((line) => line.id === invoiceLineId)) {
      setNewInvoiceLines((prev) => prev.map(updateLine))
    } else {
      setInvoice((prev) =>
        prev
          ? { ...prev, invoice_lines: prev.invoice_lines.map(updateLine) }
          : prev
      )
    }
  }

  const handleUpdateQuantity: HandleUpdateQuantity = (
    invoiceLineId,
    quantity
  ) => {
    const updateLine = (line: any) =>
      line.id === invoiceLineId
        ? {
            ...line,
            quantity,
            price: line.product
              ? (parseFloat(line.product.unit_price) * quantity).toString()
              : undefined,
            tax: line.product
              ? (parseFloat(line.product.unit_tax) * quantity).toString()
              : undefined,
          }
        : line

    if (newInvoiceLines.some((line) => line.id === invoiceLineId)) {
      setNewInvoiceLines((prev) => prev.map(updateLine))
    } else {
      setInvoice((prev) =>
        prev
          ? { ...prev, invoice_lines: prev.invoice_lines.map(updateLine) }
          : prev
      )
    }
  }

  return {
    handleUpdateDate,
    handleUpdateBoolean,
    handleUpdateCustomer,
    handleUpdateProduct,
    handleUpdateQuantity,
  }
}
