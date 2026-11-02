import mongoose from "mongoose";

const webHookEventSchema = new mongoose.Schema({

eventId:{
    type:String,
    required:true,
    unique:true
},
event:{
    type:String,
    required:true
},
status:{
    type:String,
    enum:["processing","processed","failed"],
    default:"processing"
},

 
},{timestamps:true});





const webHookEventModel = mongoose.model("webhookEvent",webHookEventSchema);


export default webHookEventModel;