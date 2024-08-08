import mongoose from 'mongoose';

async function connectMongoDb(url){

    return mongoose.connect(url)
    .then( ()=> console.log("MongoDB connected!!"))
}

export default connectMongoDb;