export interface ProductDTO {
    id: string;
    title: string;
    price: number;
    description?: string;
}

export interface Product extends ProductDTO {
    count: number;
}

export interface CreateProductDTO {
    body: Omit<Product, 'id'>
}