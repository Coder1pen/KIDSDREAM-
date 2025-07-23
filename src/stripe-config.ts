export interface Product {
  id: string;
  priceId: string;
  name: string;
  description: string;
  price: number;
  mode: 'payment' | 'subscription';
  features: string[];
}

export const products: Product[] = [
  {
    id: 'premium',
    priceId: 'price_1RgEgiCowroJbPwgP7QUmTqK',
    name: 'Premium Plan',
    description: 'One-time purchase for unlimited premium stories',
    price: 9.99,
    mode: 'subscription',
    features: [
      'Unlimited stories',
      'Advanced story customization',
      'Priority story generation',
      'Text-to-speech with multiple voices',
      'Download stories in multiple formats',
      'Ad-free experience',
      'Lifetime access to premium features',
    ],
  },
];

export const getProductByPriceId = (priceId: string): Product | undefined => {
  return products.find(product => product.priceId === priceId);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};