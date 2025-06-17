const mongoose=require('mongoose')
const taskschema = new mongoose.Schema({
    title: String,
    description: String,  
    assignedto: String,
    status: {             
        type: String,
        enum: ['To Do', 'In Progress', 'Done'],
        default: 'To Do'
    }
})
module.exports=mongoose.model('Task',taskschema)