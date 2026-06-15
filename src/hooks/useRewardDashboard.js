import { useMemo } from 'react'
import {
  aggregateRewardsByCustomer,
  filterAndSortCustomers,
  filterTransactionsByDate,
  getAvailableYears,
  getRecentMonths,
} from '../utils/rewardUtils'

// Custom dashboard hook that filters transactions and computes customer summaries.
export function useRewardDashboard(
  transactions,
  searchQuery,
  sortOption,
  yearFilter,
  monthFilter,
) {
  // Filter transaction dataset based on user-selected year and month.
  const filteredTransactions = useMemo(
    () => filterTransactionsByDate(transactions, yearFilter, monthFilter),
    [transactions, yearFilter, monthFilter],
  )

  // Aggregate rewards from the filtered transactions.
  const rewardSummary = useMemo(
    () => aggregateRewardsByCustomer(filteredTransactions),
    [filteredTransactions],
  )

  const recentMonths = useMemo(
    () => getRecentMonths(filteredTransactions),
    [filteredTransactions],
  )

  const customerList = useMemo(
    () => filterAndSortCustomers(rewardSummary, searchQuery, sortOption),
    [rewardSummary, searchQuery, sortOption],
  )

  const availableYears = useMemo(() => getAvailableYears(transactions), [transactions])

  return {
    availableYears,
    rewardSummary,
    recentMonths,
    customerList,
  }
}
