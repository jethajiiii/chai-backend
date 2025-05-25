import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';


const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) {
               return null;
        }
                   //  TO UPLOAD FILE ON CLOUDINARY
               const response = await cloudinary.uploader.uploader.upload(localFilePath, {
                resource_type: 'auto', // Automatically detect the resource type (image, video, etc.)    
               }) 
               // FILE SUCCESSFULLY UPLOADED ON CLOUDINARY
               console.log("File uploaded successfully on Cloudinary", response.url);
               return response;
        }
     catch(error){
        fs.unlinkSync(localFilePath); // delete the file from local storage if upload fails
    }
}


 cloudinary.config({                                                // This sets up your Cloudinary credentials using environment variables.
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET  
    });
