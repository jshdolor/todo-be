const express = require('express');
const cors = require('cors');

const error = require('../middleware/error');
const todo = require('../routes/todo');
const subtask = require('../routes/subtask');

module.exports = function (app) {
    app.use(express.json());
    app.use(cors());
    app.use('/api/v1/todos', todo);
    app.use('/api/v1/subtasks', subtask);

    app.use(error);
};
