import {Product} from "../model/product";
import {Promotion} from "../model/promotion";

export interface PromotionRepositoryInterface {
    findById(productId: number): Promise<Promotion | null>;
    save(product: Product): Promise<Promotion>;
    getAll(): Promise<Promotion[]>
    update(id: number, promotion: Promotion): Promise<Promotion>;
    delete(id: number): Promise<void>
}