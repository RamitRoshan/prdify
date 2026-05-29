import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'mock-api-key',
});

const PRD_SYSTEM_PROMPT = `You are an expert AI Product Manager (PRDify Agent).
Your goal is to output a comprehensive, structured, and professional Product Requirements Document (PRD) in Markdown format.
The document must include the following sections exactly:
# [Project Name]
## 1. Product Overview
## 2. Problem Statement
## 3. Proposed Solution
## 4. Target Audience & Personas
## 5. Core Features & MVP
## 6. Functional Requirements
## 7. Non-Functional Requirements
## 8. Suggested Tech Stack
## 9. Monetization Strategy
## 10. Development Roadmap & Future Scope

Do not wrap your response in JSON. Output ONLY the raw markdown string. Ensure it is highly professional and detailed.`;

export const generateInitialPRD = async ({ rawIdea, category, audience, platform }) => {
  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your_api_key') {
    console.warn("Using mock Claude response");
    return {
      title: "Grocery Compare App",
      prdMarkdown: `# Grocery Compare App\n\n## 1. Product Overview\nA platform to compare prices between Blinkit and Zepto.\n\n## 2. Problem Statement\nUsers overpay for groceries because they do not compare prices.`
    };
  }

  const prompt = `Please generate a complete PRD based on the following raw startup idea.
Raw Idea: "${rawIdea}"
${category ? `Category: ${category}\n` : ''}
${audience ? `Target Audience: ${audience}\n` : ''}
${platform ? `Target Platform: ${platform}\n` : ''}

Generate the PRD in Markdown. Start the response with "# [Creative Project Name]".`;

  try {
    const response = await anthropic.messages.create({
      model: process.env.CLAUDE_MODEL || "claude-3-5-sonnet-20241022",
      max_tokens: 4000,
      temperature: 0.7,
      system: PRD_SYSTEM_PROMPT,
      messages: [{ role: "user", content: prompt }]
    });

    const markdownOutput = response.content[0].text;
    const titleMatch = markdownOutput.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : 'Untitled Project';

    return { prdMarkdown: markdownOutput, title };
  } catch (error) {
    console.error("Claude API Error:", error);
    throw new Error("Failed to generate PRD with AI.");
  }
};

export const refineExistingPRD = async (project, userMessage) => {
  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your_api_key') {
    return {
      updatedMarkdown: project.prdMarkdown + `\n\n*(Mock update based on: ${userMessage})*`,
      assistantReply: "I have updated the PRD based on your request!"
    };
  }

  const history = project.chatHistory.map(msg => ({
    role: msg.role === 'assistant' ? 'assistant' : 'user',
    content: msg.content
  }));

  // Append instructions to the conversation for the latest step
  const newPrompt = `User Request to update PRD: "${userMessage}"
  
You are an AI Product Manager. Analyze the user's request. 
You must return your response in the following strict format:

<reply>
Your conversational reply to the user (e.g., "I have added the authentication requirements to the Non-Functional Requirements section.")
</reply>

<prd>
The ENTIRE updated Markdown PRD including the new changes. Do not use truncation like "Rest remains the same". You must output the entire document so it can directly replace the old one.
</prd>`;

  history.push({ role: 'user', content: newPrompt });

  try {
    const response = await anthropic.messages.create({
      model: process.env.CLAUDE_MODEL || "claude-3-5-sonnet-20241022",
      max_tokens: 4000,
      temperature: 0.5,
      system: "You are an expert AI Product Manager collaborating dynamically with a user to refine a PRD.",
      messages: history
    });

    const outputText = response.content[0].text;
    
    // Extract the <reply> and <prd> blocks
    const replyMatch = outputText.match(/<reply>([\s\S]*?)<\/reply>/);
    const prdMatch = outputText.match(/<prd>([\s\S]*?)<\/prd>/);

    const assistantReply = replyMatch ? replyMatch[1].trim() : "I have updated the PRD as requested.";
    const updatedMarkdown = prdMatch ? prdMatch[1].trim() : project.prdMarkdown; // Fallback to original if missing

    return { updatedMarkdown, assistantReply };
  } catch (error) {
    console.error("Claude API Error:", error);
    throw new Error("Failed to refine PRD with AI.");
  }
};
