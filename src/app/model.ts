export interface ISignUp {
    name: string,
    email: string,
    password: string
}

export interface ILogin {
    email: String,
    password: String
}

export interface IProducts {
    name: string,
    price: number,
    color: string,
    category: string,
    description: string,
    image: string,
    id: number,
    quantity: undefined | number,
    productId: undefined | number
}

export interface ICart {
    name: string,
    price: number,
    color: string,
    category: string,
    description: string,
    image: string,
    id: number | undefined,
    quantity: undefined | number,
    userId: number,
    productId: number
}

export interface IPriceSummary {
    price: number,
    discount:number,
    tax: number,
    delivery: number,
    total: number
}

export interface IOrder {
  email: string,
  address: string,
  contact: string,
  totalPrice: number,
  userId: number,
  id: number | undefined,
}
