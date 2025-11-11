import {
  HandleUpdateBoolean,
  HandleUpdateDate,
  HandleUpdateCustomer,
  HandleUpdateProduct,
  HandleUpdateQuantity,
} from 'types'
import { Invoice } from 'types'

export const useInvoiceHandlers = (
  setInvoice: React.Dispatch<React.SetStateAction<Invoice | undefined>>
) => {
  const handleUpdateDate: HandleUpdateDate = (key, dateString) => {
    setInvoice((prev) => (prev ? { ...prev, [key]: dateString } : prev))
  }

  const handleUpdateBoolean: HandleUpdateBoolean = (key, value) => {
    setInvoice((prev) => (prev ? { ...prev, [key]: value } : prev))
  }

  const handleUpdateCustomer: HandleUpdateCustomer = (customer) => {
    setInvoice((prev) => (prev && customer ? { ...prev, customer } : prev))
  }

  const handleUpdateProduct: HandleUpdateProduct = (invoiceLineId, product) => {
    setInvoice((prev) => {
      if (!prev || !product) return prev
      return {
        ...prev,
        invoice_lines: prev.invoice_lines.map((line) =>
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
                tax: (parseFloat(product.unit_tax) * line.quantity).toString(),
              }
            : line
        ),
      }
    })
  }

  const handleUpdateQuantity: HandleUpdateQuantity = (
    invoiceLineId,
    quantity
  ) => {
    setInvoice((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        invoice_lines: prev.invoice_lines.map((line) =>
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
    })
  }

  return {
    handleUpdateDate,
    handleUpdateBoolean,
    handleUpdateCustomer,
    handleUpdateProduct,
    handleUpdateQuantity,
  }
}
