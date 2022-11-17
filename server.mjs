import express from 'express';
import helmet from 'helmet'
import cors from 'cors'


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());


server.get('/', logger, (req, res) => {
    res.send(`<h2>Server is Live! </h2>`);
})



// Middleware


function logger(req, res, next) {
    console.log(
        `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
            'Origin',
        )}`,
    );

    next();
}

export default server;