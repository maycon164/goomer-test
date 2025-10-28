import {ProductRepositoryInterface} from "../repository/product-repository.interface";
import {PromotionRepositoryInterface} from "../repository/promotion-repository.interface";
import {DAYS} from "../model/promotion";

export class MenuService {

    constructor(
        private readonly productRepository: ProductRepositoryInterface,
        private readonly promotionRepository: PromotionRepositoryInterface
    ) {
    }

    public async getMenu() {
        const products = await this.getProducts();
        const promotions = await this.getPromotions();

        const menuItems = products.map(product => {
            const menuItem = {
                name: product.name,
                category: product.category,
                price: product.price,
            }

            const promotion = promotions.find(promotion => promotion.productsIds.includes(product.id as number));

            if(promotion) {
                menuItem["promotionalPrice"] = promotion.price;
                menuItem["promotionName"] = promotion.description;
            }

            return menuItem;
        })

        return {
            name: "Menu V1",
            item: menuItems,
        }
    }

    private async getProducts() {
        const products = await this.productRepository.getAll();
        return products.filter(product => product.isVisible);
    }

    private async getPromotions() {
        const promotions = await this.promotionRepository.getAll();

        return promotions.filter(promotion => {
            if (!promotion.isActive) return false;

            const dayNames: DAYS[] = [
                DAYS.SUN,
                DAYS.MON,
                DAYS.TUE,
                DAYS.WED,
                DAYS.THU,
                DAYS.FRI,
                DAYS.SAT
            ];

            const today = new Date();
            const todayStr = dayNames[today.getDay()];

            if (!promotion.daysOfWeek.includes(todayStr)) {
                return false;
            }

            const now = today.getHours() * 60 + today.getMinutes();
            const [initHour, initMinute] = promotion.initTime.split(":").map(Number);
            const [endHour, endMinute] = promotion.endTime.split(":").map(Number);
            const initTotalMinutes = initHour * 60 + initMinute;
            const endTotalMinutes = endHour * 60 + endMinute;

            console.log(initTotalMinutes, endTotalMinutes, now);

            console.log("AQUI", now >= initTotalMinutes && now <= endTotalMinutes)

            return now >= initTotalMinutes && now <= endTotalMinutes;
        });
    }


}