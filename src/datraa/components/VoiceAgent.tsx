import { useState, useEffect, useCallback, useRef } from "react";
import { Mic, MicOff, Volume2, VolumeX, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";

export default function VoiceAgent() {
  const [isListening, setIsListening] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioInputRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const audioQueueRef = useRef<Int16Array[]>([]);
  const isPlayingRef = useRef(false);

  const cleanup = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (audioInputRef.current) {
      audioInputRef.current.disconnect();
      audioInputRef.current = null;
    }
    setIsListening(false);
    setIsConnecting(false);
    setIsSpeaking(false);
  }, []);

  const playNextChunk = useCallback(() => {
    if (audioQueueRef.current.length === 0 || isPlayingRef.current) return;
    
    isPlayingRef.current = true;
    setIsSpeaking(true);
    
    const chunk = audioQueueRef.current.shift()!;
    const audioContext = audioContextRef.current!;
    const buffer = audioContext.createBuffer(1, chunk.length, 16000);
    const channelData = buffer.getChannelData(0);
    
    for (let i = 0; i < chunk.length; i++) {
      channelData[i] = chunk[i] / 32768.0;
    }
    
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.onended = () => {
      isPlayingRef.current = false;
      if (audioQueueRef.current.length === 0) {
        setIsSpeaking(false);
      }
      playNextChunk();
    };
    source.start();
  }, []);

  const startLiveSession = async () => {
    if (isListening || isConnecting) return;
    
    setIsConnecting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: "gemini-2.5-flash-native-audio-preview-12-2025",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
          },
          systemInstruction: "You are Datra Assistant. You help users with government records via voice. Be helpful, professional, and concise.",
        },
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            setIsListening(true);
            
            const audioContext = audioContextRef.current!;
            audioInputRef.current = audioContext.createMediaStreamSource(stream);
            processorRef.current = audioContext.createScriptProcessor(4096, 1, 1);
            
            processorRef.current.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmData = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                pcmData[i] = Math.max(-1, Math.min(1, inputData[i])) * 32767;
              }
              
              const base64Data = btoa(String.fromCharCode(...new Uint8Array(pcmData.buffer)));
              sessionRef.current?.sendRealtimeInput({
                audio: { data: base64Data, mimeType: 'audio/pcm;rate=16000' }
              });
            };
            
            audioInputRef.current.connect(processorRef.current);
            processorRef.current.connect(audioContext.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.modelTurn?.parts) {
              for (const part of message.serverContent.modelTurn.parts) {
                if (part.inlineData?.data) {
                  const binaryString = atob(part.inlineData.data);
                  const bytes = new Uint8Array(binaryString.length);
                  for (let i = 0; i < binaryString.length; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                  }
                  const pcmData = new Int16Array(bytes.buffer);
                  audioQueueRef.current.push(pcmData);
                  playNextChunk();
                }
                if (part.text) {
                  setTranscript(prev => prev + " " + part.text);
                }
              }
            }
            if (message.serverContent?.interrupted) {
              audioQueueRef.current = [];
              isPlayingRef.current = false;
              setIsSpeaking(false);
            }
          },
          onclose: () => cleanup(),
          onerror: (e) => {
            console.error("Live API Error", e);
            cleanup();
          }
        }
      });
      
      sessionRef.current = await sessionPromise;
    } catch (error) {
      console.error("Failed to start Live session", error);
      cleanup();
    }
  };

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  return (
    <div className="flex items-center gap-3">
      <AnimatePresence>
        {(isListening || isSpeaking) && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="flex gap-1 items-center h-6"
          >
            {[1, 2, 3, 4, 5].map(i => (
              <motion.div
                key={i}
                animate={{ 
                  height: isSpeaking ? [4, 20, 4] : [4, 12, 4],
                  backgroundColor: isSpeaking ? "#60a5fa" : "#34d399"
                }}
                transition={{ 
                  duration: isSpeaking ? 0.4 : 0.8, 
                  repeat: Infinity, 
                  delay: i * 0.1 
                }}
                className="w-1 rounded-full"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <button 
        onClick={isListening ? cleanup : startLiveSession}
        disabled={isConnecting}
        className={`p-2.5 rounded-xl transition-all flex items-center gap-2 ${
          isListening 
            ? "bg-red-500 text-white shadow-lg shadow-red-500/20" 
            : isConnecting
              ? "bg-gray-100 text-gray-400"
              : "bg-white/10 text-blue-200 hover:bg-white/20 border border-white/10"
        }`}
      >
        {isConnecting ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : isListening ? (
          <MicOff className="w-5 h-5" />
        ) : (
          <Mic className="w-5 h-5" />
        )}
        {!isListening && !isConnecting && <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Live Voice</span>}
      </button>

      {isListening && (
        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
          <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />
          <span className="text-[10px] font-bold text-blue-200 uppercase tracking-tighter">Live Session Active</span>
        </div>
      )}
    </div>
  );
}
