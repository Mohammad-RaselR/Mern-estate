import Listing from "../models/listing.module.js";
import { errorHandler } from "../utils/error.js";

export const createListing= async (req, res, next) => {

    try{

        const listing= await Listing.create(req.body); 
        return res.status(200).json(listing);

    }
    catch(error){

        next(error);

    }

}

export const deleteListing= async (req, res, next) => {
    const listing= await Listing.findById(req.params.id);
    
    if(!listing){
        return next(errorHandler(404, "Listing not found"));
    }
    if(req.user.id !== listing.userRef.toString()){
        return next(errorHandler(401, "Unauthorized"));
    }
    try{
        await Listing.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "Listing deleted"});
    }catch(error){
        next(errorHandler(500, "Internal Server Error"));
    }
}