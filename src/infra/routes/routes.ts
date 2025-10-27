import { Router } from "express";
import {ProductController} from "./controllers/product-controller";
import {ProductService} from "../../core/product-service";

const router = Router();

const productService = new ProductService();
const productController = new ProductController(productService);

router.get("/users", (req, res) => productController.getProducts(req, res));


export default router;
