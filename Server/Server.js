const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:5173", // Allow frontend requests
    methods: ["GET", "POST"],
    credentials: true
}));

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/UserLog", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Define Schema and Model
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String
});

const User = mongoose.model("User", userSchema);

// Login API
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        res.json({ success: true, user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Register New User API
app.post("/users", async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newUser = new User({ username, password, role });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
