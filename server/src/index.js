import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(`${import.meta.env.GEMINI_API_KEY}`)
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

async function mainChat() {
    const message = await model.generateContent('hi')
    const response = await message.response
    const text = response.text()

    console.log(text)
}

mainChat()

function getResponse(prompt) {}

function handleSubmit(event, message) {
    event.preventDefault()

    let userMessage = message
    var prompt = userMessage.ariaValueMax.trim()

    if (prompt === "") {
        return;
    }
}