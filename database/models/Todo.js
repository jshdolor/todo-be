const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Todo = sequelize.define(
        'todo',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV1,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    len: [3, 100],
                },
            },
            status: {
                type: DataTypes.ENUM,
                values: ['pending', 'completed'],
                defaultValue: 'pending',
            },
        },
        { underscored: true }
    );

    return Todo;
};
