const acl = require('./Controllers/acl')
const mongoose = require('mongoose')
const UserGroup = require('./Models/UserGroup')
const config = require('./config')

const database = `mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`;

console.log({ database });
mongoose
    .connect(database, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log("DB connected successfully".cyan))
    .catch(console.log);

(async() => {
    const permissions = {}
    for(const screen of Object.keys(acl)) {
        for(const action of Object.keys(acl[screen])) {
            for (const userGroupCode of acl[screen][action]) {
                if(!permissions[userGroupCode]) {
                    permissions[userGroupCode] = []
                }
                permissions[userGroupCode].push(screen + action)
            }
        }
    }
    for(const userGroupCode of Object.keys(permissions)) {
        const userGroup = await UserGroup.findOne({code: userGroupCode})
        if(userGroup) {
            await UserGroup.findByIdAndUpdate(userGroup._id, {permissions: permissions[userGroupCode]})
        }
    }

})();