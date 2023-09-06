const express = require("express");
const router = express.Router();
const errorMiddleware = require("../middlewares/errorMiddleware");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

// All REST Endpoints
router.get("/", getProducts);
router.get("/:id", errorMiddleware, getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

// Router Level Error Handling Middleware
router.use(errorMiddleware);

module.exports = router;
