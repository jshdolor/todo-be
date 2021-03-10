const snakecasekeys = require('snakecase-keys');

const JsonSnakeCase = (obj) => {
    return snakecasekeys(getDataValues(obj), { deep: true });
};

const getDataValues = (sequalizeInstance) => {
    return JSON.parse(JSON.stringify(sequalizeInstance));
};

module.exports = { JsonSnakeCase, getDataValues };
