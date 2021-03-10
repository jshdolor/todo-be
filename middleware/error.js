const responseWithError = (message = 'Something failed.', code = 500) => {
    return {
        error: {
            message,
            code,
        },
    };
};

module.exports = function (err, req, res, next) {
    if (err.isJoi) {
        return res
            .status(400)
            .send(responseWithError(err.details[0].message, 400));
    }

    res.status(500).send(responseWithError());
};
