import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({

    userId: {
        type : "",
        ref : "user",
        required : true,
    },

    orderId: {
        type : "",
        ref : "order",
        required : true,
    },
    amount : {
        type: number,
        required : true
    },

    method: {
        type: String,
        enum :["credit card", "debit card", "UPI", "Cash on Delivery"],
        required: true,
    },
    status: 
    {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },
},
{ timestamps: true 

}
);

module.exports = mongoose.model("Payment", paymentSchema);


