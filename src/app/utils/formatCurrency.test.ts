import { it, describe, expect } from '@jest/globals'
import { formatCurrency } from './formatCurrency'

describe('UTIL: formatCurrency', () => {
  it('should format numbers correctly as a currency string', () => {
    expect(formatCurrency(1000)).toBe('$1,000.00')
    expect(formatCurrency(1234567.89)).toBe('$1,234,567.89')
    expect(formatCurrency(0)).toBe('$0.00')
    expect(formatCurrency(-500)).toBe('-$500.00')
  })

  it('should format string inputs correctly as a currency string', () => {
    expect(formatCurrency('1000')).toBe('$1,000.00')
    expect(formatCurrency('1234567.89')).toBe('$1,234,567.89')
    expect(formatCurrency('0')).toBe('$0.00')
    expect(formatCurrency('-500')).toBe('-$500.00')
  })
})
