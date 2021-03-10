const { sequelize } = require('../../../../database');
const seeder = require('../../../../database/seeders');
const { testData } = require('../../../../database/seeders/subtask');
const Subtask = require('../../../../database/models/Subtask');

describe('model: subtask', () => {
    let model = Subtask(sequelize);
    beforeAll(async () => {
        await seeder();
    });

    it('should have and can create row', async (done) => {
        const data = await model.findByPk(testData[0].id);
        expect(data).toBeTruthy();
        done();
    });
});
