
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Upload, Star, DollarSign, Users, TrendingUp } from "lucide-react";

const BecomeProvider = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: ""
    },
    serviceInfo: {
      category: "",
      title: "",
      description: "",
      experience: "",
      hourlyRate: "",
      availability: []
    },
    verification: {
      hasInsurance: false,
      hasLicense: false,
      backgroundCheck: false
    }
  });

  const { toast } = useToast();

  const serviceCategories = [
    "House Cleaning",
    "Handyman Services",
    "Tutoring",
    "Pet Care",
    "Landscaping",
    "Photography",
    "Moving Services",
    "Computer Repair",
    "Personal Training",
    "Event Planning"
  ];

  const availabilityOptions = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];

  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8 text-green-600" />,
      title: "Earn More",
      description: "Set your own rates and keep 95% of what you earn"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Find Customers",
      description: "Get connected with customers in your local area"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
      title: "Grow Your Business",
      description: "Build your reputation with reviews and ratings"
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-600" />,
      title: "Quality Support",
      description: "24/7 support and payment protection"
    }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Provider application submitted:", formData);
    toast({
      title: "Application Submitted!",
      description: "We'll review your application and get back to you within 24 hours.",
    });
    setCurrentStep(5);
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateServiceInfo = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      serviceInfo: { ...prev.serviceInfo, [field]: value }
    }));
  };

  const updateVerification = (field: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      verification: { ...prev.verification, [field]: value }
    }));
  };

  const toggleAvailability = (day: string) => {
    const availability = formData.serviceInfo.availability;
    const newAvailability = availability.includes(day)
      ? availability.filter(d => d !== day)
      : [...availability, day];
    updateServiceInfo('availability', newAvailability);
  };

  if (currentStep === 5) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Application Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for applying to become a service provider. We'll review your application and contact you within 24 hours.
            </p>
            <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
              <span className="text-xl font-bold text-gray-800">LocalService</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
              <a href="/services" className="text-gray-600 hover:text-blue-600 transition-colors">Browse Services</a>
              <a href="/login" className="text-gray-600 hover:text-blue-600 transition-colors">Sign In</a>
            </nav>
          </div>
        </div>
      </header>

      {currentStep === 1 && (
        <div className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              Start Earning as a Service Provider
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Join our platform and connect with customers who need your services. 
              Build your business and earn on your own terms.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button 
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 px-8 py-3 text-lg"
            >
              Get Started
            </Button>
          </div>
        </div>
      )}

      {currentStep > 1 && currentStep < 5 && (
        <div className="py-8">
          <div className="container mx-auto px-4 max-w-2xl">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Step {currentStep - 1} of 3</span>
                <span>{Math.round(((currentStep - 1) / 3) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-teal-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Step 2: Personal Information */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <p className="text-gray-600">Tell us about yourself</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.personalInfo.firstName}
                        onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.personalInfo.lastName}
                        onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.personalInfo.email}
                      onChange={(e) => updatePersonalInfo('email', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.personalInfo.phone}
                      onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Textarea
                      id="address"
                      value={formData.personalInfo.address}
                      onChange={(e) => updatePersonalInfo('address', e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Service Information */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Service Information</CardTitle>
                  <p className="text-gray-600">What services do you offer?</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="category">Service Category *</Label>
                    <Select value={formData.serviceInfo.category} onValueChange={(value) => updateServiceInfo('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your service category" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceCategories.map((category) => (
                          <SelectItem key={category} value={category.toLowerCase().replace(' ', '-')}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="title">Service Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Professional House Cleaning Services"
                      value={formData.serviceInfo.title}
                      onChange={(e) => updateServiceInfo('title', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Service Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your services, experience, and what makes you unique"
                      value={formData.serviceInfo.description}
                      onChange={(e) => updateServiceInfo('description', e.target.value)}
                      rows={4}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience">Years of Experience *</Label>
                    <Select value={formData.serviceInfo.experience} onValueChange={(value) => updateServiceInfo('experience', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                        <SelectItem value="1-2">1-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="more-than-10">More than 10 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="hourlyRate">Hourly Rate ($) *</Label>
                    <Input
                      id="hourlyRate"
                      type="number"
                      placeholder="25"
                      value={formData.serviceInfo.hourlyRate}
                      onChange={(e) => updateServiceInfo('hourlyRate', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label>Availability *</Label>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-2">
                      {availabilityOptions.map((day) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleAvailability(day)}
                          className={`p-2 rounded-lg border text-sm transition-all ${
                            formData.serviceInfo.availability.includes(day)
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Verification */}
            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle>Verification & Documents</CardTitle>
                  <p className="text-gray-600">Help us verify your credentials</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="insurance"
                        checked={formData.verification.hasInsurance}
                        onCheckedChange={(checked) => updateVerification('hasInsurance', checked as boolean)}
                      />
                      <Label htmlFor="insurance">I have liability insurance</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="license"
                        checked={formData.verification.hasLicense}
                        onCheckedChange={(checked) => updateVerification('hasLicense', checked as boolean)}
                      />
                      <Label htmlFor="license">I have relevant licenses/certifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="background"
                        checked={formData.verification.backgroundCheck}
                        onCheckedChange={(checked) => updateVerification('backgroundCheck', checked as boolean)}
                      />
                      <Label htmlFor="background">I consent to a background check</Label>
                    </div>
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-medium text-gray-900 mb-2">Upload Documents</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Upload copies of licenses, insurance, certifications, or portfolio
                    </p>
                    <Button variant="outline">
                      Choose Files
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentStep === 2}
              >
                Previous
              </Button>
              <Button 
                onClick={currentStep === 4 ? handleSubmit : handleNext}
                className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
              >
                {currentStep === 4 ? 'Submit Application' : 'Next'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BecomeProvider;
