import React from 'react'

function CustomerList({ customers, selectedCustomerId, onSelectCustomer }) {
  return (
    <aside className="customer-list-panel">
      <div className="customer-list-header">
        <h2>Customers</h2>
        <span>{customers.length} total</span>
      </div>

      <div className="customer-list-items">
        {customers.map(([customerid, customerData]) => (
          <button
            key={customerid}
            type="button"
            className={
              customerid === selectedCustomerId
                ? 'customer-list-item selected'
                : 'customer-list-item'
            }
            onClick={() => onSelectCustomer(customerid)}
          >
            <div>
              <strong>{customerid}</strong>
              <p>{customerData.totalPoints} pts</p>
            </div>
          </button>
        ))}
      </div>
    </aside>
  )
}

export default React.memo(CustomerList)
