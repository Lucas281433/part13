const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");

const { User, Blog } = require("../models");

usersRouter.get("/", async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["userId", "password"] },
    include: [
      {
        model: Blog,
      },
    ],
  });
  res.json(users);
});

usersRouter.get("/:id", async (req, res) => {
  let where = {}

  if (req.query.read) {
    where['$readings.readinglists.read$'] = req.query.read === 'true'
  } 

  const readingList = await User.findByPk(req.params.id, {
    attributes: { exclude: ["id", "createdAt", "updatedAt", "password"] },
    include: [
      {
        model: Blog,
        as: "readings",
        attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
        through: { attributes: ["read", "id"] },
        where,
      },
    ],
  });
  res.json(readingList);
});

usersRouter.post("/", async (req, res) => {
  const { name, username, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ username, name, password: passwordHash });
  res.json(user);
});

usersRouter.put("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    user.username = req.body.username;
    await user.save();
  }
  res.json(user);
});

module.exports = usersRouter;
