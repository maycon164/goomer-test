import { Pool } from "pg";
import { PromotionRepositoryInterface } from "../../core/repository/promotion-repository.interface";
import { Promotion, DAYS } from "../../core/model/promotion";

export class PostgresPromotionRepository implements PromotionRepositoryInterface {
    constructor(private readonly pool: Pool) {}

    async save(promotion: Promotion): Promise<Promotion> {
        const query = `
            INSERT INTO promotions 
                (description, price, days_of_week, init_time, end_time, products_ids, is_active)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING ${this.returningColumns()};
        `;

        const values = this.extractValues(promotion);
        const result = await this.pool.query(query, values);
        return this.mapToPromotion(result.rows[0]);
    }

    async getAll(): Promise<Promotion[]> {
        const query = `
            SELECT ${this.returningColumns()}
            FROM promotions;
        `;

        const result = await this.pool.query(query);
        return result.rows.map(this.mapToPromotion);
    }

    async findById(id: number): Promise<Promotion | null> {
        const query = `
            SELECT ${this.returningColumns()}
            FROM promotions
            WHERE id = $1;
        `;

        const result = await this.pool.query(query, [id]);
        return result.rows.length ? this.mapToPromotion(result.rows[0]) : null;
    }

    async update(id: number, promotion: Promotion): Promise<Promotion> {
        const query = `
            UPDATE promotions
            SET 
                description = $1,
                price = $2,
                days_of_week = $3,
                init_time = $4,
                end_time = $5,
                products_ids = $6,
                is_active = $7
            WHERE id = $8
            RETURNING ${this.returningColumns()};
        `;

        const values = [...this.extractValues(promotion), id];
        const result = await this.pool.query(query, values);
        return this.mapToPromotion(result.rows[0]);
    }

    async delete(id: number): Promise<void> {
        await this.pool.query(`DELETE FROM promotions WHERE id = $1`, [id]);
    }

    private returningColumns(): string {
        return `
            id,
            description,
            price,
            days_of_week,
            TO_CHAR(init_time, 'HH24:MI') AS init_time,
            TO_CHAR(end_time, 'HH24:MI') AS end_time,
            products_ids,
            is_active
        `;
    }

    private extractValues(promotion: Promotion): any[] {
        return [
            promotion.description,
            promotion.price,
            promotion.daysOfWeek,
            promotion.initTime,
            promotion.endTime,
            promotion.productsIds,
            promotion.isActive
        ];
    }

    private mapToPromotion = (row: any): Promotion => {
        return new Promotion(
            row.id,
            row.description,
            Number(row.price),
            row.days_of_week as DAYS[],
            row.init_time,
            row.end_time,
            row.products_ids,
            row.is_active
        );
    };
}
