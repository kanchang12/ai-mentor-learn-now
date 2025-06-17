
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star } from "lucide-react";

interface AffiliateCardProps {
  title: string;
  description: string;
  features: string[];
  ctaText: string;
  affiliateUrl: string;
  commission?: string;
  rating?: number;
  onAffiliateClick: (service: string) => void;
  service: string;
}

export const AffiliateCard = ({
  title,
  description,
  features,
  ctaText,
  affiliateUrl,
  commission,
  rating,
  onAffiliateClick,
  service
}: AffiliateCardProps) => {
  const handleClick = () => {
    onAffiliateClick(service);
    window.open(affiliateUrl, '_blank');
  };

  return (
    <Card className="bg-white border border-gray-200 rounded-[20px] shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-[#22201d]">{title}</CardTitle>
          {rating && (
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-gray-600">{rating}</span>
            </div>
          )}
        </div>
        <CardDescription className="text-[#22201d] opacity-70">
          {description}
        </CardDescription>
        {commission && (
          <Badge variant="secondary" className="w-fit">
            {commission}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="text-sm text-[#22201d] opacity-80 flex items-center">
              <div className="w-1.5 h-1.5 bg-[#6cae75] rounded-full mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        
        <Button 
          onClick={handleClick}
          className="w-full bg-[#6cae75] hover:bg-[#5a9d64] text-white rounded-[30px] flex items-center justify-center space-x-2"
        >
          <span>{ctaText}</span>
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};
