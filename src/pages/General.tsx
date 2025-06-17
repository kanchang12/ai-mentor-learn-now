
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, User, Bot } from "lucide-react";
import { CategoryPageLayout } from "@/components/CategoryPageLayout";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

const General = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', content: 'Hello! I\'m your AI assistant. Ask me anything!' }
  ]);
  const { toast } = useToast();

  const generateResponse = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Add user message
    const userMessage = { id: Date.now(), type: 'user', content: prompt };
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const botResponse = { 
        id: Date.now() + 1, 
        type: 'bot', 
        content: `I understand you're asking about: "${prompt}". This is a demo response. In a real implementation, this would connect to an AI API like OpenAI's GPT to provide intelligent responses.`
      };
      setMessages(prev => [...prev, botResponse]);
      setIsGenerating(false);
      setPrompt("");
    }, 2000);
  };

  const demoContent = (
    <div className="space-y-4">
      <ScrollArea className="h-64 w-full border rounded-lg p-4 bg-gray-50">
        <div className="space-y-3">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-2 max-w-[80%] ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' ? 'bg-blue-500' : 'bg-gray-600'
                }`}>
                  {message.type === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className={`p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border'
                }`}>
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          {isGenerating && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="p-3 bg-white border rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="flex space-x-2">
        <Input
          placeholder="Ask me anything..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isGenerating && generateResponse()}
          className="text-[#22201d]"
        />
        <Button 
          onClick={generateResponse}
          disabled={isGenerating}
          className="bg-[#6cae75] hover:bg-[#5a9d64] text-white"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <CategoryPageLayout
      category="general"
      title="AI Chat Assistant"
      description="Chat with AI and get instant answers"
      icon={<MessageSquare className="h-5 w-5 text-blue-600" />}
      videoId="abc123"
      videoTitle="Mastering AI Chat"
      videoDescription="Learn to have effective conversations with AI"
      demoTitle="Try AI Chat"
      demoDescription="Start a conversation with our AI assistant"
      demoContent={demoContent}
    />
  );
};

export default General;
