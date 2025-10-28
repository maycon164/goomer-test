import {PromotionRepositoryInterface} from "../repository/promotion-repository.interface";
import {Promotion} from "../model/promotion";

export class PromotionService {

    constructor(
        private readonly promotionRepository: PromotionRepositoryInterface,
    ) {}

    public async savePromotion(promotion: Promotion) {
        return await this.promotionRepository.save(promotion);
    }

    public async getAllPromotions() {
        return await this.promotionRepository.getAll();
    }
}