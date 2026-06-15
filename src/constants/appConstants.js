export const DEFAULT_SORT_OPTION = 'id-asc'
export const DEFAULT_YEAR_FILTER = 'all'
export const DEFAULT_MONTH_FILTER = 'all'
export const DEFAULT_VIEW_MODE = 'month'

export const ALL_YEARS_VALUE = 'all'
export const ALL_MONTHS_VALUE = 'all'

export const SORT_OPTIONS = [
  { value: 'id-asc', label: 'Customer ID (A → Z)' },
  { value: 'id-desc', label: 'Customer ID (Z → A)' },
  { value: 'points-desc', label: 'Total points (high → low)' },
  { value: 'points-asc', label: 'Total points (low → high)' },
]

export const VIEW_MODE_OPTIONS = [
      { value: 'all', label: 'All transactions' },
  { value: 'month', label: 'Monthly summary' },
]

export const MONTH_SELECT_OPTIONS = [
  { value: ALL_MONTHS_VALUE, label: 'All months' },
  { value: 'January', label: 'January' },
  { value: 'February', label: 'February' },
  { value: 'March', label: 'March' },
  { value: 'April', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'June', label: 'June' },
  { value: 'July', label: 'July' },
  { value: 'August', label: 'August' },
  { value: 'September', label: 'September' },
  { value: 'October', label: 'October' },
  { value: 'November', label: 'November' },
  { value: 'December', label: 'December' },
]

export const TEXTS = {
  dashboardTitle: 'Rewards Dashboard',
  dashboardSubtitle:
    'Browse customer rewards across multiple years. Select a customer to view monthly and transaction-level points.',
  searchPlaceholder: 'Search by customer ID, name, or transaction ID',
  loading: 'Loading transactions, please wait...',
  noTransactions: 'No transactions found.',
  noMatchingCustomers: 'No customers match your search criteria.',
}
