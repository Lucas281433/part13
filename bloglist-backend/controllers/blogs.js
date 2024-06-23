const blogsRouter = require("express").Router();
const { Blog, User } = require("../models");
const { tokenExtractor } = require("../utils/middleware");
const { Op } = require("sequelize");
const { userDisabled } = require("../utils/middleware");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

blogsRouter.get("/", async (req, res) => {
  let where = {};

  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        },
        {
          author: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        },
      ],
    };
  }

  const blogs = await Blog.findAll({
    include: {
      model: User,
      attributes: { exclude: ["password"] },
    },
    where,
    order: [["likes", "DESC"]],
  });

  res.json(blogs);
});

blogsRouter.post("/", tokenExtractor, userDisabled, async (req, res) => {
  const { author, url, title, year } = req.body;

  if (!req.user.desabled) {
    const blog = await Blog.create({
      author,
      url,
      title,
      year,
      userId: req.decodedToken.id,
    });
    res.json(blog);
  }
});

blogsRouter.delete(
  "/:id",
  tokenExtractor,
  blogFinder,
  userDisabled,
  async (req, res) => {
    if (!(req.blog.userId === req.decodedToken.id) && req.user.disabled) {
      res.status(401).json({
        error: "Only the user who created the blog and logged in can delete it",
      });
    }
    await req.blog.destroy();
    res.status(204).end();
  }
);

blogsRouter.put("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
  }
  res.json(req.blog);
});

module.exports = blogsRouter;
