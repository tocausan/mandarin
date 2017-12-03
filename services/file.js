/** database services **/

let mongoDb = require('mongodb'),
    fs = require('fs');

// error messages
let errorMessage = {
    notJsonData: 'Not JSON data \n'
};

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

    /** write json file **/
    writeJsonFile: function (folder, file, data) {
        return new Promise((resolve, reject) => {
            // check if data is json
            if (JSON.stringify(data)) {
                // create folder if not exist
                if (!fs.existsSync(folder)) {
                    fs.mkdirSync(folder);
                }

                // beautify code with stringify parameters
                fs.writeFileSync(folder + file + '.json', JSON.stringify(data, null, 4), (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            } else {
                reject(errorMessage.notJsonData);
            }
        });
    }

};