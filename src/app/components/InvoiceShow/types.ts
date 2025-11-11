import { Customer, Product } from 'types'

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
