import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

export async function analyzeJob(job) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are an expert technical recruiter and career coach.

Analyze the following job application.

Resume:
${job.resumeText || "No resume uploaded"}

Company:
${job.company}

Role:
${job.role}

Location:
${job.location}

Application Status:
${job.status}

Notes:
${job.notes}

Evaluate the candidate's resume specifically for THIS role.

Return ONLY valid JSON in the following format:

{
  "company": "",
  "role": "",
  "analysis": {
    "resume_match_score": 0,
    "success_probability_percent": 0,
    "summary": "",
    "strengths": [],
    "missing_skills": [],
    "ats_improvements": [],
    "next_actions": [],
    "interview_preparation": [],
    "risk_assessment": []
  }
}

Rules:
- Resume match score should be from 0-100.
- Success probability should be from 0-100.
- Mention only skills actually missing from the resume.
- Give actionable ATS improvements.
- Return JSON only.
- Do NOT use markdown.
- Do NOT wrap the JSON inside \`\`\`json.
- No explanations outside JSON.
`;

  try {
    const result = await model.generateContent(prompt);

    const response = await result.response;

    let text = response.text();

    // Remove markdown if Gemini accidentally returns it
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}