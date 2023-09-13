const {
  getAll,
  getData,
  insert,
  update,
  del,
} = require("../Models/books.model");

const getAllBooks = async (req, res) => {
  try {
    result = await getAll();
    res.status(200).json({
      msg: "Success",
      result: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
    console.log(error);
  }
};

const searchBooks = async (req, res) => {
  try {
    const { query } = req;
    const result = await getData(query.book_name);
    res.status(200).json({
      msg: "Success",
      result: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const addNewBook = async (req, res) => {
  try {
    const { body } = req;
    const data = await insert(body.book_name, body.author, body.publisher);
    res.status(200).json({
      msg: "Data has been added!",
      result: data.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "error",
      error,
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const { body, params } = req;
    const data = await update(
      body.book_name,
      body.author,
      body.publisher,
      params.book_id
    );
    // console.log(data.rowCount);
    if (data.rowCount == 0) {
      return res.status(500).json({
        msg: "Internal Server Error",
      });
    }
    res.status(200).json({
      msg: `Data has been updated!`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { params } = req;
    const data = await del(params.book_id);
    res.status(200).json({
      msg: `Book ${data.rows[0].book_name}, id = ${params.book_id} has been deleted!`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      error,
    });
  }
};

module.exports = {
  getAllBooks,
  searchBooks,
  addNewBook,
  updateBook,
  deleteBook,
};
