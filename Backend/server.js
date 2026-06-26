require('dotenv').config();
const genereateInterviewreport  = require('./src/services/ai.services');
const { resume, selfDescription, jobDescription } = require('./src/services/tempCV')
const app = require('./src/app')
const connectToDB = require('./src/config/database')


connectToDB();
genereateInterviewreport({resume, selfDescription, jobDescription});
app.listen(3000, ()=>{
    console.log("Server Started");
})