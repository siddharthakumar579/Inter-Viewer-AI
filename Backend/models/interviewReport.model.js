const mongoose = require('mongoose')


const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type: String,
        required: [ true, "question is required"]
    },
    intention:{
        type: String,
        required: [ true, "intention is required"]
    },
    answer:{
        type:String,
        required: [ true, "answer is required"]
    }
}, {
    _id: false
})

const behavioralQuestionSchema = new mongoose.Schema({
    question:{
        type: String,
        required: [ true, "question is required"]
    },
    intention:{
        type: String,
        required: [ true, "intention is required"]
    },
    answer:{
        type:String,
        required: [ true, "answer is required"]
    }
},{
    _id: false
})

const skillGapSchema = new mongoose.Schema({
    skill:{
        type: String,
        required: [ true, "skill is required"]
    },
    severity:{
        type: String,
        enum: ["low", "medium", "high"],
        required: [ true, "severity is required"]
    }
}, {
    _id: false
})

const preparationPlanSchema = new mongoose.Schema({
    day:{
        type: Number,
        required: [ true, "day is required"]
    },
    focus:{
        type: String,
        required: [ true, "focus is required"]
    },
    tasks:[ {
        type: String,
        required: [ true, "tasks is required"]
    }]
},{
    _id:false
})

const interviewReportSchema = new mongoose.Schema({

    jobDescription:{
        type: String,
        required: [ true, "job description is required"]
    },
    resume:{
        type: String,
        required: [ true, "resume is required"]
    },
    selfDescription:{
        type: String,
        required: [ true, "self description is required"]   
    },
    matchScore:{
        type: Number,
        min: 0,
        max: 100,
        required: [ true, "match score is required"]
    },
    technicalQuestions:[technicalQuestionSchema],
    behavioralQuestions:[behavioralQuestionSchema],
    skillGaps:[skillGapSchema],
    preparationPlan:[preparationPlanSchema],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    title:{
        type: String,
        required: [ true, "title is required"]
    }
},{
    timestamps: true
})

module.exports = mongoose.model("interviewReports", interviewReportSchema)