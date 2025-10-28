import { ProductRepositoryInterface } from "../../../src/core/repository/product-repository.interface";
import { Product } from "../../../src/core/model/product";
import { NotFoundException } from "../../../src/core/exceptions/not-found.exception";
import { Category } from "../../../src/core/model/product";
import {ProductService} from "../../../src/core/services/product-service";

describe("ProductService", () => {
    let productRepository: jest.Mocked<ProductRepositoryInterface>;
    let productService: ProductService;
    let mockProduct: Product;

    beforeEach(() => {
        productRepository = {
            save: jest.fn(),
            getAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            exists: jest.fn(),
        } as unknown as jest.Mocked<ProductRepositoryInterface>;

        productService = new ProductService(productRepository);

        mockProduct = new Product(1, "Pizza", 50, Category.MAIN_COURSE, true);
    });

    it("should save a product successfully", async () => {
        productRepository.save.mockResolvedValue(mockProduct);

        const result = await productService.addProduct(mockProduct);

        expect(result).toEqual(mockProduct);
        expect(productRepository.save).toHaveBeenCalledWith(mockProduct);
    });

    it("should return all products", async () => {
        productRepository.getAll.mockResolvedValue([mockProduct]);

        const result = await productService.getProducts();

        expect(result).toHaveLength(1);
        expect(result[0]).toBe(mockProduct);
        expect(productRepository.getAll).toHaveBeenCalled();
    });

    it("should update a product successfully", async () => {
        const updatedData = { price: 60 };
        const updatedProduct = new Product(1, "Pizza", 60, Category.MAIN_COURSE, true);

        jest.spyOn(mockProduct, "update").mockReturnValue(updatedProduct);
        productRepository.findById.mockResolvedValue(mockProduct);
        productRepository.update.mockResolvedValue(updatedProduct);

        const result = await productService.updateProduct(1, updatedData);

        expect(productRepository.findById).toHaveBeenCalledWith(1);
        expect(productRepository.update).toHaveBeenCalledWith(1, updatedProduct);
        expect(result).toEqual(updatedProduct);
    });

    it("should throw NotFoundException when updating a non-existent product", async () => {
        productRepository.findById.mockResolvedValue(null);

        await expect(
            productService.updateProduct(99, { name: "Not exist" })
        ).rejects.toThrow(NotFoundException);

        expect(productRepository.findById).toHaveBeenCalledWith(99);
    });

    it("should delete a product when it exists", async () => {
        productRepository.exists.mockResolvedValue(true);
        productRepository.delete.mockResolvedValue();

        await productService.deleteProduct(1);

        expect(productRepository.exists).toHaveBeenCalledWith(1);
        expect(productRepository.delete).toHaveBeenCalledWith(1);
    });

    it("should throw NotFoundException when deleting a non-existent product", async () => {
        productRepository.exists.mockResolvedValue(false);

        await expect(productService.deleteProduct(999)).rejects.toThrow(NotFoundException);

        expect(productRepository.exists).toHaveBeenCalledWith(999);
    });

    it("should return Hello World", () => {
        expect(productService.hello()).toBe("Hello World");
    });
});
