import { describe, expect, it } from 'vitest'
import {
  calculateRewardPoints,
  aggregateRewardsByCustomer,
  getAvailableYears,
  filterTransactionsByDate,
} from './rewardUtils'

describe('calculateRewardPoints', () => {
  it('calculates 90 points for a $120 transaction', () => {
    expect(calculateRewardPoints(120)).toBe(90)
  })

  it('calculates 25 points for a $75 transaction', () => {
    expect(calculateRewardPoints(75)).toBe(25)
  })

  it('calculates 250 points for a $200 transaction', () => {
    expect(calculateRewardPoints(200)).toBe(250)
  })

  it('returns 0 points for amounts below $50', () => {
    expect(calculateRewardPoints(40)).toBe(0)
  })

  it('returns 0 points for negative amounts', () => {
    expect(calculateRewardPoints(-20)).toBe(0)
  })

  it('supports decimal amounts and returns fractional points', () => {
    expect(calculateRewardPoints(99.5)).toBeCloseTo(49.5)
  })
})

describe('aggregateRewardsByCustomer', () => {
  it('aggregates points per customer and per month using decimal and negative transactions', () => {
    const transactions = [
      { customerid: 'C001', customerName: 'Alice Stone', transactionid: 'T1', amount: 120, date: '2026-03-02' },
      { customerid: 'C001', customerName: 'Alice Stone', transactionid: 'T2', amount: 99.5, date: '2026-03-10' },
      { customerid: 'C002', customerName: 'Brandon Lee', transactionid: 'T3', amount: -15, date: '2026-03-15' },
      { customerid: 'C001', customerName: 'Alice Stone', transactionid: 'T4', amount: 45, date: '2026-04-01' },
    ]

    const summary = aggregateRewardsByCustomer(transactions)

    expect(summary.C001.totalPoints).toBeCloseTo(139.5)
    expect(summary.C001.monthly['March 2026'].totalPoints).toBeCloseTo(139.5)
    expect(summary.C001.monthly['March 2026'].transactions).toHaveLength(2)
    expect(summary.C002.totalPoints).toBe(0)
    expect(summary.C002.monthly['March 2026'].totalPoints).toBe(0)
  })
})

describe('getAvailableYears and date filters', () => {
  it('extracts available years and filters transaction data by year/month', () => {
    const transactions = [
      { customerid: 'C001', customerName: 'Alice Stone', transactionid: 'T1', amount: 120, date: '2025-12-15' },
      { customerid: 'C001', customerName: 'Alice Stone', transactionid: 'T2', amount: 65, date: '2026-03-10' },
      { customerid: 'C002', customerName: 'Brandon Lee', transactionid: 'T3', amount: 200, date: '2024-06-05' },
    ]

    expect(getAvailableYears(transactions)).toEqual(['2026', '2025', '2024'])

    const filteredByYear = filterTransactionsByDate(transactions, '2025', 'all')
    expect(filteredByYear).toHaveLength(1)
    expect(filteredByYear[0].transactionid).toBe('T1')

    const filteredByMonth = filterTransactionsByDate(transactions, 'all', 'March')
    expect(filteredByMonth).toHaveLength(1)
    expect(filteredByMonth[0].transactionid).toBe('T2')
  })
})
