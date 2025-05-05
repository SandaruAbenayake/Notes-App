// Load environment variables
require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);

const User = require("./models/user.model");

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

//Create Account
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Full Name is Required" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is Required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "password is Required" });
  }

  const isUser = await User.findOne({ email: email });
  if (isUser) {
    return res.json({
      error: true,
      message: "User already Exist",
    });
  }
  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();

 
  const accessToken= jwt.sign({user 
  },process.env.MONGO_URI,{expiresIn:"3600s"})

  return res.json({
    error: false,
    user,
    accessToken,
    message:"Registration Sucessful",
  });
});

app.listen(5000);

module.exports = app;

// Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection failed:", err));

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
