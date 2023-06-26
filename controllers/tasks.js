const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../middleware/customError')

//Returns all the tasks in the collection.
const getAllTasks = asyncWrapper(async(req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({amount: tasks.length ,tasks})
})

//Create a new task.
const createTask = asyncWrapper(async(req, res) => {
    const newTask = await Task.create(req.body)
    res.status(201).json({newTask})
})

//Get a single task by its id.
const getSingleTask = asyncWrapper(async(req, res, next) => {
    const {id} = req.params
    const task = await Task.findById(id).exec()
    if(!task){
        //Create a custom error message, and forward it to the errorHandler middleware.
        return next(createCustomError(`No task with id: ${id}`, 404))
    }
    res.status(200).json({task})
})

//Update a single task by its id.
const updateTask = asyncWrapper(async(req, res, next) => {
    const {id} = req.params 
    const {name, completed} = req.body
    //Find the document with the id argument, update the name of the task and completion status, then return the document after it has been updated.
    const task = await Task.findByIdAndUpdate(id, {name, completed}, {returnDocument: 'after'})
    if(!task){
        return next(createCustomError(`No task with id: ${id}`, 404))
    }
    res.status(200).json({task})
})

//Find a task using its id and delete it.
const deleteTask = asyncWrapper(async(req, res, next) => {
    const {id} = req.params
    const task = await Task.findByIdAndDelete(id)
    if(!task){
        return next(createCustomError(`No task with id: ${id}`, 404))
    }
    res.status(200).json({msg: `Task: ${id} was deleted.`})
})

//Export these functions so they can be used in the routes.
module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
}