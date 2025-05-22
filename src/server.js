const express = require("express");
const http = require("http");
const {Server} = require("socket.io");
const {Pool} = require("pg");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {origin: "*"},
});
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000'  
}));

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "solar",
  password: "liza1209",
  port: 5432,
});

app.use(express.json());
app.post("/register", async (req, res) => {
  const {username, email, password} = req.body;
  const email_reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (!email_reg.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  try {
    const hashed_pass = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
      [username, email, hashed_pass]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/login", async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) return res.status(400).json({ error: "User not found" });

    const user = result.rows[0];
    if (user.is_blocked) {
      return res.status(403).json({ error: "Ваш акаунт заблоковано" });
    }  
    const is_match = await bcrypt.compare(password, user.password);
    if (!is_match) return res.status(400).json({ error: "Invalid credentials" });

    res.json({ id: user.id, username: user.username, email: user.email });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

app.get("/messages", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM messages ORDER BY timestamp ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/topics", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM topics");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/create_topic", async (req, res) => {
  const { title, description, user_id } = req.body;

  console.log("Received data:", req.body);

  if (!title) {
    console.log("Title is missing");
    return res.status(400).json({ error: "Title is required" });
  }
  if (!description) {
    console.log("Description is missing");
    return res.status(400).json({ error: "Description is required" });
  }
  if (!user_id) {
    console.log("User ID is missing");
    return res.status(400).json({ error: "User ID is required" });
  }
  try {
    const result = await pool.query(
      "INSERT INTO topics (title, content, user_id) VALUES ($1, $2, $3) RETURNING id, title, content, user_id",
      [title, description, user_id]
    );

    console.log("Topic created:", result.rows[0]);
    res.status(201).json(result.rows[0]); 
  } catch (error) {
    console.error("Error creating topic:", error);
    res.status(500).json({ error: "Failed to create topic" });
  }
});


app.get("/moonphase", async (req, res) => {
  try {
    const {startdate} = req.query;
    if (!startdate) {
      return res.status(400).json({ error: "startdate is required" });
    }

    const axios = require("axios");
    const apiUrl = `https://api.viewbits.com/v1/moonphase?startdate=${startdate}`;

    console.log("Fetching:", apiUrl); 

    const response = await axios.get(apiUrl);
    
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching moon phase:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: "Failed to fetch moon phase data" });
  }
});



io.on("connection", (socket) => {
  console.log("Користувач підключився:", socket.id);

  socket.on("sendMessage", async (msg) => {
    const {username, text} = msg;
    if (!username || !text) return;

    try {
      const result = await pool.query(
        "INSERT INTO messages (username, text) VALUES ($1, $2) RETURNING *",
        [username, text]
      );

      io.emit("newMessage", result.rows[0]); 
    } catch (err) {
      console.error("Помилка додавання повідомлення:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("Користувач вийшов:", socket.id);
  });
});

app.get("/users/:id", async (req, res) => {
  const {id} = req.params;
  console.log("Fetching user with ID:", id);
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    console.log(result.rows);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

app.get("/topics/:id", async (req, res) => {
  const {id} = req.params;
  console.log("Fetching topic with ID:", id);
  try {
    const result = await pool.query("SELECT * FROM topics WHERE id = $1", [id]);
    console.log(result.rows);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Topic not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching topic:", err);
    res.status(500).json({ error: "Failed to fetch topic" });
  }
});

app.post("/topics/:id/comments", async (req, res) => {
  const {id} = req.params;
  const {text, user_id} = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing text" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO comments (topic_id, user_id, text, created_at)
       VALUES ($1, $2, $3, NOW()) RETURNING *`,
      [id, user_id, text]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ error: "Failed to add comment" });
  }
});

app.get("/topics/:id/comments", async (req, res) => {
  const {id} = req.params;

  try {
    const result = await pool.query(
      `SELECT comments.*, users.username 
       FROM comments 
       JOIN users ON comments.user_id = users.id 
       WHERE topic_id = $1 
       ORDER BY created_at ASC`,
      [id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({error: "Failed to fetch comments"});
  }
});
app.delete("/comments/:id", async (req, res) => {
  const { user_id } = req.body;

  const result = await pool.query("SELECT username FROM users WHERE id = $1", [user_id]);
  const username = result.rows[0]?.username;

  if (username !== "admin") {
    return res.status(403).json({ error: "Недостатньо прав" });
  }

  await pool.query("DELETE FROM comments WHERE id = $1", [req.params.id]);
  res.sendStatus(200);
});
app.post("/users/:id/block", async (req, res) => {
  const { admin_id } = req.body;

  try {
    const admin = await pool.query("SELECT username FROM users WHERE id = $1", [admin_id]);
    if (admin.rows[0]?.username !== "admin") {
      return res.status(403).json({ error: "Тільки адмін може блокувати користувачів" });
    }

    await pool.query("UPDATE users SET is_blocked = TRUE WHERE id = $1", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error("Помилка при блокуванні:", err);
    res.status(500).json({ error: "Помилка сервера" });
  }
});

server.listen(3001, () => console.log("Сервер працює на порту 3001"));
console.log(app._router.stack);