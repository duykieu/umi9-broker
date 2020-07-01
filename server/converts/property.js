const { mysqlConn, mongoConn } = require("./db");
const User = require("../Models/User");
const { parseDate, phonePattern } = require("./helpers");
const Validator = require("validator");
const axios = require("axios");
const faker = require("faker");
const RegexLib = require("../Libs/regex");
const Image = require("../Models/Image");
const PriceModel = require("../Models/PriceModel");
const { get } = require("mongoose");
const { mapReduce } = require("../Models/User");
const Property = require("../Models/Property");

const getPriceModelCode = id => {
    switch (id) {
        case 1:
            return "k.m2";
        case 2:
            return "m.m2";
        case 3:
            return "m.total";
        case 4:
            return "b.total";
        case 5:
            return "usd.m2";
        case 6:
            return "usd.total";
        default:
            return "negotiation";
    }
};

axios.get("http://localhost:8888/properties").then(async ({ data }) => {
    const propertiesArr = [];
    data.forEach(item => {
        propertiesArr.push({
            category: item.type.slug,
            address: `${item.province.name}|${item.district.name}|${item.ward.name}|${item.address}|${item.street.name}`,
            addressSlug: `${item.province.slug}|${item.district.slug}|${item.ward.slug}|${item.address}|${item.street.slug}`,
            addressId: `${item.province.id}|${item.district.id}|${item.ward.id}|${item.address}|${item.street.id}`,
            width: item.horizontal,
            long: item.vertical,
            behindWidth: item.be_horizontal,
            landSize: item.land_size,
            gfa: item.gfa,
            price: item.price,
            priceModel: getPriceModelCode(item.price_type_id),
            priceOnSize: item.size_for_cal,
            numOfBeds: item.num_of_bed,
            numOfWcs: item.num_of_wc,
            description: item.note,
            images: item.images.map(image => image.imageId),
            createdUser: item.user.phoneNumber,
            updatedUser: item.user.phoneNumber,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
            firstContact: item.owner_phone_1,
            secondContact: item.owner_phone_2,
            history: item.history,
            status: !item.signing_date ? "ok" : "out",
        });
    });
    Property.insertMany(propertiesArr, (error, docs) => {
        if (!error) {
            console.log("Converted ", docs.length);
        } else {
            console.log({ error });
        }
    });
});
