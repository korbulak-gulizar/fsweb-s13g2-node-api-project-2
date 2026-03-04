// server için gerekli olanları burada ayarlayın

// posts router'ını buraya require edin ve bağlayın
const express = require("express");
const cors = require("cors");

const postsRouter = require("./posts/posts-router");

const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  res.send("<h2>Node API is running 🚀</h2>");
});

module.exports = server;
