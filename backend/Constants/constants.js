module.exports.SUCCESS = 200;
module.exports.INTERNAL_SERVER_ERROR = 500;
module.exports.NOT_FOUND = 404;
module.exports.CREATED = 201;
module.exports.UNAUTHORIZED = 401;
module.exports.BAD_REQUEST = 400;
module.exports.ACTIVE = "Active";
module.exports.CANCELLED = "Cancelled";
module.exports.ADMIN = "admin"
module.exports.USER = "user"
module.exports.joiError = (err) => {
    const errors = []
    err.details.forEach(detail => {
        let error = {
            [detail.path]: detail.message
        }
        errors.push(error)
    })
    return errors
}