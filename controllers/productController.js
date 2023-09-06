const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// Get all products
const getProducts = asyncHandler(async (req, res) => {
  try {
    const productData = await Product.find();
    res.status(200).json(productData);
  } catch (error) {
    // res.status(500)
    // .json(error.message);
    res.status(500);
    throw new Error(error.message);
  }
});

// Get a single product
const getProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const productData = await Product.findById(id);
    if (!productData) {
      // return res.status(404).json({message: "No product found on this id"});
      // res.statusCode = 404;
      res.status(404);
      throw new Error("No product found on this id");
    }
    res.status(200).json(productData);
  } catch (error) {
    // res.status(500).json({message: error.message});
    // res.statusCode = 500;
    res.status(500);
    throw new Error(error.message);
  }
});

// Create a product
const createProduct = asyncHandler(async (req, res) => {
  try {
    const productData = await Product.create(req.body);
    res.status(201).send(productData);
  } catch (error) {
    // res.status(400).json({message: error.message});
    res.status(500);
    throw new Error(error.message);
  }
});

//   Update a product
const updateProduct = asyncHandler(async (req, res) => {
  const updateData = req.body;

  try {
    const productData = await Product.findByIdAndUpdate(
      req.params.id,
      updateData
    );
    if (!productData) {
      // return res.status(404).json({message: "No product found on this id"});
      res.status(404);
      throw new Error("No product found on this id");
    }
    const updatedData = await Product.findById(req.params.id);
    res.status(200).json(updatedData);
  } catch (error) {
    // res.status(400).json({message: error.message});
    res.status(500);
    throw new Error(error.message);
  }
});

//   Delete a product
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const productData = await Product.findByIdAndDelete(req.params.id);
    if (!productData) {
      // return res.status(404).json({message: "No product found on this id"});
      res.status(404);
      throw new Error("No product found on this id");
    }
    res.status(200).json({message: "Deleted successfully"});
  } catch (error) {
    // res.status(400).json({message: error.message});
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
