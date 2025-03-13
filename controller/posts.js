var express = require('express');
var router = express.Router();
const fs = require('fs');

const authentication = require('../auth/authentication');
const authorization = require('../auth/authorization');

router.use((req, res, next) => {
    console.log('Router Middleware hit!');
    next();
})

router.get('/', (req, res) => {
    var blogs = JSON.parse(fs.readFileSync('blogs.json').toString())
    res.json(blogs);
})

router.get('/:postId', (req, res) => {
    var blogs = JSON.parse(fs.readFileSync('blogs.json'));
    var blog = blogs.find(e => e.id == req.params.postId);
    res.json(blog);
})

router.post('/', (req, res) => { // FIX: Swapped req and res positions
    console.log(req.body);
    var blogs = JSON.parse(fs.readFileSync('blogs.json').toString());
    req.body.id = blogs.length > 0 ? blogs[blogs.length - 1].id + 1 : 1; // FIX: Corrected id assignment
    blogs.push(req.body); // FIX: Changed blogs(blogs.length - 1).id to blogs[blogs.length - 1].id
    fs.writeFileSync('blogs.json', JSON.stringify(blogs, null, 2));
    res.status(201).json(req.body);
});

router.put('/:postId',(req, res) => {
    var blogs = JSON.parse(fs.readFileSync('blogs.json'));
    blogs = blogs.map(b => {
        if (b.id === parseInt(req.params.postId))
            b=req.body;
        return b
    })
    fs.writeFileSync('blogs.json', JSON.stringify(blogs, null, 2));
    res.status(200).json({message: 'Update successful!'})
})

router.delete('/:postId', authentication, authorization, (req, res) => {
    var blogs = JSON.parse(fs.readFileSync('blogs.json'));
    blogs = blogs.filter(b => b.id != parseInt(req.params.postId));
    fs.writeFileSync('blogs.json', JSON.stringify(blogs, null, 2));
    res.status(200).json({message: 'Delete successful!'})
})

module.exports = router;