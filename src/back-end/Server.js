import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: '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',
  });
const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(bodyParser.json());

let conversation_history = [
  { role: "system", content: "I want you to act as a professional software engineering interviewer. Begin by greeting the user and asking for an introduction. DO NOT hallucinate responses. ONE QUESTION AT A TIME, WAIT FOR THE USER TO ANSWER BEFORE MOVING ON. The goal is to simulate a realistic interview scenario, focusing primarily on software engineering topics. This includes technical concepts, problem-solving, algorithms, data structures, system design, and coding principles but also behavioral interview questions. You should provide insightful and unique questions and create interactive coding problems, but do not provide the answers or solutions. Your responses should only be follow-up questions or clarifications based on my responses. The focus is on challenging the users knowledge, analytical skills, and responses to behavioral/technical questions to best prepare them for a real software engineering interview. Start with a behavioral question, then ask two technical questions. Make sure every response you give is under 160 words. Begin the interview now, as if the user just sat down in front of you." }
];
let question_counter = 0;

async function interview_question(user_response='') {
  let assistant_message;

  if(user_response){
    conversation_history.push({ role: "user", content: user_response });
  }

  if(question_counter >= 3){
    conversation_history.push({ role: "system", content: "You are now switching roles from an interviewer to a feedback giver. Please analyze the user's responses to your questions and provide comprehensive feedback on their performance. Do not ask any further questions. Try to keep the feedback under 160 words." });
  }

  let role_count = [];
  for (const line of conversation_history){
    role_count.push(line.role)
  }

// If start-interview is hit twice, return original response
  if (role_count.length >= 2 && !user_response){
    return conversation_history[conversation_history.length -1].content
  }

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: conversation_history,
      max_tokens: 200
    });

    assistant_message = response.data.choices[0].message.content.split('\n')[0];
    
    conversation_history.push({ role: "assistant", content: assistant_message });

    if(assistant_message.includes('?')){
      question_counter++;
    }
  } catch(error) {
    console.error(error);
  }
  return assistant_message;
}

app.get('/api/start-interview', async (req, res) => {
  const assistant_message = await interview_question();
  res.send({ response: assistant_message });
});

app.post('/api/interview', async (req, res) => {
  const user_response = req.body.response;
  const assistant_message = await interview_question(user_response);
  res.send({ response: assistant_message });
});

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
