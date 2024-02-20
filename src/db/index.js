import mongoose from "mongoose"
import{DB_NAME} from "../constants.js"

const connectDB= async ()=>{
    try {
         const connectionInstances=await mongoose.connect('${process.env.MONGODB_URI}/${DB_NAME}')
         console.log('\n MongoDB is connected DB HOST:${connectionInstances.connection.host}');
    } catch (error) {
        console.log(error,"connectDM Sudhir error");
        process.exit(1);
    }
}

export default connectDB