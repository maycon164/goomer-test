import { Request, Response } from "express";
import { ProductService} from "../../../core/services/product-service";
import { Product } from "../../../core/model/product";
import { BadRequestException } from "../../../core/exceptions/bad-request.exception";

export class ProductController {

    constructor(
        private readonly productService: ProductService
    ) {
        this.productService = productService;
    }

    public async getProducts(_req: Request, res: Response) {
        const products= await this.productService.getProducts();

        if(products.length == 0) {
            return res.status(204);
        }

        return res.status(200).json(products)
    }

    public async saveProduct(req: Request, res: Response) {
        try {

            const product = Product.createProduct(req.body);
            const savedProduct = await this.productService.addProduct(product);
            return res.status(201).json(savedProduct);

        } catch (error: any) {

            if (error instanceof BadRequestException) {
                return res.status(error.statusCode).json({ error: error.message });
            }

            console.error(error);

            return res.status(500).json({ error: "Internal server error" });
        }
    }

}