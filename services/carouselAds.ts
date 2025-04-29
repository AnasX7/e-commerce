import { axios } from '@/lib/axios'

export const fetchCarouselAds = async () => {
  try {
    const response = await axios.get('/api/banners')
    // console.log('response:', response.data)
    return response.data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
    throw new Error('Failed to fetch Carousel Ads')
  }
}
