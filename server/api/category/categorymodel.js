const mongoose = require("mongoose")
const categorySchema = new mongoose.Schema({
    category_name: { type: String, default: "" },
    added_on: { type: Date, default: Date.now },
    catimage:{type:String,default:""},
    status: { type: Boolean, default: true }

})
module.exports = new mongoose.model("category", categorySchema);