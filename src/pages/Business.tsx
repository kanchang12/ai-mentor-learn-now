
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, Zap } from "lucide-react";
import { CategoryPageLayout } from "@/components/CategoryPageLayout";
import { useToast } from "@/hooks/use-toast";

const Business = () => {
  const [workflowType, setWorkflowType] = useState("");
  const [description, setDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const createWorkflow = async () => {
    if (!workflowType || !description.trim()) {
      toast({
        title: "Error",
        description: "Please select workflow type and enter description",
        variant: "destructive",
      });
      return;
    }
    
    setIsCreating(true);
    setResult("");
    
    setTimeout(() => {
      const workflows = {
        email: `Email Automation Workflow Created!\n\n✅ Trigger: New contact form submission\n✅ Action 1: Send welcome email\n✅ Action 2: Add to CRM\n✅ Action 3: Notify sales team\n\nThis would integrate with your email platform and CRM.`,
        social: `Social Media Automation Workflow Created!\n\n✅ Trigger: New blog post published\n✅ Action 1: Create social media posts\n✅ Action 2: Schedule across platforms\n✅ Action 3: Track engagement\n\nThis would connect to your social media accounts.`,
        data: `Data Processing Workflow Created!\n\n✅ Trigger: New data file uploaded\n✅ Action 1: Clean and format data\n✅ Action 2: Generate insights\n✅ Action 3: Send report to team\n\nThis would process your data automatically.`
      };
      
      setResult(workflows[workflowType as keyof typeof workflows] || "Custom workflow created successfully!");
      setIsCreating(false);
    }, 2000);
  };

  const demoContent = (
    <div className="space-y-4">
      <Select value={workflowType} onValueChange={setWorkflowType}>
        <SelectTrigger>
          <SelectValue placeholder="What type of workflow?" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="email">Email Automation</SelectItem>
          <SelectItem value="social">Social Media</SelectItem>
          <SelectItem value="data">Data Processing</SelectItem>
          <SelectItem value="crm">CRM Integration</SelectItem>
        </SelectContent>
      </Select>
      
      <Textarea
        placeholder="Describe what you want to automate..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="min-h-[100px] text-[#22201d]"
      />
      
      <Button 
        onClick={createWorkflow}
        disabled={!workflowType || !description.trim() || isCreating}
        className="bg-[#6cae75] hover:bg-[#5a9d64] text-white w-full"
      >
        {isCreating ? "Creating Workflow..." : "Create Automation"}
      </Button>
      
      {result && (
        <div className="mt-4 p-4 bg-[#e9ecf1] rounded-lg">
          <h4 className="font-medium text-[#22201d] mb-2">Workflow Created:</h4>
          <pre className="text-[#22201d] opacity-80 whitespace-pre-wrap text-sm">{result}</pre>
        </div>
      )}
    </div>
  );

  return (
    <CategoryPageLayout
      category="business"
      title="Business Automation"
      description="Automate workflows and boost productivity"
      icon={<Briefcase className="h-5 w-5 text-orange-600" />}
      videoId="biz123"
      videoTitle="Business Automation Mastery"
      videoDescription="Learn to automate your business processes"
      demoTitle="Try Workflow Automation"
      demoDescription="Create automated workflows for your business"
      demoContent={demoContent}
    />
  );
};

export default Business;
