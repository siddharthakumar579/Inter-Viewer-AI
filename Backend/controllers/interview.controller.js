const interviewReportModel = require('../models/interviewReport.model');
const pdfParse = require('pdf-parse');
const {generateInterviewReport, generateResumePDF} = require('../src/services/ai.services');
const { resume } = require('../src/services/tempCV');



async function generateInterviewReportController(req,res) {
    try{
        // 1. Strict validation: Must have BOTH a file and a job description
        if (!req.file || !req.file.buffer) {
             return res.status(400).json({ message: "Resume PDF file is required" });
        }
        if (!req.body.jobDescription) {
             return res.status(400).json({ message: "Job description is required" });
        }
        const parser = new pdfParse.PDFParse({ data: req.file.buffer });
        const resumeContent = await parser.getText();
        
        // selfDescription is optional, might be undefined
        const {selfDescription, jobDescription} = req.body; 
        const safeSelfDescription = selfDescription || "None provided";


        const interviewReportByAi = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription:safeSelfDescription,
            jobDescription
        });


        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            jobDescription,
            selfDescription: safeSelfDescription,
            ...interviewReportByAi
        });
        res.status(201).json({
            message: "Report Generated Successfully", 
            interviewReport
        });
        
    } catch (error) {
        if (error.name === 'InvalidPDFException') {
            return res.status(400).json({ message: "Invalid PDF file structure. Please upload a valid PDF." });
        }
        console.error("DEBUG REPORT ERROR:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

async function getInterviewReportController(req, res) {

    try {
        const { interviewId } = req.params;

        const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id });
        if (!interviewReport) {
            return res.status(404).json({ message: "Interview report not found" });
        }

        res.status(200).json({ 
            message: "Interview report retrieved successfully",
            interviewReport
        });
    } catch (err) {
        res.status(500).json({ 
            message: "Error fetching report", error: err.message 
        })
    }

    
}

async function getAllInterviewReportsController(req, res) {

    try {
        const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select
        ('-resume -selfDescription -jobDescription -v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan' ); 
        // Excluded  fields for privacy

        res.status(200).json({
            message: "All interview reports retrieved successfully",
            interviewReports
        })
    } catch (err) {
        res.status(500).json({ 
            message: "Error fetching report", error: err.message 
        })
    }
    
}

async function generateResumePDFController(req, res) {
    try {
    const { interviewId } = req.params;
    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id });
    if (!interviewReport) {
        return res.status(404).json({ 
            message: "Interview report not found" 
        });
    }

    const { resume, selfDescription, jobDescription } = interviewReport;
    const pdfBuffer = await generateResumePDF({ resume, selfDescription, jobDescription });

    res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=resume_${interviewId}.pdf`,
        'Content-Length': pdfBuffer.length
    });
    res.send(pdfBuffer);
    } catch (err) {
        res.status(500).json({ 
            message: "Error fetching report", error: err.message 
        })
    }
    
}




module.exports = {
    generateInterviewReportController,
    getInterviewReportController,
    getAllInterviewReportsController,
    generateResumePDFController
}