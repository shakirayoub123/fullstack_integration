import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    const fetchMessages = () => {
        axios.get('http://localhost:3000/messages')
            .then((res) => setMessages(res.data))
            .catch((err) => console.error("Error fetching messages:", err));
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        axios.post('http://localhost:3000/messages', { text: inputText })
            .then(() => {
                setInputText('');
                fetchMessages(); // Refresh messages
            })
            .catch((err) => console.error("Error sending message:", err));
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>React + MongoDB Project</h1>

            <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type a message"
                />
                <button type="submit">Send</button>
            </form>

            <h3>Messages from DB:</h3>
            <ul>
                {messages.map((msg) => (
                    <li key={msg._id}>{msg.text}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
