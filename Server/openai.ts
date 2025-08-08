import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

interface TroubleshootingAnalysis {
  diagnosis: string;
  solutions: {
    step: number;
    title: string;
    description: string;
    code?: string;
    imageDescription?: string;
  }[];
  resources: {
    documentation: string[];
    tutorials: string[];
  };
}

export async function analyzeIoTTroubleshooting(
  microcontroller: string,
  projectType: string,
  components: string[],
  problemDescription: string,
  imageBase64s: string[]
): Promise<TroubleshootingAnalysis> {
  try {
    const messages: any[] = [
      {
        role: "system",
        content: `You are an expert IoT troubleshooting assistant. Analyze the hardware setup and problem description to provide comprehensive troubleshooting solutions.

Your response must be in JSON format with this structure:
{
  "diagnosis": "Brief summary of the identified issue",
  "solutions": [
    {
      "step": 1,
      "title": "Solution step title",
      "description": "Detailed description of what to do",
      "code": "Optional code snippet if needed",
      "imageDescription": "Optional description of what the user should see"
    }
  ],
  "resources": {
    "documentation": ["List of helpful documentation links"],
    "tutorials": ["List of helpful tutorial links"]
  }
}

Focus on:
- Hardware connections and wiring issues
- Software/firmware problems
- Power supply issues
- GPIO pin conflicts
- Component compatibility
- Common troubleshooting steps

Be specific and actionable in your solutions.`
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Microcontroller: ${microcontroller}
Project Type: ${projectType}
Components: ${components.join(", ")}
Problem Description: ${problemDescription}

Please analyze this IoT setup and provide troubleshooting solutions.`
          },
          ...imageBase64s.map(base64 => ({
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${base64}`
            }
          }))
        ]
      }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      response_format: { type: "json_object" },
      max_tokens: 2000,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result as TroubleshootingAnalysis;
  } catch (error) {
    console.error("Error analyzing IoT troubleshooting:", error);
    throw new Error("Failed to analyze IoT setup: " + (error as Error).message);
  }
}
