const express = require("express");
require("express-async-errors");

const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const authorsRouter = require("./controllers/authors");
const readingListsRouter = require("./controllers/readinglists");
const logoutRouter = require("./controllers/logout");

const app = express();

const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/readinglists", readingListsRouter);
app.use("/api/logout", logoutRouter);
app.use(middleware.tokenExtractor);
app.use(middleware.userDisabled);
app.use(middleware.errorHandler);
app.use(middleware.unknowndpoint);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();
