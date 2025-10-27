import { Request, Response } from "express";
import { ProductService} from "../../../core/product-service";

export class ProductController {

    constructor(
        private readonly productService: ProductService
    ) {
        this.productService = productService;
    }

    public getProducts(_req: Request, res: Response) {
        const message = this.productService.hello();
        return res.status(200).json({ message })
    }

}