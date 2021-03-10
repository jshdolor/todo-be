const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');
const config = require('config');

const { dialect, database, username, password, host, logging } = config.get(
    'db_credentials'
);

const sequelize = new Sequelize(database, username, password, {
    host,
    dialect,
    logging,
});

const modelDefiners = [
    require('../database/models/Todo'),
    require('../database/models/Subtask'),
];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

applyExtraSetup(sequelize);

module.exports = { sequelize };
