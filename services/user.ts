import { axios } from '@/lib/axios'

export const deleteAccount = async () => {
  try {
    await axios.delete('/api/user')
    return true
  } catch (error) {
    console.error('Delete account error:', error)
    throw error
  }
}
