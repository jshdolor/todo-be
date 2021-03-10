const config = require('config');

module.exports = function () {
    if (!config.get('db_credentials')) {
        throw new Error('FATAL ERROR: database credentials is not defined.');
    }
};
