import { OperationMethods } from 'api/gen/client'
import { Awaited } from './helpers'

export type Invoice = Awaited<
  ReturnType<OperationMethods['getInvoices']>
>['data']['invoices'][0]

export type Product = Awaited<
  ReturnType<OperationMethods['getSearchProducts']>
>['data']['products'][0]

export type Customer = Awaited<
  ReturnType<OperationMethods['getSearchCustomers']>
>['data']['customers'][0]

type DateKey = 'date' | 'deadline'
type BooleanKey = 'paid' | 'finalized'

export type HandleUpdateDate = (key: DateKey, dateString: string) => void
export type HandleUpdateBoolean = (key: BooleanKey, value: boolean) => void
export type HandleUpdateCustomer = (customer: Customer | null) => void
export type HandleUpdateProduct = (
  invoiceLineId: number,
  product: Product | null
) => void
export type HandleUpdateQuantity = (
  invoiceLineId: number,
  quantity: number
) => void

export type InvoiceKeys = keyof Invoice
