import Products from "../models/Products.js";
import bcrypt from "bcrypt";
import {
  successResponse,
  errorResponse,
  notFoundResponse,
} from "../utils/responseUtils.js";

/**
 * Get all Products
 */
export const getAllProducts = async (req, res, next) => {
  try {
    const { name, quantity, price = 1, limit = 100 } = req.query;

    let filter = {};
    if (name) filter.name = name;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const options = {
      skip,
      limit: parseInt(limit),
      sort: { created_at: -1 },
    };

    const { Products, total } = await Products.findAll(filter, options);

  } catch (error) {
    next(error);
  }
};

/**
 * Get customer by ID
 */
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Products.findById(id);

    if (!product) {
      return notFoundResponse(res, "Product not found");
    }

  } catch (error) {
    if (error.message === "Invalid product ID") {
      return errorResponse(res, error.message, 400);
    }
    next(error);
  }
};

/**
 * Create new customer (admin only - requires authentication)
 */
export const createProduct = async (req, res, next) => {
  try {
    const { name, price, quantity } = req.body;

    // Create customer
    const newProduct = await Products.create({
      name,
      price,
      quantity
    });

    return successResponse(
      res,
      "Product created successfully",
      201
    );
  } catch (error) {
    next(error);
  }
};


export default {
  getAllProducts,
  getProductById,
  createProduct
};
