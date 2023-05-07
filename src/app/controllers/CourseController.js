const Course = require('../models/Course');
// const mongoose = require('mongoose')
// const NewCourses = mongoose.model('NewCourses', Course);

class CourseController{
    // [GET] /
    // index(req, res, next) {

    //     Course.find({}).lean()
    //         .then(courses => res.render('home', {courses}))
    //         .catch(next);

    //     // res.render('news')
    // }
    // [GET] /course/:slug
    // show(req, res, next) {
    //     Course.findOne({slug: req.params.slug})
    //         .then(course => {
    //             res.json(course);
    //         })
    //         .catch(next);
    // }
    show(req, res, next) {
        Course.findOne({slug: req.params.slug}).lean()
            .then(course => {
                res.render('courses/show', {course});
            })
            .catch(next);
    }
    // [GET] /courses/create
    create(req, res, next){
        res.render('courses/create');
    }

    // [POST] /courses/create
    store(req, res, next){
        // res.json(req.body);
        // const formData = req.body;
        req.body.image = `https://img.youtube.com/vi/${formData.videoId}/sddefault.jpg`
        // const newcourse = new Course({ name: req.body.name, description: req.body.description, videoId: req.body.videoId, level: req.body.level });
        const newcourse = new Course(formData);
        newcourse.save()
        .then(() => res.redirect('/'))
        .catch(error => {});
    }
    // [GET] /courses/:id/edit
    edit(req, res, next){
        Course.findById(req.params.id).lean()
            .then(course =>{
                res.render('courses/edit',{course});
            })
            .catch(next)
    }

    // [PUT] /courses/:id
    update(req, res, next){
        Course.updateOne({_id: req.params.id}, req.body)
            .then(()=>res.redirect('/me/stored/courses'))
            .catch(next)
    }
     // [DELETE] /courses/:id
    destroy(req, res, next) {
        // Course.deleteOne({_id: req.params.id})
        Course.delete({_id: req.params.id}) //Xóa mềm
            .then(()=>res.redirect('back'))
            .catch(next);
    }

     // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({_id: req.params.id})
            .then(()=>res.redirect('back'))
            .catch(next);
    }

     // [DELETE] /courses/:id/force
    forceDestroy(req, res, next){
        Course.deleteOne({_id: req.params.id})
            .then(()=>res.redirect('back'))
            .catch(next);
    }

    // [POST] /courses/handle-form-actions
    handleFormAction(req, res, next)
    {
        switch(req.body.action)
        {
            case 'delete':
                Course.delete({_id: {$in: req.body.courseIds} }) //Xóa mềm
                    .then(()=>res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({messaga: 'Action is invalid'});
        }
    }
} 

module.exports  = new CourseController;