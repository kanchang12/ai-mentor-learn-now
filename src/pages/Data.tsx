
import { CategoryPageLayout } from "@/components/CategoryPageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Data = () => {
  const affiliateCards = [
    {
      title: "Custom Data Dashboard",
      description: "Your own data analysis and visualization platform",
      buttonText: "Open Dashboard",
      buttonUrl: "https://gemnink-data-dashboard1-451954006366.europe-west1.run.app/",
      service: "custom-dashboard",
      features: [
        "Real-time data analysis",
        "Custom visualizations", 
        "Interactive dashboards",
        "Data export capabilities"
      ]
    },
    {
      title: "Tableau",
      description: "Professional data visualization and business intelligence",
      buttonText: "Try Tableau",
      buttonUrl: "https://tableau.com",
      service: "tableau",
      features: [
        "Advanced analytics",
        "Interactive dashboards",
        "Data connections",
        "Enterprise security"
      ]
    }
  ];

  const customContent = (
    <Card className="bg-white border border-gray-200 rounded-[20px] mb-6">
      <CardHeader>
        <CardTitle className="text-[#22201d]">Data Analysis Dashboard</CardTitle>
        <CardDescription>Access your custom data analysis platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video rounded-lg overflow-hidden border">
          <iframe
            src="https://gemnink-data-dashboard1-451954006366.europe-west1.run.app/"
            title="Data Analysis Dashboard"
            className="w-full h-full"
            frameBorder="0"
            allow="clipboard-write; encrypted-media"
          />
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Your integrated data analysis dashboard with real-time insights and visualizations.
        </p>
      </CardContent>
    </Card>
  );

  return (
    <CategoryPageLayout
      category="data"
      affiliateCards={affiliateCards}
    >
      {customContent}
    </CategoryPageLayout>
  );
};

export default Data;
