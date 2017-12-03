/** database config **/

module.exports = {
    path: 'mongodb://localhost:27017/chinese-api',
    collections: {
        users: 'users',
        token: 'tokens',
        dictionary: 'dictionary',
        hsk: 'hsk_*'
    }
};