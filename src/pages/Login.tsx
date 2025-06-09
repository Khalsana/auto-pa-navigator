
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !role) {
      toast.error("Please fill in all fields");
      return;
    }

    // Simulate login
    toast.success(`Logged in as ${role}`);
    
    // Navigate based on role
    switch (role) {
      case "pharmacy":
        navigate("/pharmacy");
        break;
      case "provider":
        navigate("/provider");
        break;
      case "payer":
        navigate("/payer");
        break;
      case "patient":
        navigate("/patient");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-healthcare-blue-light to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4 text-healthcare-blue hover:text-healthcare-blue-dark"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-healthcare-blue rounded-lg flex items-center justify-center">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MedAuth Pro</h1>
              <p className="text-sm text-gray-600">Prior Authorization Platform</p>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border-2">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Please sign in to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@healthcare.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pharmacy">Pharmacy</SelectItem>
                    <SelectItem value="provider">Provider</SelectItem>
                    <SelectItem value="payer">Payer</SelectItem>
                    <SelectItem value="patient">Patient</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full h-12 bg-healthcare-blue hover:bg-healthcare-blue-dark text-lg">
                Sign In
              </Button>

              <div className="text-center pt-4">
                <Button variant="link" className="text-healthcare-blue hover:text-healthcare-blue-dark">
                  Forgot your password?
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Demo Users */}
        <Card className="mt-6 border border-healthcare-blue-light bg-healthcare-blue-light/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-healthcare-blue">Demo Credentials</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xs text-healthcare-blue space-y-1">
              <p><strong>Email:</strong> demo@medauth.com</p>
              <p><strong>Password:</strong> demo123</p>
              <p><strong>Any Role:</strong> Pharmacy, Provider, Payer, or Patient</p>
            </div>
          </CardContent>
        </Card>

        {/* Security Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>🔒 HIPAA Compliant • End-to-End Encrypted</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
