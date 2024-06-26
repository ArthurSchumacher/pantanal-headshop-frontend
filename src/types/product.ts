export type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  sale: boolean;
  description: string;
  discount: number;
  image: string;
  category: {
    name: string;
  };
};

export type SingleProduct = {
  id: number;
  name: string;
  price: number;
  stock: number;
  sale: boolean;
  discount: number;
  description: string;
  image: string;
  category: {
    name: string;
  };
  amount?: number;
};

export type ProductDto = {
  name: string;
  price: string;
  description: string;
  stock: string;
  sale: string;
  discount: string;
  categoryId: string;
};

export type AllProducts = {
  products: Product[];
  totalPages: number;
};
