import {v2 as cloudinary} from "cloudinary"
import { log } from "console";
import {fs} from "fs"

          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINART_CLOUD-NAME, 
  api_key: process.env.CLOUDINART_API_KEY, 
  api_secret: process.env.CLOUDINART_API_SECERT
});
//fileUpload
const fileUploadeONCloudinary= async (localfilePath)=>{
    try {
        if(!localfilePath) return null
        //fileUpload on cloudinary
        const respone = await cloudinary.uploader.upload(localfilePath,
            {
                resource_type:"auto"
            })
            //file uploaded
            console.log("file has been uploaded ", respone.url)
            return respone
        
    } catch (error) {
        fs.unlinkSync(localfilePath)
        return null;
    }
}

export {fileUploadeONCloudinary}