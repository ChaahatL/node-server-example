// const http = require('http');
// const fs = require('fs');

// const requestHandler = (req, res) => {
//     console.log('server hit!');
//     console.log(req.url);
//     if(req.url == '/page'){
//         res.setHeader('Content-Type', 'text/html')
//         res.end('<h1>Hello Page</h1>');
//     } else {
//         res.end(JSON.stringify({message: "Hello World!"}))
//     }   
// }

// const server = http.createServer(requestHandler);
// var port = 3000;
// var host = "localhost"
// server.listen(port, host, () => {
//     console.log(`server started at ${host}:${port}`);
// });

const express = require('express');
const app = express();
const postRouter = require('./controller/posts');
const cors = require('cors');
const users = require('./users.json');
const jwt = require('jsonwebtoken');

const getAllBlogsById = require('./dao/blogs');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');

const logger = require('./config/log')
const authentication = require('./auth/authentication')
// const bcrypt = require('bcryptjs')

const dotenv = require('dotenv')
dotenv.config()

// mongoose.connect('mongodb+srv://chaahatl:Mongodb30@cluster0.bujvc.mongodb.net/chahatblogs?retryWrites=true&w=majority&appName=Cluster0')
mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then((mongoose) => {
    console.log('MongoDB Connected')
}).catch(err => (console.log(err)))

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log('Application Middleware hit!');
    next();
})

app.post('/login',(req, res) => {
    var user = users.find(u => u.username == req.body.username && req.body.password == u.password);
    if(user){
        logger.info(`User found for username: ${req.body.username}`);
        var token  = jwt.sign({username: user.username, role:user.role}, process.env.JWT_SIGN_SECRET);
        res.send(token);
    } else {
        logger.error(`Username: ${req.body.username} was not found!`)
        res.status(401).send("Auth Failed");
    }
})

app.use('/posts', authentication, postRouter);
// app.use('/users', userRouter);
// getAllBlogsById(12);

app.listen(3000, () => {
    console.log('Server started in port : 3000');
});

