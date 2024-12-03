import React, { useState, useEffect } from 'react';
import './Region.css';

async function generateResponse(userMessage) {
    let apiResponse = '';

    try {
        const response = await fetch(api_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{
                        text: `Responda com precisão e de maneira detalhada, respondendo apenas ao que for perguntado. Pergunta: ${userMessage}`
                    }]
                }]
            })
        });

        const data = await response.json();
        apiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (apiResponse) {
            // Formata a resposta e adiciona ao histórico
            const formattedResponse = formatText(apiResponse);
            setChatHistory(prevHistory => [...prevHistory, { role: 'bot', text: formattedResponse }]);
        } else {
            console.error("Erro ao obter resposta da API.");
        }
    } catch (e) {
        console.error("Erro ao chamar a API:", e);
    }
}
// Função aprimorada para formatar o texto com títulos, parágrafos, listas e negritos (NAO MEXER PLMDS)
const formatText = (text) => {
    let formattedText = text
        // Negrito para itens destacados com **, **texto**
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Títulos que aparecem como "Título:" ou "Exemplo:"
        .replace(/^([A-Z][\w\s]+):/gm, '<h3>$1:</h3>')
        // Listas não ordenadas, usando marcadores como hífens (-) ou asteriscos (*)
        .replace(/^- (.*?)(?=\n|$)/gm, '<li>$1</li>')
        // Quebra de linha dupla para parágrafos
        .replace(/\n\n+/g, '</p><p>')
        // Quebra de linha única para novas linhas dentro de parágrafos
        .replace(/\n/g, '<br>');

    // Adiciona tags de parágrafo ao início e ao fim do texto formatado
    formattedText = `<p>${formattedText}</p>`;

    // Envolvendo listas com tags <ul> se houver <li> (para listas ordenadas)
    formattedText = formattedText.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>');

    // Substitui pontos extras, vírgulas ou espaços incorretos
    formattedText = formattedText
        .replace(/(\s*\.\s*|\.+)/g, '. ') // Limita múltiplos pontos
        .replace(/\,+/g, ', ')             // Corrige vírgulas seguidas
        .replace(/\s+,/g, ',')             // Remove espaço antes de vírgulas
        .replace(/\s\s+/g, ' ');           // Remove múltiplos espaços

    return formattedText;
};

export default function ChatBot() {
    const api_key = "AIzaSyDn93a1ujs9L1-l2YEBgE57ZzSBdVeYRIw"; // Chave para iniciar
    const api_url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${api_key}`; // URL para funcionamento

    const [message, setMessage] = useState(''); // Mensagem atual do usuário
    const [chatHistory, setChatHistory] = useState([]); // Histórico de mensagens
    const [topic, setTopic] = useState(''); // Assunto do chatbot com base na URL
    const [isLoading, setIsLoading] = useState(false); // Estado de carregamento

    useEffect(() => {
        const urlPath = window.location.pathname; // Obtém o caminho da URL
        const subject = urlPath.startsWith('/') ? urlPath.slice(1) : urlPath; // Extrai o assunto
        setTopic(subject); // Define o assunto
    }, []);

    async function generateResponse(userMessage) {
        setIsLoading(true); // Inicia o estado de carregamento

        try {
            const response = await fetch(api_url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        role: "user",
                        parts: [{
                            // Instruções para que o chatbot responda de maneira direta e limitada à pergunta
                            text: `Responda de maneira bem detalhada e completa sobre apenas o que foi perguntado educadamente. Por exemplo: para um cumprimento, responda com algo como "Boa noite! Posso ajudar com alguma informação sobre a região de ${topic}?" ou, para perguntas específicas, responda apenas o que foi perguntado de uma forma mais educada e completa. Responda também somente sobre a região italiana "${topic}" Pergunta: ${userMessage}`
                        }]
                    }]
                })
            });

            const data = await response.json();
            const apiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (apiResponse) {
                // Formata a resposta com parágrafos, negrito e listas
                const formattedResponse = formatText(apiResponse);

                // Adiciona a resposta formatada ao histórico de mensagens
                setChatHistory(prevHistory => [...prevHistory, { role: 'bot', text: formattedResponse }]);
            } else {
                console.error("Erro ao obter resposta da API.");
            }
        } catch (e) {
            console.error("Erro ao chamar a API:", e);
        }

        setIsLoading(false); // Termina o estado de carregamento
    }

    // Função para formatar o texto com parágrafos, negrito e listas
    const formatText = (text) => {
        let formattedText = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Formata **texto** como <strong>texto</strong>
            .replace(/\n\n/g, '<br/><br/>');  // Substitui quebras de linha duplas por quebras de parágrafo
        return formattedText;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (message.trim() !== '') {
            // Adiciona a mensagem do usuário ao histórico de mensagens
            setChatHistory(prevHistory => [...prevHistory, { role: 'user', text: message }]);
            generateResponse(message);
            setMessage(''); // Limpa o campo de entrada após o 
        }
    };

    return (
        <>
            <header className='bot__header'>
                <h1>Converse com nossa IA sobre </h1>
            </header>
            <div className="chat_history">
                {chatHistory.map((msg, index) => (
                    <div key={index} className={msg.role === 'user' ? 'user-message' : 'bot-message'}>
                        <strong>{msg.role === 'user' ? 'Você' : 'GiovanniBot'}:</strong>
                        <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                    </div>
                ))}
                {isLoading && (
                    <div className="loading-indicator bot-message"><strong>GiovanniBot</strong> está pensando...</div>
                )}
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