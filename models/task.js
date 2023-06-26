const mongoose = require('mongoose');
const {Schema} = mongoose;

const TaskSchema = new Schema({
    name:{
        type:String,
        required:[true, 'The name must be provied'],
        trim: true,
        maxlength:[100, 'Name can not exceed 100 characters']
    },
    completed: {
        type:Boolean,
        default:false,
    }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task

