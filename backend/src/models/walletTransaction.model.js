import mongoose from "mongoose";
 
const walletTransactionSchema = new mongoose.Schema({
  user:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"users",
   required:true
 
  },

  type:{
    type:String,
    enum:["credit","debit"],
    required:true
  },
  amount: {
    type: Number,
    required: true,
    min: 1,
    validate: {
        validator: Number.isInteger,
        message: "Amount must be an integer"
    }
},
  balanceBefore:{
    type:Number,
    required:true,
    min:0
  },
  balanceAfter:{
    type:Number,
    required:true,
    min:0
  },
  referenceType:{
    type:String,
    enum:["payment","serviceRequest"],
    required:true
  },
  referenceId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
  },
  description:{
    type:String,
    trim:true
  }
 

},{timestamps:true});


walletTransactionSchema.index({
    referenceType:1,
    referenceId:1
},
{
    unique:true
});

const walletTransactionModel = mongoose.model(
    "walletTransaction",
    walletTransactionSchema
);

export default walletTransactionModel;

