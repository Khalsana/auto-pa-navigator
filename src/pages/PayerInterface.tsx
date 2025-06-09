
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Home, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Clock,
  Settings,
  Eye,
  Search,
  BarChart
} from "lucide-react";
import { toast } from "sonner";

const PayerInterface = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for incoming PA requests
  const incomingRequests = [
    {
      id: "PA001",
      patient: "Jane Doe",
      drug: "Lantus Solostar",
      pharmacy: "City Pharmacy",
      provider: "Dr. Sarah Johnson",
      status: "pending-review",
      submitted: "2024-01-15",
      priority: "standard",
      requiredFields: ["lab-results", "diagnosis"],
      complete: false
    },
    {
      id: "PA002",
      patient: "John Johnson",
      drug: "Humira",
      pharmacy: "HealthMart Pharmacy", 
      provider: "Dr. Michael Brown",
      status: "ready-for-decision",
      submitted: "2024-01-14",
      priority: "urgent",
      requiredFields: [],
      complete: true
    },
    {
      id: "PA003",
      patient: "Mary Wilson",
      drug: "Ozempic",
      pharmacy: "CVS Pharmacy",
      provider: "Dr. Lisa Davis",
      status: "approved",
      submitted: "2024-01-13",
      priority: "standard",
      requiredFields: [],
      complete: true
    },
    {
      id: "PA004",
      patient: "Robert Taylor",
      drug: "Xarelto",
      pharmacy: "Walgreens",
      provider: "Dr. James Miller",
      status: "denied",
      submitted: "2024-01-12",
      priority: "standard",
      requiredFields: [],
      complete: true
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending-review": return <Clock className="w-4 h-4" />;
      case "ready-for-decision": return <AlertCircle className="w-4 h-4" />;
      case "approved": return <CheckCircle className="w-4 h-4" />;
      case "denied": return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "pending-review": return "status-pending";
      case "ready-for-decision": return "status-needs-info";
      case "approved": return "status-approved";
      case "denied": return "status-denied";
      default: return "status-pending";
    }
  };

  const getPriorityClass = (priority: string) => {
    return priority === "urgent" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800";
  };

  const sidebarItems = [
    {
      icon: <Home className="w-5 h-5" />,
      label: "Overview",
      active: activeTab === "overview",
      onClick: () => setActiveTab("overview")
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: "Incoming Requests",
      active: activeTab === "incoming",
      onClick: () => setActiveTab("incoming")
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      label: "Decision Panel",
      active: activeTab === "decisions",
      onClick: () => setActiveTab("decisions")
    },
    {
      icon: <BarChart className="w-5 h-5" />,
      label: "Analytics",
      active: activeTab === "analytics",
      onClick: () => setActiveTab("analytics")
    },
    {
      icon: <Search className="w-5 h-5" />,
      label: "Audit Logs",
      active: activeTab === "audit",
      onClick: () => setActiveTab("audit")
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
      active: activeTab === "settings",
      onClick: () => setActiveTab("settings")
    }
  ];

  const handleDecision = (requestId: string, decision: string, reason?: string) => {
    toast.success(`PA request ${requestId} ${decision}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Welcome Header */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">BlueCross Gold - PA Review Dashboard</h1>
              <p className="text-gray-600">Review and process prior authorization requests</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-healthcare-orange">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-bold text-healthcare-orange">12</CardTitle>
                  <CardDescription>Pending Review</CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-l-4 border-l-healthcare-blue">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-bold text-healthcare-blue">5</CardTitle>
                  <CardDescription>Ready for Decision</CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-l-4 border-l-healthcare-green">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-bold text-healthcare-green">18</CardTitle>
                  <CardDescription>Approved Today</CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-l-4 border-l-healthcare-red">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-bold text-healthcare-red">3</CardTitle>
                  <CardDescription>Denied Today</CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Urgent Requests */}
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Urgent Requests</CardTitle>
                <CardDescription>High-priority PA requests requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {incomingRequests.filter(r => r.priority === "urgent").map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border-2 border-red-200 rounded-lg bg-red-50">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(request.status)}
                        <div>
                          <p className="font-semibold">{request.patient}</p>
                          <p className="text-sm text-gray-600">{request.drug} - {request.provider}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-red-100 text-red-800">URGENT</Badge>
                        <Button size="sm" className="bg-healthcare-blue hover:bg-healthcare-blue-dark">
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest PA request updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {incomingRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(request.status)}
                        <div>
                          <p className="font-semibold">{request.patient}</p>
                          <p className="text-sm text-gray-600">{request.drug} - {request.pharmacy}</p>
                        </div>
                      </div>
                      <Badge className={getStatusClass(request.status)}>
                        {request.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "incoming":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Incoming PA Requests</CardTitle>
                <CardDescription>Review all incoming prior authorization requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead>Request ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Drug</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {incomingRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.id}</TableCell>
                          <TableCell>{request.patient}</TableCell>
                          <TableCell>{request.drug}</TableCell>
                          <TableCell>{request.provider}</TableCell>
                          <TableCell>
                            <Badge className={getPriorityClass(request.priority)}>
                              {request.priority.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusClass(request.status)}>
                              <span className="flex items-center space-x-1">
                                {getStatusIcon(request.status)}
                                <span>{request.status.replace('-', ' ').toUpperCase()}</span>
                              </span>
                            </Badge>
                          </TableCell>
                          <TableCell>{request.submitted}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-1" />
                                Review
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "decisions":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Decision Panel</CardTitle>
                <CardDescription>Make approval decisions on reviewed PA requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {incomingRequests
                    .filter(r => r.status === "ready-for-decision")
                    .map((request) => (
                    <div key={request.id} className="border-2 border-healthcare-blue rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{request.patient}</h3>
                          <p className="text-gray-600">{request.drug}</p>
                          <p className="text-sm text-gray-500">Provider: {request.provider}</p>
                          <p className="text-sm text-gray-500">Pharmacy: {request.pharmacy}</p>
                        </div>
                        <Badge className={getPriorityClass(request.priority)}>
                          {request.priority.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <h4 className="font-medium mb-2">Auto-Validation Results</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>Patient eligibility verified</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>Prescriber credentials valid</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>Drug coverage confirmed</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>All required documents present</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <Label className="block text-sm font-medium mb-2">Decision Notes</Label>
                        <Textarea 
                          placeholder="Enter decision rationale or additional requirements..."
                          className="min-h-20"
                        />
                      </div>

                      <div className="flex space-x-3">
                        <Button 
                          className="bg-healthcare-green hover:bg-green-700"
                          onClick={() => handleDecision(request.id, "approved")}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button 
                          variant="destructive"
                          onClick={() => handleDecision(request.id, "denied")}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Deny
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => handleDecision(request.id, "requested more info")}
                        >
                          <AlertCircle className="w-4 h-4 mr-2" />
                          Request More Info
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "analytics":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>PA Analytics</CardTitle>
                <CardDescription>Performance metrics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-healthcare-blue-light rounded-lg">
                    <h3 className="text-2xl font-bold text-healthcare-blue">87%</h3>
                    <p className="text-gray-600">Approval Rate</p>
                  </div>
                  <div className="text-center p-6 bg-healthcare-green-light rounded-lg">
                    <h3 className="text-2xl font-bold text-healthcare-green">2.3</h3>
                    <p className="text-gray-600">Avg. Days to Decision</p>
                  </div>
                  <div className="text-center p-6 bg-healthcare-orange-light rounded-lg">
                    <h3 className="text-2xl font-bold text-healthcare-orange">234</h3>
                    <p className="text-gray-600">Requests This Month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "audit":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Audit Trail</CardTitle>
                <CardDescription>Complete log of all PA activities for compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">PA002 - Decision Made</p>
                        <p className="text-sm text-gray-600">Request approved by reviewer@bluecross.com</p>
                      </div>
                      <span className="text-xs text-gray-500">2024-01-15 14:32:00</span>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">PA001 - Status Updated</p>
                        <p className="text-sm text-gray-600">Moved to pending review queue</p>
                      </div>
                      <span className="text-xs text-gray-500">2024-01-15 09:15:00</span>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">PA003 - Document Uploaded</p>
                        <p className="text-sm text-gray-600">Lab results added by City Pharmacy</p>
                      </div>
                      <span className="text-xs text-gray-500">2024-01-14 16:45:00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{activeTab.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</CardTitle>
                <CardDescription>This section is under development</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Content for {activeTab} will be available soon.</p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <DashboardLayout
      userRole="Payer"
      userName="BlueCross Gold"
      sidebarItems={sidebarItems}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default PayerInterface;
