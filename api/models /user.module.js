import mongoose from 'mongoose';

const userSchema= new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    }, 
    email:{
        type: String,
        required: true,
        unique: true,
    }, 
    password:{
        type: String,
        required: true,
        
    },
    avata:{
        type: String,
        default: "https://www.seblod.com/images/medias/62057/_thumb2/2205256774854474505_medium.jpg"
    }
}, {timestamps: true}); 

const User= mongoose.model('User', userSchema); 
export default User; 