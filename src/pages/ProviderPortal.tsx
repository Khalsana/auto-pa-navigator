
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { 
  Home, 
  Users, 
  FileText, 
  PenTool, 
  Settings,
  CheckCircle,
  Clock,
  AlertCircle,
  Edit,
  Eye
} from "lucide-react";
import { toast } from "sonner";

const ProviderPortal = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for PA requests needing provider action
  const providerRequests = [
    {
      id: "PA001",
      patient: "Jane Doe",
      drug: "Lantus Solostar",
      pharmacy: "City Pharmacy",
      status: "pending-signature",
      submitted: "2024-01-15",
      notes: "Diabetes management, previous treatments failed"
    },
    {
      id: "PA002",
      patient: "John Johnson", 
      drug: "Humira",
      pharmacy: "HealthMart Pharmacy",
      status: "needs-review",
      submitted: "2024-01-14",
      notes: "Rheumatoid arthritis, methotrexate intolerance"
    },
    {
      id: "PA004",
      patient: "Robert Taylor",
      drug: "Xarelto",
      pharmacy: "CVS Pharmacy",
      status: "signed",
      submitted: "2024-01-12",
      notes: "Atrial fibrillation, stroke prevention"
    }
  ];

  const patients = [
    {
      name: "Jane Doe",
      id: "P001",
      dob: "03/15/1986",
      activePrescriptions: 3,
      pendingPA: 1,
      lastVisit: "2024-01-10"
    },
    {
      name: "John Johnson",
      id: "P002", 
      dob: "07/22/1975",
      activePrescriptions: 5,
      pendingPA: 1,
      lastVisit: "2024-01-08"
    },
    {
      name: "Mary Wilson",
      id: "P003",
      dob: "11/30/1968",
      activePrescriptions: 2,
      pendingPA: 0,
      lastVisit: "2024-01-05"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending-signature": return <PenTool className="w-4 h-4" />;
      case "needs-review": return <AlertCircle className="w-4 h-4" />;
      case "signed": return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "pending-signature": return "status-pending";
      case "needs-review": return "status-needs-info";
      case "signed": return "status-approved";
      default: return "status-pending";
    }
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
      label: "PA Requests",
      active: activeTab === "pa-requests",
      onClick: () => setActiveTab("pa-requests")
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Patients",
      active: activeTab === "patients",
      onClick: () => setActiveTab("patients")
    },
    {
      icon: <PenTool className="w-5 h-5" />,
      label: "Digital Signature",
      active: activeTab === "signature",
      onClick: () => setActiveTab("signature")
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
      active: activeTab === "settings",
      onClick: () => setActiveTab("settings")
    }
  ];

  const handleSignRequest = (requestId: string) => {
    toast.success(`PA request ${requestId} signed successfully`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Welcome Header */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Dr. Sarah Johnson</h1>
              <p className="text-gray-600">Review and manage prior authorization requests</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-healthcare-orange">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-bold text-healthcare-orange">3</CardTitle>
                  <CardDescription>Pending Signatures</CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-l-4 border-l-healthcare-blue">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-bold text-healthcare-blue">2</CardTitle>
                  <CardDescription>Needs Review</CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-l-4 border-l-healthcare-green">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-bold text-healthcare-green">15</CardTitle>
                  <CardDescription>Signed This Week</CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-l-4 border-l-gray-400">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-bold text-gray-600">127</CardTitle>
                  <CardDescription>Active Patients</CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Recent PA Requests */}
            <Card>
              <CardHeader>
                <CardTitle>Recent PA Requests</CardTitle>
                <CardDescription>Requests requiring your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {providerRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(request.status)}
                        <div>
                          <p className="font-semibold">{request.patient}</p>
                          <p className="text-sm text-gray-600">{request.drug} - {request.pharmacy}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusClass(request.status)}>
                          {request.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                        {request.status === 'pending-signature' && (
                          <Button size="sm" className="bg-healthcare-blue hover:bg-healthcare-blue-dark">
                            Sign
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "pa-requests":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Prior Authorization Requests</CardTitle>
                <CardDescription>Review and approve PA requests from pharmacies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead>Request ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Drug</TableHead>
                        <TableHead>Pharmacy</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {providerRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.id}</TableCell>
                          <TableCell>{request.patient}</TableCell>
                          <TableCell>{request.drug}</TableCell>
                          <TableCell>{request.pharmacy}</TableCell>
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
                                View
                              </Button>
                              {request.status === 'pending-signature' && (
                                <Button 
                                  size="sm" 
                                  className="bg-healthcare-blue hover:bg-healthcare-blue-dark"
                                  onClick={() => handleSignRequest(request.id)}
                                >
                                  <PenTool className="w-4 h-4 mr-1" />
                                  Sign
                                </Button>
                              )}
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

      case "patients":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Management</CardTitle>
                <CardDescription>View and manage your patients and their prescriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead>Patient Name</TableHead>
                        <TableHead>Patient ID</TableHead>
                        <TableHead>Date of Birth</TableHead>
                        <TableHead>Active Prescriptions</TableHead>
                        <TableHead>Pending PA</TableHead>
                        <TableHead>Last Visit</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {patients.map((patient) => (
                        <TableRow key={patient.id}>
                          <TableCell className="font-medium">{patient.name}</TableCell>
                          <TableCell>{patient.id}</TableCell>
                          <TableCell>{patient.dob}</TableCell>
                          <TableCell>{patient.activePrescriptions}</TableCell>
                          <TableCell>
                            {patient.pendingPA > 0 ? (
                              <Badge className="status-pending">{patient.pendingPA}</Badge>
                            ) : (
                              <span className="text-gray-400">0</span>
                            )}
                          </TableCell>
                          <TableCell>{patient.lastVisit}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
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

      case "signature":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Digital Signature</CardTitle>
                <CardDescription>Manage your digital signature for PA requests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-healthcare-blue-light p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">Current Digital Signature</h3>
                  <div className="bg-white p-4 border-2 border-dashed border-healthcare-blue rounded-lg text-center">
                    <p className="text-healthcare-blue font-semibold text-lg">Dr. Sarah Johnson, MD</p>
                    <p className="text-sm text-gray-600">NPI: 1234567890</p>
                    <p className="text-sm text-gray-600">License: MD12345</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Signature Settings</h3>
                  <div className="space-y-4">
                    <Button className="bg-healthcare-blue hover:bg-healthcare-blue-dark">
                      Update Signature
                    </Button>
                    <Button variant="outline">
                      View Signature History
                    </Button>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Security Notice</h4>
                  <p className="text-sm text-gray-600">
                    Your digital signature is HIPAA compliant and legally binding. 
                    All signature activities are logged for audit purposes.
                  </p>
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
      userRole="Provider"
      userName="Dr. Sarah Johnson"
      sidebarItems={sidebarItems}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default ProviderPortal;
