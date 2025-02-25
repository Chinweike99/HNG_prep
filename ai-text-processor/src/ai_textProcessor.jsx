import React, { useState } from 'react';
import axios from 'axios';

const Ai_textProcessor = () => {
    const [text, setText] = useState("");
    const [message, setMessage] = useState([]);
    const [language, setLanguage] = useState("en");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!text.trim()) return alert("Please enter a text");
        const newMessage = { text, type: "user" };
        setMessage((prev) => [...prev, newMessage]);
        setText("");

        await detectLanguage(text);
    };

    const detectLanguage = async (inputText) => {
        setLoading(true);
        try {
            console.log("Detecting language for text:", inputText);
            const response = await axios.post("https://chromedev.ai/api/language-detection", { text: inputText });
            console.log("Language detection response:", response.data);

            if (!response.data.language) {
                throw new Error("Language not detected");
            }

            const detectedLang = response.data.language;
            setMessage((prev) => [
                ...prev,
                { text: `Detected Language: ${detectedLang}`, type: "bot" }
            ]);

            if (detectedLang === "en" && inputText.length > 150) {
                setMessage((prev) => [
                    ...prev,
                    { text: "Click summarize to shorten text", type: "bot", action: "summarize" }
                ]);
            }
        } catch (error) {
            console.error("Failed to fetch language:", error);
            alert("Failed to fetch language");
        }
        setLoading(false);
    };

    const summarizeText = async (originalText) => {
        setLoading(true);
        try {
            console.log("Summarizing text:", originalText);
            const response = await axios.post('https://chromedev.ai/api/summarizer', { text: originalText });
            console.log("Summarization response:", response.data);

            if (!response.data.summary) {
                throw new Error("Summary not generated");
            }

            const summary = response.data.summary;
            setMessage((prev) => [
                ...prev,
                { text: `Summary: ${summary}`, type: "bot" }
            ]);
        } catch (error) {
            console.error("Failed to summarize:", error);
            alert("Failed to summarize");
        }
        setLoading(false);
    };

    const translateText = async (originalText) => {
        setLoading(true);
        try {
            console.log("Translating text:", originalText);
            console.log("Target language:", language);

            if (!originalText) {
                throw new Error("No text to translate");
            }

            const response = await axios.post("https://chromedev.ai/api/translator", {
                text: originalText,
                target_language: language
            });
            console.log("Translation response:", response.data);

            if (!response.data.translation) {
                throw new Error("Translation failed");
            }

            const translatedText = response.data.translation;
            setMessage((prev) => [
                ...prev,
                { text: `Translated: ${translatedText}`, type: "bot" }
            ]);
        } catch (error) {
            console.error("Translation failed:", error);
            alert("Translation failed");
        }
        setLoading(false);
    };

    return (
        <div className='m-0 p-0 py-32 px-16 flex flex-col items-center bg-red-500 b'>
            <div>
                {message.map((message, index) => (
                    <div key={index}>
                        <p>{message.text}</p>
                        {message.action === "summarize" && (
                            <button onClick={() => summarizeText(message.text)} className='bg-white text-black text-2xl'>Summarize</button>
                        )}
                    </div>
                ))}
            </div>

            <div className='border mt-32 bg-gray-600 text-white w-[400px] mb-8 min:w-[300px]'>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder='Type your text'
                    className='w-full'
                />
                <button onClick={handleSend}>✉️</button>
            </div>

            <div className='bg-white p-4 w-full'>
                <select onChange={(e) => setLanguage(e.target.value)}>
                    <option value="en">English</option>
                    <option value="pt">Portuguese</option>
                    <option value="es">Spanish</option>
                    <option value="ru">Russian</option>
                    <option value="tr">Turkish</option>
                    <option value="fr">French</option>
                </select>
                <button onClick={() => translateText(message[message.length - 1]?.text)}>
                    Translate
                </button>
            </div>
            {loading && <p>Processing ...</p>}
        </div>
    );
};

export default Ai_textProcessor;