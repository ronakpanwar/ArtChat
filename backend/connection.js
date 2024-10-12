const mongoose = require('mongoose');

const connectMongo = async()=>{
    try {
         await mongoose.connect(process.env.MONGO_URL);
         console.log('mongo is connected')
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {
    connectMongo ,
}