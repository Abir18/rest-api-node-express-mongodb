const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = 3000;

const Product = require("./models/productModel");

//  Middleware
// app.use(bodyParser.text({type: "*/*"}));
app.use(express.json());
// app.use(bodyParser.urlencoded({extended: false}));

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.8vsmo.mongodb.net/simple_crud?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to database");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

const db = mongoose.connection;
db.on("error", (err) => console.log("err occured"));
db.once("open", () => console.log("connected"));

app.get("/", (req, res) => {
  res.send("Simple Node Server");
});

// GET All Products
app.get("/products", async (req, res) => {
  try {
    const productData = await Product.find({});
    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.get("/product/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const productData = await Product.findById(id);
    if (!productData) {
      return res.status(404).json({message: "No product found on this id"});
    }
    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

// Create a Product
app.post("/products", async (req, res) => {
  // res.status(203).send(req.body);
  try {
    const productData = await Product.create(req.body);
    res.status(201).send(productData);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

// Update a Product
app.put("/product/:id", async (req, res) => {
  const updateData = req.body;

  try {
    const productData = await Product.findByIdAndUpdate(
      req.params.id,
      updateData
    );
    if (!productData) {
      return res.status(404).json({message: "No product found on this id"});
    }
    const updatedData = await Product.findById(req.params.id);
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

// Delete a Product
app.delete("/product/:id", async (req, res) => {
  try {
    const productData = await Product.findByIdAndDelete(req.params.id);
    if (!productData) {
      return res.status(404).json({message: "No product found on this id"});
    }
    res.status(200).json(productData);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});
