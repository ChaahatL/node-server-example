const mongoose = require('mongoose');
const {Schema} = mongoose;

const blogSchema = new Schema({
    'title':String,
    'image':String,
    'content': String
});

module.exports = mongoose.model('Blog', blogSchema);




