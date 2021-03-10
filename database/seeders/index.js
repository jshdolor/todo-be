const { dbConnect } = require('../../startup/db');
const { sequelize } = require('../index');

const { models } = sequelize;

const todoSeeder = require('./todo');
const subtaskSeeder = require('./subtask');

module.exports = async () => {
    await dbConnect();
    await sequelize.sync();
    await todoSeeder.seeder(models.todo);
    await subtaskSeeder.seeder(models.subtask);
    console.log('Seeder done.');

    return true;
};
