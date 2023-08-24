export interface Product {
  _id: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  status: number;
  general: {
    name: string;
    attributes: Attribute[];
    sku: string;
    manufacturer: string;
    images: Image[];
    categories: string;
  };
  filterable: {
    stock: number;
    filter: Filter[];
    price: number;
    special_price: number;
    thumbnail: Image;
  };
  review_stats: {
    average_rating: number;
    review_count: number;
  };
}

export interface ProductSlice {
  products: Product[];
  product: Product | null;
  isLoading: boolean;
}

export interface Attribute {
  k: string;
  v: number | string;
  u: number | string;
}

export interface Image {
  file_name: string;
  path: string;
  cloudinary_id: string;
  date_modified: string;
}

export interface Filter {
  id: string;
  Label: string;
}