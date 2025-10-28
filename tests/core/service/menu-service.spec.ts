import { MenuService } from "../../../src/core/services/menu-service";
import { ProductRepositoryInterface } from "../../../src/core/repository/product-repository.interface";
import { PromotionRepositoryInterface } from "../../../src/core/repository/promotion-repository.interface";
import { Category, Product } from "../../../src/core/model/product";

describe("MenuService", () => {
    let menuService: MenuService;
    let productRepository: jest.Mocked<ProductRepositoryInterface>;
    let promotionRepository: jest.Mocked<PromotionRepositoryInterface>;

    beforeEach(() => {
        productRepository = { getAll: jest.fn() } as any;
        promotionRepository = { getAll: jest.fn() } as any;

        menuService = new MenuService(productRepository, promotionRepository);
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.clearAllMocks();
    });

    it("should return only visible products", async () => {
        productRepository.getAll.mockResolvedValue([
            new Product(1, "Burger", 10, Category.MAIN_COURSE, true),
            new Product(2, "Pizza", 20, Category.MAIN_COURSE, false),
        ]);

        promotionRepository.getAll.mockResolvedValue([]);

        const result = await menuService.getMenu();

        expect(result.item).toHaveLength(1);
        expect(result.item[0].name).toBe("Burger");
    });

});
