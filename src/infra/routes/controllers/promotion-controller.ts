import {Request, Response} from "express";
import {PromotionService} from "../../../core/services/promotion-service";
import {Promotion} from "../../../core/model/promotion";
import {BadRequestException} from "../../../core/exceptions/bad-request.exception";

export class PromotionController {

    constructor(private readonly promotionService: PromotionService ) {}

    public async getPromotions(req: Request, res: Response) {
        const promotions = await this.promotionService.getAllPromotions()

        if (promotions.length == 0) {
            return res.status(204).send({})
        }

        return res.status(200).json(promotions);
    }

    public async savePromotion(req: Request, res: Response) {
        const promotion = Promotion.createPromotion(req.body);
        const savedPromotion = await this.promotionService.savePromotion(promotion);
        return res.status(201).json(savedPromotion);
    }

    public async updatePromotion(_req: Request, res: Response) {
        const promotionId = Number(_req.params.id);

        if (isNaN(promotionId)) {
            throw new BadRequestException("Invalid promotions ID");
        }

        const promotion = await this.promotionService.updatePromotion(promotionId, (_req.body as Partial<Promotion>))

        return res.status(200).json(promotion);
    }

    public async deletePromotion(_req: Request, res: Response) {
        const promotionId = Number(_req.params.id);

        if (isNaN(promotionId)) {
            throw new BadRequestException("Invalid product ID");
        }

        await this.promotionService.deletePromotion(promotionId);
        return res.status(200).json({});

    }

}