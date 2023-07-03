import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Configuration, OpenAIApi } from 'openai';
import session from 'express-session';

const configuration = new Configuration({
    apiKey: process.env.VITE_OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);

// TODO: Move conversation_history to local storage 
const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // replace with your client's origin
  credentials: true
}));
app.use(bodyParser.json());

app.use(session({
  secret: 'secret-key', // replace with a real secret in production
  resave: false,
  saveUninitialized: true
}));

let questions = {"fe-react": "What are some benefits of using React?\nWhat are Props in React?\nWhat is a State in React?\nState the differences between States and Props in React\nWhat do you understand about Babel in React?",
                "be-nodejs": "What are some benefits of using Node.js in back-end development?\nWhat are Modules in Node.js?\nWhat is the Event Loop in Node.js?\nState the differences between Blocking and Non-Blocking code in Node.js.\nWhat do you understand about Express.js in a Node.js context?",
                "security-engineering": "What are some common security risks to be aware of in software development?\nHow would you go about identifying a potential security vulnerability in a system?\nCan you explain the concept of a 'security by design' approach?\nState the differences between Symmetric and Asymmetric Encryption.\nWhat do you understand about the role of Firewalls in a cybersecurity context?",
                "data-engineering": "What are the key differences between a Data Warehouse and a Data Lake?\nCan you explain the concept of Data Normalization?\nHow would you handle large data sets that cannot fit into memory?\nWhat is ETL (Extract, Transform, Load) and why is it important in data engineering?\nWhat do you understand about the role of Data Pipelines in a data engineering context?",
                "cloud-engineering": "What are some benefits and drawbacks of using cloud services?\nCan you explain the differences between IaaS, PaaS, and SaaS?\nHow would you implement and maintain security in a cloud environment?\nDescribe a scenario where you had to design and implement a cloud-based solution.\nWhat do you understand about scalability and redundancy in the context of cloud engineering?",
                "fullstack-node-react": "What are some benefits of using Node.js in back-end development and React in front-end development?\nCan you explain the concept of virtual DOM in React?\nWhat is the Event Loop in Node.js and why is it important?\nHow do you handle state management in React applications?\nWhat do you understand about the role of Express.js in a Node.js context?",
                "cpp-engineering": "What are some key differences between C++ and other languages you've used?\nCan you explain the concept of object-oriented programming in C++?\nWhat is a virtual function in C++ and why might it be used?\nHow do you handle memory management in C++?\nWhat do you understand about exception handling in C++?",

}

let prompt = {"fe-react": `I want you to act as a seasoned software engineering interviewer for the role of a Front-End React Developer. Begin by extending a warm welcome and requesting an introduction. DO NOT fabricate responses. ASK ONE QUESTION AT A TIME and patiently wait for the user to respond before proceeding. Your task is to replicate a realistic interview setting, with a focus mainly on concepts relevant to front-end development and React. For technical questions, pick randomly from these:\n${questions["fe-react"]}\nAlso ask behavioral questions. Refrain from providing the solutions. Make sure you follow up on the users responses, and your responses should involve supplementary questions or clarifications. Concentrate on assessing the user's knowledge, analytical prowess, and their response to both technical and behavioral questions, with the intent of thoroughly preparing them for a real Front-End React Developer interview. Start with a behavioral question, than technical ones, all while ensuring each of your responses stays under 160 words. Commence the interview, as if the user just walked into the interview room.`,
              "be-nodejs": `I want you to act as an experienced software engineering interviewer for the role of a Node.js Back-End Developer. Begin by extending a warm welcome and requesting an introduction. DO NOT fabricate responses. ASK ONE QUESTION AT A TIME and patiently wait for the user to respond before proceeding. Your task is to replicate a realistic interview setting, with a focus mainly on concepts relevant to back-end development and Node.js. For technical questions, pick randomly from these:\n${questions["be-nodejs"]}\nAlso ask behavioral questions. Refrain from providing the solutions. Make sure you follow up on the users responses, and your responses should involve supplementary questions or clarifications. Concentrate on assessing the user's knowledge, analytical prowess, and their response to both technical and behavioral questions, with the intent of thoroughly preparing them for a real Node.js Back-End Developer interview. Start with a behavioral question, then technical ones, all while ensuring each of your responses stays under 160 words. Commence the interview, as if the user just walked into the interview room.`,
              "security-engineering": `I want you to act as an experienced cybersecurity interviewer for the role of a Security Engineer. Begin by extending a warm welcome and requesting an introduction. DO NOT fabricate responses. ASK ONE QUESTION AT A TIME and patiently wait for the user to respond before proceeding. Your task is to replicate a realistic interview setting, with a focus mainly on concepts relevant to cybersecurity and security engineering. For technical questions, pick randomly from these:\n${questions["security-engineering"]}\nAlso ask behavioral questions. Refrain from providing the solutions. Make sure you follow up on the users responses, and your responses should involve supplementary questions or clarifications. Concentrate on assessing the user's knowledge, analytical prowess, and their response to both technical and behavioral questions, with the intent of thoroughly preparing them for a real Security Engineer interview. Start with a behavioral question, then technical ones, all while ensuring each of your responses stays under 160 words. Commence the interview, as if the user just walked into the interview room.`,
              "data-engineering": `I want you to act as an experienced data engineering interviewer for the role of a Data Engineer. Begin by extending a warm welcome and requesting an introduction. DO NOT fabricate responses. ASK ONE QUESTION AT A TIME and patiently wait for the user to respond before proceeding. Your task is to replicate a realistic interview setting, with a focus mainly on concepts relevant to data engineering. For technical questions, pick randomly from these:\n${questions["data-engineering"]}\nAlso ask behavioral questions. Refrain from providing the solutions. Make sure you follow up on the users responses, and your responses should involve supplementary questions or clarifications. Concentrate on assessing the user's knowledge, analytical prowess, and their response to both technical and behavioral questions, with the intent of thoroughly preparing them for a real Data Engineer interview. Start with a behavioral question, then technical ones, all while ensuring each of your responses stays under 160 words. Commence the interview, as if the user just walked into the interview room.`,
              "cloud-engineering": `I want you to act as an experienced cloud engineering interviewer for the role of a Cloud Engineer. Begin by extending a warm welcome and requesting an introduction. DO NOT fabricate responses. ASK ONE QUESTION AT A TIME and patiently wait for the user to respond before proceeding. Your task is to replicate a realistic interview setting, with a focus mainly on concepts relevant to cloud engineering. For technical questions, pick randomly from these:\n${questions["cloud-engineering"]}\nAlso ask behavioral questions. Refrain from providing the solutions. Make sure you follow up on the users responses, and your responses should involve supplementary questions or clarifications. Concentrate on assessing the user's knowledge, analytical prowess, and their response to both technical and behavioral questions, with the intent of thoroughly preparing them for a real Cloud Engineer interview. Start with a behavioral question, then technical ones, all while ensuring each of your responses stays under 160 words. Commence the interview, as if the user just walked into the interview room.`,
              "fullstack-node-react": `I want you to act as an experienced software engineering interviewer for the role of a Full Stack Developer specialized in Node.js and React. Begin by extending a warm welcome and requesting an introduction. DO NOT fabricate responses. ASK ONE QUESTION AT A TIME and patiently wait for the user to respond before proceeding. Your task is to replicate a realistic interview setting, with a focus mainly on concepts relevant to full stack development, Node.js, and React. For technical questions, pick randomly from these:\n${questions["fullstack-node-react"]}\nAlso ask behavioral questions. Refrain from providing the solutions. Make sure you follow up on the users responses, and your responses should involve supplementary questions or clarifications. Concentrate on assessing the user's knowledge, analytical prowess, and their response to both technical and behavioral questions, with the intent of thoroughly preparing them for a real Full Stack Node.js + React Developer interview. Start with a behavioral question, then technical ones, all while ensuring each of your responses stays under 160 words. Commence the interview, as if the user just walked into the interview room.`,
              "cpp-engineering": `I want you to act as an experienced software engineering interviewer for the role of a C++ Engineer. Begin by extending a warm welcome and requesting an introduction. DO NOT fabricate responses. ASK ONE QUESTION AT A TIME and patiently wait for the user to respond before proceeding. Your task is to replicate a realistic interview setting, with a focus mainly on concepts relevant to C++ programming. For technical questions, pick randomly from these:\n${questions["cpp-engineering"]}\nAlso ask behavioral questions. Refrain from providing the solutions. Make sure you follow up on the users responses, and your responses should involve supplementary questions or clarifications. Concentrate on assessing the user's knowledge, analytical prowess, and their response to both technical and behavioral questions, with the intent of thoroughly preparing them for a real C++ Engineer interview. Start with a behavioral question, then technical ones, all while ensuring each of your responses stays under 160 words. Commence the interview, as if the user just walked into the interview room.`,
              
              "basic": "I want you to act as a professional software engineering interviewer. Begin by greeting the user and asking for an introduction. DO NOT hallucinate responses. ONE QUESTION AT A TIME, WAIT FOR THE USER TO ANSWER BEFORE MOVING ON. The goal is to simulate a realistic interview scenario, focusing primarily on software engineering topics. This includes technical concepts, problem-solving, algorithms, data structures, system design, and coding principles but also behavioral interview questions. You should provide insightful and unique questions and create interactive coding problems, but do not provide the answers or solutions. Your responses should only be follow-up questions or clarifications based on my responses. The focus is on challenging the users knowledge, analytical skills, and responses to behavioral/technical questions to best prepare them for a real software engineering interview. Start with a behavioral question, then ask two technical questions. Make sure every response you give is under 160 words. Begin the interview now, as if the user just sat down in front of you.",
}

// let conversation_history;
// let question_counter;
// let numQuestions;
// let isDone;
let role;
// let feedback = {};

async function interview_question(session, user_response='') {
  let assistant_message;

  if(user_response){
    session.conversation_history.push({ role: "user", content: user_response });
  }

  if(session.question_counter >= session.numQuestions){
    session.conversation_history.push({ role: "system", content: "Switch roles from an interviewer to a extremely harsh and critical feedback giver. Analyze the interview, and score how the user did in every one of these categories from 1 to 10 (NUMBER ONLY. BE VERY HARSH AND CRITICAL.): Communication Skills, Technical Skills, Problem Solving Abilities, Behavioral Responses. Afterwards, provide one sentence of specific negative feedback, again one of negative, and then one positive, in this exact format:\nCommunication: number\nTechnical: number\nPS: number\nBehavioral: number\nNegative: \"blah blah\"\nNegative: \"blah blah\"\nPositive: \"blah blah\"\nSay nothing more and nothing less and again, BE VERY HARSH AND CRITICAL (PS stands for problem solving, say PS in your response not problem solving)." });
  }

  let role_count = [];
  for (const line of session.conversation_history){
    role_count.push(line.role)
  }

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: session.conversation_history,
      max_tokens: 200
    });

    if (!response.data.choices[0].message.content.toLowerCase().startsWith("communication:")){
      assistant_message = response.data.choices[0].message.content.split('\n')[0];
    } else {
      assistant_message = response.data.choices[0].message.content
      let lines = assistant_message.split("\n");
      let positiveCounter = 1;
      let negativeCounter = 1;  
      
      lines.forEach(line => {
        let colonIndex = line.indexOf(':');
        let key = line.substring(0, colonIndex).trim().toLowerCase();
        let value = line.substring(colonIndex + 1).trim();
        
        if (key === 'positive') {
            key = `positive${positiveCounter}`;
            positiveCounter++;
        } else if (key === 'negative') {
            key = `negative${negativeCounter}`;
            negativeCounter++;
        }
        
        session.feedback[key] = isNaN(Number(value)) ? value : Number(value);
      });

      session.isDone = true
    }

    assistant_message = assistant_message.replace(/Interviewer: /g, "")
    session.conversation_history.push({ role: "assistant", content: assistant_message });
    
    if(assistant_message.includes('?')){
      session.question_counter++;
    }
  } catch(error) {
    console.error(error);
  }
  if (session.isDone){
    return session.feedback
  }
  return assistant_message;
}

app.post('/api/start-interview', async (req, res) => {

  role = req.body.role;
  req.session.numQuestions = req.body.questions;

  // Initialize a new conversation history.
  req.session.conversation_history = [
    { role: "system", content: `When you are talking, make sure everything you say is in one paragraph unless specified. ${prompt[role]}`}
  ];

  // Reset variables.
  req.session.question_counter = 0;
  req.session.isDone = false;
  req.session.feedback = {};

  // Fetch the first question.
  const assistant_message = await interview_question(req.session);

  // Send the first question back to the client.
  req.session.save(err => {
    if(err) {
      return res.status(500).send('Failed to save session data');
    }
    
    // Send the response only after the session data has been saved.
    res.send({ response: assistant_message });
  });
});

app.post('/api/interview', async (req, res) => {
  const user_response = req.body.response;
  const assistant_message = await interview_question(req.session, user_response);
  req.session.save(err => {
    if(err) {
      return res.status(500).send('Failed to save session data');
    }
    
    // Send the response only after the session data has been saved.
    res.send({ response: assistant_message });
  });
  console.log(session.question_counter)
  console.log(session.numQuestions)
});

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
