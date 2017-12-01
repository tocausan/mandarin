/** user generator tool **/

let mongoDb = require('mongodb'),
    userRoleEnums = require('../enums/user-role'),
    databasePath = 'mongodb://localhost:27017/chinese-api',
    userCollection = 'users';


module.exports = {

    /** generate admin **/
    generateAdmin: function () {
        mongoDb.MongoClient.connect(databasePath, (err, db) => {
            let adminUser = {
                role: userRoleEnums.ADMIN,
                username: 'admin',
                password: 'admin'
            };

            // check if user exist
            db.collection(userCollection).find().toArray((err, result) => {
                // error
                if (err) throw err;

                if (!result.find(user => user.username = adminUser.username)) {
                    db.collection(userCollection).insertOne(adminUser, (err, result) => {
                        // error
                        if (err) throw err;

                        // generated
                        console.log('admin user generated');
                    });
                } else {
                    // already exist
                    console.log('admin user already exists');
                }

                // close
                db.close();
            })
        });
    }
};