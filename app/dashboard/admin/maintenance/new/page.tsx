"use client"

import { useState } from "react"
import { Wrench, User, Building, ArrowLeft, Save, AlertTriangle, Clock, CheckCircle } from "lucide-react"
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
import { format } from "date-fns"
import DashboardLayout from "@/components/dashboard-layout"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const categories = [
  { value: "plumbing", label: "Plumbing", icon: "🔧" },
  { value: "electrical", label: "Electrical", icon: "⚡" },
  { value: "hvac", label: "HVAC", icon: "❄️" },
  { value: "general", label: "General Maintenance", icon: "🔨" },
  { value: "cleaning", label: "Cleaning", icon: "🧹" },
  { value: "security", label: "Security", icon: "🔒" },
  { value: "landscaping", label: "Landscaping", icon: "🌱" },
  { value: "painting", label: "Painting", icon: "🎨" },
]

const priorities = [
  { value: "low", label: "Low", color: "bg-green-100 text-green-800", description: "Can wait, not urgent" },
  { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-800", description: "Should be addressed soon" },
  { value: "high", label: "High", color: "bg-red-100 text-red-800", description: "Urgent, needs immediate attention" },
  { value: "emergency", label: "Emergency", color: "bg-red-200 text-red-900", description: "Critical, safety concern" },
]

const tenants = [
  { id: "1", name: "Abebe Kebede", property: "Sunrise Apartments", unit: "4A", phone: "+251911234567" },
  { id: "2", name: "Sara Lemma", property: "Green Valley Complex", unit: "2B", phone: "+251922345678" },
  { id: "3", name: "Mulugeta Assefa", property: "City Center Plaza", unit: "1C", phone: "+251933456789" },
  { id: "4", name: "Fatima Ali", property: "Riverside Towers", unit: "3A", phone: "+251944567890" },
]

const technicians = [
  { id: "1", name: "Mike Wilson", specialties: ["Plumbing", "General"], phone: "+251955678901" },
  { id: "2", name: "Tom Anderson", specialties: ["Electrical", "HVAC"], phone: "+251966789012" },
  { id: "3", name: "Sarah Johnson", specialties: ["Cleaning", "General"], phone: "+251977890123" },
  { id: "4", name: "David Brown", specialties: ["Security", "General"], phone: "+251988901234" },
]

export default function NewMaintenanceRequestPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    tenantId: "",
    assignedTo: "",
    estimatedCost: "",
    scheduledDate: new Date(),
    status: "open",
    notes: "",
    requestType: "tenant_request"
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const selectedTenant = tenants.find(t => t.id === formData.tenantId)
  const selectedCategory = categories.find(c => c.value === formData.category)
  const selectedPriority = priorities.find(p => p.value === formData.priority)
  const selectedTechnician = technicians.find(t => t.id === formData.assignedTo)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validation
    if (!formData.title || !formData.description || !formData.category || !formData.priority) {
      setError("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Maintenance Request Created!",
        description: `Request "${formData.title}" has been created and ${formData.assignedTo ? 'assigned to technician' : 'is awaiting assignment'}.`,
      })
      router.push("/dashboard/admin/maintenance")
    }, 2000)
  }

  return (
    <DashboardLayout userRole="admin" userName="Admin Aseffa Bekele" userEmail="aseffa@akeray.et">
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-in fade-in duration-1000">
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="outline" asChild className="border-emerald-300 hover:bg-emerald-50">
              <Link href="/dashboard/admin/maintenance">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Maintenance
              </Link>
            </Button>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
              New Maintenance Request
            </h1>
            <p className="text-lg text-gray-600">Create a new maintenance request and assign to technician</p>
            <p className="text-sm text-gray-500">Track and manage property maintenance efficiently</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="xl:col-span-2 space-y-8">
              {/* Request Details */}
              <div className="animate-in fade-in slide-in-from-left-4 duration-700 delay-300" style={{ animationFillMode: "forwards" }}>
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Request Details</CardTitle>
                    <CardDescription>Describe the maintenance issue and requirements</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
                        Request Title *
                      </Label>
                      <Input
                        id="title"
                        placeholder="e.g., Leaking faucet in kitchen"
                        className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
                        Description *
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Provide detailed description of the maintenance issue, location, and any relevant information..."
                        className="min-h-32 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-sm font-semibold text-gray-700">
                          Category *
                        </Label>
                        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                          <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                <div className="flex items-center space-x-3">
                                  <span className="text-lg">{category.icon}</span>
                                  <span>{category.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="priority" className="text-sm font-semibold text-gray-700">
                          Priority *
                        </Label>
                        <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                          <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            {priorities.map((priority) => (
                              <SelectItem key={priority.value} value={priority.value}>
                                <div className="flex items-center space-x-3">
                                  <div className={`w-3 h-3 rounded-full ${
                                    priority.value === 'low' ? 'bg-green-500' :
                                    priority.value === 'medium' ? 'bg-yellow-500' :
                                    priority.value === 'high' ? 'bg-red-500' : 'bg-red-700'
                                  }`} />
                                  <div>
                                    <p className="font-medium">{priority.label}</p>
                                    <p className="text-xs text-gray-500">{priority.description}</p>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tenant" className="text-sm font-semibold text-gray-700">
                        Tenant (Optional)
                      </Label>
                      <Select value={formData.tenantId} onValueChange={(value) => setFormData({ ...formData, tenantId: value })}>
                        <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
                          <SelectValue placeholder="Select tenant if applicable" />
                        </SelectTrigger>
                        <SelectContent>
                          {tenants.map((tenant) => (
                            <SelectItem key={tenant.id} value={tenant.id}>
                              <div className="flex items-center space-x-3">
                                <User className="h-4 w-4 text-gray-400" />
                                <div>
                                  <p className="font-medium">{tenant.name}</p>
                                  <p className="text-xs text-gray-500">{tenant.property} - Unit {tenant.unit}</p>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Assignment & Scheduling */}
              <div className="animate-in fade-in slide-in-from-left-4 duration-700 delay-600" style={{ animationFillMode: "forwards" }}>
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Assignment & Scheduling</CardTitle>
                    <CardDescription>Assign technician and schedule the work</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="assignedTo" className="text-sm font-semibold text-gray-700">
                          Assign to Technician
                        </Label>
                        <Select value={formData.assignedTo} onValueChange={(value) => setFormData({ ...formData, assignedTo: value })}>
                          <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
                            <SelectValue placeholder="Select technician" />
                          </SelectTrigger>
                          <SelectContent>
                            {technicians.map((tech) => (
                              <SelectItem key={tech.id} value={tech.id}>
                                <div className="flex items-center space-x-3">
                                  <User className="h-4 w-4 text-gray-400" />
                                  <div>
                                    <p className="font-medium">{tech.name}</p>
                                    <p className="text-xs text-gray-500">{tech.specialties.join(", ")}</p>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="estimatedCost" className="text-sm font-semibold text-gray-700">
                          Estimated Cost (ETB)
                        </Label>
                        <Input
                          id="estimatedCost"
                          type="number"
                          placeholder="0"
                          className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                          value={formData.estimatedCost}
                          onChange={(e) => setFormData({ ...formData, estimatedCost: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-700">
                        Scheduled Date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 justify-start text-left font-normal"
                          >
                            <Clock className="mr-2 h-4 w-4" />
                            {formData.scheduledDate ? format(formData.scheduledDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={formData.scheduledDate}
                            onSelect={(date) => date && setFormData({ ...formData, scheduledDate: date })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes" className="text-sm font-semibold text-gray-700">
                        Additional Notes
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="Any additional information, special instructions, or requirements..."
                        className="min-h-20 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1 space-y-8">
              {/* Request Summary */}
              <div className="animate-in fade-in slide-in-from-right-4 duration-700 delay-600" style={{ animationFillMode: "forwards" }}>
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm sticky top-8">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Request Summary</CardTitle>
                    <CardDescription>Review request details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedCategory && (
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-2xl">{selectedCategory.icon}</span>
                          <h4 className="font-semibold text-blue-800">{selectedCategory.label}</h4>
                        </div>
                        <p className="text-blue-700 text-sm">Category selected for this request</p>
                      </div>
                    )}

                    {selectedPriority && (
                      <div className={`p-4 rounded-xl border ${
                        selectedPriority.value === 'low' ? 'bg-green-50 border-green-200' :
                        selectedPriority.value === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                        selectedPriority.value === 'high' ? 'bg-red-50 border-red-200' : 'bg-red-100 border-red-300'
                      }`}>
                        <div className="flex items-center space-x-3 mb-2">
                          {selectedPriority.value === 'low' && <CheckCircle className="h-5 w-5 text-green-600" />}
                          {selectedPriority.value === 'medium' && <Clock className="h-5 w-5 text-yellow-600" />}
                          {(selectedPriority.value === 'high' || selectedPriority.value === 'emergency') && <AlertTriangle className="h-5 w-5 text-red-600" />}
                          <h4 className={`font-semibold ${
                            selectedPriority.value === 'low' ? 'text-green-800' :
                            selectedPriority.value === 'medium' ? 'text-yellow-800' : 'text-red-800'
                          }`}>
                            {selectedPriority.label} Priority
                          </h4>
                        </div>
                        <p className={`text-sm ${
                          selectedPriority.value === 'low' ? 'text-green-700' :
                          selectedPriority.value === 'medium' ? 'text-yellow-700' : 'text-red-700'
                        }`}>
                          {selectedPriority.description}
                        </p>
                      </div>
                    )}

                    {selectedTenant && (
                      <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <Building className="h-5 w-5 text-emerald-600" />
                          <h4 className="font-semibold text-emerald-800">Tenant Information</h4>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-emerald-700">Name:</span>
                            <span className="text-emerald-600 font-medium">{selectedTenant.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-emerald-700">Property:</span>
                            <span className="text-emerald-600">{selectedTenant.property}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-emerald-700">Unit:</span>
                            <span className="text-emerald-600">{selectedTenant.unit}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-emerald-700">Phone:</span>
                            <span className="text-emerald-600">{selectedTenant.phone}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedTechnician && (
                      <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <User className="h-5 w-5 text-purple-600" />
                          <h4 className="font-semibold text-purple-800">Assigned Technician</h4>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-purple-700">Name:</span>
                            <span className="text-purple-600 font-medium">{selectedTechnician.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-purple-700">Phone:</span>
                            <span className="text-purple-600">{selectedTechnician.phone}</span>
                          </div>
                          <div>
                            <span className="text-purple-700">Specialties:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {selectedTechnician.specialties.map((specialty) => (
                                <Badge key={specialty} className="bg-purple-100 text-purple-800 text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {formData.estimatedCost && (
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700">Estimated Cost:</span>
                          <span className="text-lg font-bold text-gray-900">{parseFloat(formData.estimatedCost).toLocaleString()} ETB</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-900" style={{ animationFillMode: "forwards" }}>
            <div className="flex justify-end space-x-4 mt-8">
              <Button type="button" variant="outline" asChild className="border-gray-300 hover:bg-gray-50">
                <Link href="/dashboard/admin/maintenance">Cancel</Link>
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating Request...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Save className="h-5 w-5" />
                    <span>Create Request</span>
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