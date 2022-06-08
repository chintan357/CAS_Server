require("dotenv").config({ path: `./config.env` });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT || 3002;

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
// const feedbackRoutes = require("./routes/feedbackRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const cookieParser = require("cookie-parser");
const {
  requireAuth,
  checkUser,
  checkAdmin,
} = require("./middleware/authMiddleware");
const app = express();

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3001",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:3001",
      "https://canteen-automation-syste-3dba0.web.app/",
    ],
  })
);

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// database connection
const dbURI = process.env.MONGO_URL;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(PORT))
  .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => res.send("Welcome to CMS API"));
app.use(authRoutes);
app.use("/product", productRoutes);
app.use("/user", userRoutes);
app.use("/feedback", feedbackRoutes);
