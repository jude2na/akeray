"use client"

import { useState } from "react"
import { Building, Upload, MapPin, DollarSign, Users, ArrowLeft, ArrowRight, Save, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import DashboardLayout from "@/components/dashboard-layout"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const propertyTypes = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "villa", label: "Villa" },
  { value: "shop", label: "Shop" },
  { value: "office", label: "Office" },
  { value: "warehouse", label: "Warehouse" },
]

const amenitiesList = [
  "Parking", "WiFi", "Security", "Generator", "Water Tank", "Elevator",
  "Garden", "Pool", "Gym", "Balcony", "Air Conditioning", "Furnished",
  "Kitchen", "Laundry", "Storage", "Conference Room"
]

export default function AddPropertyPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    address: "",
    city: "Addis Ababa",
    area: "",
    googleMapLink: "",
    totalUnits: 1,
    pricePerUnit: "",
    currency: "ETB",
    bedrooms: 1,
    bathrooms: 1,
    squareMeters: "",
    ownerId: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    amenities: [] as string[],
    images: [] as File[],
    featured: false,
    status: "active"
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length + formData.images.length > 10) {
      setError("Maximum 10 images allowed")
      return
    }
    setFormData({ ...formData, images: [...formData.images, ...files] })
  }

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData({ ...formData, images: newImages })
  }

  const toggleAmenity = (amenity: string) => {
    const newAmenities = formData.amenities.includes(amenity)
      ? formData.amenities.filter(a => a !== amenity)
      : [...formData.amenities, amenity]
    setFormData({ ...formData, amenities: newAmenities })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validation
    if (!formData.name || !formData.type || !formData.address || !formData.pricePerUnit || !formData.ownerName) {
      setError("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    if (formData.images.length === 0) {
      setError("Please upload at least one property image")
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Property Added Successfully!",
        description: `${formData.name} has been added to the system with ${formData.totalUnits} units.`,
      })
      router.push("/dashboard/admin/properties")
    }, 2000)
  }

  return (
    <DashboardLayout userRole="admin" userName="Admin Aseffa Bekele" userEmail="aseffa@akeray.et">
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-in fade-in duration-1000">
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="outline" asChild className="border-emerald-300 hover:bg-emerald-50">
              <Link href="/dashboard/admin/properties">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Properties
              </Link>
            </Button>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Add New Property
            </h1>
            <p className="text-lg text-gray-600">Create a new property listing in the system</p>
            <p className="text-sm text-gray-500">Fill in all property details and assign to an owner</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="xl:col-span-2 space-y-8">
              {/* Basic Information */}
              <div className="animate-in fade-in slide-in-from-left-4 duration-700 delay-300" style={{ animationFillMode: "forwards" }}>
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Basic Information</CardTitle>
                    <CardDescription>Essential property details and description</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                          Property Name *
                        </Label>
                        <Input
                          id="name"
                          placeholder="e.g., Sunrise Apartments"
                          className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="type" className="text-sm font-semibold text-gray-700">
                          Property Type *
                        </Label>
                        <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                          <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                          <SelectContent>
                            {propertyTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
                        Description *
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the property features, location benefits, and unique selling points..."
                        className="min-h-24 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="totalUnits" className="text-sm font-semibold text-gray-700">
                          Total Units *
                        </Label>
                        <Input
                          id="totalUnits"
                          type="number"
                          min="1"
                          placeholder="1"
                          className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                          value={formData.totalUnits}
                          onChange={(e) => setFormData({ ...formData, totalUnits: parseInt(e.target.value) || 1 })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bedrooms" className="text-sm font-semibold text-gray-700">
                          Bedrooms
                        </Label>
                        <Input
                          id="bedrooms"
                          type="number"
                          min="0"
                          placeholder="1"
                          className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                          value={formData.bedrooms}
                          onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) || 0 })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bathrooms" className="text-sm font-semibold text-gray-700">
                          Bathrooms
                        </Label>
                        <Input
                          id="bathrooms"
                          type="number"
                          min="1"
                          placeholder="1"
                          className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                          value={formData.bathrooms}
                          onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) || 1 })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="squareMeters" className="text-sm font-semibold text-gray-700">
                          Area (Square Meters)
                        </Label>
                        <Input
                          id="squareMeters"
                          type="number"
                          placeholder="85"
                          className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                          value={formData.squareMeters}
                          onChange={(e) => setFormData({ ...formData, squareMeters: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pricePerUnit" className="text-sm font-semibold text-gray-700">
                          Price per Unit (ETB/month) *
                        </Label>
                        <Input
                          id="pricePerUnit"
                          type="number"
                          placeholder="25000"
                          className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                          value={formData.pricePerUnit}
                          onChange={(e) => setFormData({ ...formData, pricePerUnit: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Location Information */}
              <div className="animate-in fade-in slide-in-from-left-4 duration-700 delay-600" style={{ animationFillMode: "forwards" }}>
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Location Information</CardTitle>
                    <CardDescription>Property address and location details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-sm font-semibold text-gray-700">
                        Full Address *
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="address"
                          placeholder="e.g., 123 Bole Road, Near Atlas Hotel"
                          className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-sm font-semibold text-gray-700">
                          City *
                        </Label>
                        <Select value={formData.city} onValueChange={(value) => setFormData({ ...formData, city: value })}>
                          <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Addis Ababa">Addis Ababa</SelectItem>
                            <SelectItem value="Dire Dawa">Dire Dawa</SelectItem>
                            <SelectItem value="Mekelle">Mekelle</SelectItem>
                            <SelectItem value="Gondar">Gondar</SelectItem>
                            <SelectItem value="Hawassa">Hawassa</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="area" className="text-sm font-semibold text-gray-700">
                          Area/Subcity *
                        </Label>
                        <Input
                          id="area"
                          placeholder="e.g., Bole, Kazanchis, Piassa"
                          className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                          value={formData.area}
                          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="googleMapLink" className="text-sm font-semibold text-gray-700">
                        Google Maps Link (Optional)
                      </Label>
                      <Input
                        id="googleMapLink"
                        placeholder="https://maps.google.com/..."
                        className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                        value={formData.googleMapLink}
                        onChange={(e) => setFormData({ ...formData, googleMapLink: e.target.value })}
                      />
                      <p className="text-xs text-gray-500">
                        Provide a Google Maps link for better location visibility
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Owner Information */}
              <div className="animate-in fade-in slide-in-from-left-4 duration-700 delay-900" style={{ animationFillMode: "forwards" }}>
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Owner Information</CardTitle>
                    <CardDescription>Assign property to an existing owner</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ownerName" className="text-sm font-semibold text-gray-700">
                          Owner Name *
                        </Label>
                        <Input
                          id="ownerName"
                          placeholder="Select or enter owner name"
                          className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                          value={formData.ownerName}
                          onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="ownerPhone" className="text-sm font-semibold text-gray-700">
                          Owner Phone
                        </Label>
                        <Input
                          id="ownerPhone"
                          placeholder="+251911234567"
                          className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                          value={formData.ownerPhone}
                          onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ownerEmail" className="text-sm font-semibold text-gray-700">
                        Owner Email
                      </Label>
                      <Input
                        id="ownerEmail"
                        type="email"
                        placeholder="owner@email.com"
                        className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                        value={formData.ownerEmail}
                        onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Images Upload */}
              <div className="animate-in fade-in slide-in-from-left-4 duration-700 delay-1200" style={{ animationFillMode: "forwards" }}>
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Property Images</CardTitle>
                    <CardDescription>Upload high-quality images of the property (Max 10 images)</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-400 transition-colors">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">
                          Upload property images
                        </p>
                        <p className="text-xs text-gray-500">
                          Accepted formats: JPG, PNG (Max 5MB each)
                        </p>
                        <input
                          type="file"
                          id="images"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('images')?.click()}
                          className="border-emerald-300 hover:bg-emerald-50"
                        >
                          Choose Images
                        </Button>
                      </div>
                    </div>

                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Property ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                            <p className="text-xs text-gray-500 mt-1 truncate">{image.name}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1 space-y-8">
              {/* Amenities */}
              <div className="animate-in fade-in slide-in-from-right-4 duration-700 delay-600" style={{ animationFillMode: "forwards" }}>
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm sticky top-8">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Amenities</CardTitle>
                    <CardDescription>Select available amenities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                      {amenitiesList.map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Checkbox
                            id={amenity}
                            checked={formData.amenities.includes(amenity)}
                            onCheckedChange={() => toggleAmenity(amenity)}
                            className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                          />
                          <Label htmlFor={amenity} className="text-sm cursor-pointer">
                            {amenity}
                          </Label>
                        </div>
                      ))}
                    </div>
                    
                    {formData.amenities.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm font-medium text-gray-700 mb-2">Selected Amenities:</p>
                        <div className="flex flex-wrap gap-2">
                          {formData.amenities.map((amenity) => (
                            <Badge key={amenity} className="bg-emerald-100 text-emerald-800">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Property Settings */}
              <div className="animate-in fade-in slide-in-from-right-4 duration-700 delay-900" style={{ animationFillMode: "forwards" }}>
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Property Settings</CardTitle>
                    <CardDescription>Additional property configurations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-medium">Featured Property</Label>
                        <p className="text-xs text-gray-500">Show in featured listings</p>
                      </div>
                      <Checkbox
                        checked={formData.featured}
                        onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                        className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status" className="text-sm font-semibold text-gray-700">
                        Status
                      </Label>
                      <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                        <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="maintenance">Under Maintenance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1500" style={{ animationFillMode: "forwards" }}>
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" asChild className="border-gray-300 hover:bg-gray-50">
                <Link href="/dashboard/admin/properties">Cancel</Link>
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Adding Property...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Save className="h-5 w-5" />
                    <span>Add Property</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}