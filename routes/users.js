/** users routes **/

var data = [{
    name: 'user 1',
    id: '1'
}, {
    name: 'user 2',
    id: '2'
}, {
    name: 'user 3',
    id: '3'
}];


module.exports = {

    getAll: function(req, res) {
        let allusers = data;
        res.json(allusers);
    },

    getOne: function(req, res) {
        let id = req.params.id,
            user = data[0];
        res.json(user);
    },

    create: function(req, res) {
        let newuser = req.body;
        data.push(newuser);
        res.json(newuser);
    },

    update: function(req, res) {
        let updateuser = req.body,
            id = req.params.id;
        data[id] = updateuser;
        res.json(updateuser);
    },

    delete: function(req, res) {
        let id = req.params.id;
        data.splice(id, 1);
        res.json(true);
    }
};

