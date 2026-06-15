# Charter Retailer Rewards Dashboard

## Problem Statement

A retailer offers a rewards program to its customers, awarding points based on each recorded purchase.

A customer receives:

- **2 points for every dollar spent over $100** in each transaction
- **1 point for every dollar spent between $50 and $100** in each transaction

Example: $120 purchase = 2×$20 + 1×$50 = 90 points

Given a record of every transaction during a three-month period, the app calculates reward points earned for each customer per month and total.

## Features

- React JS app using Vite
- Simulates an asynchronous API call to fetch transaction data from `public/data/transactions.json`
- Search customers by `customerid` or `transactionid`
- Sort customers by ID or total reward points
- Dynamic customer dashboard with a scrollable customer sidebar
- Default display of recent three months of transactions
- Shows reward points per month, per transaction, and customer total
- Handles loading state, API errors, and no-data cases
- Supports decimal transaction amounts and negative values in reward calculation tests

## Folder Structure

- `src/App.jsx` main dashboard container
- `src/App.css`  dashboard styling and responsive layout
- `src/hooks/useTransactions.js`  custom hook for async data fetching
- `src/utils/rewardUtils.js`  reward calculation and sorting logic
- `src/components/CustomerList.jsx` customer sidebar list
- `src/components/CustomerDetails.jsx` selected customer details
- `src/components/SearchAndSortControls.jsx` search and sort controls
- `public/data/transactions.json` mock transaction data

## Running the app

```bash
npm install
npm run dev
```

Then open `http://localhost:5173/` in your browser.

## Running tests

```bash
npm test
```

## Notes

This project is intentionally written in plain React JS and follows common file naming conventions and component separation for readability and maintainability.

## UI
<img width="844" height="468" alt="image" src="https://github.com/user-attachments/assets/cab24385-70c5-477e-968f-b1494c50cfb0" />


## Tests cases

<img width="557" height="244" alt="image" src="https://github.com/user-attachments/assets/8d2c0190-8ef9-4e25-aa84-cfab618bff75" />
