import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"


const connectDB= async()=>{
    try {
        const connectIntances=await mongoose.connect('${process.env.DATABASE_URI}/${DB_NAME}');
         console.log('\n MongoDB connected !!DB HOST :${connectIntances.connection.host}');
    } catch (error) {
        console.error("error",error);
        process.exit(1);
    }
}
export default connectDB