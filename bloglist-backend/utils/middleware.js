const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { SECRET } = require("../utils/config");

const requestLogger = (req, res, next) => {
  console.log("Method: ", req.method);
  console.log("Path: ", req.path);
  console.log("Body: ", req.body);

  next();
};

const unknowndpoint = (req, res, next) => {
  return res.status(404).send({ error: "Unknown Endpoint" });
};

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "Malformatted id" });
  } else if (error.name === "SequelizeValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({ error: "The Username must be unique" });
  }
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (error) {
      return res.status(401).json({ error: "Token Invalid" });
    }
  } else {
    return res.status(401).json({ error: "Token Missing" });
  }
  next();
};

const userDisabled = async (req, res, next) => {
  req.user = await User.findOne({
    where: {
      id: req.decodedToken.id,
    },
  });
  next();
};

module.exports = {
  requestLogger,
  unknowndpoint,
  errorHandler,
  tokenExtractor,
  userDisabled,
};
