const { mysqlConn, mongoConn } = require("./db");
const User = require("../Models/User");
const { parseDate, phonePattern } = require("./helpers");
const Validator = require("validator");
const axios = require("axios");
const faker = require("faker");
const RegexLib = require("../Libs/regex");

axios.get("http://localhost:8888/properties").then(async ({ data }) => {
    //Creating user
    const currentAccounts = await User.distinct("phoneNumber", {});

    const userFromHostsPartners = {};

    data.forEach(item => {
        //Nhan vien
        const password = faker.internet.password();

        if (
            item.owner_phone_1 &&
            !currentAccounts.includes(item.owner_phone_1) &&
            RegexLib.phoneNumber.test(item.owner_phone_1)
        ) {
            userFromHostsPartners[item.owner_phone_1] = {
                fullName: item.owner_name_1 && item.owner_name_1,
                username: item.owner_phone_1,
                phoneNumber: item.owner_phone_1,
                email: item.owner_phone_1 + "@" + process.env.BASE_DOMAIN,
                password,
                passwordConfirm: password,
                userGroup: "host",
            };
        }
        if (
            item.owner_phone_2 &&
            !currentAccounts.includes(item.owner_phone_2) &&
            RegexLib.phoneNumber.test(item.owner_phone_2)
        ) {
            userFromHostsPartners[item.owner_phone_2] = {
                fullName: item.owner_name_2 && item.owner_name_2,
                username: item.owner_phone_2,
                phoneNumber: item.owner_phone_2,
                email: item.owner_phone_2 + "@" + process.env.BASE_DOMAIN,
                password,
                passwordConfirm: password,
                userGroup: "host",
            };
        }
    });

    console.log("Total ", Object.values(userFromHostsPartners).length, "user to insert");

    User.insertMany(Object.values(userFromHostsPartners), (error, docs) => {
        if (!error) {
            console.log("Converted ", docs.length);
        } else {
            console.log({ error });
        }
    });
});
