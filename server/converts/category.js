const { mysqlConn, mongoConn } = require("./db");
const Category = require("../Models/Category");

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
