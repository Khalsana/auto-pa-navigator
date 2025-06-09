
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Home, 
  Plus, 
  Search, 
  Upload, 
  Users, 
  Settings,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  FileText,
  Phone
} from "lucide-react";
import { toast } from "sonner";

const PharmacyDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [newPAForm, setNewPAForm] = useState({
    patientName: "",
    patientDOB: "",
    insuranceId: "",
    patientPhone: "",
    drugName: "",
    ndc: "",
    dosage: "",
    frequency: "",
    quantity: "",
    prescriberName: "",
    prescriberNPI: "",
    prescriberPhone: "",
    payer: ""
  });

  // Mock data for PA requests
  const paRequests = [
    {
      id: "PA001",
      patient: "Jane Doe",
      drug: "Lantus Solostar",
      payer: "BlueCross Gold",
      status: "pending",
      submitted: "2024-01-15",
      prescriber: "Dr. Smith"
    },
    {
      id: "PA002", 
      patient: "John Johnson",
      drug: "Humira",
      payer: "Aetna",
      status: "approved",
      submitted: "2024-01-14",
      prescriber: "Dr. Brown"
    },
    {
      id: "PA003",
      patient: "Mary Wilson",
      drug: "Ozempic",
      payer: "Cigna",
      status: "denied",
      submitted: "2024-01-13",
      prescriber: "Dr. Davis"
    },
    {
      id: "PA004",
      patient: "Robert Taylor",
      drug: "Xarelto",
      payer: "BlueCross Gold",
      status: "needs-info",
      submitted: "2024-01-12",
      prescriber: "Dr. Miller"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-4 h-4" />;
      case "approved": return <CheckCircle className="w-4 h-4" />;
      case "denied": return <XCircle className="w-4 h-4" />;
      case "needs-info": return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "pending": return "status-pending";
      case "approved": return "status-approved";  
      case "denied": return "status-denied";
      case "needs-info": return "status-needs-info";
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
      icon: <Plus className="w-5 h-5" />,
      label: "New PA Request",
      active: activeTab === "new-request",
      onClick: () => setActiveTab("new-request")
    },
    {
      icon: <Search className="w-5 h-5" />,
      label: "Track Requests",
      active: activeTab === "track-requests",
      onClick: () => setActiveTab("track-requests")
    },
    {
      icon: <Upload className="w-5 h-5" />,
      label: "Upload Documents",
      active: activeTab === "upload-docs",
      onClick: () => setActiveTab("upload-docs")
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Patients",
      active: activeTab === "patients",
      onClick: () => setActiveTab("patients")
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
      active: activeTab === "settings",
      onClick: () => setActiveTab("settings")
    }
  ];

  const handleSubmitPA = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!newPAForm.patientName || !newPAForm.drugName || !newPAForm.prescriberName) {
      toast.error("Please fill in required fields");
      return;
    }

    toast.success("PA request submitted successfully");
    
    // Reset form
    setNewPAForm({
      patientName: "",
      patientDOB: "",
      insuranceId: "",
      patientPhone: "",
      drugName: "",
      ndc: "",
      dosage: "",
      frequency: "",
      quantity: "",
      prescriberName: "",
      prescriberNPI: "",
      prescriberPhone: "",
      payer: ""
    });
    
    setActiveTab("track-requests");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Welcome Header */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, City Pharmacy</h1>
              <p className="text-gray-600">Manage your prior authorization requests efficiently</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-healthcare-orange">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-bold text-healthcare-orange">8</CardTitle>
                  <CardDescription>Pending Requests</CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-l-4 border-l-healthcare-green">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-bold text-healthcare-green">12</CardTitle>
                  <CardDescription>Approvals Today</CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-l-4 border-l-healthcare-blue">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-bold text-healthcare-blue">3</CardTitle>
                  <CardDescription>Resubmissions</CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-l-4 border-l-healthcare-red">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-bold text-healthcare-red">2</CardTitle>
                  <CardDescription>Denied Today</CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent PA Requests</CardTitle>
                <CardDescription>Latest prior authorization activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(request.status)}
                        <div>
                          <p className="font-semibold">{request.patient}</p>
                          <p className="text-sm text-gray-600">{request.drug}</p>
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

      case "new-request":
        return (
          <div className="max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle>New Prior Authorization Request</CardTitle>
                <CardDescription>Submit a new PA request for prescription approval</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitPA} className="space-y-6">
                  {/* Patient Information */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Patient Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="patientName">Patient Name *</Label>
                        <Input
                          id="patientName"
                          placeholder="Jane Doe"
                          value={newPAForm.patientName}
                          onChange={(e) => setNewPAForm({...newPAForm, patientName: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="patientDOB">Date of Birth</Label>
                        <Input
                          id="patientDOB"
                          type="date"
                          value={newPAForm.patientDOB}
                          onChange={(e) => setNewPAForm({...newPAForm, patientDOB: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="insuranceId">Insurance ID</Label>
                        <Input
                          id="insuranceId"
                          placeholder="BC123456789"
                          value={newPAForm.insuranceId}
                          onChange={(e) => setNewPAForm({...newPAForm, insuranceId: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="patientPhone">Phone Number</Label>
                        <Input
                          id="patientPhone"
                          placeholder="(555) 123-4567"
                          value={newPAForm.patientPhone}
                          onChange={(e) => setNewPAForm({...newPAForm, patientPhone: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Prescription Information */}
                  <div className="bg-healthcare-blue-light p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Prescription Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="drugName">Drug Name *</Label>
                        <Input
                          id="drugName"
                          placeholder="Lantus Solostar"
                          value={newPAForm.drugName}
                          onChange={(e) => setNewPAForm({...newPAForm, drugName: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="ndc">NDC Number</Label>
                        <Input
                          id="ndc"
                          placeholder="12345-6789-10"
                          value={newPAForm.ndc}
                          onChange={(e) => setNewPAForm({...newPAForm, ndc: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="dosage">Dosage</Label>
                        <Input
                          id="dosage"
                          placeholder="100 units/mL"
                          value={newPAForm.dosage}
                          onChange={(e) => setNewPAForm({...newPAForm, dosage: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="frequency">Frequency</Label>
                        <Input
                          id="frequency"
                          placeholder="Once daily"
                          value={newPAForm.frequency}
                          onChange={(e) => setNewPAForm({...newPAForm, frequency: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                          id="quantity"
                          placeholder="90 day supply"
                          value={newPAForm.quantity}
                          onChange={(e) => setNewPAForm({...newPAForm, quantity: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="payer">Payer</Label>
                        <Select value={newPAForm.payer} onValueChange={(value) => setNewPAForm({...newPAForm, payer: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payer" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bluecross">BlueCross Gold</SelectItem>
                            <SelectItem value="aetna">Aetna</SelectItem>
                            <SelectItem value="cigna">Cigna</SelectItem>
                            <SelectItem value="humana">Humana</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Prescriber Information */}
                  <div className="bg-healthcare-green-light p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Prescriber Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="prescriberName">Prescriber Name *</Label>
                        <Input
                          id="prescriberName"
                          placeholder="Dr. John Smith"
                          value={newPAForm.prescriberName}
                          onChange={(e) => setNewPAForm({...newPAForm, prescriberName: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="prescriberNPI">NPI Number</Label>
                        <Input
                          id="prescriberNPI"
                          placeholder="1234567890"
                          value={newPAForm.prescriberNPI}
                          onChange={(e) => setNewPAForm({...newPAForm, prescriberNPI: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="prescriberPhone">Phone Number</Label>
                        <Input
                          id="prescriberPhone"
                          placeholder="(555) 987-6543"
                          value={newPAForm.prescriberPhone}
                          onChange={(e) => setNewPAForm({...newPAForm, prescriberPhone: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end space-x-4">
                    <Button variant="outline" type="button" onClick={() => setActiveTab("overview")}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-healthcare-blue hover:bg-healthcare-blue-dark">
                      Submit to Payer
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        );

      case "track-requests":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Track PA Requests</CardTitle>
                <CardDescription>Monitor the status of all prior authorization requests</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <Input placeholder="Search patient or drug..." className="md:w-64" />
                  <Select>
                    <SelectTrigger className="md:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="denied">Denied</SelectItem>
                      <SelectItem value="needs-info">Needs Info</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="md:w-48">
                      <SelectValue placeholder="Filter by date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="all">All Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Requests Table */}
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead>Request ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Drug</TableHead>
                        <TableHead>Payer</TableHead>
                        <TableHead>Prescriber</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.id}</TableCell>
                          <TableCell>{request.patient}</TableCell>
                          <TableCell>{request.drug}</TableCell>
                          <TableCell>{request.payer}</TableCell>
                          <TableCell>{request.prescriber}</TableCell>
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
                              <Button variant="outline" size="sm">View</Button>
                              {request.status === 'denied' && (
                                <Button variant="outline" size="sm" className="text-healthcare-blue">
                                  Resubmit
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
      userRole="Pharmacy"
      userName="City Pharmacy"
      sidebarItems={sidebarItems}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default PharmacyDashboard;
