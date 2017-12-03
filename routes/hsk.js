/** hsk routes **/

let enums = require('../enums'),
    config = require('../config'),
    dataAccess = require('../data-access'),
    errorRoutes = require('./errors');


module.exports = {

    /** get all hsk level **/
    getAll: function (req, res, next) {
        return dataAccess.json.selectData(config.file.hsk.json[req.params.level], enums.dictionaryItem.ALL).then((data) => {
            res.json(data);
        }, (err) => {
            res.locals.message = err;
            errorRoutes.error500(req, res, next);
        });
    },

    /** get traditional only **/
    getTraditional: function (req, res) {
        return dataAccess.json.selectData(config.file.hsk.json[req.params.level], enums.dictionaryItem.TRADITIONAL).then((data) => {
            res.json(data);
        }, (err) => {
            console.log(err);
            res.locals.message = err;
            errorRoutes.error500(req, res, next);
        });
    },

    /** get simplified only **/
    getSimplified: function (req, res) {
        return dataAccess.json.selectData(config.file.hsk.json[req.params.level], enums.dictionaryItem.SIMPLIFIED).then((data) => {
            res.json(data);
        }, (err) => {
            console.log(err);
            res.locals.message = err;
            errorRoutes.error500(req, res, next);
        });
    },

    /** get pinyin number only **/
    getPinyinNumber: function (req, res) {
        return dataAccess.json.selectData(config.file.hsk.json[req.params.level], enums.dictionaryItem.PINYIN_NUMBER).then((data) => {
            res.json(data);
        }, (err) => {
            console.log(err);
            res.locals.message = err;
            errorRoutes.error500(req, res, next);
        });
    },

    /** get pinyin tone only **/
    getPinyinTone: function (req, res) {
        return dataAccess.json.selectData(config.file.hsk.json[req.params.level], enums.dictionaryItem.PINYIN_TONE).then((data) => {
            res.json(data);
        }, (err) => {
            console.log(err);
            res.locals.message = err;
            errorRoutes.error500(req, res, next);
        });
    },

    /** get pinyin atone only **/
    getPinyinAtone: function (req, res) {
        return dataAccess.json.selectData(config.file.hsk.json[req.params.level], enums.dictionaryItem.PINYIN_ATONE).then((data) => {
            res.json(data);
        }, (err) => {
            console.log(err);
            res.locals.message = err;
            errorRoutes.error500(req, res, next);
        });
    },

    /** get translation only **/
    getTranslation: function (req, res) {
        return jsonDataAccess.selectData(config.file.hsk.json[req.params.level], enums.dictionaryItem.TRANSLATION).then((data) => {
            res.json(data);
        }, (err) => {
            console.log(err);
            res.locals.message = err;
            errorRoutes.error500(req, res, next);
        });
    }

};
