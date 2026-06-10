import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { useTransactions } from './hooks/useTransactions'
import {
  aggregateRewardsByCustomer,
  filterAndSortCustomers,
  getRecentMonths,
} from './utils/rewardUtils'
import CustomerList from './components/CustomerList'
import CustomerDetails from './components/CustomerDetails'
import SearchAndSortControls from './components/SearchAndSortControls'

function App() {
  const { transactions, loading, error } = useTransactions()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('id-asc')
  const [selectedCustomerId, setSelectedCustomerId] = useState(null)

  const rewardSummary = useMemo(
    () => aggregateRewardsByCustomer(transactions),
    [transactions],
  )

  const recentMonths = useMemo(() => getRecentMonths(transactions), [transactions])

  const customerList = useMemo(
    () => filterAndSortCustomers(rewardSummary, searchQuery, sortOption),
    [rewardSummary, searchQuery, sortOption],
  )

  useEffect(() => {
    if (!selectedCustomerId && customerList.length > 0) {
      setSelectedCustomerId(customerList[0][0])
      return
    }

    if (selectedCustomerId && !customerList.some(([id]) => id === selectedCustomerId)) {
      setSelectedCustomerId(customerList[0]?.[0] ?? null)
    }
  }, [customerList, selectedCustomerId])

  const selectedCustomerData = selectedCustomerId
    ? rewardSummary[selectedCustomerId]
    : null

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Rewards Dashboard</h1>
          <p className="subtitle">
            Browse customer rewards for the recent three months. Select a customer to view monthly
            and transaction-level points.
          </p>
        </div>
      </header>

      <SearchAndSortControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      {loading && <div className="status-card">Loading transactions, please wait...</div>}
      {error && <div className="status-card error">{error}</div>}

      {!loading && !error && transactions.length === 0 && (
        <div className="status-card">No transactions found.</div>
      )}

      {!loading && !error && customerList.length === 0 && transactions.length > 0 && (
        <div className="status-card">No customers match your search criteria.</div>
      )}

      {!loading && !error && customerList.length > 0 && (
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
          />
        </div>
      )}
    </div>
  )
}

export default App
