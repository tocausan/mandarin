/** user model **/

let userRoleEnums = require('../enums/user-role');

module.exports = class {

    constructor(data) {
        this.username = data.username ? data.username : '';
        this.password = data.password ? data.password : '';
        this.role = data.role ? data.role : userRoleEnums.CLIENT;
    }
};