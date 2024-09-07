import mongoose from "mongoose";

export const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
    }catch(err){
        console.log(err.message);
    }
} 