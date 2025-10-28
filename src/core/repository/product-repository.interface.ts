import {Product} from "../model/product";

export interface ProductRepositoryInterface {

    exists(productId: number): Promise<boolean>;

    findById(productId: number): Promise<Product | null>;

    save(product: Product): Promise<Product>;
    getAll(): Promise<Product[]>
    update(id: number, product: Product): Promise<Product>;
    delete(id: number): Promise<void>
}