const { mysqlConn, mongoConn } = require("./db");
const PriceModel = require("../Models/PriceModel");

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
                        code: getPriceModelCode(doc.id),
                    });
                });
                PriceModel.insertMany(arrayToInsert, (error, docs) => {
                    if (!error) console.log(`Converted ${docs.length} price models`);
                });
            }
        });
    }
});
