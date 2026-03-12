import { describe, it, expect } from 'vitest'
import {
  formatCurrency,
  formatNumber,
  formatPhone,
  formatFileSize,
  truncateText,
  slugify,
  generateOrderNumber,
} from '@/utils/format'

describe('formatCurrency', () => {
  it('should format Kuwaiti dinars with English locale', () => {
    const result = formatCurrency(450, 'KWD', 'en-KW')
    expect(result).toContain('450')
  })

  it('should format with Arabic locale', () => {
    const result = formatCurrency(450)
    expect(result).toBeTruthy()
    expect(result.length).toBeGreaterThan(0)
  })

  it('should handle zero', () => {
    const result = formatCurrency(0, 'KWD', 'en-KW')
    expect(result).toContain('0')
  })

  it('should handle large numbers', () => {
    const result = formatCurrency(65999, 'KWD', 'en-KW')
    expect(result).toContain('65')
  })
})

describe('formatNumber', () => {
  it('should format numbers with locale', () => {
    const result = formatNumber(1234)
    expect(result).toBeTruthy()
  })
})

describe('formatPhone', () => {
  it('should format Kuwait phone numbers', () => {
    expect(formatPhone('50001234')).toBe('5000 1234')
  })

  it('should return empty for empty input', () => {
    expect(formatPhone('')).toBe('')
  })

  it('should return original for non-standard numbers', () => {
    expect(formatPhone('12345')).toBe('12345')
  })
})

describe('formatFileSize', () => {
  it('should format bytes', () => {
    expect(formatFileSize(0)).toBe('0 Bytes')
    expect(formatFileSize(1024)).toBe('1 KB')
    expect(formatFileSize(1048576)).toBe('1 MB')
    expect(formatFileSize(1073741824)).toBe('1 GB')
  })

  it('should format with decimals', () => {
    expect(formatFileSize(1500)).toBe('1.46 KB')
  })
})

describe('truncateText', () => {
  it('should not truncate short text', () => {
    expect(truncateText('مرحبا', 10)).toBe('مرحبا')
  })

  it('should truncate long text', () => {
    expect(truncateText('هذا نص طويل جدا', 5)).toBe('هذا ن...')
  })
})

describe('slugify', () => {
  it('should slugify English text', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  it('should slugify Arabic text', () => {
    const result = slugify('قميص قطن')
    expect(result).toBe('قميص-قطن')
  })

  it('should handle special characters', () => {
    expect(slugify('hello!!world')).toBe('helloworld')
  })

  it('should trim leading/trailing hyphens', () => {
    expect(slugify(' hello ')).toBe('hello')
  })
})

describe('generateOrderNumber', () => {
  it('should generate unique order numbers', () => {
    const num1 = generateOrderNumber()
    const num2 = generateOrderNumber()
    expect(num1).toMatch(/^SH-/)
    expect(num1).not.toBe(num2)
  })
})
