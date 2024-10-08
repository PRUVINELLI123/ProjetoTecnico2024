import React from 'react';
import './App.css'

export default function ChatBot() {
   const api_key = "AIzaSyBidIQR-AhzrtAf_CRZHhJ6XvpLVyo2cg0"
   const api_url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${api_key}`

   const [message, setMessage] = React.useState('');

   let userFinalMessage = null

   async function generateResponse(message) {
      try {
         const response = await fetch(api_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               contents: [{
                  role: "user",
                  parts: [{ text: message }]
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

      userFinalMessage = message

      generateResponse(userFinalMessage);
   }

   return (
      <>
         <div className="chat_history">
            {/**/}
         </div>
         <div id="message_box">
            <form method='post' id='message_form'>
               <input type="text" onChange={(e) => setMessage(e.target.value)} aria-valuemin={2} />
               <button type="submit" onSubmit={handleSubmit}>Enviar</button>
            </form>
         </div>
      </>
   )
}