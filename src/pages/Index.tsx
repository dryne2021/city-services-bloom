
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Users, CheckCircle, ArrowRight, Search } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const serviceCategories = [
    { name: "Home Cleaning", icon: "🏠", providers: 45, avgRating: 4.8 },
    { name: "Tutoring", icon: "📚", providers: 32, avgRating: 4.9 },
    { name: "Handyman", icon: "🔧", providers: 28, avgRating: 4.7 },
    { name: "Pet Care", icon: "🐕", providers: 21, avgRating: 4.8 },
    { name: "Landscaping", icon: "🌿", providers: 19, avgRating: 4.6 },
    { name: "Photography", icon: "📸", providers: 15, avgRating: 4.9 }
  ];

  const featuredProviders = [
    {
      name: "Sarah Johnson",
      service: "House Cleaning",
      rating: 4.9,
      reviews: 127,
      price: "$25/hour",
      image: "SJ",
      verified: true
    },
    {
      name: "Mike Rodriguez",
      service: "Handyman Services",
      rating: 4.8,
      reviews: 89,
      price: "$35/hour",
      image: "MR",
      verified: true
    },
    {
      name: "Emily Chen",
      service: "Math Tutoring",
      rating: 5.0,
      reviews: 67,
      price: "$40/hour",
      image: "EC",
      verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
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
              <Link to="/services" className="text-gray-600 hover:text-blue-600 transition-colors">Browse Services</Link>
              <Link to="/become-provider" className="text-gray-600 hover:text-blue-600 transition-colors">Become a Provider</Link>
              <Link to="/login" className="text-gray-600 hover:text-blue-600 transition-colors">Sign In</Link>
              <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                Get Started
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Find Local Service Providers
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
            You Can Trust
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Connect with verified professionals in your area for home services, tutoring, pet care, and more.
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative flex items-center">
            <Input
              placeholder="What service do you need?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-12 h-14 text-lg border-2 border-blue-200 focus:border-blue-500"
            />
            <Button className="absolute right-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600">Verified Providers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600 mb-2">10,000+</div>
            <div className="text-gray-600">Services Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">4.8★</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Popular Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{category.icon}</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    {category.providers} providers
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{category.avgRating}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Providers */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Featured Providers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProviders.map((provider, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                      {provider.image}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-800">{provider.name}</h3>
                        {provider.verified && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{provider.service}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{provider.rating}</span>
                      <span className="text-sm text-gray-600">({provider.reviews} reviews)</span>
                    </div>
                    <span className="font-semibold text-blue-600">{provider.price}</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Search & Browse</h3>
            <p className="text-gray-600">Find the perfect service provider in your area using our search and filter tools.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Connect & Chat</h3>
            <p className="text-gray-600">Message providers directly to discuss your needs and get quotes.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Book & Review</h3>
            <p className="text-gray-600">Book your service and leave a review to help the community.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">Join thousands of satisfied customers and providers.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3">
              Find a Service
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
              Become a Provider
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">LS</span>
                </div>
                <span className="text-xl font-bold">LocalService</span>
              </div>
              <p className="text-gray-400">Connecting communities with trusted local service providers.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Customers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Browse Services</li>
                <li>How It Works</li>
                <li>Safety & Trust</li>
                <li>Customer Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Providers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Become a Provider</li>
                <li>Provider Resources</li>
                <li>Success Stories</li>
                <li>Provider Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LocalService. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
