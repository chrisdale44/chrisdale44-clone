import { it, describe, expect } from '@jest/globals'
import { validateForm } from './validateForm'
import { Invoice } from 'types'

describe('UTIL: validateForm', () => {
  it('should return true for valid form data', () => {
    const mockInvoice: Invoice = {
      id: 1,
      customer_id: 123,
      finalized: false,
      paid: false,
      date: '2024-01-01',
      deadline: '2024-01-15',
      total: '100',
      tax: '13.54',
      invoice_lines: [
        {
          id: 1,
          product_id: 10,
          quantity: 2,
          invoice_id: 1,
          label: 'Product 1',
          unit: 'piece',
          vat_rate: '10',
          price: '50',
          tax: '8.33',
          product: {
            id: 10,
            label: 'Product 1',
            unit: 'piece',
            unit_price: '25',
            unit_tax: '4.17',
            vat_rate: '10',
            unit_price_without_tax: '20',
          },
        },
        {
          id: 2,
          product_id: 20,
          quantity: 1,
          invoice_id: 1,
          label: 'Product 2',
          unit: 'piece',
          vat_rate: '5.5',
          price: '100',
          tax: '5.21',
          product: {
            id: 20,
            label: 'Product 2',
            unit: 'piece',
            unit_price: '100',
            unit_tax: '5.5',
            vat_rate: '5.5',
            unit_price_without_tax: '94.5',
          },
        },
      ],
      customer: {
        id: 123,
        first_name: 'Test',
        last_name: 'Customer',
        address: '123 Test St',
        zip_code: '12345',
        city: 'Testville',
        country: 'Testland',
        country_code: 'TL',
      },
    }

    const result = validateForm(mockInvoice)
    expect(result).toBe(true)
  })

  it('should return false for invalid form data', () => {
    // missing required field: customer_id
    const mockInvoice: Invoice = {
      id: 1,
      customer_id: null,
      finalized: false,
      paid: false,
      date: '2024-01-01',
      deadline: '2024-01-15',
      total: '100',
      tax: '13.54',
      invoice_lines: [
        {
          id: 1,
          product_id: 10,
          quantity: 2,
          invoice_id: 1,
          label: 'Product 1',
          unit: 'piece',
          vat_rate: '10',
          price: '50',
          tax: '8.33',
          product: {
            id: 10,
            label: 'Product 1',
            unit: 'piece',
            unit_price: '25',
            unit_tax: '4.17',
            vat_rate: '10',
            unit_price_without_tax: '20',
          },
        },
        {
          id: 2,
          product_id: 20,
          quantity: 1,
          invoice_id: 1,
          label: 'Product 2',
          unit: 'piece',
          vat_rate: '5.5',
          price: '100',
          tax: '5.21',
          product: {
            id: 20,
            label: 'Product 2',
            unit: 'piece',
            unit_price: '100',
            unit_tax: '5.5',
            vat_rate: '5.5',
            unit_price_without_tax: '94.5',
          },
        },
      ],
    }
    const result = validateForm(mockInvoice)
    expect(result).toBe(false)
  })
})
