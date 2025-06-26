
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  UserCheck, 
  UserX, 
  TrendingUp, 
  DollarSign, 
  Star,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  BarChart3
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample analytics data
  const monthlyData = [
    { month: "Jan", users: 120, bookings: 45, revenue: 2400 },
    { month: "Feb", users: 150, bookings: 67, revenue: 3200 },
    { month: "Mar", users: 180, bookings: 89, revenue: 4100 },
    { month: "Apr", users: 220, bookings: 112, revenue: 5200 },
    { month: "May", users: 280, bookings: 134, revenue: 6800 },
    { month: "Jun", users: 340, bookings: 156, revenue: 8200 }
  ];

  const serviceData = [
    { service: "Cleaning", bookings: 45, revenue: 2250 },
    { service: "Handyman", bookings: 38, revenue: 3040 },
    { service: "Tutoring", bookings: 29, revenue: 2320 },
    { service: "Pet Care", bookings: 22, revenue: 1320 },
    { service: "Landscaping", bookings: 15, revenue: 1875 },
    { service: "Photography", bookings: 12, revenue: 1800 }
  ];

  // Sample provider applications
  const pendingProviders = [
    {
      id: 1,
      name: "John Smith",
      service: "Plumbing",
      email: "john@example.com",
      phone: "(555) 123-4567",
      experience: "5 years",
      rating: null,
      status: "pending"
    },
    {
      id: 2,
      name: "Maria Garcia",
      service: "House Cleaning",
      email: "maria@example.com",
      phone: "(555) 987-6543",
      experience: "3 years",
      rating: null,
      status: "pending"
    },
    {
      id: 3,
      name: "Robert Lee",
      service: "Tutoring",
      email: "robert@example.com",
      phone: "(555) 456-7890",
      experience: "7 years",
      rating: null,
      status: "pending"
    }
  ];

  // Sample user list
  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      type: "Provider",
      status: "Active",
      joinDate: "2024-01-15",
      totalBookings: 127
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      email: "mike@example.com",
      type: "Provider",
      status: "Active",
      joinDate: "2024-02-03",
      totalBookings: 89
    },
    {
      id: 3,
      name: "Emily Chen",
      email: "emily@example.com",
      type: "Customer",
      status: "Active",
      joinDate: "2024-03-12",
      totalBookings: 15
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LS</span>
              </div>
              <span className="text-xl font-bold text-gray-800">LocalService Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Admin Panel
              </Badge>
              <Button variant="outline" size="sm">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your LocalService marketplace</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="providers">Provider Applications</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Providers</CardTitle>
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">+8% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$8,200</div>
                  <p className="text-xs text-muted-foreground">+20% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8</div>
                  <p className="text-xs text-muted-foreground">+0.2 from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">House Cleaning - Sarah J.</p>
                        <p className="text-sm text-gray-600">Customer: Mike R.</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Completed</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Math Tutoring - Emily C.</p>
                        <p className="text-sm text-gray-600">Customer: Lisa T.</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Handyman - Mike R.</p>
                        <p className="text-sm text-gray-600">Customer: David K.</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Scheduled</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pending Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingProviders.slice(0, 3).map((provider) => (
                      <div key={provider.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{provider.name}</p>
                          <p className="text-sm text-gray-600">{provider.service}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="providers">
            <Card>
              <CardHeader>
                <CardTitle>Provider Applications</CardTitle>
                <p className="text-sm text-gray-600">Review and approve new service providers</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingProviders.map((provider) => (
                    <div key={provider.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{provider.name}</h3>
                          <p className="text-gray-600">{provider.service}</p>
                        </div>
                        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                          Pending Review
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{provider.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{provider.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Experience</p>
                          <p className="font-medium">{provider.experience}</p>
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <Button className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button variant="destructive">
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                        <Button variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <p className="text-sm text-gray-600">Manage customers and service providers</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="font-semibold">{user.name}</h3>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge variant={user.type === "Provider" ? "default" : "secondary"}>
                            {user.type}
                          </Badge>
                          <Badge variant={user.status === "Active" ? "default" : "destructive"}>
                            {user.status}
                          </Badge>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Joined: {user.joinDate}</p>
                            <p className="text-sm font-medium">{user.totalBookings} bookings</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-6">
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
                        <Line type="monotone" dataKey="bookings" stroke="#10b981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Service Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={serviceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="service" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="bookings" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Revenue Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                      <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
