import { error } from "console";
import mongoose, { connection } from "mongoose";

export async function connect() {
    try {
        let URL = "mongodb://127.0.0.1:27017/nextApp"
        mongoose.connect(URL!);
        const connection = mongoose.connection;
        
        connection.on("connected",()=>{
            console.log("Mongodb Connected Successfully");
        })

        connection.on("error",(error)=>{
            console.log("MongoDB database connection Error ",error);
        })
    } catch (error) {
        console.log("Something goes wrong in database connection");
        console.log(error);
    }
}