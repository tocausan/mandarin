/** translation routes **/

module.exports = {

    /** get chinese character definition **/
    getChineseToEnglish: function (req, res, next) {
        res.send(req.params.character);
    }
};

