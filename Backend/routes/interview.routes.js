const express = require('express');
const interviewRouter = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')
const interviewReportController = require('../controllers/interview.controller')
const upload = require('../middlewares/file.middleware');

interviewRouter.post('/', authMiddleware.authuser, upload.single("resume"), interviewReportController.generateInterviewReportController);


interviewRouter.get('/report/:interviewId', authMiddleware.authuser, interviewReportController.getInterviewReportController);

interviewRouter.get('/', authMiddleware.authuser, interviewReportController.getAllInterviewReportsController);

interviewRouter.post('/resume/pdf/:interviewId', authMiddleware.authuser, interviewReportController.generateResumePDFController);


module.exports = interviewRouter