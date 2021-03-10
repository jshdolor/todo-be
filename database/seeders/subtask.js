const testData = [
    {
        todoId: '71a3aae0-7f43-11eb-a194-41b62cd5ec08',
        title: 'Sub Task 1',
        id: '02e9ebd3-817a-11eb-b378-0d2b3ee42705',
    },
    {
        todoId: '71a3aae0-7f43-11eb-a194-41b62cd5ec08',
        title: 'Sub Task 2',
        status: 'completed',
    },
    {
        todoId: '71a3d1f0-7f43-11eb-a194-41b62cd5ec08',
        title: 'Sub Task 3',
    },
    {
        todoId: '71a3d1f0-7f43-11eb-a194-41b62cd5ec08',
        title: 'Sub Task 4',
    },
];

const seeder = async (Subtask) => {
    await Subtask.sync({ force: true });

    await Subtask.bulkCreate(testData);
};

module.exports = { testData, seeder };
