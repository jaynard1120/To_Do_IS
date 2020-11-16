const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoScehma = Schema({
    task:{type: String, required: true},
    description:{type: String},
    date:{type: String, required: true}
})

const todo = mongoose.model("todo",todoScehma,"Todo");

module.exports = todo;