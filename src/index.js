// require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
// import mongoose from "mongoose"
// import { DB_NAME } from "./constants"
import connectDB from "./db/index.js"
 dotenv.config({path:'./env'});

connectDB()


// import{express} from "express"
// const app=express()

// (async ()=>{
//     try {
//         await mongoose.connect('${process.env.DATABASE_URI}/${DB-NAME}')
//         app.on("error",(error)=>{
//             console.log("epress error");
//             throw error

//             app.listen(process.env.PORT,()=>{console.log('Port used ${process.env.PORT}')})
//         })
//     } catch (error) {
//         console.error("error",error)
//         throw error
//     }
// })()