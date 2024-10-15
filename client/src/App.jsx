import React, { useState, useEffect } from 'react';
import './App.css';

export default function ChatBot() {
   const api_key = "AIzaSyBidIQR-AhzrtAf_CRZHhJ6XvpLVyo2cg0"; // Chave para iniciar
   const api_url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${api_key}`; // URL para funcionamento

   const [message, setMessage] = useState(''); // Mensagem atual do usuário
   const [chatHistory, setChatHistory] = useState([]); // Histórico de mensagens
   const [topic, setTopic] = useState(''); // Assunto do chatbot com base na URL

   useEffect(() => {
      const urlPath = window.location.pathname; // Obtém o caminho da URL
      const subject = urlPath.startsWith('/') ? urlPath.slice(1) : urlPath; // Extrai o assunto
      setTopic(subject); // Define o assunto
   }, []);

   async function generateResponse(userMessage) {
      try {
         const response = await fetch(api_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               contents: [{
                  role: "user",
                  parts: [{ text: `Responda somente sobre a região italiana "${topic}": ${userMessage}` }]
               }]
            })
         });

         const data = await response.json();
         const apiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;

         if (apiResponse) {
            // Adiciona a resposta do bot ao histórico de mensagens
            setChatHistory(prevHistory => [...prevHistory, { role: 'bot', text: apiResponse }]);
         } else {
            console.error("Erro ao obter resposta da API.");
         }
      } catch (e) {
         console.error("Erro ao chamar a API:", e);
      }
   }

   const handleSubmit = (event) => {
      event.preventDefault();

      if (message.trim() !== '') {
         // Adiciona a mensagem do usuário ao histórico de mensagens
         setChatHistory(prevHistory => [...prevHistory, { role: 'user', text: message }]);
         generateResponse(message);
         setMessage(''); // Limpa o campo de entrada após o envio
      }
   };

   return (
      <>
         <div className="chat_history">
            {chatHistory.map((msg, index) => (
               <div key={index} className={msg.role === 'user' ? 'user-message' : 'bot-message'}>
                  <strong>{msg.role === 'user' ? 'Você' : 'GiovanniBot'}:</strong> {msg.text}
               </div>
            ))}
         </div>
         <div id="message_box">
            <form onSubmit={handleSubmit} id='message_form'>
               <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  aria-valuemin={2}
               />
               <button type="submit">Enviar</button>
            </form>
         </div>
      </>
   );
}