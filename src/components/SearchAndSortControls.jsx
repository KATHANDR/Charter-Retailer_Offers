import React from 'react'

function SearchAndSortControls({ searchQuery, onSearchChange, sortOption, onSortChange }) {
  return (
    <div className="controls">
      <div className="control-group">
        <label htmlFor="customer-search">Search</label>
        <input
          id="customer-search"
          type="search"
          value={searchQuery}
          placeholder="Search by customer ID or transaction ID"
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <div className="control-group">
        <label htmlFor="sort-customer">Sort by</label>
        <select
          id="sort-customer"
          value={sortOption}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="id-asc">Customer ID (A → Z)</option>
          <option value="id-desc">Customer ID (Z → A)</option>
          <option value="points-desc">Total points (high → low)</option>
          <option value="points-asc">Total points (low → high)</option>
        </select>
      </div>
    </div>
  )
}

export default React.memo(SearchAndSortControls)
