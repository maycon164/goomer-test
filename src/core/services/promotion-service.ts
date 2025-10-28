import {PromotionRepositoryInterface} from "../repository/promotion-repository.interface";
import {Promotion} from "../model/promotion";
import {NotFoundException} from "../exceptions/not-found.exception";

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

    public async updatePromotion(promotionId: number, promotion: Partial<Promotion>) {
        const promotionFound = await this.promotionRepository.findById(promotionId);

        if(promotionFound == null) {
            throw new NotFoundException("Promotion not found");
        }

        const promotionUpdated = promotionFound.update(promotion);

        return await this.promotionRepository.update(promotionId, promotionUpdated);
    }

    public async deletePromotion(productId: number) {
        if(await this.promotionRepository.findById(productId) == null) {
            throw new NotFoundException("Promotion not found");
        }

        await this.promotionRepository.delete(productId);
    }
}