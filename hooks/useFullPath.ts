const API_URL = process.env.EXPO_PUBLIC_API_URL

export const useFullPath = (imageURL: string) => {
  return `${API_URL}/storage/${imageURL}`
}