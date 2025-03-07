
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MeetingSummaries from "@/components/dashboard/MeetingSummaries";
import ActionItems from "@/components/dashboard/ActionItems";
import UploadMeeting from "@/components/dashboard/UploadMeeting";

// Dashboard overview component
const DashboardOverview = () => {
  // Stats for the overview
  const stats = [
    { title: "Total Meetings", value: "24", change: "+12%", changeType: "positive" },
    { title: "Action Items", value: "86", change: "+8%", changeType: "positive" },
    { title: "Completed Items", value: "62", change: "72%", changeType: "neutral" },
    { title: "Time Saved", value: "14h", change: "+3h", changeType: "positive" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-semibold">Dashboard</h1>
      
      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-card border border-border rounded-lg p-6 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-display font-semibold">{stat.value}</p>
              <div className={`text-sm px-2 py-0.5 rounded-full ${
                stat.changeType === "positive" 
                  ? "bg-green-100 text-green-800" 
                  : stat.changeType === "negative"
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
              }`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Recent meetings preview */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Meetings</h2>
        <MeetingSummaries />
      </div>
      
      {/* Action items preview */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Pending Action Items</h2>
        <ActionItems />
      </div>
    </div>
  );
};

const Dashboard = () => {
  const location = useLocation();
  const [content, setContent] = useState(<DashboardOverview />);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Determine which content to show based on the path
    const path = location.pathname;
    
    if (path === "/dashboard/summaries") {
      setContent(<MeetingSummaries />);
    } else if (path === "/dashboard/actions") {
      setContent(<ActionItems />);
    } else if (path === "/dashboard/upload") {
      setContent(<UploadMeeting />);
    } else if (path === "/dashboard/settings") {
      setContent(<div>Settings Page</div>); // Placeholder for settings
    } else {
      setContent(<DashboardOverview />);
    }
  }, [location.pathname]);

  return (
    <div className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
      <DashboardLayout>
        {content}
      </DashboardLayout>
    </div>
  );
};

export default Dashboard;
