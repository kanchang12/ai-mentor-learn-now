
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Zap } from 'lucide-react';

interface UsageMeterProps {
  usageMinutes: number;
  isLimitReached: boolean;
  loading: boolean;
}

export function UsageMeter({ usageMinutes, isLimitReached, loading }: UsageMeterProps) {
  const remainingMinutes = Math.max(0, 30 - usageMinutes);
  const progressValue = (usageMinutes / 30) * 100;

  if (loading) {
    return (
      <Card className="bg-white border border-gray-200 rounded-[20px]">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-500">Loading usage...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border rounded-[20px] ${isLimitReached ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Clock className={`h-4 w-4 ${isLimitReached ? 'text-red-500' : 'text-[#6cae75]'}`} />
            <span className="text-sm font-medium text-[#22201d]">
              Daily Usage
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Zap className="h-3 w-3 text-yellow-500" />
            <span className="text-xs text-[#22201d] opacity-70">
              {remainingMinutes} min left
            </span>
          </div>
        </div>
        <Progress 
          value={progressValue} 
          className={`h-2 ${isLimitReached ? 'bg-red-100' : 'bg-gray-100'}`}
        />
        <p className="text-xs text-[#22201d] opacity-70 mt-1">
          {usageMinutes}/30 minutes used today
        </p>
        {isLimitReached && (
          <p className="text-xs text-red-600 mt-1 font-medium">
            Daily limit reached. Upgrade for unlimited access!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
