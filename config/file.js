/** file config **/

const BASE_PATH = process.env.PWD,
    JSON_FOLDER = '/data/json';

module.exports = {
    dictionary: {
        json: BASE_PATH + JSON_FOLDER + '/chinese-cedict_ts.u8.json'
    },

    hsk: {
        json: [
            BASE_PATH + JSON_FOLDER + '/hsk_*_cn-en.txt.json',
            BASE_PATH + JSON_FOLDER + '/hsk_1_cn-en.txt.json',
            BASE_PATH + JSON_FOLDER + '/hsk_2_cn-en.txt.json',
            BASE_PATH + JSON_FOLDER + '/hsk_3_cn-en.txt.json',
            BASE_PATH + JSON_FOLDER + '/hsk_4_cn-en.txt.json',
            BASE_PATH + JSON_FOLDER + '/hsk_5_cn-en.txt.json',
            BASE_PATH + JSON_FOLDER + '/hsk_6_cn-en.txt.json'
        ]
    }
};