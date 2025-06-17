
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Star } from 'lucide-react';

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

export function AffiliateCard({ 
  title, 
  description, 
  features, 
  ctaText, 
  affiliateUrl, 
  commission,
  rating,
  onAffiliateClick,
  service 
}: AffiliateCardProps) {
  const handleClick = () => {
    onAffiliateClick(service);
    window.open(affiliateUrl, '_blank');
  };

  return (
    <Card className="bg-white border border-gray-200 rounded-[20px] shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-[#22201d]">{title}</CardTitle>
          {rating && (
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-[#22201d]">{rating}</span>
            </div>
          )}
        </div>
        <CardDescription className="text-[#22201d] opacity-70">
          {description}
        </CardDescription>
        {commission && (
          <Badge className="bg-[#6cae75]/10 text-[#6cae75] border border-[#6cae75]/30 w-fit">
            {commission} commission
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 mb-4">
          {features.map((feature, index) => (
            <li key={index} className="text-sm text-[#22201d] opacity-80 flex items-center">
              <div className="w-1.5 h-1.5 bg-[#6cae75] rounded-full mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        <Button 
          onClick={handleClick}
          className="w-full bg-[#6cae75] hover:bg-[#5a9d64] text-white rounded-[30px]"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          {ctaText}
        </Button>
      </CardContent>
    </Card>
  );
}
