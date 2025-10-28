import {ProductRepositoryInterface} from "../../core/repository/product-repository.interface";
import {Product} from "../../core/model/product";
import { Pool } from "pg";

export class PostgresProductRepository implements ProductRepositoryInterface {
    constructor(private readonly pool: Pool) {}

    async findById(productId: number): Promise<Product | null> {
        const SELECT_QUERY = `
        SELECT id, name, price, category, is_visible
        FROM products
        WHERE id = $1
        LIMIT 1;
    `;

        const result = await this.pool.query(SELECT_QUERY, [productId]);

        if (result.rowCount === 0) {
            return null;
        }

        const row = result.rows[0];

        return new Product(
            row.id,
            row.name,
            Number(row.price),
            row.category,
            row.is_visible
        );
    }

    async exists(productId: number): Promise<boolean> {

        const result = await this.pool.query(
            `SELECT 1 FROM products WHERE id = $1 LIMIT 1`,
            [productId]
        );

        return result.rowCount > 0;
    }

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

    async delete(id: number): Promise<void> {
        const DELETE_QUERY = `
        DELETE FROM products
        WHERE id = $1
    `;
        await this.pool.query(DELETE_QUERY, [id]);
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


    async update(id: number, product: Product): Promise<Product> {
        const UPDATE_QUERY = `
        UPDATE products
        SET name = $1,
            price = $2,
            category = $3,
            is_visible = $4
        WHERE id = $5
        RETURNING *;
    `;

        const values = [
            product.name,
            product.price,
            product.category,
            product.isVisible,
            id
        ];

        const result = await this.pool.query(UPDATE_QUERY, values);

        const row = result.rows[0];
        return new Product(
            row.id,
            row.name,
            Number(row.price),
            row.category,
            row.is_visible
        );
    }

}