const mongoose = require('mongoose');
const mongodbConfig =()=>{
    let username = process.env.DATABASE_USERNAME
    let password = process.env.DATABASE_PASSWORD
    let dbname = process.env.DATABASE_NAME

    mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.jwm3bwe.mongodb.net/${dbname}?appName=Cluster0`)
      .then(() => console.log('Connected!'));
    
}

module.exports = mongodbConfig