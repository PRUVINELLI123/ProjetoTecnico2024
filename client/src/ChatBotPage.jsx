import React from 'react';
import { getResponse } from '../../server/src/index'

export default function ChatBot() {
    const [messages, setMessages] = React.useState('');
    const [responses, setResponses] = React.useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
       <>
        <form action="">
            <input type="text" aria-valuemin={1} />
            <button type="submit" onSubmit={handleSubmit}></button>
        </form>
       </>
    )
}