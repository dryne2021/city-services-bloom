
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Users, 
  UserCheck, 
  TrendingUp, 
  DollarSign, 
  Star,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  LogOut,
  Shield,
  Loader2,
  AlertCircle
} from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useProviderApplications } from "@/hooks/useProviderApplications";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("applications");
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);

  const { adminProfile, isAdmin, loading, signOut } = useAdminAuth();
  const { applications, isLoading, approveApplication, rejectApplication } = useProviderApplications();
  const { toast } = useToast();

  // Redirect if not admin
  if (!loading && !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed Out",
      description: "You have been signed out of the admin panel.",
    });
  };

  const handleApprove = async (applicationId: string) => {
    try {
      await approveApplication.mutateAsync(applicationId);
      toast({
        title: "Application Approved",
        description: "The provider application has been approved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve the application. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (applicationId: string) => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Rejection Reason Required",
        description: "Please provide a reason for rejecting this application.",
        variant: "destructive",
      });
      return;
    }

    try {
      await rejectApplication.mutateAsync({
        applicationId,
        reason: rejectionReason,
      });
      toast({
        title: "Application Rejected",
        description: "The provider application has been rejected.",
      });
      setRejectionReason("");
      setSelectedApplication(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject the application. Please try again.",
        variant: "destructive",
      });
    }
  };

  const pendingApplications = applications.filter(app => app.status === 'pending');
  const approvedApplications = applications.filter(app => app.status === 'approved');
  const rejectedApplications = applications.filter(app => app.status === 'rejected');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">LocalService Admin</h1>
                <p className="text-sm text-gray-600">Welcome, {adminProfile?.full_name}</p>
              </div>
            </div>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
              <Clock className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{pendingApplications.length}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Providers</CardTitle>
              <UserCheck className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{approvedApplications.length}</div>
              <p className="text-xs text-muted-foreground">Active providers</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applications.length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejection Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {applications.length > 0 ? Math.round((rejectedApplications.length / applications.length) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">Of all applications</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="applications">Provider Applications</TabsTrigger>
            <TabsTrigger value="approved">Approved Providers</TabsTrigger>
            <TabsTrigger value="rejected">Rejected Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Pending Provider Applications ({pendingApplications.length})</CardTitle>
                <p className="text-sm text-gray-600">Review and approve new service providers</p>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </div>
                ) : pendingApplications.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">All Caught Up!</h3>
                    <p className="text-gray-600">No pending applications to review.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {pendingApplications.map((application) => (
                      <div key={application.id} className="border rounded-lg p-6 bg-white">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold">{application.business_name}</h3>
                            <p className="text-gray-600 mb-2">{application.profiles.full_name}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{application.profiles.email}</span>
                              {application.profiles.phone && <span>{application.profiles.phone}</span>}
                              {application.profiles.location && <span>{application.profiles.location}</span>}
                            </div>
                          </div>
                          <Badge variant="outline" className="text-orange-600 border-orange-600">
                            Pending Review
                          </Badge>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Business Description</h4>
                          <p className="text-gray-700">{application.business_description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="font-medium mb-1">Experience</h4>
                            <p className="text-gray-700">{application.experience_years} years</p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Certifications</h4>
                            <div className="flex flex-wrap gap-1">
                              {application.certifications.map((cert, index) => (
                                <Badge key={index} variant="secondary">{cert}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <Button
                            onClick={() => handleApprove(application.id)}
                            className="bg-green-600 hover:bg-green-700"
                            disabled={approveApplication.isPending}
                          >
                            {approveApplication.isPending ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <CheckCircle className="w-4 h-4 mr-2" />
                            )}
                            Approve
                          </Button>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="destructive"
                                onClick={() => setSelectedApplication(application.id)}
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Reject
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Reject Application</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <p className="text-gray-600">
                                  Please provide a reason for rejecting {application.business_name}'s application:
                                </p>
                                <Textarea
                                  value={rejectionReason}
                                  onChange={(e) => setRejectionReason(e.target.value)}
                                  placeholder="Enter rejection reason..."
                                  rows={4}
                                />
                                <div className="flex justify-end space-x-2">
                                  <Button 
                                    variant="outline"
                                    onClick={() => {
                                      setRejectionReason("");
                                      setSelectedApplication(null);
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={() => handleReject(application.id)}
                                    disabled={rejectApplication.isPending}
                                  >
                                    {rejectApplication.isPending ? (
                                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    ) : (
                                      "Reject Application"
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approved">
            <Card>
              <CardHeader>
                <CardTitle>Approved Providers ({approvedApplications.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {approvedApplications.map((application) => (
                    <div key={application.id} className="border rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{application.business_name}</h3>
                        <p className="text-gray-600">{application.profiles.full_name}</p>
                        <p className="text-sm text-gray-500">
                          Approved on {new Date(application.reviewed_at!).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Approved</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rejected">
            <Card>
              <CardHeader>
                <CardTitle>Rejected Applications ({rejectedApplications.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rejectedApplications.map((application) => (
                    <div key={application.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{application.business_name}</h3>
                          <p className="text-gray-600">{application.profiles.full_name}</p>
                        </div>
                        <Badge variant="destructive">Rejected</Badge>
                      </div>
                      {application.rejection_reason && (
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            <strong>Rejection Reason:</strong> {application.rejection_reason}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
