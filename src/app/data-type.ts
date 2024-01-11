export interface signUp {
  name: string;
  email: string;
  password: string;
}
export interface login {
  email: String;
  password: String;
}

export interface product {
  description: string;
  product_status: boolean;
  stock_quantity: number;
  images: any;
  price_per_piece: any;
  status: number;
  product_name: string;
  imageUrl: any;
  name: string,
  price: number,
  category: string,
  color: string,
  image: string,
  id: number,
  quantity: undefined | number,
  productId: undefined | number
}
export interface cart {
  name: string,
  price: number,
  category: string,
  color: string,
  image: string,
  description: string,
  id: number | undefined,
  quantity: undefined | number,
  productId: number,
  userId: number
}


export interface order {
  email: string,
  address: string,
  contact: string,
  totalPrice: number,
  userId: string,
  id: number | undefined
}

export interface Address {
  id: number;
  fullname: string;
  address: string;
  postalcode: number;
  phone: string;
  createdAt: string;
  updatedAt: string;
  user_id: number;
}

export interface User {
  id: number;
  username: string;
  password_hash: string;
  mail: string;
  name: string;
  fullname: string;
  createdAt: string;
  updatedAt: string;
  roles_id: number;
  addresses: Address[];
}
