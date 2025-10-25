const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName : { 
        type : String,
        required: true
    },
    projectManager : { 
        type : String,
        required: true
    },
    teamMembers : { 
        type : [String],
        required: true
    },
    startDate : { 
        type : Date,
        required: true
    },
    endDate : { 
        type : Date,
        required: true
    },
    status : { 
        type : String,
        enum: ["Pending", "In Progress", "Completed"],
        required: true
    },
    budget : { 
        type : Number,
        required: true
    },
}, {timestamps: true})

const projects = mongoose.model('projects', projectSchema );
module.exports = projects;