const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const dotEnv = require("dotenv");

dotEnv.config();

const productRoute = require("./routes/productRoute");
const error = require("./middlewares/errorMiddleware");

const corsOptions = {
  origin: "http://example.com",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//  Middleware
app.use(cors(corsOptions));
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.text({type: "*/*"}));
// app.use(bodyParser.urlencoded({extended: false}));

app.use("/api/products", productRoute);

// Mongoose connection using Async Await
async function dbConnection() {
  try {
    await mongoose.connect(process.env.DB_Connection);
    console.log("connected to database");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

dbConnection();

// Mongoose connection using Promise
// mongoose
//   .connect(process.env.DB_Connection)
//   .then(() => {
//     console.log("connected to database");
//     app.listen(PORT, () => {
//       console.log(`Server is running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// const db = mongoose.connection;
// db.on("error", (err) => console.log("err occured"));
// db.once("open", () => console.log("connected"));

app.get("/", (req, res) => {
  throw new Error("Fake Error");
  // res.send("Simple Node Server");
});

// Application Level Error Handling Middleware
app.use(error);
