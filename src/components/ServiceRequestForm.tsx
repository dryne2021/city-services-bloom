
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, MapPin, Clock, DollarSign } from "lucide-react";
import { format } from "date-fns";

const ServiceRequestForm = () => {
  const [formData, setFormData] = useState({
    service: "",
    title: "",
    description: "",
    location: "",
    budget: "",
    urgency: "",
    date: undefined as Date | undefined,
    timePreference: ""
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

  const urgencyLevels = [
    { value: "flexible", label: "Flexible", color: "bg-green-100 text-green-800" },
    { value: "within-week", label: "Within a Week", color: "bg-yellow-100 text-yellow-800" },
    { value: "urgent", label: "Urgent (ASAP)", color: "bg-red-100 text-red-800" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Service request submitted:", formData);
    toast({
      title: "Request Submitted!",
      description: "We'll connect you with qualified service providers soon.",
    });
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Request a Service</h1>
          <p className="text-gray-600">Tell us what you need, and we'll connect you with the right professionals</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <span>Service Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Category */}
              <div className="space-y-2">
                <Label htmlFor="service">Service Category *</Label>
                <Select value={formData.service} onValueChange={(value) => updateFormData('service', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a service category" />
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

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Service Title *</Label>
                <Input
                  id="title"
                  placeholder="Brief title for your service request"
                  value={formData.title}
                  onChange={(e) => updateFormData('title', e.target.value)}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you need in detail. Include any specific requirements, size, duration, etc."
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  rows={4}
                  required
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="location"
                    placeholder="Enter your address or area"
                    value={formData.location}
                    onChange={(e) => updateFormData('location', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <Label htmlFor="budget">Budget Range</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Select value={formData.budget} onValueChange={(value) => updateFormData('budget', value)}>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select your budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-50">Under $50</SelectItem>
                      <SelectItem value="50-100">$50 - $100</SelectItem>
                      <SelectItem value="100-250">$100 - $250</SelectItem>
                      <SelectItem value="250-500">$250 - $500</SelectItem>
                      <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                      <SelectItem value="over-1000">Over $1,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label>Preferred Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => updateFormData('date', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Preference */}
              <div className="space-y-2">
                <Label htmlFor="time">Time Preference</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Select value={formData.timePreference} onValueChange={(value) => updateFormData('timePreference', value)}>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Preferred time of day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (8 AM - 12 PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                      <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Urgency */}
              <div className="space-y-2">
                <Label>Urgency Level</Label>
                <div className="flex space-x-3">
                  {urgencyLevels.map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => updateFormData('urgency', level.value)}
                      className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                        formData.urgency === level.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Badge className={level.color}>
                        {level.label}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 h-12 text-lg"
                >
                  Submit Service Request
                </Button>
                <p className="text-center text-sm text-gray-500 mt-2">
                  You'll receive quotes from qualified providers within 24 hours
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* How it works */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">What happens next?</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                <p className="text-gray-700">We review your request and match you with qualified providers</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                <p className="text-gray-700">Providers send you quotes and messages through our platform</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                <p className="text-gray-700">You compare options and choose the best provider for your needs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceRequestForm;
