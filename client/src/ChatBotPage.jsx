import React from 'react';
import { getResponse } from '../../server/src/index'

export default function ChatBot() {
    const [message, setMessage] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        getResponse(message);
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