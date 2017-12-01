/** dictionary routes **/

var jsonDataAccess = require('../data-access/json'),
    dictionaryItemEnum = require('../enums/dictionary-item'),
    dictionary = process.env.PWD + '/data/chinese-cedict_ts.u8.json',
    errorRoutes = require('./errors');


module.exports = {
    /** get all dictionary **/
    getAll: function (req, res, next) {
        return jsonDataAccess.selectData(dictionary, dictionaryItemEnum.ALL).then((data) => {
            res.json(data);
        }, (err) => {
            res.locals.message = err;
            errorRoutes.error500(req, res, next);
        });
    },

    /** get traditional only **/
    getTraditional: function (req, res) {
        return jsonDataAccess.selectData(dictionary, dictionaryItemEnum.TRADITIONAL).then((data) => {
            res.json(data);
        }, (err) => {
            console.log(err);
            res.locals.message = err;
            errorRoutes.error500(req, res, next);
        });
    },

    /** get simplified only **/
    getSimplified: function (req, res) {
        return jsonDataAccess.selectData(dictionary, dictionaryItemEnum.SIMPLIFIED).then((data) => {
            res.json(data);
        }, (err) => {
            console.log(err);
            res.locals.message = err;
            errorRoutes.error500(req, res, next);
        });
    },

    /** get pinyin number only **/
    getPinyinNumber: function (req, res) {
        return jsonDataAccess.selectData(dictionary, dictionaryItemEnum.PINYIN_NUMBER).then((data) => {
            res.json(data);
        }, (err) => {
            console.log(err);
            res.locals.message = err;
            errorRoutes.error500(req, res, next);
        });
    },

    /** get pinyin tone only **/
    getPinyinTone: function (req, res) {
        return jsonDataAccess.selectData(dictionary, dictionaryItemEnum.PINYIN_TONE).then((data) => {
            res.json(data);
        }, (err) => {
            console.log(err);
            res.locals.message = err;
            errorRoutes.error500(req, res, next);
        });
    },

    /** get pinyin atone only **/
    getPinyinAtone: function (req, res) {
        return jsonDataAccess.selectData(dictionary, dictionaryItemEnum.PINYIN_ATONE).then((data) => {
            res.json(data);
        }, (err) => {
            console.log(err);
            res.locals.message = err;
            errorRoutes.error500(req, res, next);
        });
    },

    /** get translation only **/
    getTranslation: function (req, res) {
        return jsonDataAccess.selectData(dictionary, dictionaryItemEnum.TRANSLATION).then((data) => {
            res.json(data);
        }, (err) => {
            console.log(err);
            res.locals.message = err;
            errorRoutes.error500(req, res, next);
        });
    }
};
