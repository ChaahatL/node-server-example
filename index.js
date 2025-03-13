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
const postRouter = require('./controller/posts')
const cors = require('cors');
const users = require('./users.json')
const jwt = require('jsonwebtoken')

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log('Application Middleware hit!');
    next();
})

app.post('/login',(req, res) => {
    var user = users.find(u => u.username == req.body.username && u.password == req.body.password);
    if(user){
        var token  = jwt.sign({username: user.username, role:user.role}, 'secret');
        res.send(token);
    } else {
        res.status(401).send("Auth Failed");
    }
})

app.use('/posts', postRouter);

app.listen(3000, () => {
    console.log('Server started in port : 3000');
});

