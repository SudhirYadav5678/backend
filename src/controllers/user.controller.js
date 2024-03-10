import { asyncHandler } from "../utlites/asyncHandler.js";
import {ApiError} from "../utlites/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary}  from "../utlites/cloudinory.js"
import { ApiResponse } from "../utlites/ApiResponces.js";

const registerUser= asyncHandler(async(req, res)=>{
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return respone

    const {fullName,email,password,username,}= req.body
    console.log(email,"\n",fullName)

    if ([fullName,email,username,password].some((field)=> field?.trim()==="")) {
        throw new ApiError(400,"All fiels are required")
        
    }
 // for check user already exist or not in database 
    const existedUser=await User.findOne({
        $or:[{username},{email}]
    })
    if (existedUser) {
        throw new ApiError(409,"User already exist")
        
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath= req.fiels?.coverImage[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }
    const avatar= await uploadOnCloudinary(avatarLocalPath)
    if (!avatar) {
        throw new ApiError(400,"Avatar is required")
    }
    const coverImage= await uploadOnCloudinary(coverImageLocalPath)

    //files uploading on database
    const user= await User.create({
        fullName,
        avatar:avatar.url,
        coverimage:coverImage?.url || "",
        email,
        password,
        username:username.toLowercase()

    })
    const createdUser= await User.findById(user._id).select("-password -refreshToken")
    if (!createdUser) {
        throw new ApiError(500,"Something wrong while registering User")
    }
    return res.status(201).json(
        new ApiResponse(200,createdUser,"user registered Successfully")
    )
})

export{registerUser}