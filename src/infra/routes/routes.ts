import { Router } from "express";
import { ProductController } from "./controllers/product-controller";
import { ProductService } from "../../core/services/product-service";
import { PostgresProductRepository } from "../repository/postgres-product-repository";
import { pool } from "../db/db";
import {PostgresPromotionRepository} from "../repository/postgres-promotion-repository";
import {PromotionService} from "../../core/services/promotion-service";
import {PromotionController} from "./controllers/promotion-controller";

const router = Router();


const productRepository = new PostgresProductRepository(pool);
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

router.get("/products", (req, res) => productController.getProducts(req, res));
router.post("/products", (req, res) => productController.saveProduct(req, res));
router.put("/products/:id", (req, res) => productController.updateProduct(req, res));
router.delete("/products/:id", (req, res) => productController.deleteProduct(req, res))

const promotionRepository = new PostgresPromotionRepository(pool);
const promotionService = new PromotionService(promotionRepository);
const promotionController = new PromotionController(promotionService);

router.get("/promotions", (req, res) => promotionController.getPromotions(req, res))
router.post("/promotions", (req, res) => promotionController.savePromotion(req, res))
router.put("/promotions/:id", (req, res) => promotionController.updatePromotion(req, res));
router.delete("/promotions/:id", (req, res) => promotionController.deletePromotion(req, res));

export default router;
