import mongoose from "mongoose";

export async function connect(){
    try{
            mongoose.connect(process.env.MONGO_URL!)
            const connection=mongoose.connection
            connection.on('connected',()=>{
                console.log('MongoDb connected');
            })
            connection.on('error',(err)=>{
                console.log('Mongodb connection error, please make db is up and running '+err);
                process.exit()
            })
            
    }catch(error){
console.log("something went wrong in connecting db");
console.log(error);
    }

}