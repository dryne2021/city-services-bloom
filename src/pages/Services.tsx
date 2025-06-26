
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, CheckCircle, Filter } from "lucide-react";

const Services = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const providers = [
    {
      id: 1,
      name: "Sarah Johnson",
      service: "House Cleaning",
      category: "cleaning",
      rating: 4.9,
      reviews: 127,
      price: 25,
      location: "Downtown",
      image: "SJ",
      verified: true,
      description: "Professional house cleaning with eco-friendly products"
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      service: "Handyman Services",
      category: "handyman",
      rating: 4.8,
      reviews: 89,
      price: 35,
      location: "Westside",
      image: "MR",
      verified: true,
      description: "General repairs, installations, and home maintenance"
    },
    {
      id: 3,
      name: "Emily Chen",
      service: "Math Tutoring",
      category: "tutoring",
      rating: 5.0,
      reviews: 67,
      price: 40,
      location: "University District",
      image: "EC",
      verified: true,
      description: "High school and college level mathematics tutoring"
    },
    {
      id: 4,
      name: "David Kim",
      service: "Pet Sitting",
      category: "petcare",
      rating: 4.7,
      reviews: 93,
      price: 20,
      location: "Midtown",
      image: "DK",
      verified: true,
      description: "Reliable pet sitting and dog walking services"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      service: "Garden Design",
      category: "landscaping",
      rating: 4.9,
      reviews: 45,
      price: 50,
      location: "Suburbs",
      image: "LT",
      verified: true,
      description: "Custom garden design and landscaping solutions"
    },
    {
      id: 6,
      name: "James Wilson",
      service: "Photography",
      category: "photography",
      rating: 4.8,
      reviews: 78,
      price: 75,
      location: "Arts District",
      image: "JW",
      verified: true,
      description: "Professional photography for events and portraits"
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "cleaning", label: "Cleaning" },
    { value: "handyman", label: "Handyman" },
    { value: "tutoring", label: "Tutoring" },
    { value: "petcare", label: "Pet Care" },
    { value: "landscaping", label: "Landscaping" },
    { value: "photography", label: "Photography" }
  ];

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || provider.category === selectedCategory;
    const matchesPrice = priceRange === "all" || 
                        (priceRange === "low" && provider.price < 30) ||
                        (priceRange === "medium" && provider.price >= 30 && provider.price < 50) ||
                        (priceRange === "high" && provider.price >= 50);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

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
              <a href="/become-provider" className="text-gray-600 hover:text-blue-600 transition-colors">Become a Provider</a>
              <a href="/login" className="text-gray-600 hover:text-blue-600 transition-colors">Sign In</a>
              <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                Get Started
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search for services or providers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48 h-12">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-full lg:w-48 h-12">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="low">Under $30/hour</SelectItem>
                <SelectItem value="medium">$30-$50/hour</SelectItem>
                <SelectItem value="high">$50+/hour</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Service Providers ({filteredProviders.length})
          </h1>
          <div className="flex items-center space-x-2 text-gray-600">
            <Filter className="w-4 h-4" />
            <span className="text-sm">Sort by: Relevance</span>
          </div>
        </div>

        {/* Provider Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <Card key={provider.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {provider.image}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-800">{provider.name}</h3>
                      {provider.verified && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{provider.service}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{provider.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{provider.rating}</span>
                    <span className="text-sm text-gray-600">({provider.reviews})</span>
                  </div>
                  <span className="font-semibold text-blue-600">${provider.price}/hour</span>
                </div>
                
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  {provider.location}
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    View Profile
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No providers found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
