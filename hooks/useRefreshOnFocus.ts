import { useRef } from 'react'
import { useFocusEffect } from '@react-navigation/native'

export const useRefreshOnFocus = <T>(refetch: () => Promise<T>) => {
  const firstTimeRef = useRef(true)

  useFocusEffect(() => {
    if (firstTimeRef.current) {
      firstTimeRef.current = false
      return
    }

    refetch()
  })
}
