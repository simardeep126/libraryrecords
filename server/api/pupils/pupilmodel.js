const mongoose = require("mongoose")
const pupilSchema = new mongoose.Schema({
   
    pupilname:{type:"string",default:""},
    address: { type:String, default: "" },
    number:{type:String,default:""},
    password:{type:String,default:""},
    proof: { type:String, default: null },
    parentsphnno:{type:String,default:""},
    usertype:{type:String,default:""},
    added_on: { type:Date, default: Date.now },
    status: { type:Boolean, default: true }
})


module.exports = new mongoose.model("pupil", pupilSchema);