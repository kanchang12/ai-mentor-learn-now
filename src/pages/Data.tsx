
import { useEffect } from "react";

const Data = () => {
  useEffect(() => {
    // Redirect to external data analysis dashboard
    window.location.href = "https://gemnink-data-dashboard1-451954006366.europe-west1.run.app";
  }, []);

  return (
    <div className="min-h-screen bg-[#fef9ed] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#22201d] mb-4">Redirecting to Data Analysis...</h2>
        <p className="text-[#22201d] opacity-70">
          If you're not automatically redirected, 
          <a 
            href="https://gemnink-data-dashboard1-451954006366.europe-west1.run.app" 
            className="text-blue-600 hover:underline ml-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            click here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Data;
