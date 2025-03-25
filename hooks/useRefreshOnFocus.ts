import { useRef, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'

export const useRefreshOnFocus = <T>(refetch: () => Promise<T>) => {
  const firstTimeRef = useRef(true)

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false
        return
      }

      refetch()
    }, [refetch])
  )
}
