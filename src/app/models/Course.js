const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');


const Schema = mongoose.Schema

const Course = new Schema({
    name: {type: String, maxLength: 255},
    description: {type: String, maxLength: 600},
    image: {type: String, maxLength: 255},
    slug: {type: String, slug: "name", unique: true}, // slug: "name" dùng để khởi tạo trường slug từ name bằng cách chuyển các ký tự thành chữ thường, nếu cách nhau bởi dấu cách thì sẽ thành dấu '-'.
    // Ví dụ: React JS -> react-js
    // Dùng unique: true để tránh việc có nhiều slug trùng nhau
    videoId: {type: String, maxLength: 255},
    level: {type: String, maxLength: 255},
    // createdAt: {type: Date, default: Date.now},
    // updateAt: {type: Date, default: Date.now},
  },{
    timestamps : true,
  });

//Add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete);

//Overide all method of mongoose when we use mongoose-delete
Course.plugin(mongooseDelete, { overrideMethods: 'all',deletedAt : true });

module.exports = mongoose.model('Course', Course);