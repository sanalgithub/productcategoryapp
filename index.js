require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./server/routes/authRoutes");
const productRouter = require("./server/routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/category", productRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.error("Failed to connect to DB", error));

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
