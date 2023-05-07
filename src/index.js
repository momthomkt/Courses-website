// import handlebars from 'express-handlebars'
const path = require('path')
const express = require('express')
var morgan = require('morgan')
// const handlebars = require('express-handlebars')
const hbs  = require('express-handlebars');
const methodOverride = require('method-override')
const app = express()
const port = 3000
const route = require('./routes')
const db = require('./config/db')

// Connect to DB
db.connect()

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({
  extended: true
})); // Gửi dữ liệu dạng form
app.use(express.json()); // Gửi dữ liệu từ code javascript

app.use(methodOverride('_method'));

app.use(morgan('combined'))
app.engine('hbs', 
  hbs.engine({
    extname: '.hbs',
    helpers: {
      sum: (a,b) => a + b
    }
  })
);
app.set('view engine', 'hbs')
// app.set('views', path.join(__dirname, 'resources\\views'));
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

// port = 127.0.0.1 - localhost

app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
    console.log(`App listening at http://localhost:${port}`)
})