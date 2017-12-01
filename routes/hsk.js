/** hsk routes **/

let express = require('express'),
    jsonServices = require('../data-access/json');


module.exports = {

    /** get hsk list by level **/
    getLevel: function (res, req) {
        let filePath = process.env.PWD + '/data/hsk/hsk_' + req.params.level + '_cn-en.txt';
        jsonServices.getJson(filePath).then((jsonData) => {
            return jsonData;
        }, (err) => {
            console.log(err);
        });
    }
};
