import mongoose from "mongoose";

const productSchema = new mongoose.Schema({


    name:{
        type : String,
        required: true,
        trim: true,
    },

    description: {
      type: String,
      required: true,
    },

     price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0, 
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", 
      required: true,
    },
    seller: {
      type:mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true
    },
},

{ timestamps: true 

}
);

export default mongoose.model("Product", productSchema);