require("dotenv").config();
const express = require("express");
const colors = require("colors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");

//Libs
const AppError = require("./Libs/AppError");

//Controller
const ErrorController = require("./Controllers/ErrorController");

const router = require("./routers");

//DB Connection
const database = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
mongoose
  .connect(database, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB connected successfully".cyan))
  .catch(console.log);

//Init server
const server = express();

// Development logging
if (process.env.NODE_ENV === "development") {
  server.use(morgan("dev"));
}
server.use(express.json());

server.use(router);

server.all("*", (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

server.use(ErrorController);

server.listen(8787, () => {
  console.log("Server running on 8787".bgBlue.black);
});
