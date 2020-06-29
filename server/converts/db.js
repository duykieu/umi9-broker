require("dotenv").config();
const mongoose = require("mongoose");
const mysql = require("mysql");

const database = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
exports.mongoConn = mongoose
    .connect(database, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log("DB connected successfully".cyan))
    .catch(console.log);

exports.mysqlConn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Kieu@123123",
    database: "nhatrungtam",
});
