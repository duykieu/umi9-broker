const { mysqlConn, mongoConn } = require("./db");
const User = require("../../Models/User");
const { parseDate, phonePattern } = require("./helpers");
const Validator = require("validator");
const axios = require("axios");
const faker = require("faker");
const RegexLib = require("../../Libs/regex");
const Image = require("../../Models/Image");
const PriceModel = require("../../Models/PriceModel");
const { get } = require("mongoose");
const { mapReduce } = require("../../Models/User");
const Property = require("../../Models/Property");
const State = require("../../Models/State");
const City = require("../../Models/City");
const Ward = require("../../Models/Ward");
const Street = require("../../Models/Street");

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
    //Geo

    const propertiesArr = [];
    data.forEach(async item => {
        let canInsert = true;
        const state = await State.findOne({ slug: new RegExp(item.province.slug) });
        if (!state) canInsert = false;
        const city = await City.findOne({ state: state._id, slug: new RegExp(item.district.slug) });
        if (!city) canInsert = false;
        const ward = await Ward.findOne({ city: city._id, slug: new RegExp(item.ward.slug) });
        if (!ward) canInsert = false;
        const street = await Street.findOne({ city: city._id, slug: new RegExp(item.street.slug) });
        if (!street) canInsert = false;

        // console.log(ward);
        if (canInsert) {
            Property.create(
                {
                    categorySlug: item.type.slug,
                    address: item.address || undefined,
                    state: state._id,
                    city: city._id,
                    ward: ward._id,
                    street: street._id,
                    width: item.horizontal || undefined,
                    long: item.vertical || undefined,
                    behindWidth: item.be_horizontal || undefined,
                    landSize: item.land_size || undefined,
                    gfa: item.gfa || undefined,
                    price: item.price,
                    structure: item.structure,
                    priceModelCode: getPriceModelCode(item.price_type_id),
                    priceOnSize: item.size_for_cal || undefined,
                    numOfBeds: item.num_of_bed || undefined,
                    numOfWcs: item.num_of_wc || undefined,
                    description: item.note,
                    images: item.images.map(image => image.imageId),
                    createdUserPhoneNumber: item.user.phone_number,
                    updatedUserPhoneNumber: item.user.phone_number,
                    createdAt: item.created_at,
                    updatedAt: item.updated_at,
                    firstContactPhoneNumber: item.owner_phone_1
                        ? item.owner_phone_1
                        : item.user.phone_number,
                    secondContactPhoneNumber: item.owner_phone_2,
                    history: item.history,
                    status: !item.signing_date ? "ok" : "out",
                },
                (err, doc) => {
                    console.log("Error on insert property: ", err);
                }
            );
        }
    });
});
