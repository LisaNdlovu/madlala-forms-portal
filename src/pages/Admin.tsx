import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, FileText, TrendingUp, Clock, Search, Filter, Eye } from "lucide-react";

// Mock data for applications
const mockApplications = [
  {
    id: "APP001",
    studentName: "John Doe",
    school: "Hlomani High School",
    grade: "Grade 10",
    status: "pending",
    submitted: "2024-01-15",
    parentEmail: "parent@email.com",
    phoneNumber: "+27 123 456 789"
  },
  {
    id: "APP002",
    studentName: "Jane Smith",
    school: "Kurhula Junior Secondary School",
    grade: "Grade 8",
    status: "approved",
    submitted: "2024-01-14",
    parentEmail: "jane.parent@email.com",
    phoneNumber: "+27 234 567 890"
  },
  {
    id: "APP003",
    studentName: "Mike Johnson",
    school: "Mabarhule High School",
    grade: "Grade 11",
    status: "rejected",
    submitted: "2024-01-13",
    parentEmail: "mike.family@email.com",
    phoneNumber: "+27 345 678 901"
  },
  {
    id: "APP004",
    studentName: "Sarah Wilson",
    school: "Madlala High School",
    grade: "Grade 9",
    status: "pending",
    submitted: "2024-01-12",
    parentEmail: "wilson.family@email.com",
    phoneNumber: "+27 456 789 012"
  }
];

export default function Admin() {
  const [applications, setApplications] = useState(mockApplications);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [schoolFilter, setSchoolFilter] = useState("all");

  const stats = [
    { title: "Total Applications", value: applications.length, icon: FileText, color: "text-blue-500" },
    { title: "Pending Review", value: applications.filter(app => app.status === "pending").length, icon: Clock, color: "text-yellow-500" },
    { title: "Approved", value: applications.filter(app => app.status === "approved").length, icon: Users, color: "text-green-500" },
    { title: "Success Rate", value: "75%", icon: TrendingUp, color: "text-purple-500" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="border-yellow-500 text-yellow-600">Pending</Badge>;
      case "approved":
        return <Badge variant="outline" className="border-green-500 text-green-600">Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="border-red-500 text-red-600">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const updateApplicationStatus = (id: string, newStatus: string) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const matchesSchool = schoolFilter === "all" || app.school === schoolFilter;
    
    return matchesSearch && matchesStatus && matchesSchool;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Ximhungwe Circuit Schools Administration</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
              Export Report
            </Button>
            <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
              Logout
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-slate-700 border-slate-600">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-300">{stat.title}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color === 'text-blue-500' ? 'bg-blue-500' : stat.color === 'text-green-500' ? 'bg-green-500' : stat.color === 'text-yellow-500' ? 'bg-yellow-500' : 'bg-purple-500'}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="applications">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Application Management */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Application Management
                    </CardTitle>
                    {filteredApplications.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-orange-600 font-medium">No applications submitted yet.</p>
                        <p className="text-muted-foreground text-sm mt-1">Applications will appear here once students submit their forms.</p>
                      </div>
                    ) : (
                      <CardDescription>
                        Review and manage student applications across all schools
                      </CardDescription>
                    )}
                
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <div className="flex-1">
                    <Label htmlFor="search">Search Applications</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder="Search by name, school, or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="status-filter">Status</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="school-filter">School</Label>
                    <Select value={schoolFilter} onValueChange={setSchoolFilter}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Schools</SelectItem>
                        <SelectItem value="Hlomani High School">Hlomani High School</SelectItem>
                        <SelectItem value="Kurhula Junior Secondary School">Kurhula Junior Secondary</SelectItem>
                        <SelectItem value="Mabarhule High School">Mabarhule High School</SelectItem>
                        <SelectItem value="Madlala High School">Madlala High School</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {filteredApplications.map((application) => (
                    <div key={application.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{application.studentName}</h3>
                            {getStatusBadge(application.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {application.school} - {application.grade}
                          </p>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-muted-foreground">
                            <span>ID: {application.id}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>Submitted: {application.submitted}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>{application.parentEmail}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          {application.status === "pending" && (
                            <>
                              <Button 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => updateApplicationStatus(application.id, "approved")}
                              >
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => updateApplicationStatus(application.id, "rejected")}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {filteredApplications.length === 0 && searchTerm === "" && statusFilter === "all" && schoolFilter === "all" && (
                    <div className="text-center py-8 text-muted-foreground">
                      No applications submitted yet
                    </div>
                  )}
                  {filteredApplications.length === 0 && (searchTerm !== "" || statusFilter !== "all" || schoolFilter !== "all") && (
                    <div className="text-center py-8 text-muted-foreground">
                      No applications match your search criteria
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Applications by School & Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Applications by School</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-orange-700">Hlomani High School</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded">
                        <div className="w-1/4 h-2 bg-blue-500 rounded"></div>
                      </div>
                      <span className="text-sm text-muted-foreground">0</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-orange-700">Kurhula Junior Secondary</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded">
                        <div className="w-0 h-2 bg-green-500 rounded"></div>
                      </div>
                      <span className="text-sm text-muted-foreground">0</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-orange-700">Mabarhule High School</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded">
                        <div className="w-0 h-2 bg-orange-500 rounded"></div>
                      </div>
                      <span className="text-sm text-muted-foreground">0</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-orange-700">Madlala High School</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded">
                        <div className="w-0 h-2 bg-purple-500 rounded"></div>
                      </div>
                      <span className="text-sm text-muted-foreground">0</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-blue-500 hover:bg-blue-600" disabled>
                  Review Pending Applications (0)
                </Button>
                <Button className="w-full justify-start bg-green-500 hover:bg-green-600" disabled>
                  Manage Student Records
                </Button>
                <Button className="w-full justify-start bg-orange-500 hover:bg-orange-600" disabled>
                  Update School Information
                </Button>
                <Button className="w-full justify-start bg-amber-500 hover:bg-amber-600" disabled>
                  Generate Reports
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Overview</CardTitle>
                <CardDescription>
                  Application trends and enrollment statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Analytics dashboard coming soon...</p>
                  <p className="text-sm">Real-time application tracking and reporting will be available here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure application settings and system parameters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <p>Settings panel coming soon...</p>
                  <p className="text-sm">System configuration options will be available here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}