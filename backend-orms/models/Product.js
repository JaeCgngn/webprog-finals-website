import { getCollection } from "../config/database.js";
import mongodb from "mongodb";

/**
 * Product Model
 */
class Product {
  constructor() {
    this.collectionName = "products";
  }

  getCollection() {
    return getCollection(this.collectionName);
  }

  async createProduct(data) {
    const collection = this.getCollection();
    const result = await collection.insertOne({
      name: data.name,
      price: data.price,
      description: data.description,
      image: data.image,
      createdAt: new Date()
    });
    return result;
  }

  async getAllProducts() {
    const collection = this.getCollection();
    return collection.find().toArray();
  }

  async getProductById(id) {
    const collection = this.getCollection();
    return collection.findOne({ _id: new mongodb.ObjectId(id) });
  }
}

export default new Product();
