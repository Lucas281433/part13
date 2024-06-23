const readingListsRouter = require("express").Router();

const { ReadingLists } = require("../models");
const { tokenExtractor } = require("../utils/middleware");
const { userDisabled } = require("../utils/middleware");

readingListsRouter.post("/", tokenExtractor, userDisabled, async (req, res) => {
  if (!req.user.desabled) {
    const readingList = await ReadingLists.create({
      userId: req.decodedToken.id,
      blogId: req.body.blogId,
    });
    res.json(readingList);
  }
});

readingListsRouter.put(
  "/:id",
  tokenExtractor,
  userDisabled,
  async (req, res) => {
    const blog = await ReadingLists.findByPk(req.params.id);
    if (blog.userId === req.decodedToken.id && !req.user.disabled) {
      blog.read = req.body.read;
      await blog.save();
      res.json(blog);
    } else {
      res.status(401).json({
        error: "Only mark as read if you are a user of the list and logged in",
      });
    }
  }
);

readingListsRouter.delete(
  "/:id",
  tokenExtractor,
  userDisabled,
  async (req, res) => {
    const blog = await ReadingLists.findByPk(req.params.id);

    if (blog.userId === req.decodedToken.id && !req.user.disabled) {
      await blog.destroy();
      res.status(204).end();
    } else {
      res.json({
        error:
          "Only the user who logged in and created the list can delete the list",
      });
    }
  }
);

module.exports = readingListsRouter;
