import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import SendIcon from './Components/SenIcon';

function Textprocessor() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Support for Chrome AI APIs check
  const [apiSupported, setApiSupported] = useState({
    languageDetection: false,
    summarizer: false,
    translator: false
  });

  useEffect(() => {
    // Check if Chrome AI APIs are available
    const checkApiSupport = () => {
      const chromeAvailable = typeof chrome !== 'undefined';
      setApiSupported({
        languageDetection: chromeAvailable && chrome.languageDetection !== undefined,
        summarizer: chromeAvailable && chrome.summarizer !== undefined,
        translator: chromeAvailable && chrome.translator !== undefined
      });
      
      if (!chromeAvailable || !chrome.languageDetection) {
        setError("Chrome AI APIs not available. Please enable experimental features in Chrome.");
      }
    };
    
    checkApiSupport();
  }, []);

  // Auto-scroll to the bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Detect language using Chrome's Language Detection API
  const detectLanguage = async (text) => {
    if (!apiSupported.languageDetection) {
      return { languages: [{ language: 'unknown' }] };
    }
    
    try {
      const result = await chrome.languageDetection.detectLanguage(text);
      return result;
    } catch (err) {
      console.error("Language detection failed:", err);
      setError("Failed to detect language. Please try again.");
      throw err;
    }
  };

  // Summarize text using Chrome's Summarizer API
  const summarizeText = async (text) => {
    if (!apiSupported.summarizer) {
      return { summary: "API not available. Please enable Chrome AI features." };
    }
    
    try {
      setIsProcessing(true);
      const result = await chrome.summarizer.summarize(text);
      return result;
    } catch (err) {
      console.error("Summarization failed:", err);
      setError("Failed to summarize text. Please try again.");
      throw err;
    } finally {
      setIsProcessing(false);
    }
  };

  // Translate text using Chrome's Translator API
  const translateText = async (text, targetLanguage) => {
    if (!apiSupported.translator) {
      return { translatedText: "API not available. Please enable Chrome AI features." };
    }
    
    try {
      setIsProcessing(true);
      const result = await chrome.translator.translate(text, targetLanguage);
      return result;
    } catch (err) {
      console.error("Translation failed:", err);
      setError("Failed to translate text. Please try again.");
      throw err;
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text.");
      return;
    }

    setError(null);
    
    try {
      // Detect language first
      const detectionResult = await detectLanguage(inputText);
      const detectedLanguage = detectionResult.languages[0].language;
      
      // Add message to the chat
      const newMessage = {
        id: Date.now(),
        text: inputText,
        language: detectedLanguage,
        showSummaryButton: detectedLanguage === 'en' && inputText.length > 150,
        processed: []
      };
      
      setMessages([...messages, newMessage]);
      setInputText('');
      
      // Focus back on textarea after sending
      textareaRef.current.focus();
    } catch (err) {
      // Error is already set in the specific function
      console.error("Error processing message:", err);
    }
  };

  // Handle summarizing a message
  const handleSummarize = async (messageId) => {
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    
    if (messageIndex === -1) return;
    
    try {
      const summaryResult = await summarizeText(messages[messageIndex].text);
      
      // Add summary to the processed results
      const updatedMessages = [...messages];
      updatedMessages[messageIndex].processed.push({
        id: Date.now(),
        type: 'summary',
        text: summaryResult.summary
      });
      
      setMessages(updatedMessages);
    } catch (err) {
      // Error is already set in the specific function
    }
  };

  // Handle translating a message
  const handleTranslate = async (messageId, targetLanguage) => {
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    
    if (messageIndex === -1) return;
    
    try {
      const translationResult = await translateText(messages[messageIndex].text, targetLanguage);
      
      // Add translation to the processed results
      const updatedMessages = [...messages];
      updatedMessages[messageIndex].processed.push({
        id: Date.now(),
        type: 'translation',
        language: targetLanguage,
        text: translationResult.translatedText
      });
      
      setMessages(updatedMessages);
    } catch (err) {
      // Error is already set in the specific function
    }
  };

  // Handle keyboard submit
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="Textprocessor-container">
      <header>
        <h1>AI Text Processor</h1>
      </header>
      
      {error && (
        <div className="error-container" role="alert">
          <p>{error}</p>
          <button 
            aria-label="Dismiss error" 
            onClick={() => setError(null)}
          >
            ×
          </button>
        </div>
      )}
      
      <main>
        <div className="chat-container">
          <div className="messages-container">
            {messages.length === 0 ? (
              <div className="welcome-message">
                <p>Enter some text below to get started with AI processing!</p>
              </div>
            ) : (
              messages.map(message => (
                <div className="message" key={message.id}>
                  <div className="message-content">
                    <p>{message.text}</p>
                    <span className="language-tag">
                      Language: {message.language || 'unknown'}
                    </span>
                  </div>
                  
                  <div className="message-actions">
                    {message.showSummaryButton && (
                      <button 
                        onClick={() => handleSummarize(message.id)}
                        aria-label="Summarize this text"
                        disabled={isProcessing}
                      >
                        Summarize
                      </button>
                    )}
                    
                    <div className="translate-container">
                      <select 
                        aria-label="Select language for translation"
                        disabled={isProcessing}
                        defaultValue=""
                        onChange={(e) => {
                          if (e.target.value) {
                            handleTranslate(message.id, e.target.value);
                            e.target.value = ""; // Reset after selection
                          }
                        }}
                      >
                        <option value="" disabled>Translate to...</option>
                        <option value="en">English</option>
                        <option value="pt">Portuguese</option>
                        <option value="es">Spanish</option>
                        <option value="ru">Russian</option>
                        <option value="tr">Turkish</option>
                        <option value="fr">French</option>
                      </select>
                    </div>
                  </div>
                  
                  {message.processed.length > 0 && (
                    <div className="processed-results">
                      {message.processed.map(result => (
                        <div className="processed-item" key={result.id}>
                          <div className="processed-tag">
                            {result.type === 'summary' ? 'Summary' : `Translation (${result.language})`}
                          </div>
                          <p>{result.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="input-container">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type or paste text here..."
              aria-label="Input text for processing"
              disabled={isProcessing}
            />
            <button 
              className="send-button"
              onClick={handleSendMessage}
              aria-label="Send message"
              disabled={isProcessing || !inputText.trim()}
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </main>
      
      <footer>
        <p>Powered by Chrome AI APIs</p>
        {!apiSupported.languageDetection && (
          <p className="api-warning">
            Chrome AI APIs not detected. Please enable experimental features in Chrome.
          </p>
        )}
      </footer>
    </div>
  );
}

export default Textprocessor;