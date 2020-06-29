const { mysqlConn, mongoConn } = require("./db");
const User = require("../Models/User");
const { parseDate, phonePattern } = require("./helpers");
const Validator = require("validator");

const convertUserGroup = groupId => {
    switch (groupId) {
        case 1:
            return "super_adm";
        case 2:
            return "ceo";
        case 3:
            return "branch_director";
        case 4:
            return "leader";
        case 5:
            return "editor";
        case 6:
            return "staff";
        case 7:
            return "member";
        default:
            return "unknown";
    }
};

//Users
mysqlConn.query("Select * from users", (error, docs) => {
    console.log({ docs: docs.length });
    if (!error) {
        User.countDocuments({}, (error, count) => {
            if (!error && !count) {
                const arrayToInsert = [];
                const missingPhone = [];

                docs.forEach(doc => {
                    let { phone_number } = doc;

                    if (phone_number && !phone_number.startsWith("0")) {
                        phone_number = "0" + phone_number;
                    }
                    if (
                        doc.phone_number &&
                        phonePattern.test(doc.phone_number) &&
                        Validator.isEmail(doc.email) &&
                        doc.user_group_id < 7 &&
                        !arrayToInsert.map(i => i.phoneNumber).includes(phone_number)
                    ) {
                        arrayToInsert.push({
                            fullName: doc.name,
                            displayName: doc.display_name,
                            username: phone_number,
                            email: doc.email,
                            password: doc.password,
                            passwordConfirm: doc.password,
                            phoneNumber: phone_number,
                            subPhoneNumber: doc.phone_number_2 ? doc.phone_number_2 : undefined,
                            userGroup: convertUserGroup(doc.user_group_id),
                            address: doc.address,
                            idNumber: doc.id_number,
                            idIssueDate: parseDate(doc.id_issue_date),
                            idIssuePlace: doc.id_issue_place,
                        });
                    } else {
                        missingPhone.push({
                            fullName: doc.name,
                            displayName: doc.display_name,
                            username: doc.phone_number,
                            email: doc.email,
                            password: doc.password,
                            passwordConfirm: doc.password,
                            phoneNumber: doc.phone_number,
                            subPhoneNumber: doc.phone_number_2 ? doc.phone_number_2 : undefined,
                            userGroup: convertUserGroup(doc.user_group_id),
                            address: doc.address,
                            idNumber: doc.id_number,
                            idIssueDate: doc.id_issue_date,
                            idIssuePlace: doc.id_issue_place,
                        });
                    }
                });

                User.insertMany(arrayToInsert, (error, docs) => {
                    if (!error) {
                        console.log(`Converted ${docs.length} users`);
                    } else {
                        console.log({ error });
                    }
                    process.exit(1);
                });
            } else {
                console.log("Error or user exists in db", { error });
            }
        });
    } else {
        console.log({ error });
    }
});
