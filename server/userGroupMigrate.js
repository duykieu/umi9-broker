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
    const userGroups = [
        {
            code: 'super_adm',
            name: "Administrator"
        },
        {
            code: 'ceo',
            name: "CEO"
        },
        {
            code: 'branch_director',
            name: "Giám đốc chi nhánh"
        },
        {
            code: 'leader',
            name: "Trưởng nhóm"
        },
        {
            code: 'editor',
            name: "Thư ký"
        },
        {
            code: 'staff',
            name: "Nhân viên"
        },
        {
            code: 'partner',
            name: "Đối tác/Môi giới"
        },
        {
            code: 'host',
            name: "Chủ bất động sản"
        },
        {
            code: 'member',
            name: "Thành viên"
        },

    ]


    for(const userGroup of userGroups) {
        if(!(await UserGroup.countDocuments({code: userGroup.code}))) {
            await UserGroup.create(userGroup)
        }
    }
})();