import {Product} from "../model/product";
import {ProductRepository} from "../repository/product-repository.interface";
import {NotFoundException} from "../exceptions/not-found.exception";

export class ProductService {

    constructor(
        private readonly productRepository: ProductRepository,
    ) {}

    public async addProduct(product: Product): Promise<Product> {
        return await this.productRepository.save(product);
    }

    public async updateProduct(productId: number, product: Partial<Product>): Promise<Product> {
        const productFound = await this.productRepository.findById(productId);

        if(productFound == null) {
            throw new NotFoundException("Product not found");
        }

        const productUpdated = productFound.update(product);

        return await this.productRepository.update(productId, productUpdated);
    }

    public async getProducts() {
        return await this.productRepository.getAll();
    }

    public hello(): string {
        return "Hello World";
    }
}