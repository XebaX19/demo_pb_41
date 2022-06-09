const express = require('express');
const config = require('./config/config');
const apiRouter = require('./routers/app.routers');

const app = express();

//App middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api', apiRouter);

const server = app.listen(config.PORT, () => {
    console.log(`[${config.NODE_ENV.trim()}] Using ${config.DATA_SOURCE} as project's data source`);
    console.log(`[${config.NODE_ENV.trim()}] Server is up and running on port => ${config.PORT}`);
});

server.on('error', (error) => {
    console.error('Error: ', error);
});