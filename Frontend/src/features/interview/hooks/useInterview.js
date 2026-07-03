import { generateInterviewReport, getInterviewReportbyId, getAllInterviewReports, generateResumePDF } from "../services/interview.api";
import { useContext, useEffect  } from "react";
import { InterviewContext } from "../interview.context";
import { useParams } from "react-router";

export const useInterview = () =>{
    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if(!context){
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const {loading, setLoading, isGenerating, setIsGenerating, report, setReport, reports, setReports} = context;

    const generateReport = async ({jobDescription, selfDescription, resumeFile}) =>{

        setIsGenerating(true)
        let response = null

        try{
            response = await generateInterviewReport({jobDescription, selfDescription, resumeFile})
            setReport(response.interviewReport)

            return response.interviewReport

        } catch (error){
            console.error("Error creating interview report:", error);
            throw error;
        } finally {
            setIsGenerating(false)
        }
        
    }

    const getReportById = async (interviewId) => {

        setLoading(true)
        let response = null

        try{

            response = await getInterviewReportbyId(interviewId)
            setReport(response.interviewReport)
            return response.interviewReport

        } catch (error){
            console.error("Error fetching interview report:", error);
            throw error;
        } finally {
            setLoading(false)
        }
       
    }

    const getReports = async () => {

        setLoading(true)
        let response = null

        try{

            response = await getAllInterviewReports()
            setReports(response.interviewReports)

            return response.interviewReports

        } catch (error){
            console.error("Error fetching all interview reports:", error);
            throw error;
        } finally {
            setLoading(false)
        }
       
    }

    const getResumePdf = async (interviewId) =>{
        setLoading(true)
        // let response = null
        try {
            const response = await generateResumePDF({ interviewId })
            const url = window.URL.createObjectURL(new Blob( [response], {type: "application/pdf"}))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute('download', `resume_${interviewId}.pdf`)
            document.body.appendChild(link)
            link.click()

            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)


        } catch (error) {
            console.log(error);
        } 
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                if(interviewId){
                    await getReportById(interviewId)
                }
                await getReports()
            } catch (error) {
                console.error("Error loading initial interview data", error);
            }
        };
        fetchInitialData();
    }, [interviewId])

    return {
        loading,
        isGenerating,
        report,
        reports,
        generateReport,
        getReportById,
        getReports,
        getResumePdf
    }
            
}