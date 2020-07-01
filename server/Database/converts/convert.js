require("dotenv").config();
const mysql = require("mysql");
const mongoose = require("mongoose");
const Category = require("../Models/Category");

const UserGroup = require("../Models/UserGroup");
const User = require("../Models/User");
const { mongoConn, mysqlConn } = require("./db");

const convert = () => {
    //propTypes

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
