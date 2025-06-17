
import { VoiceAgent } from "@/components/VoiceAgent";

const Data = () => {
  return (
    <div className="min-h-screen bg-[#fef9ed]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-black text-[#22201d]">Data Analysis Dashboard</h1>
          <p className="text-[#22201d] opacity-70 mt-2">
            Access your data analysis tools below. Login with: <strong>userid: user</strong> | <strong>password: password</strong>
          </p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-[20px] shadow-lg overflow-hidden" style={{ height: '600px' }}>
          <iframe
            src="https://gemnink-data-dashboard1-451954006366.europe-west1.run.app"
            className="w-full h-full border-0"
            title="Data Analysis Dashboard"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        
        {/* Additional Info */}
        <div className="mt-6 bg-white rounded-[20px] p-6 shadow-lg">
          <h2 className="text-xl font-bold text-[#22201d] mb-3">How to Use</h2>
          <ul className="text-[#22201d] opacity-70 space-y-2">
            <li>• Use the credentials above to log into the dashboard</li>
            <li>• Upload your data files for analysis</li>
            <li>• Create visualizations and reports</li>
            <li>• Export your results when ready</li>
          </ul>
        </div>
      </div>

      {/* Voice Agent */}
      <VoiceAgent pageContext="data" />
    </div>
  );
};

export default Data;
