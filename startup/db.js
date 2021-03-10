const { sequelize } = require('../database');

const dbConnect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database Connection has been established.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { dbConnect };
