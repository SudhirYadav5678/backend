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

    const {fullName,email,Username}= req.body
    console.log(email,"\n",fullName)

    if ([fullName,email,Username,password].some((fiels)=> fiels?.trim()==="")) {
        throw new ApiError(400,"All fiels are required")
        
    }
 // for check user already exist or not in database 
    const existedUser=User.findOne({
        $or:[{username},{email}]
    })
    if (existedUser) {
        throw new ApiError(409,"User already exist")
        
    }
    const avatarFilesLocalPath= req.fiels?.avatar[0]?.path;//? used for optional if it exist or not in server
    const coverImageLocalPath= req.fiels?.coverImage[0]?.path;
    if (!avatar) {
        throw new ApiError(400,"Avatar is required")
    }
    const avatar= await uploadOnCloudinary(avatarFilesLocalPath)
    if (!avatar) {
        throw new ApiError(400,"Avatar is required")
    }
    const coverImage= await uploadOnCloudinary(coverImageLocalPath)

    //files uploading on database
    const user= await User.create({
        fullname,
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