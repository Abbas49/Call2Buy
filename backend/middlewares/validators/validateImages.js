import { supabase } from "../../config/db.js";
import createError from "../../utils/createError.js";

const validateImages = async (req, res, next)=>{
    try{
        const photos = req.files;

        if(photos.length == 0){
            throw createError("At least one product image is required to create a product. Please upload an image and try again.", 400)
        }
        
        const validImageTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
        photos.forEach((photo)=>{
            console.log(photo.mimetype)
            if(!validImageTypes.includes(photo.mimetype)){
                throw createError("Invalid image type. Only JPEG, JPG and PNG are allowed.", 400)
            }
        })
        
        next();
    }catch(err){
        next(err)
    }
}

export default validateImages;