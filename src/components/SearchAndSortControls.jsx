import React from 'react'
import PropTypes from 'prop-types'
import {
  ALL_MONTHS_VALUE,
  ALL_YEARS_VALUE,
  MONTH_SELECT_OPTIONS,
  SORT_OPTIONS,
  TEXTS,
  VIEW_MODE_OPTIONS,
} from '../constants/appConstants'

function SearchAndSortControls({
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  yearFilter,
  onYearChange,
  monthFilter,
  onMonthChange,
  viewMode,
  onViewModeChange,
  yearOptions,
}) {
  return (
    <div className="controls">
      <div className="control-group">
        <label htmlFor="customer-search">Search</label>
        <input
          id="customer-search"
          type="search"
          value={searchQuery}
          placeholder={TEXTS.searchPlaceholder}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <div className="control-group">
        <label htmlFor="year-filter">Year</label>
        <select
          id="year-filter"
          value={yearFilter}
          onChange={(event) => onYearChange(event.target.value)}
        >
          <option value={ALL_YEARS_VALUE}>All years</option>
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="month-filter">Month</label>
        <select
          id="month-filter"
          value={monthFilter}
          onChange={(event) => onMonthChange(event.target.value)}
        >
          {MONTH_SELECT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="sort-customer">Sort by</label>
        <select
          id="sort-customer"
          value={sortOption}
          onChange={(event) => onSortChange(event.target.value)}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="view-mode">View</label>
        <select
          id="view-mode"
          value={viewMode}
          onChange={(event) => onViewModeChange(event.target.value)}
        >
          {VIEW_MODE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

SearchAndSortControls.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  sortOption: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  yearFilter: PropTypes.string.isRequired,
  onYearChange: PropTypes.func.isRequired,
  monthFilter: PropTypes.string.isRequired,
  onMonthChange: PropTypes.func.isRequired,
  viewMode: PropTypes.string.isRequired,
  onViewModeChange: PropTypes.func.isRequired,
  yearOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default SearchAndSortControls
