const express = require('express');
const router = express.Router();
const { sequelize } = require('../database');
const validate = require('../rules/todo');
const {
    models: { todo, subtask },
} = sequelize;
const { JsonSnakeCase } = require('../helpers');

router.get('/', async (req, res) => {
    const todos = await todo.findAll({
        include: [{ model: subtask, order: [['updated_at', 'DESC']] }],
        order: [['updated_at', 'DESC']],
    });
    res.send({ data: JsonSnakeCase(todos) });
});

// create todo
router.post('/', async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) {
        return next(error, req, res);
    }
    const { title } = req.body;

    const createdTodo = await todo.create({ title });

    res.send({ data: JsonSnakeCase(createdTodo) });
});

// update todo
router.put('/:todoId', async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) {
        return next(error, req, res);
    }
    const { title, status } = req.body;
    const { todoId } = req.params;

    const [updated] = await todo.update(
        { title, status },
        {
            where: {
                id: todoId,
            },
            returning: true,
        }
    );

    if (!updated) {
        throw new Error('Not Updated');
    }

    await subtask.update({ status }, { where: { todoId } });

    const targetTodo = await todo.findOne({
        where: { id: todoId },
        include: [{ model: subtask, order: [['updated_at', 'DESC']] }],
    });

    res.send({ data: JsonSnakeCase(targetTodo) });
});

// create subtask
router.post('/:todoId/subtasks', async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) {
        return next(error, req, res);
    }
    const { todoId } = req.params;

    const parentTodo = await todo.findByPk(todoId);

    if (parentTodo) {
        const { title } = req.body;
        const createdSubtask = await subtask.create({ title, todoId });
        res.send({ data: JsonSnakeCase(createdSubtask) });
    } else {
        res.send({ error: [] });
    }
});

module.exports = router;
