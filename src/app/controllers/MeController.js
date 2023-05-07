const Course = require('../models/Course');
// const { multipleMongoose }

class MeController{
    // [GET] me/stored/courses
    storedCourses(req, res, next){

        Promise.all([Course.find({}).lean(), Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) => 
            res.render('me/stored-courses',{courses, deletedCount})
            )
            .catch(next)
        // Course.countDocumentsDeleted()
        //     .then((deletedCount) => {console.log(deletedCount);})
        //     .catch(()=>{})

        // Course.find({}).lean()
        //     .then(courses => res.render('me/stored-courses',{courses}))
        //     .catch(next)
    }   

    // [GET] me/stored/courses
    trashCourses(req, res, next)
    {
        Course.findDeleted({}).lean()
            .then(courses => res.render('me/trash-courses',{courses}))
            .catch(next)
    }
}
module.exports = new MeController;