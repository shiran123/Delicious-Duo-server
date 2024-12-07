import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

let isConnected = false;

export const connectToDB = async () => {

    mongoose.set('strictQuery', true);

    if(isConnected)
    {
        console.log('MongoDB is already connected');
        return;
    }

    try {

        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: process.env.MONGODB_DATABASE,
        });

        isConnected = true;

        console.log('MongoDb Connected')
        
    } catch (error) {
        console.log(error);
    }

}