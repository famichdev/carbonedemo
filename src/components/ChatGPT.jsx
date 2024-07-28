import React, { useState } from 'react';
import axios from 'axios';
import FULL from '../../full.json';

const API_KEY = 'sk-svcacct-NfNFjn99AlJXhfDvwMRRT3BlbkFJUcmsoQP5LC4b7zdcYwSv';

const ChatGPTComponent = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [conversation, setConversation] = useState([
    {
      role: 'system',
      content: 'You are a personal assistant for Carbone Restaurant in Miami Beach. The restaurant specializes in Italian cuisine and has a variety of dishes including pasta, seafood, and desserts. The restaurant is known for its excellent service and high-quality ingredients.'
    },
  ]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const recognition = new window.webkitSpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  const record = () => {
    recognition.start();

    recognition.onresult = function (event) {
      const speechToText = event.results[0][0].transcript;
      setInput(speechToText);
      sendTextToChatGPT(speechToText);
    };
  };

  const textToSpeech = (text) => {
    setResponse(text);
    const synth = window.speechSynthesis;
    let utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const preferredVoices = ['Samantha', 'Daniel', 'Karen', 'Moira'];
    let selectedVoice = voices.find((voice) =>
      preferredVoices.includes(voice.name)
    );

    if (!selectedVoice) {
      selectedVoice = voices[0];
    }
    utterance.voice = selectedVoice;
    synth.speak(utterance);
  };

  const sendTextToChatGPT = async (text) => {
    try {
      const updatedConversation = [
        ...conversation,
        { role: 'user', content: text },
      ];

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: updatedConversation,
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const replyText = response.data.choices[0].message.content;
      setConversation([
        ...updatedConversation,
        { role: 'assistant', content: replyText },
      ]);
      textToSpeech(replyText);
    } catch (error) {
      console.error('Error in API call: ', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    sendTextToChatGPT(input);
  };

  return (
    <div className="chatgpt">
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={handleInputChange}
          rows="5"
          cols="50"
          placeholder="Ask me anything..."
        ></textarea>
        <br />
        <button type="submit">Submit</button>
      </form>
      <button onClick={record}>Use Voice</button>
      <div>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default ChatGPTComponent;
