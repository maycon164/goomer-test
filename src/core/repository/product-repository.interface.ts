import {Product} from "../model/product";

export interface ProductRepository {
    save(product: Product): Promise<Product>;
    getAll(): Promise<Product[]>
    update(id: number, product: Product): Promise<Product>;
    delete(id: number): void
}