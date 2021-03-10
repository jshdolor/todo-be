const testData = [
    {
        id: '71a3aae0-7f43-11eb-a194-41b62cd5ec08',
        title: 'Task 1',
    },
    {
        id: '71a3d1f0-7f43-11eb-a194-41b62cd5ec08',
        title: 'Task 2',
    },
    {
        title: 'Task 3',
        status: 'completed',
    },
];

const seeder = async (Todo) => {
    await Todo.sync({ force: true });

    await Todo.bulkCreate(testData);
};

module.exports = { testData, seeder };
