const mongoose = require("mongoose");

const countSchema = new mongoose.Schema({
    count: {
        type: String,
        default: "count"
    },
    add: {
        type: Number,
    },
    update: {
        type: Number,
      },
    delete: {
        type: Number
    },
})

const Count = mongoose.model("count", countSchema);
module.exports = Count;