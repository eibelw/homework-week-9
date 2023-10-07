const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const pool = require("./database.js");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var movies = require("./router/movies.js");
app.use("/movies", movies);

var users = require("./router/users.js");
app.use("/users", users);

var register = require("./router/register.js");
app.use("/register", register);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "0.1.0",
      description: "This is a simple  CRUD API application made Ewith Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./swagger/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(specs, { explorer: true }));

pool.connect((err, res) => {
  console.log(err);
  console.log("Connected");
});

app.listen(4000);
