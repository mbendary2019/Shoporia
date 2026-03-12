import { describe, it, expect } from 'vitest'
import { rateLimit } from '@/lib/rate-limit'

describe('rateLimit', () => {
  it('should allow requests within limit', () => {
    const result = rateLimit('test-allow', { maxRequests: 5 })
    expect(result.success).toBe(true)
    expect(result.remaining).toBe(4)
  })

  it('should block requests exceeding limit', () => {
    const key = 'test-block-' + Date.now()
    for (let i = 0; i < 3; i++) {
      rateLimit(key, { maxRequests: 3 })
    }
    const result = rateLimit(key, { maxRequests: 3 })
    expect(result.success).toBe(false)
    expect(result.remaining).toBe(0)
  })

  it('should track remaining requests correctly', () => {
    const key = 'test-remaining-' + Date.now()
    const r1 = rateLimit(key, { maxRequests: 5 })
    expect(r1.remaining).toBe(4)

    const r2 = rateLimit(key, { maxRequests: 5 })
    expect(r2.remaining).toBe(3)
  })

  it('should use different counters for different identifiers', () => {
    const key1 = 'test-id1-' + Date.now()
    const key2 = 'test-id2-' + Date.now()

    rateLimit(key1, { maxRequests: 2 })
    rateLimit(key1, { maxRequests: 2 })

    const result = rateLimit(key2, { maxRequests: 2 })
    expect(result.success).toBe(true)
  })
})
