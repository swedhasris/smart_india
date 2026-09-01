import { useState, useEffect, useRef } from "react";
import { GoogleGenAI, ThinkingLevel, Modality } from "@google/genai";
import { UserProfile } from "../types";
import { Send, Bot, User, Loader2, ShieldCheck, Sparkles, Volume2, Mic, MicOff, BrainCircuit } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "motion/react";

export default function ChatBot({ profile }: { profile: UserProfile | null }) {
  const [messages, setMessages] = useState<{ role: "user" | "model"; text: string }[]>([
    { role: "model", text: "Hello! I am your Datra Secure Assistant. How can I help you manage your government records today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isThinkingMode, setIsThinkingMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (overrideInput?: string) => {
    const messageText = overrideInput || input.trim();
    if (!messageText || loading) return;

    setInput("");
    setMessages(prev => [...prev, { role: "user", text: messageText }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Multi-turn history
      const history = messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const modelName = isThinkingMode ? "gemini-3.1-pro-preview" : "gemini-3-flash-preview";
      
      const response = await ai.models.generateContent({
        model: modelName,
        contents: [
          ...history,
          {
            role: "user",
            parts: [{ text: `User Profile: ${JSON.stringify(profile)}. Question: ${messageText}` }]
          }
        ],
        config: {
          systemInstruction: "You are Datra Assistant, a secure government data management AI. Be professional, concise, and accurate. Use markdown for formatting.",
          thinkingConfig: isThinkingMode ? { thinkingLevel: ThinkingLevel.HIGH } : undefined
        }
      });

      const aiText = response.text || "I'm sorry, I couldn't process that request.";
      setMessages(prev => [...prev, { role: "model", text: aiText }]);
    } catch (error) {
      console.error("AI Error", error);
      setMessages(prev => [...prev, { role: "model", text: "I'm experiencing a technical issue. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleTTS = async (text: string) => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audio = new Audio(`data:audio/mp3;base64,${base64Audio}`);
        audio.onended = () => setIsSpeaking(false);
        await audio.play();
      } else {
        setIsSpeaking(false);
      }
    } catch (error) {
      console.error("TTS Error", error);
      setIsSpeaking(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(',')[1];
          await transcribeAudio(base64Audio);
        };
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Recording error", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (base64Data: string) => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            parts: [
              { inlineData: { data: base64Data, mimeType: "audio/wav" } },
              { text: "Please transcribe this audio accurately." }
            ]
          }
        ]
      });
      const transcript = response.text;
      if (transcript) {
        setInput(transcript);
      }
    } catch (error) {
      console.error("Transcription error", error);
    } finally {
      setLoading(false);
    }
  };

  const quickOptions = [
    "Check my Aadhaar",
    "How to file ITR?",
    "Education schemes",
    "Ration status",
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
      >
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm ${
                msg.role === "user" ? "bg-blue-100 text-blue-600" : "bg-[#003366] text-white"
              }`}>
                {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm relative group/msg ${
                msg.role === "user" 
                  ? "bg-blue-600 text-white rounded-tr-none" 
                  : "bg-gray-100 text-gray-800 rounded-tl-none"
              }`}>
                <div className="markdown-body">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
                {msg.role === "model" && (
                  <button 
                    onClick={() => handleTTS(msg.text)}
                    className="absolute -right-10 top-0 p-2 text-gray-400 hover:text-blue-600 opacity-0 group-hover/msg:opacity-100 transition-opacity"
                    title="Speak message"
                  >
                    <Volume2 className={`w-4 h-4 ${isSpeaking ? "animate-pulse text-blue-600" : ""}`} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-3 items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Assistant is thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Options */}
      <div className="px-6 py-4 border-t border-gray-50 flex items-center justify-between">
        <div className="flex gap-2 overflow-x-auto custom-scrollbar no-scrollbar flex-1">
          {quickOptions.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(opt)}
              className="whitespace-nowrap px-4 py-2 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-full text-xs font-bold border border-gray-100 hover:border-blue-200 transition-all"
            >
              {opt}
            </button>
          ))}
        </div>
        <button 
          onClick={() => setIsThinkingMode(!isThinkingMode)}
          className={`ml-4 p-2 rounded-xl transition-all flex items-center gap-2 border ${
            isThinkingMode 
              ? "bg-purple-50 border-purple-200 text-purple-600" 
              : "bg-gray-50 border-gray-100 text-gray-400 hover:text-purple-600 hover:bg-purple-50"
          }`}
          title="Toggle Thinking Mode (High Intelligence)"
        >
          <BrainCircuit className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Thinking</span>
        </button>
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-gray-100 bg-gray-50/50">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder={isRecording ? "Listening..." : "Ask anything about your data..."}
            rows={2}
            className="w-full pl-4 pr-24 py-3 bg-white border border-gray-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none shadow-inner"
          />
          <div className="absolute right-3 bottom-3 flex gap-2">
            <button 
              onClick={isRecording ? stopRecording : startRecording}
              className={`p-2 rounded-xl transition-all ${
                isRecording 
                  ? "bg-red-500 text-white animate-pulse" 
                  : "bg-gray-100 text-gray-400 hover:text-blue-600 hover:bg-blue-50"
              }`}
              title={isRecording ? "Stop Recording" : "Voice Input"}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className={`p-2 rounded-xl transition-all ${
                input.trim() && !loading 
                  ? "bg-[#003366] text-white shadow-lg shadow-blue-900/20 hover:scale-110" 
                  : "bg-gray-100 text-gray-300"
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-center gap-2">
          <ShieldCheck className="w-3 h-3 text-green-500" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">End-to-End Encrypted AI Session</span>
        </div>
      </div>
    </div>
  );
}
