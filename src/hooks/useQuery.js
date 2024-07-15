import { useCallback, useState } from 'react'

export const useQuery = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handler = useCallback(async (asyncFunc) => {
    setLoading(true)
    try {
      const data = await asyncFunc()
      setLoading(false)

      return data
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }, [])

  return {
    loading,
    error,
    handler,
  }
}
