/** error routes **/

module.exports = {
    /** error 404 **/
    error404: function (req, res, next) {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    },

    /** error 500 **/
    error500: function (req, res, next) {
        let err = new Error('Error server');
        err.status = 500;
        next(err);
    },

    /** error handler **/
    errorHandler: function (err, req, res, next) {
        console.log(err.stack);
        // display error
        res.locals.error = err.message;
        res.locals.status = err.status;
        res.status(err.status || 500)
            .json(res.locals);
    }
};
