import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, Award, TrendingUp, GraduationCap, Heart, Trophy, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";

const Index = () => {
  const impactStats = [
    { icon: GraduationCap, value: "4", label: "Quality Schools", color: "text-primary" },
    { icon: Users, value: "2,154", label: "Active Students", color: "text-blue-500" },
    { icon: BookOpen, value: "67", label: "Qualified Educators", color: "text-green-500" },
    { icon: TrendingUp, value: "89%", label: "Success Rate", color: "text-yellow-500" }
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Quality Education",
      description: "Experienced teachers providing excellent education standards"
    },
    {
      icon: Heart,
      title: "Supportive Community",
      description: "Strong community support and student development programs"
    },
    {
      icon: Trophy,
      title: "Proven Results",
      description: "Consistent academic excellence and student achievements"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-orange text-white py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <GraduationCap className="h-10 w-10" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Ximhungwe Circuit Schools
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
            Empowering students through quality education. Apply to join one of our excellent schools in the Ximhungwe Circuit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to="/schools">
                Explore Our Schools <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <Card key={index} className="text-center bg-card shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <h3 className="text-4xl font-bold mb-2 text-foreground">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Schools */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Why Choose Our Schools?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive education with modern facilities and dedicated teachers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-orange text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Apply?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of students in our quality education programs
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
            <Link to="/schools">
              Start Your Application
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#8B4513] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Ximhungwe Circuit</h3>
              <p className="text-sm opacity-90">
                Providing quality education across our network of schools.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:underline">Home</Link></li>
                <li><Link to="/schools" className="hover:underline">Schools</Link></li>
                <li><Link to="/schools" className="hover:underline">Apply</Link></li>
                <li><Link to="/contact" className="hover:underline">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Schools</h4>
              <ul className="space-y-2 text-sm">
                <li>Hlomani High School</li>
                <li>Kurhula Junior Secondary School</li>
                <li>Mabarhule High School</li>
                <li>Madlala High School</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-sm">
                <p>📞 +27608415662</p>
                <p>✉️ info@ximhungwe.edu.za</p>
                <p>📍 Ximhungwe Circuit, Limpopo</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm">
            <p>© 2024 Ximhungwe Circuit Schools. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
