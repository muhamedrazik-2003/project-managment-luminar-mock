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
        type : String,
        required: true
    },
    endDate : { 
        type : String,
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