const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    },
    designation: {
        type: String,
        required: true
    },
    gender:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    createdDate:{
        type:Date,
        default:Date.now(),
    },
    image: {
        type: String
    },
    status:{
        type:Boolean,
        default:true
    }
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
