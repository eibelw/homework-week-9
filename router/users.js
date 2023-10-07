const express = require("express");
const router = express.Router();
var users = require("../database.js");

const authMiddleware = (request, response, next) => {
    console.log(request.headers);
    if (request.headers["token"] === "rahasia") {
      next();
    } else {
      response.send({ message: "Unauthorized" });
    }
  };

router.get("/", authMiddleware, (req, res) => {
  const limit = req.query.limit || 10;
  users.query(`SELECT * FROM users LIMIT $1`, [limit], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

router.get("/:id(\\d+)", authMiddleware, function (req, res) {
  var userId = req.params.id;

  console.log("Executing query for user ID:", userId);

  users.query("SELECT * FROM users WHERE id = $1", [userId], (err, result) => {
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
  const { id, email, gender, password, role } = req.body;

  console.log("Received Data:", { id, email, gender, password, role });

  if (!email || !gender || !password || !role) {
    res.status(400).json({ message: "Bad Request" });
    return;
  }

  try {
    const queryResult = await users.query(
      `
        INSERT INTO users (id, email, gender, password, role) VALUES ($1, $2, $3, $4, $5)
      `,
      [id, email, gender, password, role]
    );

    console.log("Query Result:", queryResult);

    res.json({ message: "New user created", location: `/users/${id}` });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/", authMiddleware, async (req, res) => {
  const { id, email, gender, password, role } = req.body;

  console.log("Received Data:", { id, email, gender, password, role });

  if (!id || !email || !gender || !password || !role) {
    res.status(400).json({ message: "Bad Request" });
    return;
  }

  try {
    const queryResult = await users.query(
      `
        UPDATE users 
        SET email = $2, gender = $3, password = $4, role = $5
        WHERE id = $1
      `,
      [id, email, gender, password, role]
    );

    console.log("Query Result:", queryResult);

    res.json({ message: "User updated", location: `/users/${id}` });
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
    const queryResult = await users.query(
      `
      DELETE FROM users 
      WHERE id = $1
    `,
      [id]
    );

    console.log("Query Result:", queryResult);

    res.json({ message: "User deleted" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
