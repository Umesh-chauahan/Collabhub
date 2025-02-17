import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
        trim : true
    },
    email :{
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required : true
    },
    answer :{
        type : String,
        required : true
    },
    Role :{
        type : String,
        required : true
    }
})

export default mongoose.model('User',UserSchema)