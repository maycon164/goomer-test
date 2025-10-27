import {Product} from "../model/product";
import {ProductRepository} from "../repository/product-repository.interface";

export class ProductService {

    constructor(
        private readonly productRepository: ProductRepository,
    ) {}

    public async addProduct(product: Product): Promise<Product> {
        return await this.productRepository.save(product);
    }

    public hello(): string {
        return "Hello World";
    }
}