import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(`${import.meta.env.GEMINI_API_KEY}`);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

async function mainChat(region) {
    const message = await model.generateContent(
        `Você está restrito a falar somente em italiano e só sobre a cultura e a região de ${region}`
    );

    const response = await message.response;
    const text = response.text();

    console.log(text);
};

const userQuestionDiv = (question) => {
    return (
        <div>
            <p>{question}</p>
        </div>
    )
}

const AIResponseDiv = (ai_response) => {
    return (
        <div>
            <p>{ai_response}</p>
        </div>
    )
}

mainChat();

export async function getResponse(prompt) {
    const message = await model.generateContent(prompt);

    const response = await message.response;
    const text = response.text();

    userQuestionDiv(question);
    AIResponseDiv(text);
}