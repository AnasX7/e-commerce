import { axios } from '@/lib/axios'
import { Location } from '@/types/location'

export const fetchLocations = async () => {
  try {
    const { data } = await axios.get<Location[]>('/api/user/locations')
    return data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
    throw new Error('Failed to fetch locations')
  }
}

export const addLocation = async (location: Omit<Location, 'id' | 'username'>) => {
  try {
    const { data } = await axios.post<Location>('/api/user/location/', location)
    return data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
    throw new Error('Failed to add location')
  }
}

export const updateLocation = async (
  id: number,
  location: Partial<Location>
) => {
  try {
    const { data } = await axios.put<Location>(
      `/api/user/location/${id}`,
      location
    )
    return data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
    throw new Error('Failed to update location')
  }
}

export const deleteLocation = async (id: number) => {
  try {
    await axios.delete(`/api/user/location/${id}`)
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
    throw new Error('Failed to delete location')
  }
}
