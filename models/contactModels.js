const mongoose=require('mongoose');

const contactSchema= mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{
        type:String,
        required:[true," please add the contact number"],
    },
    email:{
        type:String,
        required:[true,"please enter the email address"]
    },
    phone:{
        type:String,
        required:[true,"please Enter the phone number"]
    }
},{timestamps:true});

module.exports=mongoose.model("connect", contactSchema);