const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
//middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));

require("dotenv").config();
const api = process.env.API_URL || "/api/v1";
//routers

const productsRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const ordersRouter = require("./routes/orders");
app.use(`${api}/products`, productsRouter);
app.use(`${api}/cart`, cartRouter);
app.use(`${api}/orders`, ordersRouter);

mongoose
  .connect(process.env.MONGO_URL)

  .then(() => {
    console.log("Database connection is ready");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
