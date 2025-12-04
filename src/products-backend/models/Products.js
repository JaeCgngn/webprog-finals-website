import { getCollection } from "../config/database.js";
import mongodb from "mongodb";

class Customer {
  constructor() {
    this.collectionName = "Products";
  }

  getCollection() {
    return getCollection(this.collectionName);
  }

  /**
   * Create a new product
   */
  async create(productData) {
    const product = {
      ...productData,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await this.getCollection().insertOne(Products);
    return { ...Products, _id: result.insertedId };
  }

  /**
   * Find product by ID
   */
  async findById(id) {
    if (!mongodb.ObjectId.isValid(id)) {
      throw new Error("Invalid product ID");
    }
    return await this.getCollection().findOne({
      _id: new mongodb.ObjectId(id),
    });
  }

  /**
   * Update product by ID
   */
  async updateById(id, updateData) {
    if (!mongodb.ObjectId.isValid(id)) {
      throw new Error("Invalid product ID");
    }

    const updateFields = {
      ...updateData,
      updated_at: new Date(),
    };

    const result = await this.getCollection().updateOne(
      { _id: new mongodb.ObjectId(id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      throw new Error("Product not found");
    }

    return await this.findById(id);
  }

  /**
   * Delete product by ID
   */
  async deleteById(id) {
    if (!mongodb.ObjectId.isValid(id)) {
      throw new Error("Invalid product ID");
    }

    const result = await this.getCollection().deleteOne({
      _id: new mongodb.ObjectId(id),
    });

    if (result.deletedCount === 0) {
      throw new Error("Product not found");
    }

    return true;
  }
}

export default new Customer();
