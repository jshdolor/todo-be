const Joi = require('joi');
module.exports = (todo) => {
    const schema = {
        title: Joi.string().min(3).max(100),
        status: Joi.string().valid('completed', 'pending'),
    };

    return Joi.validate(todo, schema);
};
