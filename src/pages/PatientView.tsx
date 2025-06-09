
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  User,
  Phone,
  Mail,
  ArrowLeft,
  MessageSquare,
  Bell
} from "lucide-react";

const PatientView = () => {
  const navigate = useNavigate();
  
  // Mock patient data
  const patientData = {
    name: "Jane Doe",
    dob: "March 15, 1986",
    memberId: "BC123456789",
    phone: "(555) 123-4567",
    email: "jane.doe@email.com"
  };

  const paRequests = [
    {
      id: "PA001",
      drug: "Lantus Solostar",
      pharmacy: "City Pharmacy",
      provider: "Dr. Sarah Johnson",
      status: "pending",
      submitted: "2024-01-15",
      estimatedDecision: "2024-01-18",
      timeline: [
        { step: "Submitted", date: "2024-01-15", completed: true },
        { step: "Under Review", date: "2024-01-16", completed: true },
        { step: "Provider Review", date: "2024-01-17", completed: false },
        { step: "Payer Decision", date: "2024-01-18", completed: false }
      ]
    },
    {
      id: "PA002",
      drug: "Ozempic",
      pharmacy: "CVS Pharmacy", 
      provider: "Dr. Michael Brown",
      status: "approved",
      submitted: "2024-01-10",
      estimatedDecision: "2024-01-13",
      timeline: [
        { step: "Submitted", date: "2024-01-10", completed: true },
        { step: "Under Review", date: "2024-01-11", completed: true },
        { step: "Provider Review", date: "2024-01-12", completed: true },
        { step: "Payer Decision", date: "2024-01-13", completed: true }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-5 h-5" />;
      case "approved": return <CheckCircle className="w-5 h-5" />;
      case "denied": return <XCircle className="w-5 h-5" />;
      case "needs-info": return <AlertCircle className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/")}
                className="text-healthcare-blue hover:text-healthcare-blue-dark"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-healthcare-blue rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">MedAuth Pro</h1>
                  <p className="text-sm text-gray-600">Patient Portal</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="outline" onClick={() => navigate("/login")}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Patient Info Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarFallback className="bg-healthcare-blue text-white text-xl">
                    {patientData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle>{patientData.name}</CardTitle>
                <CardDescription>Patient Portal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Date of Birth</p>
                    <p className="text-sm text-gray-600">{patientData.dob}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Member ID</p>
                    <p className="text-sm text-gray-600">{patientData.memberId}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-gray-600">{patientData.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-gray-600">{patientData.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Contact */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-healthcare-blue hover:bg-healthcare-blue-dark">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
                <div className="mt-4 text-center text-sm text-gray-600">
                  <p>Support Hours:</p>
                  <p>Mon-Fri: 8am-6pm EST</p>
                  <p>Phone: 1-800-MEDAUTH</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* PA Requests */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Prior Authorization Requests</CardTitle>
                <CardDescription>Track the status of your medication approval requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {paRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{request.drug}</h3>
                          <p className="text-sm text-gray-600">
                            Prescribed by {request.provider}
                          </p>
                          <p className="text-sm text-gray-600">
                            Pharmacy: {request.pharmacy}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className={`${getStatusClass(request.status)} mb-2`}>
                            <span className="flex items-center space-x-1">
                              {getStatusIcon(request.status)}
                              <span>{request.status.toUpperCase()}</span>
                            </span>
                          </Badge>
                          <p className="text-xs text-gray-500">ID: {request.id}</p>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-3">Request Timeline</h4>
                        <div className="space-y-3">
                          {request.timeline.map((step, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className={`w-4 h-4 rounded-full border-2 ${
                                step.completed 
                                  ? 'bg-healthcare-green border-healthcare-green' 
                                  : 'border-gray-300'
                              }`}>
                                {step.completed && (
                                  <CheckCircle className="w-4 h-4 text-white" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className={`text-sm font-medium ${
                                  step.completed ? 'text-gray-900' : 'text-gray-500'
                                }`}>
                                  {step.step}
                                </p>
                                <p className="text-xs text-gray-500">{step.date}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between items-center text-sm">
                        <span className="text-gray-600">
                          Submitted: {request.submitted}
                        </span>
                        {request.status === 'pending' && (
                          <span className="text-healthcare-blue font-medium">
                            Est. Decision: {request.estimatedDecision}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Messages */}
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Communication regarding your PA requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-healthcare-blue-light rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium">BlueCross Gold Review Team</p>
                      <span className="text-xs text-gray-500">Jan 16, 2024</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Your PA request for Lantus Solostar is currently under review. 
                      We may need additional information from your provider.
                    </p>
                  </div>
                  <div className="p-4 bg-healthcare-green-light rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium">BlueCross Gold Review Team</p>
                      <span className="text-xs text-gray-500">Jan 13, 2024</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Great news! Your PA request for Ozempic has been approved. 
                      You can pick up your prescription at CVS Pharmacy.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            <p>🔒 HIPAA Compliant • Secure Patient Portal • End-to-End Encrypted</p>
            <p className="mt-2">&copy; 2024 MedAuth Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PatientView;
