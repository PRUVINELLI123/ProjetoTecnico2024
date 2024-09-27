import React from 'react';
import { getResponse } from '../../server/src/index'

export default function ChatBot() {
    const [messages, setMessages] = React.useState('');
    const [responses, setResponses] = React.useState([]);

    function handleSubmit(event, message) {
        event.preventDefault()
    
        let userMessage = message
        var prompt = userMessage.ariaValueMax.trim()
    
        if (prompt === "") {
            return;
        }
    }

    return (
        <h1>Hello World</h1>
    )
}