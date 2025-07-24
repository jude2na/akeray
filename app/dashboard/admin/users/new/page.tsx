"use client"

import { useState } from "react"
import { Users, User, Phone, Mail, Shield, ArrowLeft, Save, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import DashboardLayout from "@/components/dashboard-layout"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const userRoles = [
  { value: "admin", label: "Administrator", description: "Full system access and management" },
  { value: "owner", label: "Property Owner", description: "Manage properties and tenants" },
  { value: "tenant", label: "Tenant", description: "Rent properties and manage lease" },
]

const permissions = {
  admin: [
    "Manage all users and properties",
    "Access financial reports and analytics",
    "Configure system settings",
    "Approve/reject user registrations",
    "Manage maintenance requests",
    "Send notifications and alerts",
    "Export data and generate reports",
    "Full database access"
  ],
  owner: [
    "Add and manage own properties",
    "View tenant information",
    "Track rental payments",
    "Manage lease agreements",
    "Handle maintenance requests",
    "Generate property reports",
    "Communicate with tenants"
  ],
  tenant: [
    "Search and view properties",
    "Submit rental applications",
    "Make rental payments",
    "Request maintenance services",
    "View lease agreements",
    "Receive notifications",
    "Contact property owners"
  ]
}

export default function AddUserPage() {
  const [formData, setFormData] = useState({
    role: "",
    fullName: "",
    fatherName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    idNumber: "",
    occupation: "",
    address: "",
    emergencyContact: "",
    isActive: true,
    sendWelcomeEmail: true,
    sendWelcomeSMS: true
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validation
    if (!formData.role || !formData.fullName || !formData.phone || !formData.password) {
      setError("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (!formData.phone.startsWith("+251")) {
      setError("Phone number must start with +251")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "User Created Successfully!",
        description: `${formData.fullName} has been added as ${formData.role}. ${formData.sendWelcomeSMS ? 'Welcome SMS sent.' : ''} ${formData.sendWelcomeEmail ? 'Welcome email sent.' : ''}`,
      })
      router.push("/dashboard/admin/users")
    }, 2000)
  }

  const selectedRole = userRoles.find(role => role.value === formData.role)

  return (
    <DashboardLayout userRole="admin" userName="Admin Aseffa Bekele" userEmail="aseffa@akeray.et">
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-in fade-in duration-1000">
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="outline" asChild className="border-emerald-300 hover:bg-emerald-50">
              <Link href="/dashboard/admin/users">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Users
              </Link>
            </Button>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Add New User
            </h1>
            <p className="text-lg text-gray-600">Create a new user account in the system</p>
            <p className="text-sm text-gray-500">Assign roles and permissions for system access</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="xl:col-span-2 space-y-8">
              {/* Role Selection */}
              <div className="animate-in fade-in slide-in-from-left-4 duration-700 delay-300" style={{ animationFillMode: "forwards" }}>
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">User Role</CardTitle>
                    <CardDescription>Select the user's role and access level</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-sm font-semibold text-gray-700">
                        User Role *
                      </Label>
                      <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                        <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
                          <SelectValue placeholder="Select user role" />
                        </SelectTrigger>
                        <SelectContent>
                          {userRoles.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              <div className="flex items-center space-x-3">
                                <div className={`w-3 h-3 rounded-full ${
                                  role.value === 'admin' ? 'bg-purple-500' :
                                  role.value === 'owner' ? 'bg-emerald-500' : 'bg-blue-500'
                                }`} />
                                <div>
                                  <p className="font-medium">{role.label}</p>
                                  <p className="text-xs text-gray-500">{role.description}</p>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedRole && (
                      <div className={`p-4 rounded-xl border-2 ${
                        selectedRole.value === 'admin' ? 'bg-purple-50 border-purple-200' :
                        selectedRole.value === 'owner' ? 'bg-emerald-50 border-emerald-200' : 'bg-blue-50 border-blue-200'
                      }`}>
                        <div className="flex items-center space-x-3 mb-3">
                          <Shield className={`h-6 w-6 ${
                            selectedRole.value === 'admin' ? 'text-purple-600' :
                            selectedRole.value === 'owner' ? 'text-emerald-600' : 'text-blue-600'
                          }`} />
                          <h3 className="font-semibold text-gray-900">{selectedRole.label}</h3>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{selectedRole.description}</p>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-gray-600">Permissions include:</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {permissions[selectedRole.value as keyof typeof permissions]?.slice(0, 4).map((permission, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                                <span>{permission}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Personal Information */}
              <div className="animate-in fade-in slide-in-from-left-4 duration-700 delay-600" style={{ animationFillMode: "forwards" }}>
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Personal Information</CardTitle>
                    <CardDescription>Basic user information and identification</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
                          Full Name *
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="fullName"
                            placeholder="Enter full name"
                            className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fatherName" className="text-sm font-semibold text-gray-700">
                          Father's Name
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="fatherName"
                            placeholder="Enter father's name"
                            className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                            value={formData.fatherName}
                            onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="idNumber" className="text-sm font-semibold text-gray-700">
                          ID Number
                        </Label>
                        <Input
                          id="idNumber"
                          placeholder="Enter ID number"
                          className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                          value={formData.idNumber}
                          onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                        />
                      </div>

                      {formData.role === "tenant" && (
                        <div className="space-y-2">
                          <Label htmlFor="occupation" className="text-sm font-semibold text-gray-700">
                            Occupation
                          </Label>
                          <Input
                            id="occupation"
                            placeholder="Enter occupation"
                            className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                            value={formData.occupation}
                            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                          />
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-sm font-semibold text-gray-700">
                        Address
                      </Label>
                      <Input
                        id="address"
                        placeholder="Enter full address"
                        className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="animate-in fade-in slide-in-from-left-4 duration-700 delay-900" style={{ animationFillMode: "forwards" }}>
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Contact Information</CardTitle>
                    <CardDescription>Communication details and emergency contact</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                          Phone Number *
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="phone"
                            placeholder="+251911234567"
                            className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="user@email.com"
                            className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact" className="text-sm font-semibold text-gray-700">
                        Emergency Contact
                      </Label>
                      <Input
                        id="emergencyContact"
                        placeholder="+251922345678"
                        className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                        value={formData.emergencyContact}
                        onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Security */}
              <div className="animate-in fade-in slide-in-from-left-4 duration-700 delay-1200" style={{ animationFillMode: "forwards" }}>
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Account Security</CardTitle>
                    <CardDescription>Set up login credentials and security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                          Password *
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            className="pr-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                          Confirm Password *
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            className="pr-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">Password Requirements:</h4>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li className="flex items-center space-x-2">
                          <div className="w-1 h-1 bg-blue-600 rounded-full" />
                          <span>At least 8 characters long</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-1 h-1 bg-blue-600 rounded-full" />
                          <span>Include uppercase and lowercase letters</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-1 h-1 bg-blue-600 rounded-full" />
                          <span>Include at least one number</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1 space-y-8">
              {/* Permissions Preview */}
              {selectedRole && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-700 delay-600" style={{ animationFillMode: "forwards" }}>
                  <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm sticky top-8">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-gray-900">Role Permissions</CardTitle>
                      <CardDescription>What this user will be able to do</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className={`p-4 rounded-xl ${
                        selectedRole.value === 'admin' ? 'bg-purple-50 border border-purple-200' :
                        selectedRole.value === 'owner' ? 'bg-emerald-50 border border-emerald-200' : 'bg-blue-50 border border-blue-200'
                      }`}>
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            selectedRole.value === 'admin' ? 'bg-purple-100' :
                            selectedRole.value === 'owner' ? 'bg-emerald-100' : 'bg-blue-100'
                          }`}>
                            <Shield className={`h-6 w-6 ${
                              selectedRole.value === 'admin' ? 'text-purple-600' :
                              selectedRole.value === 'owner' ? 'text-emerald-600' : 'text-blue-600'
                            }`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{selectedRole.label}</h3>
                            <Badge className={
                              selectedRole.value === 'admin' ? 'bg-purple-100 text-purple-800' :
                              selectedRole.value === 'owner' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                            }>
                              {selectedRole.value.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          {permissions[selectedRole.value as keyof typeof permissions]?.map((permission, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                selectedRole.value === 'admin' ? 'bg-purple-500' :
                                selectedRole.value === 'owner' ? 'bg-emerald-500' : 'bg-blue-500'
                              }`} />
                              <span className="text-sm text-gray-700">{permission}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Account Settings */}
              <div className="animate-in fade-in slide-in-from-right-4 duration-700 delay-900" style={{ animationFillMode: "forwards" }}>
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Account Settings</CardTitle>
                    <CardDescription>Configure account status and notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-medium">Active Account</Label>
                        <p className="text-xs text-gray-500">User can login immediately</p>
                      </div>
                      <Checkbox
                        checked={formData.isActive}
                        onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked as boolean })}
                        className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-medium">Send Welcome Email</Label>
                        <p className="text-xs text-gray-500">Email login credentials</p>
                      </div>
                      <Checkbox
                        checked={formData.sendWelcomeEmail}
                        onCheckedChange={(checked) => setFormData({ ...formData, sendWelcomeEmail: checked as boolean })}
                        className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-medium">Send Welcome SMS</Label>
                        <p className="text-xs text-gray-500">SMS notification to phone</p>
                      </div>
                      <Checkbox
                        checked={formData.sendWelcomeSMS}
                        onCheckedChange={(checked) => setFormData({ ...formData, sendWelcomeSMS: checked as boolean })}
                        className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1500" style={{ animationFillMode: "forwards" }}>
            <div className="flex justify-end space-x-4 mt-8">
              <Button type="button" variant="outline" asChild className="border-gray-300 hover:bg-gray-50">
                <Link href="/dashboard/admin/users">Cancel</Link>
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating User...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Save className="h-5 w-5" />
                    <span>Create User</span>
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