const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
const { title } = require("process");
const PORT = process.env.PORT || 5000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "vue_crud",
});
connection.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/users", (req, res) => {
  connection.query("SELECT * FROM posts", (err, rows, fields) => {
    if (err) throw err;
    res.json(rows);
  });
});

app.get("/api/users/:id", (req, res) => {
  var id = req.params.id;

  connection.query(
    `SELECT * FROM posts WHERE id = '${id}'`,
    (err, rows, fields) => {
      if (err) throw err;

      if (rows.length > 0) {
        res.json(rows);
      } else {
        res.status(400).json({ msg: `No user ID ${id}` });
      }
    }
  );
});

app.post("/api/users", (req, res) => {
  var title = req.params.title;
  var body = req.body.body;
  var photo = req.body.photo;
  connection.query(
    `INSERT INTO posts (title, body, photo)VALUES('${title}', '${body}', '${photo}')`,
    (err, row, fields) => {
      if (err) throw err;
      res.json({ msg: "Insert" });
    }
  );
});

app.put("/api/users", (req, res) => {
  var title = req.body.title;
  var id = req.body.id;

  connection.query(
    `UPDATE posts SET title = '${title}' WHERE id = '${id}'`,
    (err, rows, fields) => {
      if (err) throw err;
      res.json({ msg: `Updated` });
    }
  );
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Test ${PORT}`);
});
