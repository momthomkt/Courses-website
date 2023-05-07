const mongoose = require('mongoose');

async function connect(){

    try {
        // await mongoose.connect('mongodb://127.0.0.1/my_database');
        await mongoose.connect
        ('mongodb://127.0.0.1:27017/f8_education_dev'
        // {
        //     useCreateIndex: true,
        //     // useNewUrlParser: true
        // }
        );
        console.log('Connect successfully 300')
    } catch (error) {
        console.log('Connect failure')
    }

}

module.exports = { connect };
