import {ProductRepository} from "../../core/repository/product-repository.interface";
import {Product} from "../../core/model/product";
import { Pool } from "pg";

export class PostgresProductRepository implements ProductRepository {
    constructor(private readonly pool: Pool) {}

    async save(product: Product): Promise<Product> {

        const INSERT_QUERY = `
            INSERT INTO products (name, price, category, is_visible)
            VALUES ($1, $2, $3, $4)
                RETURNING *;
        `;

        const values = [
            product.name,
            product.price,
            product.category,
            product.isVisible,
        ];

        const result = await this.pool.query(INSERT_QUERY, values);
        const row = result.rows[0];

        return new Product(
            row.id,
            row.name,
            row.price,
            row.category,
            row.is_visible
        );
    }

    delete(id: number): void {
    }

    async getAll(): Promise<Product[]> {
        const SELECT_QUERY = `
        SELECT id, name, price, category, is_visible
        FROM products;
    `;

        const result = await this.pool.query(SELECT_QUERY);

        return result.rows.map(row => new Product(
            row.id,
            row.name,
            Number(row.price),
            row.category,
            row.is_visible
        ));
    }


    update(id: number, product: Product): Promise<Product> {
        return Promise.resolve(null);
    }

}