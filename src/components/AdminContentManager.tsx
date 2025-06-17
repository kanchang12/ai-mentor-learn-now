
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Save, Video, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContentItem {
  id: string;
  category: string;
  title: string;
  description: string;
  video_id: string;
  video_title: string;
  video_description: string;
  demo_title: string;
  demo_description: string;
}

export const AdminContentManager = () => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    // For now, use sample data - in production this would fetch from Supabase
    const sampleContent: ContentItem[] = [
      {
        id: '1',
        category: 'general',
        title: 'General AI Chat',
        description: 'Your AI assistant for any task',
        video_id: 'QH2-TGUlwu4',
        video_title: 'Master ChatGPT in 15 Minutes',
        video_description: 'Learn how to write perfect prompts and get amazing results from AI',
        demo_title: 'Try AI Chat',
        demo_description: 'Ask AI anything and get instant intelligent responses'
      },
      {
        id: '2',
        category: 'writing',
        title: 'AI Writing Assistant',
        description: 'Create professional content with AI',
        video_id: 'nKIu9yen5nc',
        video_title: 'AI Writing Masterclass',
        video_description: 'Learn to create engaging content with AI writing tools',
        demo_title: 'Try AI Writing',
        demo_description: 'Generate professional content for any purpose'
      },
      {
        id: '3',
        category: 'images',
        title: 'AI Image Generator',
        description: 'Create stunning visuals with AI',
        video_id: '8MNb_nw5dQo',
        video_title: 'AI Art Generation Complete Guide',
        video_description: 'Master Midjourney, DALL-E, and Stable Diffusion',
        demo_title: 'Try Image Generation',
        demo_description: 'Create amazing images from text descriptions'
      },
      {
        id: '4',
        category: 'business',
        title: 'Business Automation',
        description: 'Automate workflows with AI',
        video_id: '5dTK8qZHbhQ',
        video_title: 'Business Automation with AI',
        video_description: 'Learn to automate your business processes with AI tools',
        demo_title: 'Try Automation Planner',
        demo_description: 'Get a custom automation plan for your business'
      },
      {
        id: '5',
        category: 'data',
        title: 'Data Analysis with AI',
        description: 'Extract insights from your data',
        video_id: 'dUFIj8JGz0A',
        video_title: 'AI Data Analysis Masterclass',
        video_description: 'Learn to analyze data and create insights with AI tools',
        demo_title: 'Try Data Analysis',
        demo_description: 'Upload your data and get AI-powered insights'
      },
      {
        id: '6',
        category: 'website',
        title: 'AI Website Builder',
        description: 'Build websites with AI assistance',
        video_id: 'HXV3zeQKqGY',
        video_title: 'Build Websites with AI',
        video_description: 'Learn to create professional websites using AI tools',
        demo_title: 'Try Website Builder',
        demo_description: 'Generate a complete website with AI assistance'
      }
    ];
    
    setContentItems(sampleContent);
    setLoading(false);
  };

  const updateContent = (id: string, field: string, value: string) => {
    setContentItems(items => 
      items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const saveContent = async (item: ContentItem) => {
    try {
      // In production, this would save to Supabase
      console.log('Saving content:', item);
      
      toast({
        title: "Success",
        description: `${item.title} content updated successfully`,
      });
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Error",
        description: "Failed to save content",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading content...</div>;
  }

  return (
    <div className="space-y-6">
      {contentItems.map((item) => (
        <Card key={item.id} className="bg-white border border-gray-200 rounded-[20px]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="capitalize text-xl">{item.category}</CardTitle>
              <Button 
                size="sm" 
                onClick={() => saveContent(item)}
                className="bg-[#6cae75] hover:bg-[#5a9d64]"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Page Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`title-${item.id}`}>Page Title</Label>
                <Input
                  id={`title-${item.id}`}
                  value={item.title}
                  onChange={(e) => updateContent(item.id, 'title', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor={`desc-${item.id}`}>Page Description</Label>
                <Input
                  id={`desc-${item.id}`}
                  value={item.description}
                  onChange={(e) => updateContent(item.id, 'description', e.target.value)}
                />
              </div>
            </div>
            
            {/* Video Content */}
            <div className="border-t pt-4">
              <div className="flex items-center mb-4">
                <Video className="h-5 w-5 mr-2 text-blue-600" />
                <h4 className="font-semibold">Video Content</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor={`video-id-${item.id}`}>YouTube Video ID</Label>
                  <Input
                    id={`video-id-${item.id}`}
                    value={item.video_id}
                    onChange={(e) => updateContent(item.id, 'video_id', e.target.value)}
                    placeholder="e.g., QH2-TGUlwu4"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`video-title-${item.id}`}>Video Title</Label>
                  <Input
                    id={`video-title-${item.id}`}
                    value={item.video_title}
                    onChange={(e) => updateContent(item.id, 'video_title', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor={`video-desc-${item.id}`}>Video Description</Label>
                <Textarea
                  id={`video-desc-${item.id}`}
                  value={item.video_description}
                  onChange={(e) => updateContent(item.id, 'video_description', e.target.value)}
                  rows={3}
                />
              </div>
            </div>
            
            {/* Demo Content */}
            <div className="border-t pt-4">
              <div className="flex items-center mb-4">
                <FileText className="h-5 w-5 mr-2 text-green-600" />
                <h4 className="font-semibold">Demo Section</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor={`demo-title-${item.id}`}>Demo Title</Label>
                  <Input
                    id={`demo-title-${item.id}`}
                    value={item.demo_title}
                    onChange={(e) => updateContent(item.id, 'demo_title', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor={`demo-desc-${item.id}`}>Demo Description</Label>
                <Textarea
                  id={`demo-desc-${item.id}`}
                  value={item.demo_description}
                  onChange={(e) => updateContent(item.id, 'demo_description', e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
