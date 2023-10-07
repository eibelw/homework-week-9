const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "HW9",
  password: "user",
  port: 5432,
});

module.exports = pool;
