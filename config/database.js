/** database config **/

module.exports = {
    path: 'mongodb://localhost:27017/chinese-api',
    collections: {
        users: 'users',
        dictionary: 'dictionary',
        hsk: 'hsk_*'
    }
};