/** error routes **/

module.exports = {

    /** error 401 invalid **/
    error401_invalid: function (req, res, next) {
        return next({
            status: 401,
            message: 'Invalid credentials'
        });
    },

    /** error 401 empty **/
    error401_empty: function (req, res, next) {
        return next({
            status: 401,
            message: 'Empty credentials'
        });
    },

    /** error 403 **/
    error403: function (req, res, next) {
        return next({
            status: 403,
            message: 'Unauthorized access'
        });
    },

    /** error 404 **/
    error404: function (req, res, next) {
        return next({
            status: 404,
            message: 'Page not found'
        });
    },

    /** error 500 **/
    error500: function (req, res, next) {
        return next({
            status: 500,
            message: 'Error server'
        });
    },

    /** error handler **/
    errorHandler: function (err, req, res, next) {
        // display error
        console.log(err);
        res.locals.error = err.message;
        res.locals.status = err.status;
        return res.status(err.status || 500)
            .json(res.locals);
    }
};
