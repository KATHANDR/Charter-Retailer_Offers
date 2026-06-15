import { useCallback, useEffect, useMemo, useState } from 'react'
import './assets/App.css'
import { useTransactions } from './hooks/useTransactions'
import { useRewardDashboard } from './hooks/useRewardDashboard'
import CustomerList from './components/CustomerList'
import CustomerDetails from './components/CustomerDetails'
import SearchAndSortControls from './components/SearchAndSortControls'
import {
  DEFAULT_MONTH_FILTER,
  DEFAULT_SORT_OPTION,
  DEFAULT_VIEW_MODE,
  DEFAULT_YEAR_FILTER,
  TEXTS,
} from './constants/appConstants'

function App() {
  const { transactions, loading, error } = useTransactions()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState(DEFAULT_SORT_OPTION)
  const [yearFilter, setYearFilter] = useState(DEFAULT_YEAR_FILTER)
  const [monthFilter, setMonthFilter] = useState(DEFAULT_MONTH_FILTER)
  const [viewMode, setViewMode] = useState(DEFAULT_VIEW_MODE)
  const [selectedCustomerId, setSelectedCustomerId] = useState(null)

  // Keep the selected customer in sync whenever the filtered or sorted customer list changes.

  const { availableYears, rewardSummary, recentMonths, customerList } = useRewardDashboard(
    transactions,
    searchQuery,
    sortOption,
    yearFilter,
    monthFilter,
  )

  const handleSearchChange = useCallback((value) => setSearchQuery(value), [])
  const handleSortChange = useCallback((value) => setSortOption(value), [])
  const handleYearChange = useCallback((value) => setYearFilter(value), [])
  const handleMonthChange = useCallback((value) => setMonthFilter(value), [])
  const handleViewModeChange = useCallback((value) => setViewMode(value), [])

  useEffect(() => {
    const firstCustomerId = customerList[0]?.[0] ?? null

    if (!selectedCustomerId && firstCustomerId) {
      setSelectedCustomerId(firstCustomerId)
      return
    }

    if (selectedCustomerId && !customerList.some(([id]) => id === selectedCustomerId)) {
      setSelectedCustomerId(firstCustomerId)
    }
  }, [customerList, selectedCustomerId])

  const selectedCustomerData = useMemo(
    () => (selectedCustomerId ? rewardSummary[selectedCustomerId] : null),
    [rewardSummary, selectedCustomerId],
  )

  const statusCard = useMemo(() => {
    if (loading) {
      return <div className="status-card">{TEXTS.loading}</div>
    }

    if (error) {
      return <div className="status-card error">{error}</div>
    }

    if (transactions.length === 0) {
      return <div className="status-card">{TEXTS.noTransactions}</div>
    }

    if (customerList.length === 0) {
      return <div className="status-card">{TEXTS.noMatchingCustomers}</div>
    }

    return null
  }, [loading, error, transactions.length, customerList.length])

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Rewards Dashboard</h1>
          <p className="subtitle">
            Browse customer rewards across multiple years. Select a customer to view monthly and
            transaction-level points.
          </p>
        </div>
      </header>

      <SearchAndSortControls
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        sortOption={sortOption}
        onSortChange={handleSortChange}
        yearFilter={yearFilter}
        onYearChange={handleYearChange}
        monthFilter={monthFilter}
        onMonthChange={handleMonthChange}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        yearOptions={availableYears}
      />

      {statusCard}

      {!statusCard && (
        <div className="dashboard-grid">
          <CustomerList
            customers={customerList}
            selectedCustomerId={selectedCustomerId}
            onSelectCustomer={setSelectedCustomerId}
          />
          <CustomerDetails
            customerId={selectedCustomerId}
            customerData={selectedCustomerData}
            recentMonths={recentMonths}
            viewMode={viewMode}
          />
        </div>
      )}
    </div>
  )
}

export default App
