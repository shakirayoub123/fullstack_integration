import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/')
            .then((res) => setMessage(res.data))
            .catch((err) => console.error("Error fetching from backend:", err));
    }, []);

    return (
        <div style={{ padding: '2rem' }}>
            <h1>React + MongoDB Project</h1>
            <p>Message from Backend: {message}</p>
        </div>
    );
}

export default App;
