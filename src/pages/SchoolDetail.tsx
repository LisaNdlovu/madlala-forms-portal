import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, Calendar, MapPin, Phone, Mail, GraduationCap } from "lucide-react";
import { Header } from "@/components/Header";
import { ApplicationModal } from "@/components/ApplicationModal";

const schoolsData = {
  hlomani: {
    name: "Hlomani High School",
    subtitle: "Excellence in Education, Ximhungwe Circuit",
    description: "Hlomani High School is renowned for its commitment to academic excellence and comprehensive student development. Home to the zebras, our school motto 'Excellence meets opportunity' reflects our dedication to nurturing future leaders through quality education and holistic development.",
    students: 543,
    educators: 18,
    established: 1978,
    quintile: 3,
    grade: "Grades 8-12: Arts and Cultural Excellence",
    principal: "Mr. John Doe",
    phone: "+27608415662",
    email: "contact@hlomani.edu.za",
    location: "Lillydale A, Mpumalanga",
    gallery: [
      "/lovable-uploads/15ef6d82-0902-4a00-b60e-7480ea8da1ef.png",
      "/lovable-uploads/7d50295d-deb1-4845-9d68-69a071835378.png",
      "/lovable-uploads/f29df237-a097-4d2e-a618-1ae89ba04d67.png"
    ],
    facts: [
      { label: "Grade Levels", value: "Grades 8-12, Arts and Cultural Excellence" },
      { label: "Students", value: "543" },
      { label: "Educators", value: "18" },
      { label: "Established", value: "1978" },
      { label: "Principal", value: "Mr. John Doe" },
      { label: "Quintiles", value: "3" }
    ]
  },
  kurhula: {
    name: "Kurhula Junior Secondary School",
    subtitle: "Ximhungwe Circuit",
    description: "Kurhula Junior Secondary School serves as a vital stepping stone in the educational journey of young learners. With 643 students guided by 18 dedicated educators, our school specializes in grades 8-12, focusing on building strong academic foundations and developing essential life skills.",
    students: 643,
    educators: 18,
    established: 1992,
    quintile: 2,
    grade: "Grades 8-12: Academic Skills Development",
    principal: "Mrs. Jane Smith",
    phone: "+27608415662",
    email: "admin@kurhula.edu.za",
    location: "Huntington, Mpumalanga",
    gallery: [
      "/lovable-uploads/8dafc8db-0cd3-484c-b2dd-1055814dd263.png",
      "/lovable-uploads/274a59a6-c67b-4af3-afcc-3e0a9379934a.png",
      "/lovable-uploads/b6423046-24f3-43e9-92d5-55051a349332.png"
    ],
    facts: [
      { label: "Grade Levels", value: "Grades 8-12, Academic Skills Development" },
      { label: "Students", value: "643" },
      { label: "Educators", value: "18" },
      { label: "Established", value: "1992" },
      { label: "Principal", value: "Mrs. Jane Smith" },
      { label: "Quintiles", value: "2" }
    ]
  },
  mabarhule: {
    name: "Mabarhule High School",
    subtitle: "Ximhungwe Circuit",
    description: "Mabarhule High School is committed to providing quality education with a focus on science and technology. Our dedicated team of 15 educators work with 456 students to create an environment that fosters innovation, critical thinking, and academic excellence.",
    students: 456,
    educators: 15,
    established: 1985,
    quintile: 3,
    grade: "Grades 8-12: Science and Technology Focus",
    principal: "Mr. David Johnson",
    phone: "+27608415662",
    email: "info@mabarhule.edu.za",
    location: "Lillydale B, Mpumalanga",
    gallery: [
      "/lovable-uploads/6fbbdb32-1ed3-490c-a015-eefd463503c5.png",
      "/lovable-uploads/6f912cb8-06fc-490a-a4f6-1ac614a11a9d.png",
      "/lovable-uploads/d860675b-24f4-47d8-81c8-733d86680635.png"
    ],
    facts: [
      { label: "Grade Levels", value: "Grades 8-12, Science and Technology Focus" },
      { label: "Students", value: "456" },
      { label: "Educators", value: "15" },
      { label: "Established", value: "1985" },
      { label: "Principal", value: "Mr. David Johnson" },
      { label: "Quintiles", value: "3" }
    ]
  },
  madlala: {
    name: "Madlala High School",
    subtitle: "Excellence in Education, Ximhungwe Circuit",
    description: "Madlala High School stands as a beacon of academic excellence in the Ximhungwe Circuit. With 512 students and 16 experienced educators, we provide comprehensive education that prepares students for higher education and successful careers.",
    students: 512,
    educators: 16,
    established: 1982,
    quintile: 3,
    grade: "Grades 8-12: Academic Excellence",
    principal: "Mrs. Sarah Williams",
    phone: "+27608415662",
    email: "contact@madlala.edu.za",
    location: "Justicia, Mpumalanga",
    gallery: [
      "/lovable-uploads/993b4c28-413d-4a8f-8a6c-e64d28ca98ec.png",
      "/lovable-uploads/0b6089d6-faa8-42e7-97fc-85272240b6c6.png",
      "/lovable-uploads/6390f61c-4bdf-4585-a2fc-bf317939810a.png"
    ],
    facts: [
      { label: "Grade Levels", value: "Grades 8-12, Academic Excellence" },
      { label: "Students", value: "512" },
      { label: "Educators", value: "16" },
      { label: "Established", value: "1982" },
      { label: "Principal", value: "Mrs. Sarah Williams" },
      { label: "Quintiles", value: "3" }
    ]
  }
};

export default function SchoolDetail() {
  const { schoolId } = useParams<{ schoolId: string }>();
  const [showApplication, setShowApplication] = useState(false);
  
  const school = schoolId ? schoolsData[schoolId as keyof typeof schoolsData] : null;

  if (!school) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">School Not Found</h1>
          <p className="text-muted-foreground mb-8">The school you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/schools">Back to Schools</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-purple text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 mb-4">
            <Badge className="bg-green-500 text-white">Quintile {school.quintile}</Badge>
            <Badge className="bg-green-500 text-white">{school.grade.split(':')[0]}</Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{school.name}</h1>
          <p className="text-xl opacity-90 mb-8">{school.subtitle}</p>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-slate-800 text-white border-slate-700">
              <CardContent className="p-4 text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-purple-400" />
                <div className="text-2xl font-bold">{school.students}</div>
                <div className="text-sm opacity-90">Students</div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800 text-white border-slate-700">
              <CardContent className="p-4 text-center">
                <BookOpen className="h-6 w-6 mx-auto mb-2 text-green-400" />
                <div className="text-2xl font-bold">{school.educators}</div>
                <div className="text-sm opacity-90">Educators</div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800 text-white border-slate-700">
              <CardContent className="p-4 text-center">
                <Calendar className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">{school.established}</div>
                <div className="text-sm opacity-90">Established</div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800 text-white border-slate-700">
              <CardContent className="p-4 text-center">
                <GraduationCap className="h-6 w-6 mx-auto mb-2 text-cyan-400" />
                <div className="text-2xl font-bold">Q{school.quintile}</div>
                <div className="text-sm opacity-90">Quintile</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">About Our School</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {school.description}
                </p>
              </CardContent>
            </Card>

            {/* Quick Facts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Quick Facts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {school.facts.map((fact, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-muted">
                      <span className="font-medium">{fact.label}:</span>
                      <span className="text-muted-foreground">{fact.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* School Gallery */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">School Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {school.gallery?.map((image, index) => (
                    <div key={index} className="aspect-square bg-muted rounded-lg overflow-hidden">
                      <img 
                        src={image} 
                        alt={`School gallery image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{school.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{school.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{school.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Apply Now Card */}
            <Card className="bg-gradient-purple text-white">
              <CardHeader>
                <CardTitle>Ready to Join {school.name.split(' ')[0]}?</CardTitle>
                <CardDescription className="text-white/90">
                  Take the first step towards your educational journey with us.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setShowApplication(true)}
                  className="w-full bg-white text-purple-600 hover:bg-white/90"
                >
                  Apply Now
                </Button>
                <Button variant="link" className="w-full text-white hover:text-white/80 mt-2">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ApplicationModal
        isOpen={showApplication}
        onClose={() => setShowApplication(false)}
        schoolId={schoolId || ''}
        schoolName={school.name}
      />
    </div>
  );
}