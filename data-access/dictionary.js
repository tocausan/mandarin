/** dictionary services **/

let config = require('../config'),
    services = require('../services'),
    Word = require('../models/Word'),
    enums = require('../enums');


module.exports = {

    /** get dictionary from database or file if not connected **/
    getDictionary: function (selection) {
        return new Promise((resolve, reject) => {
            services.database.checkConnection().then(() => {
                services.database.findAll(config.database.collections.dictionary).then(dbData => {
                    resolve(Word.selectData(dbData, selection));
                }, err => {
                    reject(err);
                });

            }, () => {
                services.file.readFileFormat(config.file.dictionary.json, enums.fileFormat.json).then(jsonData => {
                    resolve(Word.selectData(jsonData, selection));
                }, err => {
                    reject(err);
                });
            });
        });
    }

};