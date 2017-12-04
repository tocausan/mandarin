/** token model **/

let jwt = require('jwt-simple'),
    moment = require('moment'),
    config = require('../config/index'),
    databaseServices = require('../services/database');


module.exports = class {

    constructor(data) {
        data && data.username ? this.generate(data) : console.log('invalid creadential');
    }

    generate(data) {
        this.username = data.username;
        this.token = jwt.encode({exp: this.expires}, config.token.secret);
        this.creation = moment.utc().format();
        this.expiration = moment.utc().add(config.token.expiration, 'days').format();

        let filter = {username: this.username};
        return databaseServices.findUpdateOrInsertOne(config.database.collections.token, filter, this);
    }

};