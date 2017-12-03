/** user generator tool **/

let mongoDb = require('mongodb'),
    databaseConfig = require('../config/database'),
    databaseServices = require('../services/database'),
    User = require('../classes/user'),
    userRoleEnums = require('../enums/user-role');


module.exports = {

    /** generate admin **/
    generateAdmin: function () {
        databaseServices.insertOneIfNotExist(databaseConfig.collections.users,
            new User({
                username: 'admin',
                password: 'admin',
                role: userRoleEnums.ADMIN
            }));
    }

};