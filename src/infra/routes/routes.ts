import { Router } from "express";
import { ProductController } from "./controllers/product-controller";
import { ProductService } from "../../core/services/product-service";
import { PostgresProductRepository } from "../repository/postgres-product-repository";
import { pool } from "../db/db";

const router = Router();


const productRepository = new PostgresProductRepository(pool);
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

router.get("/products", (req, res) => productController.getProducts(req, res));
router.post("/products", (req, res) => productController.saveProduct(req, res));

export default router;
