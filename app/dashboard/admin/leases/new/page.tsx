"use client"

import { useState } from "react"
import { FileText, User, Building, Calendar, DollarSign, ArrowLeft, Save, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"
import DashboardLayout from "@/components/dashboard-layout"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const tenants = [
  { id: "1", name: "Abebe Kebede", phone: "+251911234567", email: "abebe@email.com", occupation: "Teacher" },
  { id: "2", name: "Sara Lemma", phone: "+251922345678", email: "sara@email.com", occupation: "Engineer" },
  { id: "3", name: "Mulugeta Assefa", phone: "+251933456789", email: "mulugeta@email.com", occupation: "Business Owner" },
  { id: "4", name: "Fatima Ali", phone: "+251944567890", email: "fatima@email.com", occupation: "Doctor" },
]

const properties = [
  { id: "1", name: "Sunrise Apartments", units: ["1A", "1B", "2A", "2B", "3A", "3B"], pricePerUnit: 15000 },
  { id: "2", name: "Green Valley Complex", units: ["1A", "1B", "2A", "2B"], pricePerUnit: 18000 },
  { id: "3", name: "City Center Plaza", units: ["1C", "2C", "3C"], pricePerUnit: 22000 },
  { id: "4", name: "Riverside Towers", units: ["1A", "2A", "3A", "4A"], pricePerUnit: 20000 },
]

const leaseTerms = [
  "Monthly rent payment due on the 1st of each month",
  "Security deposit equivalent to 2 months rent required",
  "30-day notice required for lease termination by either party",
  "Late payment fee of 500 ETB after 5 days grace period",
  "Tenant responsible for utilities (electricity, water, internet)",
  "Property maintenance requests must be submitted through the system",
  "No subletting without written permission from property owner",
  "Property inspection allowed with 24-hour notice"
]

export default function NewLeasePage() {
  const [formData, setFormData] = useState({
    tenantId: "",
    propertyId: "",
    unit: "",
    startDate: new Date(),
    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    monthlyRent: "",
    securityDeposit: "",
    leaseDuration: "12",
    paymentDueDay: "1",
    lateFeeAmount: "500",
    noticePeriod: "30",
    renewalOption: true,
    utilitiesIncluded: false,
    petsAllowed: false,
    smokingAllowed: false,
    specialTerms: "",
    leaseType: "residential"
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const selectedTenant = tenants.find(t => t.id === formData.tenantId)
  const selectedProperty = properties.find(p => p.id === formData.propertyId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validation
    if (!formData.tenantId || !formData.propertyId || !formData.unit || !formData.monthlyRent) {
      setError("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    if (parseFloat(formData.monthlyRent) <= 0) {
      setError("Monthly rent must be greater than 0")
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Lease Agreement Created!",
        description: `Lease agreement for ${selectedTenant?.name} has been created successfully.`,
      })
      router.push("/dashboard/admin/leases")
    }, 2000)
  }

  const calculateSecurityDeposit = () => {
    const rent = parseFloat(formData.monthlyRent) || 0
    return (rent * 2).toString()
  }

  return (
    <DashboardLayout userRole="admin" userName="Admin Aseffa Bekele" userEmail="aseffa@akeray.et">
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-in fade-in duration-1000">
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="outline" asChild className="border-emerald-300 hover:bg-emerald-50">
              <Link href="/dashboard/admin/leases">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Leases
              </Link>
            </Button>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Create New Lease
            </h1>
            <p className="text-lg text-gray-600">Generate a new lease agreement between tenant and property owner</p>
            <p className="text-sm text-gray-500">Set terms, conditions, and rental details</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="xl:col-span-2 space-y-8">
              {/* Parties Information */}
              <div className="animate-in fade-in slide-in-from-left-4 duration-700 delay-300" style={{ animationFillMode: "forwards" }}>
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Lease Parties</CardTitle>
                    <CardDescription>Select tenant and property for the lease agreement</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="tenant" className="text-sm font-semibold text-gray-700">
                        Select Tenant *
                      </Label>
                      <Select value={formData.tenantId} onValueChange={(value) => setFormData({ ...formData, tenantId: value })}>
                        <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
                          <SelectValue placeholder="Choose tenant" />
                        </SelectTrigger>
                        <SelectContent>
                          {tenants.map((tenant) => (
                            <SelectItem key={tenant.id} value={tenant.id}>
                              <div className="flex items-center space-x-3">
                                <User className="h-4 w-4 text-gray-400" />
                                <div>
                                  <p className="font-medium">{tenant.name}</p>
                                  <p className="text-xs text-gray-500">{tenant.occupation} • {tenant.phone}</p>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="property" className="text-sm font-semibold text-gray-700">
                          Select Property *
                        </Label>
                        <Select 
                          value={formData.propertyId} 
                          onValueChange={(value) => {
                            const property = properties.find(p => p.id === value)
                            setFormData({ 
                              ...formData, 
                              propertyId: value, 
                              unit: "",
                              monthlyRent: property?.pricePerUnit.toString() || ""
                            })
                          }}
                        >
                          <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
                            <SelectValue placeholder="Choose property" />
                          </SelectTrigger>
                          <SelectContent>
                            {properties.map((property) => (
                              <SelectItem key={property.id} value={property.id}>
                                <div className="flex items-center space-x-3">
                                  <Building className="h-4 w-4 text-gray-400" />
                                  <div>
                                    <p className="font-medium">{property.name}</p>
                                    <p className="text-xs text-gray-500">{property.units.length} units • {property.pricePerUnit.toLocaleString()} ETB/month</p>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="unit" className="text-sm font-semibold text-gray-700">
                          Select Unit *
                        </Label>
                        <Select 
                          value={formData.unit} 
                          onValueChange={(value) => setFormData({ ...formData, unit: value })}
                          disabled={!formData.propertyId}
                        >
                          <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
                            <SelectValue placeholder="Choose unit" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedProperty?.units.map((unit) => (
                              <SelectItem key={unit} value={unit}>
                                Unit {unit}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Lease Terms */}
              <div className="animate-in fade-in slide-in-from-left-4 duration-700 delay-600" style={{ animationFillMode: "forwards" }}>
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Lease Terms</CardTitle>
                    <CardDescription>Set rental amounts, dates, and lease duration</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">
                          Lease Start Date *
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 justify-start text-left font-normal"
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {formData.startDate ? format(formData.startDate, "PPP") : "Pick start date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={formData.startDate}
                              onSelect={(date) => date && setFormData({ ...formData, startDate: date })}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">
                          Lease End Date *
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 justify-start text-left font-normal"
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {formData.endDate ? format(formData.endDate, "PPP") : "Pick end date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={formData.endDate}
                              onSelect={(date) => date && setFormData({ ...formData, endDate: date })}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="monthlyRent" className="text-sm font-semibold text-gray-700">
                          Monthly Rent (ETB) *
                        </Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="monthlyRent"
                            type="number"
                            placeholder="25000"
                            className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                            value={formData.monthlyRent}
                            onChange={(e) => {
                              setFormData({ 
                                ...formData, 
                                monthlyRent: e.target.value,
                                securityDeposit: calculateSecurityDeposit()
                              })
                            }}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="securityDeposit" className="text-sm font-semibold text-gray-700">
                          Security Deposit (ETB)
                        </Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="securityDeposit"
                            type="number"
                            placeholder="50000"
                            className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                            value={formData.securityDeposit || calculateSecurityDeposit()}
                            onChange={(e) => setFormData({ ...formData, securityDeposit: e.target.value })}
                          />
                        </div>
                        <p className="text-xs text-gray-500">Default: 2x monthly rent</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="paymentDueDay" className="text-sm font-semibold text-gray-700">
                          Payment Due Day
                        </Label>
                        <Select value={formData.paymentDueDay} onValueChange={(value) => setFormData({ ...formData, paymentDueDay: value })}>
                          <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                              <SelectItem key={day} value={day.toString()}>
                                {day}{day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th'} of each month
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lateFeeAmount" className="text-sm font-semibold text-gray-700">
                          Late Fee (ETB)
                        </Label>
                        <Input
                          id="lateFeeAmount"
                          type="number"
                          placeholder="500"
                          className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                          value={formData.lateFeeAmount}
                          onChange={(e) => setFormData({ ...formData, lateFeeAmount: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="noticePeriod" className="text-sm font-semibold text-gray-700">
                          Notice Period (Days)
                        </Label>
                        <Input
                          id="noticePeriod"
                          type="number"
                          placeholder="30"
                          className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                          value={formData.noticePeriod}
                          onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Lease Options</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200">
                          <div className="space-y-0.5">
                            <Label className="text-sm font-medium">Renewal Option</Label>
                            <p className="text-xs text-gray-500">Allow automatic renewal</p>
                          </div>
                          <Checkbox
                            checked={formData.renewalOption}
                            onCheckedChange={(checked) => setFormData({ ...formData, renewalOption: checked as boolean })}
                            className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                          />
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200">
                          <div className="space-y-0.5">
                            <Label className="text-sm font-medium">Utilities Included</Label>
                            <p className="text-xs text-gray-500">Rent includes utilities</p>
                          </div>
                          <Checkbox
                            checked={formData.utilitiesIncluded}
                            onCheckedChange={(checked) => setFormData({ ...formData, utilitiesIncluded: checked as boolean })}
                            className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                          />
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200">
                          <div className="space-y-0.5">
                            <Label className="text-sm font-medium">Pets Allowed</Label>
                            <p className="text-xs text-gray-500">Allow pets in property</p>
                          </div>
                          <Checkbox
                            checked={formData.petsAllowed}
                            onCheckedChange={(checked) => setFormData({ ...formData, petsAllowed: checked as boolean })}
                            className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                          />
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200">
                          <div className="space-y-0.5">
                            <Label className="text-sm font-medium">Smoking Allowed</Label>
                            <p className="text-xs text-gray-500">Allow smoking in property</p>
                          </div>
                          <Checkbox
                            checked={formData.smokingAllowed}
                            onCheckedChange={(checked) => setFormData({ ...formData, smokingAllowed: checked as boolean })}
                            className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialTerms" className="text-sm font-semibold text-gray-700">
                        Special Terms & Conditions
                      </Label>
                      <Textarea
                        id="specialTerms"
                        placeholder="Any additional terms, conditions, or special agreements..."
                        className="min-h-24 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                        value={formData.specialTerms}
                        onChange={(e) => setFormData({ ...formData, specialTerms: e.target.value })}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1 space-y-8">
              {/* Lease Summary */}
              <div className="animate-in fade-in slide-in-from-right-4 duration-700 delay-600" style={{ animationFillMode: "forwards" }}>
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm sticky top-8">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Lease Summary</CardTitle>
                    <CardDescription>Review lease details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedTenant && (
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <User className="h-5 w-5 text-blue-600" />
                          <h4 className="font-semibold text-blue-800">Tenant</h4>
                        </div>
                        <div className="space-y-1 text-sm">
                          <p className="font-medium text-blue-900">{selectedTenant.name}</p>
                          <p className="text-blue-700">{selectedTenant.occupation}</p>
                          <p className="text-blue-600">{selectedTenant.phone}</p>
                        </div>
                      </div>
                    )}

                    {selectedProperty && formData.unit && (
                      <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <Building className="h-5 w-5 text-emerald-600" />
                          <h4 className="font-semibold text-emerald-800">Property</h4>
                        </div>
                        <div className="space-y-1 text-sm">
                          <p className="font-medium text-emerald-900">{selectedProperty.name}</p>
                          <p className="text-emerald-700">Unit {formData.unit}</p>
                          <p className="text-emerald-600">{selectedProperty.pricePerUnit.toLocaleString()} ETB/month</p>
                        </div>
                      </div>
                    )}

                    {formData.monthlyRent && (
                      <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <DollarSign className="h-5 w-5 text-purple-600" />
                          <h4 className="font-semibold text-purple-800">Financial Terms</h4>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-purple-700">Monthly Rent:</span>
                            <span className="text-purple-600 font-medium">{parseFloat(formData.monthlyRent).toLocaleString()} ETB</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-purple-700">Security Deposit:</span>
                            <span className="text-purple-600 font-medium">{parseFloat(formData.securityDeposit || calculateSecurityDeposit()).toLocaleString()} ETB</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-purple-700">Late Fee:</span>
                            <span className="text-purple-600">{parseFloat(formData.lateFeeAmount).toLocaleString()} ETB</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-3">Standard Terms</h4>
                      <div className="space-y-2">
                        {leaseTerms.slice(0, 4).map((term, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className="w-1 h-1 bg-gray-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-xs text-gray-600">{term}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-900" style={{ animationFillMode: "forwards" }}>
            <div className="flex justify-end space-x-4 mt-8">
              <Button type="button" variant="outline" asChild className="border-gray-300 hover:bg-gray-50">
                <Link href="/dashboard/admin/leases">Cancel</Link>
              </Button>
              <Button type="button" variant="outline" className="border-blue-300 hover:bg-blue-50">
                <Download className="h-4 w-4 mr-2" />
                Preview PDF
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating Lease...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Save className="h-5 w-5" />
                    <span>Create Lease</span>
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