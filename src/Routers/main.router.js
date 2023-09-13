const express = require("express");
const mainRouter = express.Router();

const booksRouter = require("./books/books.router");

// define main web page
// mainRouter.get("/", (req, res) => {
//   res.send("hello world");
// });

mainRouter.use("/books", booksRouter);
// mainRouter.use("/authors", bookRouter);

module.exports = mainRouter;
