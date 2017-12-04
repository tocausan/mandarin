/** database services **/

let mongoDb = require('mongodb'),
    fs = require('fs'),
    _ = require('lodash'),
    enums = require('../enums');


module.exports = {

    /** read file **/
    readFile: function (path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        })
    },

    /** Read certain format file **/
    readFileFormat: function (filePath, format) {
        return new Promise((resolve, reject) => {
            let fileFormat = _.last(_.last(filePath.split('/')).split('.'));

            // check if json file
            if (fileFormat === format) {
                this.readFile(filePath).then(result => {
                    switch (format) {
                        case enums.fileFormat.json:
                            resolve(JSON.parse(result));
                            break;

                        default:
                            resolve(result);
                            break;
                    }
                }, err => {
                    reject(err);
                });
            } else {
                reject('Expected ' + format + ' file, cannot read ' + fileFormat + ' file');
            }
        })
    },

    /** write json file **/
    writeJsonFile: function (folderPath, fileName, data) {
        return new Promise((resolve, reject) => {
            // check if data is json
            if (JSON.stringify(data)) {
                // create folder if not exist
                if (!fs.existsSync(folderPath)) {
                    fs.mkdirSync(folderPath);
                }

                // beautify code with stringify parameters
                fs.writeFileSync(folderPath + fileName + '.' + enums.fileFormat.json, JSON.stringify(data, null, 4), (err) => {
                    if (err) reject(err);
                    resolve(data);
                });
            } else {
                reject('Not JSON data');
            }
        });
    }

};