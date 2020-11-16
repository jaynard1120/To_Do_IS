const { request } = require('express');
const todo = require('../models/toDo.model');

const getTasks = async (request,response)=>{
    try{
        const tasks = await todo.find();
        if(!tasks){
            return response.status(400).json({
                error: "Error in getting tasks!",
              });
        }
        response.render('todoList',{
            tasks:tasks,
        })
    }
    catch(e){
        return response.status(400).json({
            error: e,
          });
    }
}

const addEdit = (request,response)=>{
  
  if(request.body._id==""){
    addTask(request,response)
  }else{
    updateTask(request,response)
  }
}

const addTask = async (request, response) => {
    try {
      const task = {
        task: request.body.task,
        description: request.body.description,
      };
  
      const newTask = new todo(task);
      const result = await newTask.save();
      response.redirect('/todoList')
  
      if (!result) {
        return response.status(400).json({
          error: "Error in adding new task!",
        });
      }
  
      response.status(200).json({
        message: "New task added!",
      });
    } catch (e) {
      return response.status(400).json({
        error: e,
      });
    }
  };

  const deleteTask = async (request, response) => {
    try {
      await todo.deleteOne({ _id: request.params.id }, (error, result) => {
        if (error) {
          return response.status(400).json({
            error: error,
          });
        }
  
        response.redirect('/todoList')
      });
    } catch (e) {
      return response.status(400).json({
        error: e,
      });
    }
  };

  const updateTask = async (request, response) => {
    const updates = (request.body);

    try {
      const result = await todo.updateOne(
        { _id: request.body._id },
        { $set: updates }
      );
      if (!result) {
        return response.status(400).json({
          error: "Error in updating task!",
        });
      }
      response.redirect('/todoList')
    } catch (e) {
      return response.status(400).json({
        error: e,
      });
    }
  };
  const update = (request,response)=>{
    todo.findById(request.params.id,(err,docs)=>{
      if(!err){
        response.render("addedit",{
            title:"Update Task",
            tasks: docs
        })
    }
    })
  }
  const add = (request,response)=>{
    docs={"title":"","decription":""}
    response.render("addedit",{
      title:"Add Task",
      tasks:docs
    })
  }
  module.exports = {
    addEdit,
    getTasks,
    deleteTask,
    update,
    add
  }