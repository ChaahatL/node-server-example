const http = require('http');
const fs = require('fs');

const requestHandler = (req, res) => {
    console.log('server hit!');
    console.log(req.url);
    if(req.url == '/page'){
        res.setHeader('Content-Type', 'text/html')
        res.end('<h1>Hello Page</h1>');
    } else {
        res.end(JSON.stringify({message: "Hello World!"}))
    }   
}

const server = http.createServer(requestHandler);
var port = 3000;
var host = "localhost"
server.listen(port, host, () => {
    console.log(`server started at ${host}:${port}`);
});






