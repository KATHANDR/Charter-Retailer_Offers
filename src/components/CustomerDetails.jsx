import React from 'react'
import PropTypes from 'prop-types'

// Displays the rewards detail panel for the selected customer.
function CustomerDetails({ customerId, customerData, recentMonths, viewMode }) {
  if (!customerId || !customerData) {
    return (
      <section className="customer-details empty-state">
        <h2>Select a customer to view reward details.</h2>
      </section>
    )
  }

  const customerName = customerData.customerName || customerId
  const monthsToRender = viewMode === 'all'
    ? Object.keys(customerData.monthly)
    : recentMonths.filter((month) => customerData.monthly[month])

  if (monthsToRender.length === 0) {
    return (
      <section className="customer-details empty-state">
        <h2>{customerName}</h2>
        <p>No transactions exist for the selected filters.</p>
      </section>
    )
  }

  return (
    <section className="customer-details">
      <div className="customer-details-header">
        <div>
          <h2>
            <strong>{customerName}</strong>
            <span className="customer-id"> ({customerId})</span>
          </h2>
          <p className="customer-points">
            Total points: {customerData.totalPoints.toFixed(1)} pts
          </p>
          {viewMode === 'all' && (
            <p className="customer-transactions-count">
              Total transactions: {customerData.totalTransactions}
            </p>
          )}
        </div>
      </div>

      {monthsToRender.map((month) => {
        const monthData = customerData.monthly[month]
        return (
          <div className="month-section" key={`${customerId}-${month}`}>
            <div className="month-section-header">
              <h3>{month}</h3>
              <span>{monthData.totalPoints.toFixed(1)} pts</span>
            </div>

            <div className="month-transactions">
              {monthData.transactions.map((transaction) => (
                <article
                  className="transaction-card"
                  key={`transaction-${transaction.transactionid}`}
                >
                  <div className="transaction-card-row">
                    <span className="transaction-label">Transaction ID</span>
                    <span>{transaction.transactionid}</span>
                  </div>
                  <div className="transaction-card-row">
                    <span className="transaction-label">Date</span>
                    <span>{transaction.date}</span>
                  </div>
                  <div className="transaction-card-row">
                    <span className="transaction-label">Amount</span>
                    <span>${transaction.amount.toFixed(2)}</span>
                  </div>
                  <div className="transaction-card-row transaction-points-row">
                    <span className="transaction-label">Points</span>
                    <strong>{transaction.points.toFixed(1)} pts</strong>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}

CustomerDetails.propTypes = {
  customerId: PropTypes.string,
  customerData: PropTypes.shape({
    customerName: PropTypes.string,
    totalPoints: PropTypes.number.isRequired,
    totalTransactions: PropTypes.number.isRequired,
    monthly: PropTypes.objectOf(
      PropTypes.shape({
        totalPoints: PropTypes.number.isRequired,
        transactions: PropTypes.arrayOf(
          PropTypes.shape({
            transactionid: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            points: PropTypes.number.isRequired,
          }),
        ).isRequired,
      }),
    ).isRequired,
  }),
  recentMonths: PropTypes.arrayOf(PropTypes.string).isRequired,
  viewMode: PropTypes.string.isRequired,
}

export default React.memo(CustomerDetails)
