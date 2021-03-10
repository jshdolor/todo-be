const { sequelize } = require('../../../../database');
const seeder = require('../../../../database/seeders');
const { testData } = require('../../../../database/seeders/todo');
const Todo = require('../../../../database/models/Todo');

describe('model: todo', () => {
    let model = Todo(sequelize);
    beforeAll(async () => {
        await seeder();
    });

    it('should have and can create row', async (done) => {
        const data = await model.findByPk(testData[0].id);
        expect(data).toBeTruthy();
        done();
    });
});
