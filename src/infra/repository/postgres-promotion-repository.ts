import { Pool } from "pg";
import {PromotionRepositoryInterface} from "../../core/repository/promotion-repository.interface";
import {Promotion} from "../../core/model/promotion";
import {Product} from "../../core/model/product";

export class PostgresPromotionRepository implements PromotionRepositoryInterface {

    constructor(private readonly pool: Pool) {}

    delete(id: number): Promise<void> {
        return Promise.resolve(undefined);
    }

    findById(productId: number): Promise<Promotion | null> {
        return Promise.resolve(undefined);
    }

    getAll(): Promise<Promotion[]> {
        return Promise.resolve([]);
    }

    save(product: Product): Promise<Promotion> {
        return Promise.resolve(undefined);
    }

    update(id: number, promotion: Promotion): Promise<Promotion> {
        return Promise.resolve(undefined);
    }

}