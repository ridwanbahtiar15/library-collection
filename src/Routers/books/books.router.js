const express = require("express");
const booksRouter = express.Router();

const {
  getAllBooks,
  searchBooks,
  addNewBook,
  updateBook,
  deleteBook,
} = require("../../Handlers/books.handler");

// get book
booksRouter.get("/", getAllBooks);

// search book
booksRouter.get("/search", searchBooks);

// insert book
booksRouter.post("/", addNewBook);

// update book
booksRouter.patch("/:book_id", updateBook);

// delete book
booksRouter.delete("/:book_id", deleteBook);

module.exports = booksRouter;
