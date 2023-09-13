const express = require("express");
const app = express();

// pasang parser untuk json dan form url encoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mainRouter = require("./src/Routers/main.router");
app.use(mainRouter);

// connect to db postgresql
const { Pool } = require("pg");

// connect to db
const db = new Pool({
  host: "localhost",
  database: "postgres",
  user: "postgres",
  password: "12345",
});

// get author
app.get("/authors", async (req, res) => {
  try {
    const sql = `select * from authors`;
    const result = await db.query(sql);
    res.status(200).json({
      msg: "Success",
      result: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

// search author
app.get("/authors/search", async (req, res) => {
  try {
    const { query } = req;
    const sql = `select * from authors where author_name like $1`;
    const values = [`%${query.author_name}%`];
    const result = await db.query(sql, values);
    res.status(200).json({
      msg: "Success",
      result: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

// insert author
app.post("/author", async (req, res) => {
  try {
    const { body } = req;
    const sql =
      "insert into authors (author_name) values ($1) returning id, author_name";
    const values = [body.author_name];
    const data = await db.query(sql, values);
    res.status(200).json({
      msg: "Data has been added!",
      result: data.rows,
    });
  } catch (error) {
    res.json({
      msg: "error",
      error,
    });
  }
});

// update author
app.patch("/author/:author_id", async (req, res) => {
  // res.send(req.params.id);
  try {
    const { body, params } = req;
    const sql =
      "update authors set author_name = $1, updated_at = now() where id = $2";
    const values = [body.author_name, params.author_id];
    await db.query(sql, values);
    res.status(200).json({
      msg: `Data has been updated!`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

// delete author
app.delete("/author/:author_id", async (req, res) => {
  try {
    const { params } = req;
    const sql = "delete from authors where id = $1 returning author_name";
    const values = [params.author_id];
    const data = await db.query(sql, values);
    res.status(200).json({
      msg: `Author ${data.rows[0].author_name} has been deleted!`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      error,
    });
  }
});

app.listen(8000, () => {
  console.log("Server is running at port 8000");
});
