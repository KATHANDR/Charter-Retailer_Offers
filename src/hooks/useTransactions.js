import { useEffect, useState } from 'react'

export function useTransactions() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)

    fetch('/data/transactions.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load transaction data from API.')
        }
        return response.json()
      })
      .then((data) => {
        setTransactions(data)
      })
      .catch((loadError) => {
        setError(loadError.message || 'Failed to load reward transactions.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { transactions, loading, error }
}
