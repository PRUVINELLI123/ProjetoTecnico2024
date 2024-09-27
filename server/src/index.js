import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(`${import.meta.env.GEMINI_API_KEY}`)
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

async function mainChat(region) {
    const message = await model.generateContent(
        `Você está restrito a falar somente em italiano sobre a cultura da região ${region}`
    )
    const response = await message.response
    const text = response.text()

    console.log(text)
}

export async function getResponse(prompt) {
    const message = await model.generateContent(prompt)
    const response = await message.response
    const text = response.text()
}