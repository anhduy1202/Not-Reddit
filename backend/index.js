const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoute = require("./routes/auth");
dotenv.config();

mongoose.connect(process.env.DB_URL, () => {
  console.log("CONNECTED TO MONGO DB");
});

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

//Routes
app.use("/v1/auth", authRoute);

// app.post("/v1/update", (req, res) => {
//   setTimeout(() => {
//     res.status(200).json(req.body);
//   }, [1000]);
// });

app.listen(8000, () => {
  console.log("Server is running");
});
