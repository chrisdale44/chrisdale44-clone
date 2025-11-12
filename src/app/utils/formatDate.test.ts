import { describe, it, expect } from '@jest/globals'
import { formatDate } from './formatDate'

describe('UTIL: formatDate', () => {
  it('should format date to YYYY-MM-DD', () => {
    const date = new Date('2023-10-05T14:48:00.000Z')
    const formattedDate = formatDate(date)
    expect(formattedDate).toBe('2023-10-05')
  })
})
