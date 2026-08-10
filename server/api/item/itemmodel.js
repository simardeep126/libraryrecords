const mongoose = require("mongoose")
const recordsSchema = new mongoose.Schema({
    itemname: { type: String, default: "" },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
    itemimage: { type: String, default: "" },
    series_no: { type: "string", default: "" },
    description: { type: String, default: "" },
    issued_to: { type: mongoose.Schema.Types.ObjectId, ref: "pupil" },
    issued_on: { type: Date, default: null },
    return_on: { type: Date, default: null },
    added_on: { type: Date, default: Date.now },
    avaliable: { type: Boolean, default: true },
    avaliableon: { type: Date, default: "" },
    status: { type: Boolean, default: true }
})


module.exports = new mongoose.model("records", recordsSchema);