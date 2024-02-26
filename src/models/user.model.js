import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    username:{
        type: String,
        require:true,
        unique:true,
        lowecase:true,
        trim:true,
        index:true
    },
    email:{
        type: String,
        require:true,
        unique:true,
        lowecase:true,
        trim:true,
    },
    fullname:{
        type: String,
        require:true,
        trim:true,
        index:true
    },
    avatar:{
        type: String,//cloudinar URL
        require:true
    },
    coverimage:{
        type:String, //cloudinar URL
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video",

        }
    ],
    password:{
        type:String,
        required:[true,"Password is required"],

    },
    refreshToken:{
        type:string
    }

    

},{timestamps:true})

export const User = mongoose.model("User",userSchema)