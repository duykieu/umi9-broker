const mongoose = require("mongoose");
console.log(require("dotenv").config());
const database = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

console.log({ database });

exports.mongoConn = mongoose
    .connect(database, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log("DB connected successfully".cyan))
    .catch(console.log);

const State = require("../../Models/State");
const City = require("../../Models/City");
const Ward = require("../../Models/Ward");
const Street = require("../../Models/Street");
const Project = require("../../Models/Project");

const fs = require("fs");
const slugify = require("slugify");

fs.readFile("./local.json", (err, data) => {
    data = JSON.parse(data);

    data.forEach(stateItem => {
        State.create(
            {
                name: stateItem.name,
                slug: slugify(stateItem.name).toLowerCase(),
                code: stateItem.code,
            },
            (error, state) => {
                if (!error) {
                    stateItem.districts.forEach(cityItem => {
                        City.create(
                            {
                                name: cityItem.name,
                                slug: slugify(cityItem.name).toLowerCase(),
                                state: state._id,
                            },
                            (error, city) => {
                                if (!error) {
                                    const wards = [];
                                    const streets = [];
                                    const projects = [];

                                    cityItem.streets.forEach(streetItem => {
                                        streets.push({
                                            name: streetItem.name,
                                            prefix: streetItem.prefix,
                                            slug: slugify(
                                                streetItem.prefix + " " + streetItem.name
                                            ).toLowerCase(),
                                            city: city._id,
                                        });
                                    });

                                    cityItem.wards.forEach(wardItem => {
                                        wards.push({
                                            name: wardItem.name,
                                            prefix: wardItem.prefix,
                                            slug: slugify(
                                                wardItem.prefix + " " + wardItem.name
                                            ).toLowerCase(),
                                            city: city._id,
                                        });
                                    });

                                    cityItem.projects.forEach(wardItem => {
                                        projects.push({
                                            name: wardItem.name,
                                            slug: slugify(wardItem.name).toLowerCase(),
                                            lat: wardItem.lat,
                                            lng: wardItem.lng,
                                            city: city._id,
                                        });
                                    });

                                    console.log({
                                        projects: projects.length,
                                        streets: streets.length,
                                        wards: wards.length,
                                    });

                                    Project.insertMany(projects, (err, docs) => {
                                        if (!err) {
                                            console.log("Seeded ", docs.length, " item");
                                        } else {
                                            console.log("Seed errors ", err);
                                        }
                                    });
                                    Street.insertMany(streets, (err, docs) => {
                                        if (!err) {
                                            console.log("Seeded ", docs.length, " item");
                                        } else {
                                            console.log("Seed errors ", err);
                                        }
                                    });
                                    Ward.insertMany(wards, (err, docs) => {
                                        if (!err) {
                                            console.log("Seeded ", docs.length, " item");
                                        } else {
                                            console.log("Seed errors ", err);
                                        }
                                    });
                                } else {
                                    console.log("Creating city error ", city);
                                }
                            }
                        );
                    });
                } else {
                    console.log("Creating state error", error);
                }
            }
        );
    });
});
