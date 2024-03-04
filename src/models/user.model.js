import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
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
//password encryption
userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    this.password= bcrypt.hash(this.password, 8);
    next()
})
//password comparison
userSchema.methods.ispasswordcorrect= async function(password){
    return await bcrypt.compare(password, this.password);
}

// token generater
userSchema.methods.generateAccessToken=function(){
     return jwt.sign({
        _id: this._id,
        email: this.email,
        username:this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })}
userSchema.methods.generateRefreshToken=function(){return jwt.sign({
    _id: this._id,
},
process.env.REFRESH_TOKEN_SECRET,
{
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY
})}
export const User = mongoose.model("User",userSchema)