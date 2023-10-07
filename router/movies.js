const express = require("express");
const router = express.Router();
var movies = require("../database.js");

const authMiddleware = (request, response, next) => {
  console.log(request.headers);
  if (request.headers["token"] === "rahasia") {
    next();
  } else {
    response.send({ message: "Unauthorized" });
  }
};

router.get("/", authMiddleware, (req, res) => {
  console.log("get movie list");
  const limit = req.query.limit || 10;
  movies.query(`SELECT * FROM movies LIMIT $1`, [limit], (err, result) => {
    if (err) {
      throw err;
    }
    const responseData = {
      data: result.rows,
    };
    res.send(responseData);
  });
});

router.get("/:id(\\d+)", authMiddleware, function (req, res) {
  var movieId = req.params.id;

  console.log("Executing query for movie ID:", movieId);

  movies.query("SELECT * FROM movies WHERE id = $1", [movieId], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      throw err;
    }

    if (result.rows.length == 1) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  });
});

router.post("/", authMiddleware, async (req, res) => {
  const { id, title, genres, year } = req.body;

  console.log("Received Data:", { id, title, genres, year });

  if (!title || !genres || !year.toString().match(/^[0-9]{4}$/)) {
    res.status(400).json({ message: "Bad Request" });
    return;
  }

  try {
    const queryResult = await movies.query(
      `
      INSERT INTO movies (id, title, genres, year) VALUES ($1, $2, $3, $4)
    `,
      [id, title, genres, year]
    );

    console.log("Query Result:", queryResult);

    res.json({ message: "New movie created", location: `/movies/${id}` });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/", authMiddleware, async (req, res) => {
  const { id, title, genres, year } = req.body;

  console.log("Received Data:", { id, title, genres, year });

  if (!id || !title || !genres || !year.toString().match(/^[0-9]{4}$/)) {
    res.status(400).json({ message: "Bad Request" });
    return;
  }

  try {
    const queryResult = await movies.query(
      `
      UPDATE movies 
      SET title = $2, genres = $3, year = $4
      WHERE id = $1
    `,
      [id, title, genres, year]
    );

    console.log("Query Result:", queryResult);

    res.json({ message: "Movie updated", location: `/movies/${id}` });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.body;

  console.log("Received Data:", { id });

  if (!id) {
    res.status(400).json({ message: "Bad Request" });
    return;
  }

  try {
    const queryResult = await movies.query(
      `
      DELETE FROM movies 
      WHERE id = $1
    `,
      [id]
    );

    console.log("Query Result:", queryResult);

    res.json({ message: "Movie deleted" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
