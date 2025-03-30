import React, { useState, useEffect } from "react";

const TextProcessor = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("en");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (outputText) {
      detectLanguage(outputText).then(setDetectedLanguage);
    }
  }, [outputText]);

  const checkApiSupport = (apiName) => {
    return "ai" in self && apiName in self.ai;
  };

  const detectLanguage = async (text) => {
    if (!checkApiSupport("languageDetector")) return "Unknown";
    try {
      const detector = await self.ai.languageDetector.create();
      const [bestResult] = await detector.detect(text);
      return bestResult.confidence > 0.4 ? bestResult.detectedLanguage : "Unknown";
    } catch (err) {
      console.error("Language detection failed:", err);
      return "Unknown";
    }
  };

  const translateText = async (text, targetLanguage) => {
    if (!checkApiSupport("translator")) return text;
    try {
      const sourceLanguage = await detectLanguage(text);
      const translator = await self.ai.translator.create({ sourceLanguage, targetLanguage });
      return await translator.translate(text);
    } catch (err) {
      console.error("Translation failed:", err);
      return text;
    }
  };

  const summarizeText = async (text) => {
    if (!checkApiSupport("summarizer") || detectedLanguage !== "en") return text;
    try {
      const summarizer = await self.ai.summarizer.create();
      return await summarizer.summarize(text);
    } catch (err) {
      console.error("Summarization failed:", err);
      return text;
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) return setError("Please enter some text.");
    setError("");
    setOutputText(inputText);
    setDetectedLanguage(await detectLanguage(inputText));
  };

  const handleTranslate = async () => {
    setTranslatedText(await translateText(outputText, targetLanguage));
  };

  const handleSummarize = async () => {
    setSummary(await summarizeText(outputText));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">AI Text Processor</h1>
      {error && <div className="text-red-500">{error}</div>}
      
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type your text"
        className="w-full p-2 border rounded mb-2"
      />
      <button onClick={handleSend} className="p-2 bg-blue-500 text-white rounded">Send</button>
      
      {outputText && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <p>{outputText}</p>
          {detectedLanguage && <p className="text-sm text-gray-600">Detected Language: {detectedLanguage}</p>}
        </div>
      )}

      <div className="mt-4">
        <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)} className="p-2 border rounded">
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
        <button onClick={handleTranslate} className="ml-2 p-2 bg-blue-500 text-white rounded">Translate</button>
        {translatedText && <div className="mt-2 p-4 border rounded bg-gray-100">{translatedText}</div>}
      </div>

      {outputText.length > 150 && detectedLanguage === "en" && (
        <button onClick={handleSummarize} className="mt-4 p-2 bg-green-500 text-white rounded">Summarize</button>
      )}
      {summary && <div className="mt-2 p-4 border rounded bg-gray-100">{summary}</div>}
    </div>
  );
};

export default TextProcessor;
