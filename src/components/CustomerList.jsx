import React from 'react'
import PropTypes from 'prop-types'

// Renders the sidebar list of customers and allows selecting a customer.
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
               <span><strong>{customerData.customerName}</strong></span>
            <span>{customerid}</span>
            <div>
              <span>{customerData.totalPoints.toFixed(1)} pts</span>
            </div>
          </button>
        ))}
      </div>
    </aside>
  )
}

CustomerList.propTypes = {
  customers: PropTypes.arrayOf(PropTypes.array).isRequired,
  selectedCustomerId: PropTypes.string,
  onSelectCustomer: PropTypes.func.isRequired,
}

export default React.memo(CustomerList)
