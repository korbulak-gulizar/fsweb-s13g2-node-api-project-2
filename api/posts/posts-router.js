// posts için gerekli routerları buraya yazın
const express = require("express");
const Posts = require("./posts-model");

const router = express.Router();

// [GET] /api/posts
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Gönderiler alınamadı" });
  }
});

// [GET] /api/posts/:id
router.get("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Gönderi bulunamadı" });
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).json({ message: "Gönderi alınamadı" });
  }
});

// [POST] /api/posts
router.post("/", async (req, res) => {
  try {
    const { title, contents } = req.body;

    if (!title || !contents) {
      return res
        .status(400)
        .json({ message: "Lütfen title ve contents alanlarını doldurun" });
    }

    const newPost = await Posts.insert({ title, contents });
    const createdPost = await Posts.findById(newPost.id);

    res.status(201).json(createdPost);
  } catch (err) {
    res.status(500).json({ message: "Gönderi oluşturulamadı" });
  }
});

// [PUT] /api/posts/:id
router.put("/:id", async (req, res) => {
  try {
    const { title, contents } = req.body;

    if (!title || !contents) {
      return res
        .status(400)
        .json({ message: "Lütfen title ve contents alanlarını doldurun" });
    }

    const existing = await Posts.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: "Gönderi bulunamadı" });
    }

    await Posts.update(req.params.id, { title, contents });
    const updated = await Posts.findById(req.params.id);

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Gönderi güncellenemedi" });
  }
});

// [DELETE] /api/posts/:id
router.delete("/:id", async (req, res) => {
  try {
    const existing = await Posts.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: "Gönderi bulunamadı" });
    }

    await Posts.remove(req.params.id);
    res.status(200).json(existing);
  } catch (err) {
    res.status(500).json({ message: "Gönderi silinemedi" });
  }
});
// [GET] /api/posts/:id/comments
router.get("/:id/comments", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Gönderi bulunamadı" });
    }

    const comments = await Posts.findPostComments(req.params.id);
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: "Yorumlar alınamadı" });
  }
});

module.exports = router;
