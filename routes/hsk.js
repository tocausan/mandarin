/** hsk routes **/

let express = require('express'),
    dictionaryItemEnum = require('../enums/dictionary-item'),
    jsonDataAccess = require('../data-access/json'),
    hskPath = process.env.PWD + '/data/hsk_*_cn-en.txt.json',
    errorRoutes = require('./errors');


module.exports = {

    /** get all hsk level **/
    getAll: function (req, res, next) {
        // get hsk level file path
        let levelFilePath = hskPath.replace('*', req.params.level);

        return jsonDataAccess.selectData(levelFilePath, dictionaryItemEnum.ALL).then((data) => {
            res.json(data);
        }, (err) => {
            res.locals.message = err;
            errorRoutes.error500(req, res, next);
        });
    },

    /** get traditional only **/
    getTraditional: function (req, res) {
        // get hsk level file path
        let levelFilePath = hskPath.replace('*', req.params.level);

        return jsonDataAccess.selectData(levelFilePath, dictionaryItemEnum.TRADITIONAL).then((data) => {
            res.json(data);
        }, (err) => {
            console.log(err);
            res.locals.message = err;
            errorRoutes.error500(req, res, next);
        });
    },

    /** get simplified only **/
    getSimplified: function (req, res) {
        // get hsk level file path
        let levelFilePath = hskPath.replace('*', req.params.level);

        return jsonDataAccess.selectData(levelFilePath, dictionaryItemEnum.SIMPLIFIED).then((data) => {
            res.json(data);
        }, (err) => {
            console.log(err);
            res.locals.message = err;
            errorRoutes.error500(req, res, next);
        });
    },

    /** get pinyin number only **/
    getPinyinNumber: function (req, res) {
        // get hsk level file path
        let levelFilePath = hskPath.replace('*', req.params.level);

        return jsonDataAccess.selectData(levelFilePath, dictionaryItemEnum.PINYIN_NUMBER).then((data) => {
            res.json(data);
        }, (err) => {
            console.log(err);
            res.locals.message = err;
            errorRoutes.error500(req, res, next);
        });
    },

    /** get pinyin tone only **/
    getPinyinTone: function (req, res) {
        // get hsk level file path
        let levelFilePath = hskPath.replace('*', req.params.level);

        return jsonDataAccess.selectData(levelFilePath, dictionaryItemEnum.PINYIN_TONE).then((data) => {
            res.json(data);
        }, (err) => {
            console.log(err);
            res.locals.message = err;
            errorRoutes.error500(req, res, next);
        });
    },

    /** get pinyin atone only **/
    getPinyinAtone: function (req, res) {
        // get hsk level file path
        let levelFilePath = hskPath.replace('*', req.params.level);

        return jsonDataAccess.selectData(levelFilePath, dictionaryItemEnum.PINYIN_ATONE).then((data) => {
            res.json(data);
        }, (err) => {
            console.log(err);
            res.locals.message = err;
            errorRoutes.error500(req, res, next);
        });
    },

    /** get translation only **/
    getTranslation: function (req, res) {
        // get hsk level file path
        let levelFilePath = hskPath.replace('*', req.params.level);

        return jsonDataAccess.selectData(levelFilePath, dictionaryItemEnum.TRANSLATION).then((data) => {
            res.json(data);
        }, (err) => {
            console.log(err);
            res.locals.message = err;
            errorRoutes.error500(req, res, next);
        });
    }

};
