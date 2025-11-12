import { describe, it, expect } from '@jest/globals'
import { calculateTotal } from './calculateTotal'
import { NewInvoiceLine } from 'types'

describe('UTIL: calculateTotal', () => {
  it('should correctly sum unit prices', () => {
    const mockInvoiceLines: NewInvoiceLine[] = [
      {
        product: {
          unit_price: '10',
          unit_tax: '2',
          vat_rate: '20',
          id: 1,
          label: 'Product 1',
          unit: 'piece',
          unit_price_without_tax: '8',
        },
        quantity: 1,
      },
      {
        product: {
          unit_price: '20',
          unit_tax: '4',
          vat_rate: '20',
          id: 2,
          label: 'Product 2',
          unit: 'piece',
          unit_price_without_tax: '16',
        },
        quantity: 2,
      },
      {
        product: {
          unit_price: '30',
          unit_tax: '6',
          vat_rate: '20',
          id: 3,
          label: 'Product 3',
          unit: 'piece',
          unit_price_without_tax: '24',
        },
        quantity: 1,
      },
    ]
    const total = calculateTotal(mockInvoiceLines, 'unit_price')
    expect(total).toBe(80)
  })

  it('should correctly sum unit taxes', () => {
    const mockInvoiceLines: NewInvoiceLine[] = [
      {
        product: {
          unit_price: '10',
          unit_tax: '2',
          vat_rate: '20',
          id: 1,
          label: 'Product 1',
          unit: 'piece',
          unit_price_without_tax: '8',
        },
        quantity: 1,
      },
      {
        product: {
          unit_price: '20',
          unit_tax: '4',
          vat_rate: '20',
          id: 2,
          label: 'Product 2',
          unit: 'piece',
          unit_price_without_tax: '16',
        },
        quantity: 2,
      },
      {
        product: {
          unit_price: '30',
          unit_tax: '6',
          vat_rate: '20',
          id: 3,
          label: 'Product 3',
          unit: 'piece',
          unit_price_without_tax: '24',
        },
        quantity: 1,
      },
    ]
    const total = calculateTotal(mockInvoiceLines, 'unit_tax')
    expect(total).toBe(16)
  })
})
