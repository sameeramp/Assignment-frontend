const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
      }
})

const Todo = mongoose.model("todos", todoSchema);
module.exports = Todo;