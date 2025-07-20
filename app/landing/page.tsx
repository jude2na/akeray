"use client"

import { useState } from "react"
import { Search, Filter, Star, MapPin, Bed, Bath, Car, Wifi, Shield, Building2, ArrowRight, Heart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Link from "next/link"

const properties = [
  {
    id: 1,
    title: "Modern 2BR Apartment in Bole",
    type: "Apartment",
    price: 25000,
    rating: 4.8,
    reviews: 24,
    bedrooms: 2,
    bathrooms: 2,
    area: "85 sqm",
    featured: true,
    images: [
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    amenities: ["Parking", "WiFi", "Security", "Generator"],
    description: "Beautiful modern apartment with stunning city views, fully furnished with contemporary amenities."
  },
  {
    id: 2,
    title: "Luxury Villa in Kazanchis",
    type: "House",
    price: 45000,
    rating: 4.9,
    reviews: 18,
    bedrooms: 4,
    bathrooms: 3,
    area: "200 sqm",
    featured: true,
    images: [
      "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    amenities: ["Garden", "Parking", "Security", "Pool"],
    description: "Spacious luxury villa with private garden and modern facilities in prime location."
  },
  {
    id: 3,
    title: "Commercial Shop in Piassa",
    type: "Shop",
    price: 15000,
    rating: 4.5,
    reviews: 12,
    bedrooms: 0,
    bathrooms: 1,
    area: "45 sqm",
    featured: false,
    images: [
      "https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    amenities: ["Street Access", "Security", "Storage"],
    description: "Prime commercial space perfect for retail business in busy market area."
  },
  {
    id: 4,
    title: "Studio Apartment in CMC",
    type: "Apartment",
    price: 12000,
    rating: 4.3,
    reviews: 8,
    bedrooms: 1,
    bathrooms: 1,
    area: "35 sqm",
    featured: false,
    images: [
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    amenities: ["WiFi", "Security", "Furnished"],
    description: "Cozy studio apartment perfect for young professionals, fully furnished and ready to move in."
  },
  {
    id: 5,
    title: "3BR Family House in Gerji",
    type: "House",
    price: 35000,
    rating: 4.7,
    reviews: 15,
    bedrooms: 3,
    bathrooms: 2,
    area: "150 sqm",
    featured: false,
    images: [
      "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    amenities: ["Garden", "Parking", "Security", "Generator"],
    description: "Perfect family home with spacious rooms and beautiful garden in quiet neighborhood."
  },
  {
    id: 6,
    title: "Office Space in Addis Ababa",
    type: "Office",
    price: 28000,
    rating: 4.6,
    reviews: 10,
    bedrooms: 0,
    bathrooms: 2,
    area: "120 sqm",
    featured: false,
    images: [
      "https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    amenities: ["Elevator", "Parking", "Security", "Conference Room"],
    description: "Modern office space with professional amenities in business district."
  }
]

export default function LandingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterPrice, setFilterPrice] = useState("all")
  const [selectedProperty, setSelectedProperty] = useState<any>(null)

  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || property.type.toLowerCase() === filterType.toLowerCase()
    const matchesPrice = filterPrice === "all" || 
                        (filterPrice === "low" && property.price < 20000) ||
                        (filterPrice === "medium" && property.price >= 20000 && property.price < 35000) ||
                        (filterPrice === "high" && property.price >= 35000)
    return matchesSearch && matchesType && matchesPrice
  })

  const featuredProperties = filteredProperties.filter(p => p.featured)
  const regularProperties = filteredProperties.filter(p => !p.featured)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "apartment":
        return "🏢"
      case "house":
        return "🏠"
      case "shop":
        return "🏪"
      case "office":
        return "🏢"
      default:
        return "🏠"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 via-blue-600 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg relative">
                <Building2 className="h-6 w-6 text-white" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-800">A</span>
                </div>
              </div>
              <div>
                <h1 className="font-bold text-2xl bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  Akeray Marketplace
                </h1>
                <p className="text-sm text-gray-600">Find Your Perfect Home</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild className="border-emerald-300 hover:bg-emerald-50">
                <Link href="/login">Login</Link>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                    Join Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                      Join Akeray
                    </DialogTitle>
                    <DialogDescription className="text-center text-gray-600">
                      Choose how you'd like to join our platform
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Button asChild className="w-full h-16 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                      <Link href="/signup/owner" className="flex flex-col">
                        <span className="font-semibold">Join as Property Owner</span>
                        <span className="text-sm opacity-90">List and manage your properties</span>
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full h-16 border-emerald-300 hover:bg-emerald-50">
                      <Link href="/signup/tenant" className="flex flex-col">
                        <span className="font-semibold text-emerald-700">Join as Tenant</span>
                        <span className="text-sm text-gray-600">Find your perfect home</span>
                      </Link>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-in fade-in duration-1000">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Find Your Dream Home
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover amazing properties across Ethiopia. From modern apartments to luxury villas, 
              find the perfect place to call home with Akeray Property Management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-lg px-8 py-6">
                    <ArrowRight className="mr-2 h-5 w-5" />
                    Start Your Journey
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                      Get Started
                    </DialogTitle>
                    <DialogDescription className="text-center text-gray-600">
                      Choose your path to get started
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Button asChild className="w-full h-16 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                      <Link href="/signup/owner" className="flex flex-col">
                        <span className="font-semibold">I'm a Property Owner</span>
                        <span className="text-sm opacity-90">List and earn from your properties</span>
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full h-16 border-emerald-300 hover:bg-emerald-50">
                      <Link href="/signup/tenant" className="flex flex-col">
                        <span className="font-semibold text-emerald-700">I'm Looking for a Home</span>
                        <span className="text-sm text-gray-600">Find and rent your ideal property</span>
                      </Link>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="lg" asChild className="border-emerald-300 hover:bg-emerald-50 text-lg px-8 py-6">
                <Link href="/login">Already have an account?</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 px-4 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Find Your Perfect Property</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search by location, property type, or features..."
                    className="pl-12 h-14 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 text-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full md:w-48 h-14 rounded-2xl border-2 border-gray-200 focus:border-emerald-500">
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="shop">Shop</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterPrice} onValueChange={setFilterPrice}>
                  <SelectTrigger className="w-full md:w-48 h-14 rounded-2xl border-2 border-gray-200 focus:border-emerald-500">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="low">Under 20,000 ETB</SelectItem>
                    <SelectItem value="medium">20,000 - 35,000 ETB</SelectItem>
                    <SelectItem value="high">Above 35,000 ETB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      {featuredProperties.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600">
              <div className="text-center mb-12">
                <Badge className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-4 py-2 text-sm font-semibold mb-4">
                  ⭐ FEATURED PROPERTIES
                </Badge>
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  Premium Listings
                </h2>
                <p className="text-gray-600 text-lg">Handpicked properties from our verified owners</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProperties.map((property, index) => (
                  <Card key={property.id} className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white/90 backdrop-blur-sm border-2 border-gradient-to-r from-emerald-200 to-blue-200">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold">
                          FEATURED
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <Badge className="bg-white/90 text-gray-800 font-bold text-lg">
                          {property.price.toLocaleString()} ETB/month
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                            {property.title}
                          </CardTitle>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="text-2xl">{getTypeIcon(property.type)}</span>
                            <Badge variant="outline" className="text-emerald-600 border-emerald-300">
                              {property.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-1">
                        {renderStars(property.rating)}
                        <span className="text-sm font-semibold text-gray-700 ml-2">
                          {property.rating} ({property.reviews} reviews)
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-center">
                        {property.bedrooms > 0 && (
                          <div className="flex flex-col items-center">
                            <Bed className="h-5 w-5 text-gray-500 mb-1" />
                            <span className="text-sm font-medium">{property.bedrooms} Bed</span>
                          </div>
                        )}
                        <div className="flex flex-col items-center">
                          <Bath className="h-5 w-5 text-gray-500 mb-1" />
                          <span className="text-sm font-medium">{property.bathrooms} Bath</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <MapPin className="h-5 w-5 text-gray-500 mb-1" />
                          <span className="text-sm font-medium">{property.area}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {property.amenities.slice(0, 3).map((amenity, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                        {property.amenities.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{property.amenities.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700" onClick={() => setSelectedProperty(property)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Properties */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-900">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">All Properties</h2>
              <p className="text-gray-600 text-lg">Browse through our complete collection of available properties</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularProperties.map((property, index) => (
                <Card key={property.id} className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-white/90 text-gray-800 font-bold">
                        {property.price.toLocaleString()} ETB/month
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      {property.title}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{getTypeIcon(property.type)}</span>
                      <Badge variant="outline" className="text-emerald-600 border-emerald-300">
                        {property.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-1">
                      {renderStars(property.rating)}
                      <span className="text-sm text-gray-600 ml-2">
                        {property.rating} ({property.reviews})
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                      {property.bedrooms > 0 && (
                        <div className="flex flex-col items-center">
                          <Bed className="h-4 w-4 text-gray-500 mb-1" />
                          <span>{property.bedrooms} Bed</span>
                        </div>
                      )}
                      <div className="flex flex-col items-center">
                        <Bath className="h-4 w-4 text-gray-500 mb-1" />
                        <span>{property.bathrooms} Bath</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <MapPin className="h-4 w-4 text-gray-500 mb-1" />
                        <span>{property.area}</span>
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full border-emerald-300 hover:bg-emerald-50" onClick={() => setSelectedProperty(property)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Property Details Modal */}
      {selectedProperty && (
        <Dialog open={!!selectedProperty} onOpenChange={() => setSelectedProperty(null)}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                {selectedProperty.title}
              </DialogTitle>
              <DialogDescription className="text-lg text-gray-600">
                {selectedProperty.type} • {selectedProperty.area} • {selectedProperty.price.toLocaleString()} ETB/month
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              {/* Image Gallery */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedProperty.images.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${selectedProperty.title} ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ))}
              </div>

              {/* Property Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Property Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{selectedProperty.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bedrooms:</span>
                      <span className="font-medium">{selectedProperty.bedrooms || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bathrooms:</span>
                      <span className="font-medium">{selectedProperty.bathrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Area:</span>
                      <span className="font-medium">{selectedProperty.area}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating:</span>
                      <div className="flex items-center space-x-1">
                        {renderStars(selectedProperty.rating)}
                        <span className="text-sm">({selectedProperty.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProperty.amenities.map((amenity: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{selectedProperty.description}</p>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-2xl border border-emerald-200">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Interested in this property?</h3>
                  <p className="text-gray-600 mb-4">Sign up or login to view owner contact details and location</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                          Sign Up to Contact Owner
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                            Join as Tenant
                          </DialogTitle>
                          <DialogDescription className="text-center text-gray-600">
                            Create your account to contact property owners
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <Button asChild className="w-full h-16 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                            <Link href="/signup/tenant" className="flex flex-col">
                              <span className="font-semibold">Create Tenant Account</span>
                              <span className="text-sm opacity-90">Find and rent your ideal property</span>
                            </Link>
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" asChild className="border-emerald-300 hover:bg-emerald-50">
                      <Link href="/login">Already have an account?</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="container mx-auto text-center">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1200">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied property owners and tenants who trust Akeray for their property needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" variant="outline" className="bg-white text-emerald-600 hover:bg-gray-50 border-white text-lg px-8 py-6">
                    List Your Property
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                      Become a Property Owner
                    </DialogTitle>
                    <DialogDescription className="text-center text-gray-600">
                      Start earning from your properties today
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Button asChild className="w-full h-16 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                      <Link href="/signup/owner" className="flex flex-col">
                        <span className="font-semibold">Create Owner Account</span>
                        <span className="text-sm opacity-90">List and manage your properties</span>
                      </Link>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-50 text-lg px-8 py-6">
                    Find a Home
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                      Find Your Dream Home
                    </DialogTitle>
                    <DialogDescription className="text-center text-gray-600">
                      Discover amazing properties across Ethiopia
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Button asChild className="w-full h-16 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                      <Link href="/signup/tenant" className="flex flex-col">
                        <span className="font-semibold">Create Tenant Account</span>
                        <span className="text-sm opacity-90">Start your home search today</span>
                      </Link>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 via-blue-600 to-yellow-500 rounded-xl flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl">Akeray</span>
              </div>
              <p className="text-gray-400">
                Ethiopia's leading property management platform connecting owners and tenants.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Tenants</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/signup/tenant" className="hover:text-white">Find Properties</Link></li>
                <li><Link href="/login" className="hover:text-white">Tenant Login</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Owners</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/signup/owner" className="hover:text-white">List Property</Link></li>
                <li><Link href="/login" className="hover:text-white">Owner Login</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>📞 +251-911-123456</li>
                <li>✉️ info@akeray.et</li>
                <li>📍 Addis Ababa, Ethiopia</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Akeray Property Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}