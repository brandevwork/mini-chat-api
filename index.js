
import dotenv from 'dotenv'
// const dotenv = require('dotenv');
dotenv.config();

// const server = require('./server');
import server from './server.mjs'


// const process: NodeJS.Process;
// eslint-disable-next-line no-undef
const port = process.env.PORT || 5050;

server.listen(port, () => {
    console.log(`\n*** Server Running on port ${port}***\n`);
});

