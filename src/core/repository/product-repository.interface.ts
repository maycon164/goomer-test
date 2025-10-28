import {Product} from "../model/product";

export interface ProductRepository {

    exists(productId: number): Promise<boolean>;

    findById(productId: number): Promise<Product>;

    save(product: Product): Promise<Product>;
    getAll(): Promise<Product[]>
    update(id: number, product: Product): Promise<Product>;
    delete(id: number): Promise<void>
}