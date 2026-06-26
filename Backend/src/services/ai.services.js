const { GoogleGenAI } = require("@google/genai") ;
const { z } = require('zod');
const { zodToJsonSchema } = require('zod-to-json-schema');

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

const interviewReportSchema = z.object({
    matchScore: z.number().describe("The match score between the candidate's resume and the job description, ranging from 0 to 100"),

   technicalQuestions: z.array(z.object({

        question: z.string().describe("The technical question asked during the interview"),          
        intention: z.string().describe("The intention behind asking the question"),
        answer: z.string().describe("The candidate's answer to the technical question")

    })).describe("Technical questions and answers which may be asked by the interviewer"),

    behavioralQuestions: z.array(z.object({

        question: z.string().describe("The behavioral question asked during the interview"),
        intention: z.string().describe("The intention behind asking the question"),
        answer: z.string().describe("The candidate's answer to the behavioral question")

    })).describe("Behavioral questions and answers which may be asked by the interviewer"),

    skillGaps: z.array(z.object({

        skill: z.string().describe("The skill that the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap")

    })).describe("Skill gaps identified in the candidate"),

    preparationPlan: z.array(z.object({

        day: z.number().describe("The day of the preparation plan"),
        focus: z.string().describe("The focus of the preparation plan for that day"),
        tasks: z.array(z.string()).describe("The tasks to be completed on that day")

    })).describe("A day-wise plan for preparing the candidate for the interview")
})

const interviewJsonSchema = zodToJsonSchema(interviewReportSchema);
async function generateInterviewreport({resume, selfDescription, jobDescription}) {

    const prompt = `
    You are an expert technical interviewer. Generate a comprehensive interview report for the candidate.
    IMPORTANT: You must return valid JSON. Do not return arrays of strings. Ensure technicalQuestions, behavioralQuestions, skillGaps, and preparationPlan are arrays of OBJECTS exactly as defined in the schema.
    
    Resume: ${resume}
    Self Description: ${selfDescription}
    Job Description: ${jobDescription}
    `;

    const interaction = await ai.interactions.create({
        model: "gemini-2.5-flash",
        input: prompt,
        response_format: {
            type: 'text',
            mime_type: 'application/json',
            schema: interviewJsonSchema
        },
    })
    const interviewReport = interviewReportSchema.parse(JSON.parse(interaction.output_text));
    console.log(interviewReport);
}

module.exports = generateInterviewreport;