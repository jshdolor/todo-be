const express = require('express');
const router = express.Router();
const { sequelize } = require('../database');
const { models } = sequelize;
const { JsonSnakeCase, getDataValues } = require('../helpers');
const validate = require('../rules/todo');

//processes should be on a separate file.. lacks time
// update subtask
router.put('/:subtaskId', async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) {
        return next(error, req, res);
    }

    const { title, status } = req.body;
    const { subtaskId } = req.params;

    const [success, targetSubtask] = await models.subtask.update(
        { title, status },
        {
            returning: true,
            where: { id: subtaskId },
        }
    );

    const [subtaskData] = getDataValues(targetSubtask);
    const { todoId } = subtaskData;
    if (!success) {
        throw new Error('Update Failed');
    }

    const subtasks = getDataValues(
        await models.subtask.findAll({
            where: { todoId },
        })
    );

    const isParentCompleted =
        subtasks.length ===
        subtasks.filter((st) => st.status === 'completed').length;

    await models.todo.update(
        { status: isParentCompleted ? 'completed' : 'pending' },
        {
            where: { id: todoId },
        }
    );

    res.send({ data: JsonSnakeCase(targetSubtask) });
});

module.exports = router;
