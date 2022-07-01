const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const apiRouter = require('./routers/app.routers');

const app = express();

//App middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: `http://${config.HOST}:3000`
}));

//Routes
app.use('/api', apiRouter);

const server = app.listen(config.PORT, () => {
    console.log(`[${config.NODE_ENV.trim()}] Using ${config.DATA_SOURCE} as project's data source`);
    console.log(`[${config.NODE_ENV.trim()}] Server is up and running on port => ${config.PORT}`);
});

server.on('error', (error) => {
    console.log('There was an unexpected error in the server');
    console.error('Error: ', error);
});