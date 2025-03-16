var express = require('express');
var router = express.Router();
const fs = require('fs');

const authentication = require('../auth/authentication');
const authorization = require('../auth/authorization');

const {getAllBlogsById, getAllBlogs, createBlog, updateBlog, deleteBlog} = require('../dao/blogs')
const mongoose = require('mongoose'); // ✅ Import mongoose for ObjectId validation

router.use((req, res, next) => {
    console.log('Router Middleware hit!');
    next();
})

router.get('/', async (req, res) => {
    res.json(await getAllBlogs());
})

router.get('/:postId', async (req, res) => {
    res.json(await getAllBlogsById(req.params.postId)); // ✅ No other changes
});

router.post('/', async (req, res) => { // FIX: Swapped req and res positions
    // console.log(req.body);
    // var blogs = JSON.parse(fs.readFileSync('blogs.json').toString());
    // req.body.id = blogs.length > 0 ? blogs[blogs.length - 1].id + 1 : 1; // FIX: Corrected id assignment
    // blogs.push(req.body); // FIX: Changed blogs(blogs.length - 1).id to blogs[blogs.length - 1].id
    // fs.writeFileSync('blogs.json', JSON.stringify(blogs, null, 2));
    // res.status(201).json(req.body);

    try{
        await createBlog(req.body);
        res.status(201).send();
    } catch(err) {
        console.log(err);
        res.status(500).send();
    }

});

router.put('/:postId',async (req, res) => {

    const { postId } = req.params;

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(postId) && isNaN(postId)) {
        return res.status(400).json({ error: "Invalid post ID format" });
    }

    try {
        await updateBlog(postId, req.body);
        res.status(200).send('Update Successful');
    } catch (err) {
        console.log(err);
        res.status(500).send('Update Failed');
    }

    // var blogs = JSON.parse(fs.readFileSync('blogs.json'));
    // blogs = blogs.map(b => {
    //     if (b.id === parseInt(req.params.postId))
    //         b=req.body;
    //     return b
    // })
    // fs.writeFileSync('blogs.json', JSON.stringify(blogs, null, 2));
    // res.status(200).json({message: 'Update successful!'})
})

router.delete('/:postId', async (req, res) => {
    // var blogs = JSON.parse(fs.readFileSync('blogs.json'));
    // blogs = blogs.filter(b => b.id != parseInt(req.params.postId));
    // fs.writeFileSync('blogs.json', JSON.stringify(blogs, null, 2));
    // res.status(200).json({message: 'Delete successful!'})

    const { postId } = req.params;

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(postId) && isNaN(postId)) {
        return res.status(400).json({ error: "Invalid post ID format" });
    }
    
    await deleteBlog(postId);
    res.status(200).json({ message: 'Delete Successful' });
})

module.exports = router;