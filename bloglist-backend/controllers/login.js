const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models");
const { SECRET } = require("../utils/config");
const { Login } = require("../models");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  const passwordCorrect = await bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    res.status(401).json({
      error: "Invalid Username or Password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);
  console.log(token);

  const login = await Login.findOne({
    where: {
      userId: user.id
    }
  })

  if (login) {
    res.send('You have already logged in')
  } else {
    await Login.create({ token: token, userId: user.id });
  }

  user.disabled = false;
  await user.save();

  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
