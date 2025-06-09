
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Clock, Users, FileText, CheckCircle, Lock } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-healthcare-blue-light to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-healthcare-blue rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">MedAuth Pro</h1>
                <p className="text-sm text-gray-600">Prior Authorization Platform</p>
              </div>
            </div>
            <Button onClick={() => navigate("/login")} className="bg-healthcare-blue hover:bg-healthcare-blue-dark">
              Login
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-healthcare-green-light text-healthcare-green border-healthcare-green">
            HIPAA Compliant & Secure
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Streamline Prior Authorization
            <span className="text-healthcare-blue block">for Better Patient Care</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Automate and expedite prescription drug approvals with our comprehensive PA management platform. 
            Designed for pharmacies, providers, payers, and patients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/login")}
              className="bg-healthcare-blue hover:bg-healthcare-blue-dark text-lg px-8 py-3"
            >
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="border-2 hover:border-healthcare-blue transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-healthcare-blue-light rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-healthcare-blue" />
              </div>
              <CardTitle>Fast Processing</CardTitle>
              <CardDescription>
                Reduce approval times from days to hours with automated workflows and smart form generation.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-healthcare-green transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-healthcare-green-light rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-healthcare-green" />
              </div>
              <CardTitle>Multi-Role Support</CardTitle>
              <CardDescription>
                Unified platform for pharmacies, providers, payers, and patients with role-specific dashboards.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-healthcare-orange transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-healthcare-orange-light rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-healthcare-orange" />
              </div>
              <CardTitle>Smart Validation</CardTitle>
              <CardDescription>
                AI-powered form validation and auto-completion reduces errors and resubmissions.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Role Access Cards */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">Access by Role</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                role: "Pharmacy",
                description: "Submit PA requests, track status, upload documents",
                color: "healthcare-blue",
                path: "/pharmacy"
              },
              {
                role: "Provider",
                description: "Review requests, digital signatures, patient management",
                color: "healthcare-green",
                path: "/provider"
              },
              {
                role: "Payer",
                description: "Review and approve requests, audit trails, decision tracking",
                color: "healthcare-orange",
                path: "/payer"
              },
              {
                role: "Patient",
                description: "Track PA status, view timeline, secure messaging",
                color: "healthcare-red",
                path: "/patient"
              }
            ].map((item) => (
              <Card key={item.role} className="text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/login")}>
                <CardHeader>
                  <CardTitle className={`text-${item.color}`}>{item.role}</CardTitle>
                  <CardDescription className="h-12">{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Access Portal
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Security & Compliance */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 text-healthcare-blue mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Security & Compliance</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Lock className="w-8 h-8 text-healthcare-blue mx-auto mb-2" />
              <h4 className="font-semibold mb-2">HIPAA Compliant</h4>
              <p className="text-gray-600">Full compliance with healthcare privacy regulations</p>
            </div>
            <div>
              <Shield className="w-8 h-8 text-healthcare-green mx-auto mb-2" />
              <h4 className="font-semibold mb-2">End-to-End Encryption</h4>
              <p className="text-gray-600">All data encrypted in transit and at rest</p>
            </div>
            <div>
              <FileText className="w-8 h-8 text-healthcare-orange mx-auto mb-2" />
              <h4 className="font-semibold mb-2">Audit Trails</h4>
              <p className="text-gray-600">Complete logging for compliance and security</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 MedAuth Pro. All rights reserved. HIPAA Compliant Healthcare Solution.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
