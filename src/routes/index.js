const newsRouter = require('./news')
const coursesRouter = require('./courses')
const siteRouter = require('./site')
const meRouter = require('./me')

function route(app) {
    // app.get('/', (req, res) => {
    //       res.render('home');
    //   })
      
    //   app.get('/news', (req, res) => {
    //       res.render('news');
    //   })
    app.use('/me', meRouter)
    app.use('/courses', coursesRouter)
    app.use('/news', newsRouter)
    app.use('/', siteRouter)
    //   app.get('/search', (req, res) => {
    //     res.render('search');
    //   })
      
    //   app.post('/search', (req, res) => {
    //     console.log(req.body)
    //     res.render('search');
    //   })
}

module.exports = route;
