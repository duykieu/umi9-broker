require("dotenv").config();
const mysql = require("mysql");
const mongoose = require("mongoose");
const Category = require("../Models/Category");
const PriceModel = require("../Models/PriceModel");
const UserGroup = require("../Models/UserGroup");
const User = require("../Models/User");
const { mongoConn, mysqlConn } = require("./db");

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
};

convert();
