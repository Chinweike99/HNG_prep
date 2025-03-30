import React, { useState, useEffect } from "react";

const TextProcessor = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("en");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  if ('ai' in self && 'languageDetector' in self.ai) {
    console.log("Language Detector API is available!");
  } else {
    console.warn("Language Detector API is not available.");
  }

  if ('ai' in self && 'translator' in self.ai) {
    console.log("Translator API is supported.");
  } else {
    console.warn("Translator API is not supported.");
  }

  
  


  const initializeLanguageDetector = async () => {
    try {
      // Step 1: Check capabilities
      const languageDetectorCapabilities = await self.ai.languageDetector.capabilities();
      const canDetect = languageDetectorCapabilities.capabilities;
  
      let detector;
  
      // Step 2: Handle different capability states
      if (canDetect === 'no') {
        console.warn("The language detector isn't usable.");
        return null;
      }
  
      if (canDetect === 'readily') {
        console.log("The language detector can be used immediately.");
        detector = await self.ai.languageDetector.create();
      } else {
        console.log("The language detector requires a model download.");
        detector = await self.ai.languageDetector.create({
          monitor(m) {
            m.addEventListener('downloadprogress', (e) => {
              console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
            });
          },
        });
        await detector.ready;
      }
  
      return detector;
    } catch (err) {
      console.error("Error initializing language detector:", err);
      throw err;
    }
  };

  const detectLanguage = async (text) => {
    try {
      // Initialize the language detector
      const detector = await initializeLanguageDetector();
  
      if (!detector) {
        throw new Error("Language detector is not available.");
      }
  
      // Detect the language of the text
      const [bestResult] = await detector.detect(text);
  
      // Check if the detection result is reliable
      if (bestResult.detectedLanguage === "und" || bestResult.confidence < 0.4) {
        throw new Error("Language detection result is unreliable.");
      }
  
      // Return the detected language
      return bestResult.detectedLanguage;
    } catch (err) {
      console.error("Language detection failed:", err);
      return "Unknown";
    }
  };
  
  // Test the function
  const text = "Hollo my dearest mother";
  detectLanguage(text).then((language) => {
    console.log(`Detected language: ${language}`);
  });

  // Detect language when output text changes
  useEffect(() => {
    if (outputText) {
      detectLanguage(outputText).then((language) => setDetectedLanguage(language));
    }
  }, [outputText]);


  // Summarize text
  const summarizeText = async (text) => {
    const sourceLanguage = await detectLanguage(text);

    if (sourceLanguage !== "en") {
      console.warn("Summarization is only available for English text.");
      return text;
    }

    const summarizerAvailability = await ai.summarizer.availability();

    if (summarizerAvailability === "unavailable") {
      console.warn("Summarization is unavailable.");
      return text;
    }

    if (summarizerAvailability !== "available") {
      console.log("Summarization is available, but something will have to be downloaded. Hold tight!");
    }

    const summarizer = await ai.summarizer.create();
    const summary = await summarizer.summarize(text);

    return summary;
  };

  // Handle summarization
  const handleSummarize = async () => {
    const summarized = await summarizeText(outputText);
    setSummary(summarized);
  };



// Translator
const checkLanguagePairSupport = async (sourceLanguage, targetLanguage) => {
    try {
      // Check if the Translator API is supported
      if (!('ai' in self && 'translator' in self.ai)) {
        throw new Error("Translator API is not supported.");
      }
  
      // Check if the language pair is available
      const translatorCapabilities = await self.ai.translator.capabilities();
      const languagePairAvailability = translatorCapabilities.languagePairAvailable(sourceLanguage, targetLanguage);
  
      return languagePairAvailability;
    } catch (err) {
      console.error("Error checking language pair support:", err);
      throw err;
    }
  };


  const initializeTranslator = async (sourceLanguage, targetLanguage) => {
    try {
      // Check language pair support
      const languagePairAvailability = await checkLanguagePairSupport(sourceLanguage, targetLanguage);
  
      if (languagePairAvailability === "no") {
        throw new Error("Translation is not supported for the selected language pair.");
      }
  
      let translator;
  
      if (languagePairAvailability === "after-download") {
        // Handle model download progress
        translator = await self.ai.translator.create({
          sourceLanguage,
          targetLanguage,
          monitor(m) {
            m.addEventListener('downloadprogress', (e) => {
              console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
            });
          },
        });
        await translator.ready;
      } else {
        // Create the translator directly
        translator = await self.ai.translator.create({ sourceLanguage, targetLanguage });
      }
  
      return translator;
    } catch (err) {
      console.error("Error initializing translator:", err);
      throw err;
    }
  };


  const translateText = async (text, targetLanguage) => {
    try {
      // Detect the source language of the text
      const sourceLanguage = await detectLanguage(text);
  
      if (sourceLanguage === "Unknown") {
        throw new Error("Could not detect source language.");
      }
  
      // Initialize the translator
      const translator = await initializeTranslator(sourceLanguage, targetLanguage);
  
      // Translate the text
      const translatedText = await translator.translate(text);
  
      return translatedText;
    } catch (err) {
      console.error("Translation failed:", err);
      throw err;
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text.");
      return;
    }

    setError("");
    setOutputText(inputText);

    try {
      // Detect the language of the input text
      const language = await detectLanguage(inputText);
      setDetectedLanguage(language);
    } catch (err) {
      console.error("Language detection failed:", err);
      setError("Failed to detect language. Please try again.");
    }
  };

  const handleTranslate = async () => {
    try {
      const translated = await translateText(outputText, targetLanguage);
      setTranslatedText(translated);
    } catch (err) {
      console.error("Translation failed:", err);
      setError("Failed to translate text. Please try again.");
    }
  };



  return (
    <div className="p-4">
      {/* Output Area */}
      <div className="output-area mb-4 p-4 border rounded bg-gray-100">
        <div>{outputText}</div>
        {detectedLanguage && <div className="mt-2 text-sm text-gray-600">Detected Language: {detectedLanguage}</div>}
      </div>

      {/* Translation Section */}
      <div className="mb-4">
        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="en">English</option>
          <option value="pt">Portuguese</option>
          <option value="es">Spanish</option>
          <option value="ru">Russian</option>
          <option value="tr">Turkish</option>
          <option value="fr">French</option>
        </select>
        <button
          onClick={handleTranslate}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Translate
        </button>
        {translatedText && (
          <div className="mt-2 p-4 border rounded bg-gray-100">{translatedText}</div>
        )}
      </div>

      {/* Summarization Section */}
      <div className="mb-4">
        {outputText.length > 150 && detectedLanguage === "en" && (
          <button
            onClick={handleSummarize}
            className="p-2 bg-green-500 text-white rounded"
          >
            Summarize
          </button>
        )}
        {summary && (
          <div className="mt-2 p-4 border rounded bg-gray-100">{summary}</div>
        )}
      </div>

      {/* Input Area */}
      <div className="border mt-8 bg-gray-600 text-white p-4 rounded">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your text"
          className="w-full p-2 bg-transparent text-white placeholder-gray-300"
        />
        <button
          onClick={handleSend}
          className="mt-2 p-2 bg-blue-500 text-white rounded"
        >
          ✉️ Send
        </button>
      </div>

      {/* Error Message */}
      {error && <div className="mt-2 text-red-500">{error}</div>}




      <div className="Textprocessor-container">
      <header>
        <h1>AI Text Processor</h1>
      </header>

      {error && (
        <div className="error-container" role="alert">
          <p>{error}</p>
          <button aria-label="Dismiss error" onClick={() => setError(null)}>
            ×
          </button>
        </div>
      )}

      <main>
        <div className="chat-container">
          <div className="messages-container">
            {outputText && (
              <div className="message">
                <div className="message-content">
                  <p>{outputText}</p>
                  {detectedLanguage && (
                    <span className="language-tag">
                      Detected Language: {detectedLanguage}
                    </span>
                  )}
                </div>

                <div className="message-actions">
                  <select
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                  <button onClick={handleTranslate}>Translate</button>
                </div>

                {translatedText && (
                  <div className="processed-results">
                    <div className="processed-item">
                      <div className="processed-tag">
                        Translation ({targetLanguage})
                      </div>
                      <p>{translatedText}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="input-container">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type or paste text here..."
              aria-label="Input text for processing"
            />
            <button className="send-button" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
    </div>
  );
};

export default TextProcessor;