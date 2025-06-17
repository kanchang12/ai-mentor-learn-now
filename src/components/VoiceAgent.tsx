
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Volume2, VolumeX, Minimize2, Maximize2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoiceAgentProps {
  pageContext?: string;
}

declare global {
  interface Window {
    Vapi: any;
  }
}

export const VoiceAgent = ({ pageContext = "general" }: VoiceAgentProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [vapiClient, setVapiClient] = useState<any>(null);
  const { toast } = useToast();

  // Load VAPI script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@vapi-ai/web@latest/dist/index.js';
    script.onload = () => {
      console.log("VAPI script loaded");
      initializeVapi();
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const initializeVapi = () => {
    if (!window.Vapi) return;

    try {
      // Get API key from localStorage (set by admin)
      const apiKey = localStorage.getItem('vapi_api_key') || 'demo_key';
      const client = new window.Vapi(apiKey);
      setVapiClient(client);

      // VAPI event listeners
      client.on('call-start', () => {
        console.log('VAPI call started');
        setIsConnected(true);
        setIsListening(true);
        if (!isMinimized) {
          toast({
            title: "Mat is now active!",
            description: "Voice connection established. Start talking!",
          });
        }
      });

      client.on('call-end', () => {
        console.log('VAPI call ended');
        setIsConnected(false);
        setIsListening(false);
        setIsSpeaking(false);
      });

      client.on('speech-start', () => {
        console.log('User started speaking');
        setIsListening(true);
        setIsSpeaking(false);
      });

      client.on('speech-end', () => {
        console.log('User stopped speaking');
        setIsListening(false);
      });

      client.on('assistant-speech-start', () => {
        console.log('Assistant started speaking');
        setIsSpeaking(true);
        setIsListening(false);
      });

      client.on('assistant-speech-end', () => {
        console.log('Assistant stopped speaking');
        setIsSpeaking(false);
      });

      client.on('error', (error: any) => {
        console.error('VAPI error:', error);
        toast({
          title: "Voice Assistant Error",
          description: "API key not configured or invalid. Admin needs to set VAPI credentials.",
          variant: "destructive",
        });
      });

    } catch (error) {
      console.error("Failed to initialize VAPI:", error);
    }
  };

  const startCall = async () => {
    if (!vapiClient) {
      toast({
        title: "VAPI Not Ready",
        description: "Voice service is initializing or API key not configured...",
        variant: "destructive",
      });
      return;
    }

    try {
      const assistantId = localStorage.getItem('vapi_assistant_id') || 'demo_assistant';
      
      await vapiClient.start({
        assistantId: assistantId,
        assistantOverrides: {
          firstMessage: getContextualGreeting(),
          variableValues: {
            pageContext: pageContext
          }
        }
      });
    } catch (error) {
      console.error("Failed to start VAPI call:", error);
      toast({
        title: "Failed to start call",
        description: "Could not connect to voice assistant. Check API configuration.",
        variant: "destructive",
      });
    }
  };

  const endCall = async () => {
    if (vapiClient) {
      try {
        await vapiClient.stop();
      } catch (error) {
        console.error("Failed to end VAPI call:", error);
      }
    }
  };

  const getContextualGreeting = () => {
    const contextGreetings = {
      general: "Hi! I'm Mat, your AI voice assistant. I can help you understand how to use AI chat tools effectively. What would you like to know?",
      writing: "Hello! I'm Mat. I can guide you through AI writing tools and help you create better content. Would you like tips on writing prompts or content structure?",
      images: "Hi there! I'm Mat, your voice guide for AI image generation. I can help you write better prompts and understand different artistic styles. What can I help you with?",
      book: "Hi! I'm Mat, your book writing assistant. I can help you structure your book, develop characters, and guide you through the writing process. What would you like to work on?",
      data: "Hello! I'm Mat, your data analysis assistant. I can help you understand how to use AI for data insights and visualization. What would you like to explore?",
      website: "Hi! I'm Mat, your website building guide. I can help you navigate AI-powered website builders and design tools. How can I assist you today?",
      homepage: "Welcome to HowToUseAI! I'm Mat, your voice guide. I can help you choose the right AI tools and get started with any category. What interests you most?",
      dashboard: "Hi! I'm Mat. I can help you navigate the dashboard and choose the best AI tools for your needs. Which category would you like to explore?"
    };
    
    return contextGreetings[pageContext as keyof typeof contextGreetings] || contextGreetings.general;
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
                  {isConnected ? "Connected & Ready" : 
                   vapiClient ? "Ready to Connect" : "Initializing..."}
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
                  <Mic className="h-8 w-8 text-white" />
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
               isSpeaking ? "Mat is speaking..." : 
               isConnected ? "Connected - Say something!" :
               "Click to start voice chat"}
            </div>

            <div className="flex space-x-2 justify-center">
              {!isConnected ? (
                <Button
                  onClick={startCall}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Mic className="h-4 w-4 mr-2" />
                  Start Voice Chat
                </Button>
              ) : (
                <Button
                  onClick={endCall}
                  variant="destructive"
                >
                  <MicOff className="h-4 w-4 mr-2" />
                  End Call
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
