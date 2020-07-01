const { mysqlConn, mongoConn } = require("./db");
const User = require("../Models/User");
const { parseDate, phonePattern } = require("./helpers");
const Validator = require("validator");
const axios = require("axios");
const faker = require("faker");
const RegexLib = require("../Libs/regex");
const Image = require("../Models/Image");
const { image } = require("faker");

axios.get("http://localhost:8888/properties").then(async ({ data }) => {
    // const users = await User.find({});
    // const usersObj = {};
    // users.forEach(user => {
    //     usersObj[user.phoneNumber] = user;
    // });
    const currentImageIds = await Image.distinct("imageId", {});

    const imagesForInsert = {};

    data.forEach(({ images }) => {
        if (images.length) {
            images.forEach(image => {
                imagesForInsert[image.imageId] = image;
            });
        }
    });

    Image.insertMany(Object.values(imagesForInsert), (error, docs) => {
        if (!error) {
            console.log("Converted ", docs.length);
        } else {
            console.log({ error });
        }
    });
});
