const Blog = require('../models/blogs')

exports.getAllBlogs = async function getAllBlogs(){
    let blogs = await Blog.find({});
    return blogs;
}

exports.getAllBlogsById = function (id) {
    // let blog = await Blog.findOne({id: id});
    // console.log(blog);
    console.log(id)
    return Blog.findOne({_id: id})
}

exports.updateBlog = async function updateBlog(id, updatedBlog) {
    try{
        //1.
        var oldBlog = await Blog.findOne({_id: id});
        oldBlog.title = updatedBlog.title;
        oldBlog.image = updatedBlog.image;
        oldBlog.content = updatedBlog.content;
        await oldBlog.save();
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }  
}

exports.createBlog = function (newBlog) {
    let blog = new Blog(newBlog);
    return blog.save();
    // try{
    //     await blog.save();
    //     return true;
    // } catch (err) {
    //     console.log(err)
    //     return false;
    // }
}

exports.deleteBlog = async function (id) {
    try{
        await Blog.deleteOne({_id: id});
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}