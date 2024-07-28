import axios from "axios";
import { useState } from "react";

export default function Weather() {
    const [data, setData] = useState(null);
    async function sendTextToChatGPT() {
        try {
            const response = await axios.get('https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=GEu6wsIDPSy6TOF0FeQR0MHjyLMgI1wW', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('GPT-3 Response: ', response);
            setData(response);
        } catch (error) {
            console.error('something not right', error);
        }
    }

    sendTextToChatGPT();

    return (
        <div>
            <textarea>{data}</textarea>
        </div>
    )
}