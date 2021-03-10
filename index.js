const express = require('express');
const app = express();

const { dbConnect } = require('./startup/db');

const boot = async () => {
    await dbConnect();
    require('./startup/routes')(app);
    require('./startup/config')();

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.info(`Listening on port ${port}...`));
};

boot();
