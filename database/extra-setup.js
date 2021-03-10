const applyExtraSetup = (sequelize) => {
    const { todo, subtask } = sequelize.models;
    todo.hasMany(subtask, {
        foreignKey: {
            allowNull: true,
        },
    });
    subtask.belongsTo(todo, {
        foreignKey: {
            key: 'todo_id',
        },
    });
    sequelize.sync();
};

module.exports = { applyExtraSetup };
