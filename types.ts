
export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Apparel' | 'Accessories' | 'Footwear';
  description: string;
  image: string;
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
