
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Menu, 
  X, 
  Settings, 
  User, 
  Bell,
  Home,
  Plus,
  Search,
  Clock,
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: string;
  userName: string;
  sidebarItems: Array<{
    icon: ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void;
  }>;
}

const DashboardLayout = ({ children, userRole, userName, sidebarItems }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b bg-healthcare-blue">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-healthcare-blue" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">MedAuth Pro</h1>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={toggleSidebar}
            className="lg:hidden text-white hover:bg-healthcare-blue-dark"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b bg-healthcare-blue-light">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback className="bg-healthcare-blue text-white">
                {userName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-gray-900">{userName}</p>
              <Badge className="bg-healthcare-blue text-white text-xs">
                {userRole}
              </Badge>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6 space-y-2">
          {sidebarItems.map((item, index) => (
            <Button
              key={index}
              variant={item.active ? "default" : "ghost"}
              className={`w-full justify-start text-left h-12 ${
                item.active 
                  ? "bg-healthcare-blue text-white hover:bg-healthcare-blue-dark" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={item.onClick}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </Button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => navigate("/login")}
          >
            <User className="w-4 h-4 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b h-16">
          <div className="flex items-center justify-between h-full px-4 lg:px-8">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={toggleSidebar}
                className="lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <h2 className="text-xl font-semibold text-gray-900">
                {userRole} Dashboard
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
