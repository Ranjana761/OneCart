// import { v2 as cloudinary } from 'cloudinary';
// import fs from 'fs'
// import dotenv from 'dotenv';

// dotenv.config();

//  cloudinary.config({ 
//         cloud_name: process.env.CLOUDINARY_NAME, 
//         api_key: process.env.CLOUDINARY_API, 
//         api_secret: process.env.CLOUDINARY_APISECRET // Click 'View API Keys' above to copy your API secret
//     });

// const uploadOnCloudinary = async (filePath) => {
   
//     try {
//         if(!filePath){
//         return null
//     }
//      const uploadResult = await cloudinary.uploader.upload(filePath)
//      fs.unlinkSync(filePath)
//      return uploadResult.secure_url

//     } catch (error) {
//         fs.unlinkSync(filePath)
//         console.log(error)
//     }
    

// }

// export default uploadOnCloudinary
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      folder: "products",
    });

    // ✅ Only delete if file actually exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return uploadResult.secure_url;
  } catch (error) {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

export default uploadOnCloudinary;
