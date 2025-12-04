import express from "express";
import productController from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProduct);

router.get("/test", (req, res) => {
  console.log("GET /products/test hit!");
  res.json({ ok: true });
});


export default router;
