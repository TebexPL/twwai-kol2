import bodyParser from 'body-parser';
import config from './config';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import routes from './REST/routes';

import http from 'http';
import socket from 'socket.io';

import business from "./business/business.container";

const app = express();
app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '2048kb'}));

app.use(cors());


const server = http.createServer(app);
const io = socket(server);

mongoose.connect(config.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error) => {
    if (error) {
        console.error(error);
    }
    else {
        console.info('Connect with database established');
    }
});

process.on('SIGINT', () => {
    mongoose.connection.close(function () {
        console.error('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});


routes(app);



app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


let interval = 1000;

const getApiAndEmit = async socket => {
    
       let result = await business.getParamManager().query();
       socket.emit("currentState", {"data": result});
};


io.on("connection", (socket) => {
   console.log("New client connected");

   if (interval) {
       clearInterval(interval);
   }

   interval = setInterval(async () => await getApiAndEmit(socket), 1000);

   socket.on("disconnect", () => {
       console.log("Client disconnected");
       clearInterval(interval);
   });
});

server.listen(config.port, () => console.log(`Listening on port ${config.port}`));
