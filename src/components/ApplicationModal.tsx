import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Upload, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  schoolId: string;
  schoolName: string;
}

export const ApplicationModal = ({ isOpen, onClose, schoolId, schoolName }: ApplicationModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    idNumber: '',
    dateOfBirth: '',
    mobileNumber: '',
    emailAddress: '',
    homeAddress: '',
    grade: '',
    parentGuardianName: '',
    relationship: '',
    parentMobile: '',
    parentEmail: '',
    birthCertificate: null as File | null,
    schoolReport: null as File | null,
    proofOfAddress: null as File | null
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['firstName', 'lastName', 'idNumber', 'dateOfBirth', 'mobileNumber', 'emailAddress', 'homeAddress', 'grade', 'parentGuardianName', 'relationship', 'parentMobile', 'parentEmail'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send to backend
    toast({
      title: "Application Submitted!",
      description: `Your application to ${schoolName} has been submitted successfully. You will receive a confirmation email shortly.`,
    });
    
    onClose();
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      idNumber: '',
      dateOfBirth: '',
      mobileNumber: '',
      emailAddress: '',
      homeAddress: '',
      grade: '',
      parentGuardianName: '',
      relationship: '',
      parentMobile: '',
      parentEmail: '',
      birthCertificate: null,
      schoolReport: null,
      proofOfAddress: null
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Apply to {schoolName}</DialogTitle>
          <DialogDescription>
            Please fill out all required fields to complete your application to {schoolName}.
          </DialogDescription>
        </DialogHeader>

        <Alert className="my-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please fill out all required fields to complete your application to {schoolName}.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Enter first name"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Enter last name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="idNumber">ID Number *</Label>
              <Input
                id="idNumber"
                value={formData.idNumber}
                onChange={(e) => handleInputChange('idNumber', e.target.value)}
                placeholder="Enter ID number"
                required
              />
            </div>
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="mobileNumber">Mobile Number *</Label>
              <Input
                id="mobileNumber"
                value={formData.mobileNumber}
                onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                placeholder="Enter mobile number"
                required
              />
            </div>
            <div>
              <Label htmlFor="emailAddress">Email Address *</Label>
              <Input
                id="emailAddress"
                type="email"
                value={formData.emailAddress}
                onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                placeholder="Enter email address"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="homeAddress">Home Address *</Label>
            <Textarea
              id="homeAddress"
              value={formData.homeAddress}
              onChange={(e) => handleInputChange('homeAddress', e.target.value)}
              placeholder="Enter full home address"
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="grade">Grade *</Label>
            <Select onValueChange={(value) => handleInputChange('grade', value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grade-8">Grade 8</SelectItem>
                <SelectItem value="grade-9">Grade 9</SelectItem>
                <SelectItem value="grade-10">Grade 10</SelectItem>
                <SelectItem value="grade-11">Grade 11</SelectItem>
                <SelectItem value="grade-12">Grade 12</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Parent/Guardian Information */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Parent/Guardian Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="parentGuardianName">Parent/Guardian Name *</Label>
                <Input
                  id="parentGuardianName"
                  value={formData.parentGuardianName}
                  onChange={(e) => handleInputChange('parentGuardianName', e.target.value)}
                  placeholder="Enter parent/guardian name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="relationship">Relationship *</Label>
                <Select onValueChange={(value) => handleInputChange('relationship', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mother">Mother</SelectItem>
                    <SelectItem value="father">Father</SelectItem>
                    <SelectItem value="guardian">Guardian</SelectItem>
                    <SelectItem value="grandparent">Grandparent</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="parentMobile">Parent Mobile *</Label>
                <Input
                  id="parentMobile"
                  value={formData.parentMobile}
                  onChange={(e) => handleInputChange('parentMobile', e.target.value)}
                  placeholder="Enter parent mobile number"
                  required
                />
              </div>
              <div>
                <Label htmlFor="parentEmail">Parent Email *</Label>
                <Input
                  id="parentEmail"
                  type="email"
                  value={formData.parentEmail}
                  onChange={(e) => handleInputChange('parentEmail', e.target.value)}
                  placeholder="Enter parent email address"
                  required
                />
              </div>
            </div>
          </div>

          {/* Required Documents */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Required Documents</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'birthCertificate', label: 'Birth Certificate *' },
                { id: 'schoolReport', label: 'School Report *' },
                { id: 'proofOfAddress', label: 'Proof of Address *' }
              ].map((doc) => (
                <div key={doc.id} className="space-y-2">
                  <Label>{doc.label}</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Choose File</p>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(doc.id, e.target.files?.[0] || null)}
                      className="hidden"
                      id={`file-${doc.id}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById(`file-${doc.id}`)?.click()}
                    >
                      Choose File
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData[doc.id as keyof typeof formData] ? 'File selected' : 'No file chosen'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary-hover">
              Submit Application
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};