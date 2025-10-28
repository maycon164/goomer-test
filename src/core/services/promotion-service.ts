import {PromotionRepositoryInterface} from "../repository/promotion-repository.interface";

export class PromotionService {

    constructor(
        private readonly promotionRepository: PromotionRepositoryInterface,
    ) {}

}