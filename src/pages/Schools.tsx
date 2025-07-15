import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, MapPin, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { ApplicationModal } from "@/components/ApplicationModal";

const schools = [
  {
    id: "hlomani",
    name: "Hlomani High School",
    subtitle: "Excellence in Education, Ximhungwe Circuit",
    students: 543,
    educators: 18,
    established: 1978,
    quintile: 3,
    grade: "Grades 8-12: Arts and Cultural Excellence",
    image: "/lovable-uploads/bd9cd0a9-6d87-4b0c-b1be-c18a98a5b0ca.png"
  },
  {
    id: "kurhula",
    name: "Kurhula Junior Secondary School",
    subtitle: "Ximhungwe Circuit",
    students: 643,
    educators: 18,
    established: 1992,
    quintile: 2,
    grade: "Grades 7-9: Academic Skills Development",
    image: "/lovable-uploads/bd9cd0a9-6d87-4b0c-b1be-c18a98a5b0ca.png"
  },
  {
    id: "mabarhule",
    name: "Mabarhule High School",
    subtitle: "Ximhungwe Circuit",
    students: 456,
    educators: 15,
    established: 1985,
    quintile: 3,
    grade: "Grades 8-12: Science and Technology Focus",
    image: "/lovable-uploads/bd9cd0a9-6d87-4b0c-b1be-c18a98a5b0ca.png"
  },
  {
    id: "madlala",
    name: "Madlala High School",
    subtitle: "Excellence in Education, Ximhungwe Circuit",
    students: 512,
    educators: 16,
    established: 1982,
    quintile: 3,
    grade: "Grades 8-12: Academic Excellence",
    image: "/lovable-uploads/bd9cd0a9-6d87-4b0c-b1be-c18a98a5b0ca.png"
  }
];

export default function Schools() {
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-orange text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Schools</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Choose from our network of quality educational institutions
          </p>
        </div>
      </section>

      {/* Life at Our Schools Gallery */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Life at Our Schools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="aspect-square bg-muted-foreground/20 rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/6fbbdb32-1ed3-490c-a015-eefd463503c5.png" 
                alt="Students in school uniforms"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-muted-foreground/20 rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/6f912cb8-06fc-490a-a4f6-1ac614a11a9d.png" 
                alt="Students in classroom"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-muted-foreground/20 rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/d860675b-24f4-47d8-81c8-733d86680635.png" 
                alt="School staff and students gathering"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-muted-foreground/20 rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/bee8bb31-b7ca-4088-bded-6656314aab0a.png" 
                alt="School assembly"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Schools Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {schools.map((school) => (
              <Card key={school.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted-foreground/10 relative">
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                      Quintile {school.quintile}
                    </Badge>
                  </div>
                  <img
                    src={school.image}
                    alt={school.name}
                    className="w-full h-full object-cover opacity-20"
                  />
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl">{school.name}</CardTitle>
                  <CardDescription>{school.subtitle}</CardDescription>
                  <p className="text-sm text-muted-foreground">{school.grade}</p>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-2xl font-bold text-primary">{school.students}</p>
                        <p className="text-xs text-muted-foreground">students</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4 text-success" />
                      <div>
                        <p className="text-2xl font-bold text-success">{school.educators}</p>
                        <p className="text-xs text-muted-foreground">educators</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => setSelectedSchool(school.id)}
                      className="flex-1 bg-primary hover:bg-primary-hover"
                    >
                      Apply Now
                    </Button>
                    <Button variant="outline" asChild className="flex-1">
                      <Link to={`/school/${school.id}`}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ApplicationModal
        isOpen={!!selectedSchool}
        onClose={() => setSelectedSchool(null)}
        schoolId={selectedSchool || ''}
        schoolName={schools.find(s => s.id === selectedSchool)?.name || ''}
      />
    </div>
  );
}