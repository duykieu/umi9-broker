require("dotenv").config();
const mysql = require("mysql");
const mongoose = require("mongoose");
const Category = require("./Models/Category");
const PriceModel = require("./Models/PriceModel");
const UserGroup = require("./Models/UserGroup");
const User = require("./Models/User");

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

const mysqlConn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Kieu@123123",
    database: "matbangsaigon",
});

const getPriceModelCode = id => {
    switch (id) {
        case 1:
            return "k.m2";
        case 2:
            return "m.m2";
        case 3:
            return "m.all";
        case 4:
            return "b.all";
        case 5:
            return "usd.m2";
        case 6:
            return "usd.all";
        default:
            return "negotiation";
    }
};

const convert = () => {
    //propTypes
    mysqlConn.query("Select * from property_types", (error, docs) => {
        if (!error) {
            Category.count({}, (error, count) => {
                if (!error && !count) {
                    const arrayToInsert = [];
                    docs.forEach(doc => {
                        arrayToInsert.push({
                            name: doc.name,
                            slug: doc.slug,
                            model: doc.market_type_code,
                            orderNumber: doc.order_number,
                        });
                    });
                    Category.insertMany(arrayToInsert, (error, docs) => {
                        if (!error) console.log(`Converted ${docs.length} categories`);
                    });
                }
            });
        }
    });

    //Unit
    mysqlConn.query("Select * from price_types", (error, docs) => {
        if (!error) {
            PriceModel.count({}, (error, count) => {
                if (!error && !count) {
                    const arrayToInsert = [];
                    docs.forEach(doc => {
                        arrayToInsert.push({
                            name: doc.name,
                            orderNumber: doc.order_number,
                            code: getPriceModelCode(doc._id),
                        });
                    });
                    PriceModel.insertMany(arrayToInsert, (error, docs) => {
                        if (!error) console.log(`Converted ${docs.length} price models`);
                    });
                }
            });
        }
    });

    //User Groups
    mysqlConn.query("Select * from user_groups", (error, docs) => {
        if (!error) {
            UserGroup.count({}, (error, count) => {
                if (!error && !count) {
                    const arrayToInsert = [];
                    docs.forEach(doc => {
                        arrayToInsert.push({
                            name: doc.name,
                            code: doc.id,
                        });
                    });
                    UserGroup.insertMany(arrayToInsert, (error, docs) => {
                        if (!error) console.log(`Converted ${docs.length} user groups`);
                    });
                }
            });
        }
    });

    //Users
    mysqlConn.query("Select * from users", (error, docs) => {
        if (!error) {
            User.count({}, (error, count) => {
                if (!error && !count) {
                    const arrayToInsert = [];
                    docs.forEach(doc => {
                        arrayToInsert.push({
                            fullName: doc.name,
                            displayName: doc.display_name,
                            username: doc.phone_number,
                            email: doc.email,
                            password: doc.password,
                            passwordConfirm: doc.password,
                            mainPhoneNumber: doc.phone_number,
                            subPhoneNumber: doc.phone_number_2,
                        });
                    });
                    User.insertMany(arrayToInsert, (error, docs) => {
                        if (!error) console.log(`Converted ${docs.length} users`);
                    });
                }
            });
        }
    });
};

convert();
