
import { useState, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  FileText, 
  CheckSquare, 
  UploadCloud, 
  Settings, 
  LogOut, 
  User,
  Menu,
  X,
  ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { toast } = useToast();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Meeting Summaries", href: "/dashboard/summaries", icon: FileText },
    { name: "Action Items", href: "/dashboard/actions", icon: CheckSquare },
    { name: "Upload Meeting", href: "/dashboard/upload", icon: UploadCloud },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const handleLogout = () => {
    // Handle logout logic here
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    // Navigate to home page
    window.location.href = "/";
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between px-4 py-5 border-b border-border">
            <Link to="/dashboard" className="flex items-center">
              <span className="text-xl font-display font-semibold bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent">
                ActionSummarizer
              </span>
            </Link>
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={toggleSidebar}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-5 px-4">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5 flex-shrink-0",
                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                      )}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="px-4 py-4 border-t border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john@example.com</p>
                </div>
              </div>
            </div>
            <ButtonCustom
              variant="outline"
              size="default"
              className="w-full justify-between"
              onClick={handleLogout}
            >
              <span className="flex items-center">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </span>
              <ChevronRight className="h-4 w-4" />
            </ButtonCustom>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden bg-card border-b border-border sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 py-2">
            <button onClick={toggleSidebar} className="text-muted-foreground">
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/dashboard" className="text-lg font-display font-semibold bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent">
              ActionSummarizer
            </Link>
            <Link to="/dashboard/settings">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-muted/30">
          <div className="py-6">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </div>
        </main>
      </div>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;
