const logoutRouter = require("express").Router();

const { Login } = require("../models");
const { tokenExtractor } = require("../utils/middleware");
const { userDisabled } = require("../utils/middleware");

logoutRouter.delete("/", tokenExtractor, userDisabled, async (req, res) => {
  const login = await Login.findOne({
    where: {
      userId: req.decodedToken.id,
    },
  });

  if (req.user) {
    req.user.disabled = true;
    await req.user.save();
  }

  await login.destroy();
  res.status(200).send("Logout");
});

module.exports = logoutRouter;
