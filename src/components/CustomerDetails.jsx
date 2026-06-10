import React from 'react'

function CustomerDetails({ customerId, customerData, recentMonths }) {
  if (!customerId) {
    return (
      <section className="customer-details empty-state">
        <h2>Select a customer to view reward details.</h2>
      </section>
    )
  }

  const selectedMonths = recentMonths.filter((month) => customerData.monthly[month])

  if (selectedMonths.length === 0) {
    return (
      <section className="customer-details empty-state">
        <h2>{customerId}</h2>
        <p>No transactions exist for the recent months.</p>
      </section>
    )
  }

  return (
    <section className="customer-details">
      <div className="customer-details-header">
        <div>
          <h2>Customer {customerId}</h2>
          <p className="customer-points">Total points: {customerData.totalPoints} pts</p>
        </div>
      </div>

      {selectedMonths.map((month) => {
        const monthData = customerData.monthly[month]
        return (
          <div className="month-section" key={`${customerId}-${month}`}>
            <div className="month-section-header">
              <h3>{month}</h3>
              <span>{monthData.totalPoints} pts</span>
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
                    <span>${transaction.amount}</span>
                  </div>
                  <div className="transaction-card-row transaction-points-row">
                    <span className="transaction-label">Points</span>
                    <strong>{transaction.points} pts</strong>
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

export default React.memo(CustomerDetails)
