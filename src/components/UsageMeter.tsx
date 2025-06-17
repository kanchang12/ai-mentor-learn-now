
import { Clock, Zap, Crown } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface UsageMeterProps {
  usageMinutes: number;
  isLimitReached: boolean;
  loading: boolean;
  hasUnlimitedAccess?: boolean;
}

export const UsageMeter = ({ usageMinutes, isLimitReached, loading, hasUnlimitedAccess }: UsageMeterProps) => {
  if (loading) {
    return (
      <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
        <Clock className="h-4 w-4 text-gray-500" />
        <span className="text-sm text-gray-500">Loading...</span>
      </div>
    );
  }

  if (hasUnlimitedAccess) {
    return (
      <div className="flex items-center space-x-2 bg-gradient-to-r from-[#6cae75]/20 to-[#5a9d64]/20 rounded-lg px-3 py-2 border border-[#6cae75]/30">
        <Crown className="h-4 w-4 text-[#6cae75]" />
        <span className="text-sm font-medium text-[#6cae75]">
          Unlimited Access
        </span>
      </div>
    );
  }

  const remainingMinutes = Math.max(0, 30 - usageMinutes);
  const usagePercentage = (usageMinutes / 30) * 100;

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
        <Clock className="h-4 w-4 text-gray-700" />
        <span className="text-sm font-medium text-gray-700">
          {remainingMinutes} minutes left
        </span>
      </div>
      
      {usageMinutes > 0 && (
        <div className="w-24">
          <Progress 
            value={usagePercentage} 
            className={`h-2 ${isLimitReached ? 'bg-red-100' : 'bg-green-100'}`}
          />
        </div>
      )}
      
      {isLimitReached && (
        <div className="flex items-center space-x-1 text-red-600">
          <Zap className="h-4 w-4" />
          <span className="text-xs font-medium">Upgrade</span>
        </div>
      )}
    </div>
  );
};
