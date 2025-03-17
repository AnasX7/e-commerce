import { onlineManager } from '@tanstack/react-query'
import * as Network from 'expo-network'

export const useOnlineManager = () => {
  onlineManager.setEventListener((setOnline) => {
    const eventSubscription = Network.addNetworkStateListener((state) => {
      setOnline(!!state.isConnected)
    })
    return eventSubscription.remove
  })
}
