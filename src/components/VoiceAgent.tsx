
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Volume2, VolumeX, Minimize2, Maximize2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoiceAgentProps {
  pageContext?: string;
}

export const VoiceAgent = ({ pageContext = "general" }: VoiceAgentProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  // Initialize VAPI connection
  useEffect(() => {
    // In a real implementation, this would initialize VAPI
    console.log("Initializing VAPI connection for Mat...");
    
    // Simulate connection
    setTimeout(() => {
      setIsConnected(true);
      if (!isMinimized) {
        toast({
          title: "Mat is ready!",
          description: "Your voice assistant is now active and ready to help.",
        });
      }
    }, 1000);
  }, []);

  const startListening = () => {
    if (!isConnected) {
      toast({
        title: "Not connected",
        description: "Voice agent is still connecting...",
        variant: "destructive",
      });
      return;
    }

    setIsListening(true);
    
    // In real implementation, this would start VAPI session
    console.log("Starting VAPI session...");
    
    // Simulate voice interaction
    setTimeout(() => {
      setIsListening(false);
      setIsSpeaking(true);
      
      // Get context-aware response
      const contextResponses = {
        general: "Hi! I'm Mat, your AI voice assistant. I can help you understand how to use AI chat tools effectively. What would you like to know?",
        writing: "Hello! I'm Mat. I can guide you through AI writing tools and help you create better content. Would you like tips on writing prompts or content structure?",
        images: "Hi there! I'm Mat, your voice guide for AI image generation. I can help you write better prompts and understand different artistic styles. What can I help you with?",
        business: "Welcome! I'm Mat, and I'm here to help you automate your business processes. I can guide you through workflow automation and productivity tools.",
        data: "Hello! I'm Mat, your data analysis assistant. I can help you understand how to use AI for data insights and visualization. What would you like to explore?",
        website: "Hi! I'm Mat, your website building guide. I can help you navigate AI-powered website builders and design tools. How can I assist you today?"
      };
      
      const response = contextResponses[pageContext as keyof typeof contextResponses] || contextResponses.general;
      
      // Simulate speech synthesis
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(response);
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        utterance.onend = () => setIsSpeaking(false);
        speechSynthesis.speak(utterance);
      }
      
      setTimeout(() => {
        setIsSpeaking(false);
      }, 5000);
    }, 2000);
  };

  const stopListening = () => {
    setIsListening(false);
    setIsSpeaking(false);
    
    // Stop any ongoing speech
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
          size="icon"
        >
          <div className="flex flex-col items-center">
            <Mic className="h-5 w-5 text-white" />
            <span className="text-xs text-white mt-1">Mat</span>
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 bg-white shadow-xl border-2 border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Mat</h3>
                <p className="text-xs text-gray-500">
                  {isConnected ? "Voice Assistant Ready" : "Connecting..."}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(true)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-center space-y-3">
            <div className="flex justify-center">
              {isListening ? (
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                  <MicOff className="h-8 w-8 text-white" />
                </div>
              ) : isSpeaking ? (
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                  <Volume2 className="h-8 w-8 text-white" />
                </div>
              ) : (
                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                  <Mic className="h-8 w-8 text-gray-600" />
                </div>
              )}
            </div>

            <div className="text-sm text-gray-600">
              {isListening ? "Listening..." : 
               isSpeaking ? "Speaking..." : 
               "Click to talk with Mat"}
            </div>

            <div className="flex space-x-2 justify-center">
              {!isListening && !isSpeaking ? (
                <Button
                  onClick={startListening}
                  disabled={!isConnected}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Mic className="h-4 w-4 mr-2" />
                  Start Voice Chat
                </Button>
              ) : (
                <Button
                  onClick={stopListening}
                  variant="destructive"
                >
                  <MicOff className="h-4 w-4 mr-2" />
                  Stop
                </Button>
              )}
            </div>

            <p className="text-xs text-gray-500">
              I can help guide you through {pageContext} AI tools and answer your questions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
