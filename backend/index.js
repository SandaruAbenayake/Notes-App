require("dotenv").config(); // Load .env variables

const mongoose = require("mongoose");

// Connect to MongoDB using MONGO_URL from .env
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const User = require("./models/user.model");
const Note = require("./models/note.model");

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // Added for password hashing
const { authenticateToken } = require("./utilities");


const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// Root test route
app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

// Create Account
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({
      error: true,
      message: "Full name, email, and password are required",
    });
  }

  try {
    console.log("Checking if user already exists");
    const isUser = await User.findOne({ email });
    if (isUser) {
      console.log("User already exists");
      return res
        .status(409)
        .json({ error: true, message: "User already exists" });
    }

    console.log("Hashing password");
    const hashedPassword = await bcrypt.hash(password, 10); // Password hashing

    const user = new User({ fullName, email, password: hashedPassword });
    await user.save();

    const accessToken = jwt.sign({ user: { _id: user._id, email: user.email } }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({
      error: false,
      user: { _id: user._id, fullName: user.fullName, email: user.email },
      accessToken,
      message: "Registration Successful",
    });
  }  catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: "Server error" });
  }
});


// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: true, message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ error: true, message: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({
      error: false,
      accessToken,
      message: "Login successful",
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Server error" });
  }
});

// Add Note
app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const userId = req.userId;

  if (!title || !content) {
    return res.status(400).json({
      error: true,
      message: "Title and content are required",
    });
  }

  try {
    const note = new Note({ title, content, tags: tags || [], userId });
    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: "Server error" });
  }
});

// Edit Note
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
  const { noteId } = req.params;
  const { title, content, tags, isPinned } = req.body;
  const userId = req.user._id;

  try {
    const note = await Note.findOne({ _id: noteId, userId });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (tags !== undefined) note.tags = tags;
    if (typeof isPinned === "boolean") note.isPinned = isPinned;

    await note.save();

    return res.json({ error: false, note, message: "Note updated" });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Server error" });
  }
});

// Get All Notes
app.get("/get-all-notes", authenticateToken, async (req, res) => {
  const userId = req.user._id;

  try {
    const notes = await Note.find({ userId }).sort({ isPinned: -1 });

    return res.json({
      error: false,
      notes,
      message: "Notes retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Server error" });
  }
});

// Delete Note
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
  const { noteId } = req.params;
  const userId = req.user._id;

  try {
    const note = await Note.findOne({ _id: noteId, userId });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    await note.deleteOne();

    return res.json({ error: false, message: "Note deleted" });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Server error" });
  }
});

// Update isPinned only
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
  const { noteId } = req.params;
  const { isPinned } = req.body;
  const userId = req.user._id;

  if (typeof isPinned !== "boolean") {
    return res.status(400).json({
      error: true,
      message: "isPinned must be a boolean",
    });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId });
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    note.isPinned = isPinned;
    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note pinned state updated",
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Server error" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

module.exports = app;
