export function getMonthLabel(dateString) {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', { month: 'long', year: 'numeric' })
}

export function calculateRewardPoints(amount) {
  const amountAbove100 = Math.max(amount - 100, 0)
  const amountBetween50And100 = Math.max(Math.min(amount, 100) - 50, 0)
  return amountAbove100 * 2 + amountBetween50And100
}

export function aggregateRewardsByCustomer(transactions) {
  const customers = {}

  transactions.forEach(({ customerid, transactionid, amount, date }) => {
    const month = getMonthLabel(date)
    const points = calculateRewardPoints(amount)

    if (!customers[customerid]) {
      customers[customerid] = {
        monthly: {},
        totalPoints: 0,
      }
    }

    const customerData = customers[customerid]
    if (!customerData.monthly[month]) {
      customerData.monthly[month] = {
        transactions: [],
        totalPoints: 0,
      }
    }

    customerData.monthly[month].transactions.push({
      transactionid,
      date,
      amount,
      points,
    })
    customerData.monthly[month].totalPoints += points
    customerData.totalPoints += points
  })

  return customers
}

export function getRecentMonths(transactions, count = 3) {
  const monthSet = new Set(
    transactions.map(({ date }) => getMonthLabel(date)),
  )

  return Array.from(monthSet)
    .sort((left, right) => {
      const leftDate = new Date(left)
      const rightDate = new Date(right)
      return rightDate - leftDate
    })
    .slice(0, count)
}

export function filterAndSortCustomers(rewardSummary, searchQuery, sortOption) {
  const normalizedQuery = searchQuery.trim().toLowerCase()

  const filteredCustomers = Object.entries(rewardSummary)
    .map(([customerid, customerData]) => {
      const customerMatches = customerid.toLowerCase().includes(normalizedQuery)
      const transactionsMatch = Object.values(customerData.monthly).some((monthData) =>
        monthData.transactions.some((tx) =>
          tx.transactionid.toLowerCase().includes(normalizedQuery),
        ),
      )

      if (!normalizedQuery || customerMatches || transactionsMatch) {
        return [customerid, customerData]
      }

      return null
    })
    .filter(Boolean)

  return filteredCustomers.sort(([leftId, leftData], [rightId, rightData]) => {
    if (sortOption === 'points-desc') {
      return rightData.totalPoints - leftData.totalPoints
    }
    if (sortOption === 'points-asc') {
      return leftData.totalPoints - rightData.totalPoints
    }
    if (sortOption === 'id-desc') {
      return rightId.localeCompare(leftId)
    }

    return leftId.localeCompare(rightId)
  })
}
