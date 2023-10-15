const mongoose=require('mongoose')


const ToDoSchema =new mongoose.Schema({
    task: String,
    done:Boolean
});

const TodoModel = mongoose.model("todo",ToDoSchema)

module.exports = TodoModel