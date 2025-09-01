import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    addressLine:{
        type:String,
        default:""
    },
    city:{
        type:String,
        default:""
    },
    state:{
        type:String,
        default:""
    },
    pincode:{
    type:String,
        
    },

    country:{
        type:String,
       
    },
    mobile:{
        type:String,
        default:""
    },
    status:{
        type:Boolean,
        default:true
    },
    userId:{
        type: mongoose.Schema.ObjectId,
        default:""
    },
    


timestamps: true,

});


export default mongoose.model("Address", addressSchema);