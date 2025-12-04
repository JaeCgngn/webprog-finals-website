import Product from "../models/Product.js";

class ProductController {

  async createProduct(req, res) {
    try {
      const result = await Product.createProduct(req.body);
      res.status(201).json({ message: "Product created", productId: result.insertedId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getAllProducts(req, res) {
    try {
      const products = await Product.getAllProducts();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getProduct(req, res) {
    try {
      const product = await Product.getProductById(req.params.id);
      if (!product) return res.status(404).json({ error: "Not found" });
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

}

export default new ProductController();
