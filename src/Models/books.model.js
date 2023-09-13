require("dotenv").config();
const db = require("../Configs/postgre");

const getAll = () => {
  const sql = `select * from books`;
  return db.query(sql);
};

const getData = (bookName) => {
  const sql = `select * from books where book_name like $1`;
  const values = [`%${bookName}%`];
  return db.query(sql, values);
};

const insert = (bookName, author, publisher) => {
  const sql =
    "insert into books (book_name, author, publisher) values ($1, $2, $3) returning id, book_name, author, publisher";
  const values = [bookName, author, publisher];
  return db.query(sql, values);
};

const update = (bookName, author, publisher, id) => {
  const sql =
    "update books set book_name = $1, author = $2, publisher = $3, updated_at = now() where id = $4";
  const values = [bookName, author, publisher, id];
  return db.query(sql, values);
};

const del = (id) => {
  const sql = "delete from books where id = $1 returning book_name";
  const values = [id];
  return db.query(sql, values);
};

module.exports = { getAll, getData, insert, update, del };
