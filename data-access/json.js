/** json data access **/

var _ = require('lodash'),
    fs = require('fs'),
    dictionaryItemEnum = require('../enums/dictionary-item'),
    fileFormatEnum = require('../enums/file-format'),
    parserServices = require('../data-service/parser');

module.exports = {

    /** Write json file **/
    writeJsonFile: function (filePath, givenData) {
        return new Promise((resolve, reject) => {
            // get file format
            let fileFormat = _.last(_.last(filePath.split('/')).split('.')),
                newFileFormat = fileFormat !== fileFormatEnum.JSON ? '.' + fileFormatEnum.JSON : '';

            // beautify code with stringify parameters
            fs.writeFileSync(path + newFileFormat, JSON.stringify(givenData, null, 4), (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    },


    /** Read json file **/
    readJsonFile: function (filePath) {
        return new Promise((resolve, reject) => {
            // get file format
            let fileFormat = _.last(_.last(filePath.split('/')).split('.'));

            // check if json file
            if (fileFormat === fileFormatEnum.JSON) {
                // read data as UTF8
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(data));
                    }
                });
            } else {
                // reject if not json file
                reject('Expected json file, cannot read ' + fileFormat + ' file');
            }
        })
    },


    /** Select data **/
    selectData: function (filePath, dataSelection) {
        return new Promise((resolve, reject) => {
            this.readJsonFile(filePath).then((data) => {

                switch (dataSelection) {
                    case dictionaryItemEnum.ALL:
                        resolve(data);
                        break;

                    case dictionaryItemEnum.TRADITIONAL:
                        resolve(data.map(item => item.traditional));
                        break;

                    case dictionaryItemEnum.SIMPLIFIED:
                        resolve(data.map(item => item.simplified));
                        break;

                    case dictionaryItemEnum.PINYIN_NUMBER:
                        resolve(data.map(item => item.pinyinNumber));
                        break;

                    case dictionaryItemEnum.PINYIN_TONE:
                        resolve(data.map(item => item.pinyinTone));
                        break;

                    case dictionaryItemEnum.PINYIN_ATONE:
                        resolve(data.map(item => item.pinyinAtone));
                        break;

                    case dictionaryItemEnum.TRANSLATION:
                        resolve(data.map(item => item.translation));
                        break;

                    default:
                        reject('Selection not valid');
                        break;
                }
            }, (err) => {
                reject(err);
            });
        })
    }
};