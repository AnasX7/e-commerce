import { ProductItem } from '@/types/product'

export const mockProducts: ProductItem[] = [
  {
    productID: '1',
    name: 'سماعات ايربودز برو ٢',
    storeName: 'متجر آبل',
    price: 999,
    currency: 'AED',
    discount: 15,
    averageRating: 4.5,
    isLiked: false,
    image: 'https://picsum.photos/id/12/200/200',
  },
  {
    productID: '2',
    name: 'ايفون ١٥ برو ماكس',
    storeName: 'متجر آبل',
    price: 4999,
    currency: 'AED',
    discount: 0,
    averageRating: 5,
    isLiked: true,
    image: 'https://picsum.photos/id/18/200/200',
  },
  {
    productID: '3',
    name: 'ساعة آبل الإصدار ٩',
    storeName: 'متجر آبل',
    price: 1599,
    currency: 'YER',
    discount: 20,
    averageRating: 4.2,
    isLiked: false,
    image: 'https://picsum.photos/id/26/200/200',
  },
  {
    productID: '4',
    name: 'ماك بوك برو ١٦ انش',
    storeName: 'متجر آبل',
    price: 7999,
    currency: 'SAR',
    discount: 10,
    averageRating: 4.8,
    isLiked: false,
    image: 'https://picsum.photos/id/48/200/200',
  },
  {
    productID: '5',
    name: 'آيباد برو ١٢.٩ انش',
    storeName: 'متجر آبل',
    price: 3999,
    currency: 'SAR',
    discount: 5,
    averageRating: 4.6,
    isLiked: true,
    image: 'https://picsum.photos/id/69/200/200',
  },
]

// Popular products subset
export const popularProducts = mockProducts.slice(0, 3)

// New arrivals subset
export const newProducts = mockProducts.slice(2, 5)
