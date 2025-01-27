const API_URL = 'https://dummyjson.com/products?limit=100'

export async function fetchProducts (): Promise<any> {
  try {
    const response = await fetch(API_URL)
    return await response.json()
  } catch (error) {
    console.error('Error checking authentication:', error)
    throw error
  }
}
