require("dotenv").config();
const mongoose = require("mongoose");
const mysql = require("mysql");

const database = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
console.log({ mongoDB: database });
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
    host: "35.189.171.209",
    user: "matbangsaigon",
    password: "RbZATddX2amDuQHpOFoL3rMfkfuoQCkDyKtZHcwMbtbS",
    database: "matbangsaigon",
});
