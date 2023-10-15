const TodoModel = require("../Models/ToDo");

module.exports.addTask = async (req, res) => {
    const task = req.body.task;

    TodoModel.create({task:task,done:false})
        .then(result => res.json(result))
        .catch(err => res.json(err ));
  };

  module.exports.updateTask = async (req, res) => {
    const {id}=req.params;
    TodoModel.findByIdAndUpdate({_id:id},{done:true})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
  };


  module.exports.getTasks = async (req, res) => {
    TodoModel.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
  };


  module.exports.deleteTask = async (req, res) => {
    const {id}=req.params;
    TodoModel.deleteOne({_id:id})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
  };