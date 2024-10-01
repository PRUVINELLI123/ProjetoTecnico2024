import React from 'react';

export default function ChatBot() {
    const api_key = "AIzaSyBidIQR-AhzrtAf_CRZHhJ6XvpLVyo2cg0"
    const api_url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${api_key}`

    const [message, setMessage] = React.useState('');

    let userFinalMessage = null

    async function generateResponse () {
        try {
            const response = await fetch(api_url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        role: "user",
                        parts: [{ text: userFinalMessage }]
                    }]
                })
            })

            const data = await response.json()
            const apiResponse = data?.candidates[0].content.parts[0].text

            console.log(apiResponse)
        } catch (e) {
            console.log(e)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        generateResponse(message);
    }

    return (
        <>
            <div>
                <form action="">
                    <input type="text" onChange={(e) => setMessage(e.target.value)} aria-valuemin={1} />
                    <button type="submit" onSubmit={handleSubmit}></button>
                </form>
            </div>
        </>
    )
}