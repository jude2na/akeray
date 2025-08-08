"use client"

import { useState } from "react"
import { FileText, Download, Calendar, Home, User, DollarSign, Clock, MapPin, Building, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import DashboardLayout from "@/components/dashboard-layout"
import Link from "next/link"

// Mock tenant's leases data
const tenantLeases = [
  {
    id: "LSE-001",
    property: {
      id: 1,
      name: "Sunrise Apartments",
      address: "Bole Road, Addis Ababa",
      hasUnits: true,
    },
    unit: {
      id: "3B",
      name: "Unit 3B",
    },
    tenant: "Meron Tadesse",
    landlord: {
      name: "Mulugeta Assefa",
      phone: "+251911123456",
      email: "mulugeta@akeray.et",
      avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    monthlyRent: 18000,
    deposit: 36000,
    status: "active",
    renewalOption: true,
    noticePeriod: 30,
    lateFeePenalty: 500,
  },
  {
    id: "LSE-002",
    property: {
      id: 2,
      name: "Green Valley Villa",
      address: "Kazanchis, Addis Ababa",
      hasUnits: false,
    },
    unit: null,
    tenant: "Meron Tadesse",
    landlord: {
      name: "Sarah Johnson",
      phone: "+251922345678",
      email: "sarah@email.com",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    startDate: "2024-06-01",
    endDate: "2025-05-31",
    monthlyRent: 35000,
    deposit: 70000,
    status: "active",
    renewalOption: true,
    noticePeriod: 60,
    lateFeePenalty: 1000,
  },
  {
    id: "LSE-003",
    property: {
      id: 3,
      name: "City Center Complex",
      address: "Piassa, Addis Ababa",
      hasUnits: true,
    },
    unit: {
      id: "2C",
      name: "Unit 2C",
    },
    tenant: "Meron Tadesse",
    landlord: {
      name: "Ahmed Hassan",
      phone: "+251933456789",
      email: "ahmed@email.com",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    startDate: "2024-03-01",
    endDate: "2025-02-28",
    monthlyRent: 25000,
    deposit: 50000,
    status: "expiring",
    renewalOption: true,
    noticePeriod: 30,
    lateFeePenalty: 750,
  },
]

const leaseTerms = [
  "Monthly rent payment due on the 1st of each month",
  "Security deposit refundable upon lease completion",
  "Written notice required for lease termination",
  "Late payment fees apply after grace period",
  "Tenant responsible for utilities (electricity, water, internet)",
  "No pets allowed without written permission",
  "Property maintenance requests to be submitted through the system",
  "Lease automatically renewable with mutual agreement",
]

export default function TenantLeasePage() {
  const [selectedLeaseId, setSelectedLeaseId] = useState<string>(tenantLeases[0]?.id || "")
  const [expandedProperties, setExpandedProperties] = useState<number[]>([])

  const selectedLease = tenantLeases.find(lease => lease.id === selectedLeaseId) || tenantLeases[0]
  const daysUntilExpiry = selectedLease ? Math.ceil((new Date(selectedLease.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0

  const togglePropertyExpansion = (propertyId: number) => {
    setExpandedProperties(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    )
  }

  const groupedLeases = tenantLeases.reduce((acc, lease) => {
    const propertyId = lease.property.id
    if (!acc[propertyId]) {
      acc[propertyId] = {
        property: lease.property,
        leases: []
      }
    }
    acc[propertyId].leases.push(lease)
    return acc
  }, {} as Record<number, { property: any, leases: any[] }>)

  const handleDownloadPDF = (leaseId: string) => {
    // Simulate PDF download
    const lease = tenantLeases.find(l => l.id === leaseId)
    if (lease) {
      // In a real app, this would generate and download the actual PDF
      const blob = new Blob([`Lease Agreement for ${lease.property.name}${lease.unit ? ` - ${lease.unit.name}` : ""}`], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `lease-${leaseId}-${lease.property.name.replace(/\s+/g, '-')}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const handleDownloadAllPDFs = () => {
    // Simulate downloading all lease PDFs as a zip file
    const blob = new Blob(['All Lease Agreements - Meron Tadesse'], { type: 'application/zip' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'all-lease-agreements.zip'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!selectedLease) {
    return (
      <DashboardLayout userRole="tenant" userName="Meron Tadesse" userEmail="meron@email.com">
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Leases</h3>
          <p className="text-gray-600 mb-4">You don't have any active lease agreements.</p>
          <Button asChild className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
            <Link href="/dashboard/tenant/properties">Browse Properties</Link>
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole="tenant" userName="Meron Tadesse" userEmail="meron@email.com">
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-in fade-in duration-1000">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
                My Lease Agreements
              </h1>
              <p className="text-lg text-gray-600">View and manage all your lease agreements</p>
              <p className="text-sm text-gray-500">Download lease documents and track important dates</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleDownloadAllPDFs} className="border-emerald-300 hover:bg-emerald-50 bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Download All PDFs
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleDownloadPDF(selectedLease.id)}
                className="border-blue-300 hover:bg-blue-50 bg-transparent"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Current PDF
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Lease Selection Sidebar */}
          <div className="xl:col-span-1">
            <div className="animate-in fade-in slide-in-from-left-4 duration-700 delay-300" style={{ animationFillMode: "forwards" }}>
              <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm sticky top-8">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">Select Lease</CardTitle>
                  <CardDescription>Choose which lease to view</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.values(groupedLeases).map((group) => (
                    <div key={group.property.id} className="space-y-2">
                      <Collapsible 
                        open={expandedProperties.includes(group.property.id)}
                        onOpenChange={() => togglePropertyExpansion(group.property.id)}
                      >
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-between p-3 h-auto hover:bg-gray-50"
                          >
                            <div className="flex items-center space-x-3">
                              <Building className="h-4 w-4 text-blue-600" />
                              <div className="text-left">
                                <p className="font-medium text-sm">{group.property.name}</p>
                                <p className="text-xs text-gray-500">{group.leases.length} lease(s)</p>
                              </div>
                            </div>
                            {group.property.hasUnits ? (
                              expandedProperties.includes(group.property.id) ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )
                            ) : null}
                          </Button>
                        </CollapsibleTrigger>
                        
                        {group.property.hasUnits ? (
                          <CollapsibleContent className="space-y-2 ml-4">
                            {group.leases.map((lease) => (
                              <Button
                                key={lease.id}
                                variant={selectedLeaseId === lease.id ? "default" : "ghost"}
                                className={`w-full justify-start p-3 h-auto ${
                                  selectedLeaseId === lease.id 
                                    ? "bg-gradient-to-r from-emerald-600 to-blue-600 text-white" 
                                    : "hover:bg-gray-50"
                                }`}
                                onClick={() => setSelectedLeaseId(lease.id)}
                              >
                                <div className="flex items-center space-x-3">
                                  <Home className="h-4 w-4" />
                                  <div className="text-left">
                                    <p className="font-medium text-sm">{lease.unit?.name}</p>
                                    <p className="text-xs opacity-80">{lease.monthlyRent.toLocaleString()} ETB/month</p>
                                  </div>
                                </div>
                              </Button>
                            ))}
                          </CollapsibleContent>
                        ) : (
                          <div className="ml-4">
                            <Button
                              variant={selectedLeaseId === group.leases[0].id ? "default" : "ghost"}
                              className={`w-full justify-start p-3 h-auto ${
                                selectedLeaseId === group.leases[0].id 
                                  ? "bg-gradient-to-r from-emerald-600 to-blue-600 text-white" 
                                  : "hover:bg-gray-50"
                              }`}
                              onClick={() => setSelectedLeaseId(group.leases[0].id)}
                            >
                              <div className="flex items-center space-x-3">
                                <Home className="h-4 w-4" />
                                <div className="text-left">
                                  <p className="font-medium text-sm">Entire Property</p>
                                  <p className="text-xs opacity-80">{group.leases[0].monthlyRent.toLocaleString()} ETB/month</p>
                                </div>
                              </div>
                            </Button>
                          </div>
                        )}
                      </Collapsible>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Lease Content */}
          <div className="xl:col-span-3 space-y-8">
            {/* Lease Overview */}
            <div className="animate-in fade-in slide-in-from-top-4 duration-700 delay-300" style={{ animationFillMode: "forwards" }}>
              <Card className="shadow-xl border-0 bg-gradient-to-r from-emerald-50 to-blue-50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-xl">
                    <Home className="h-6 w-6 text-emerald-600" />
                    <span>Lease Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">Property</p>
                      <p className="text-lg font-semibold text-gray-900">{selectedLease.property.name}</p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {selectedLease.unit ? selectedLease.unit.name : "Entire Property"}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">Lease Period</p>
                      <p className="text-sm font-semibold text-gray-900">{new Date(selectedLease.startDate).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-600">to {new Date(selectedLease.endDate).toLocaleDateString()}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">Monthly Rent</p>
                      <p className="text-lg font-bold text-emerald-600">{selectedLease.monthlyRent.toLocaleString()} ETB</p>
                      <p className="text-sm text-gray-600">Deposit: {selectedLease.deposit.toLocaleString()} ETB</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">Status</p>
                      <Badge className={selectedLease.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-yellow-100 text-yellow-800"}>
                        {selectedLease.status}
                      </Badge>
                      <p className="text-sm text-gray-600">{daysUntilExpiry} days remaining</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Lease Terms */}
              <div className="animate-in fade-in slide-in-from-left-4 duration-700 delay-600" style={{ animationFillMode: "forwards" }}>
                <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3 text-xl">
                      <FileText className="h-6 w-6 text-blue-600" />
                      <span>Lease Terms & Conditions</span>
                    </CardTitle>
                    <CardDescription>Important terms and conditions of your lease agreement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {leaseTerms.map((term, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-100">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">{term}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Landlord Information */}
              <div className="animate-in fade-in slide-in-from-right-4 duration-700 delay-800" style={{ animationFillMode: "forwards" }}>
                <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3 text-xl">
                      <User className="h-6 w-6 text-purple-600" />
                      <span>Landlord Information</span>
                    </CardTitle>
                    <CardDescription>Contact details for your property owner</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
                        <Avatar className="h-16 w-16 ring-4 ring-purple-200">
                          <AvatarImage src={selectedLease.landlord.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold text-lg">
                            {selectedLease.landlord.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold text-lg text-gray-900">{selectedLease.landlord.name}</p>
                          <p className="text-sm text-gray-600">Property Owner</p>
                          <p className="text-sm text-purple-600 font-medium">Akeray Properties</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                            <span className="text-emerald-600 font-bold">📞</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{selectedLease.landlord.phone}</p>
                            <p className="text-xs text-gray-500">Phone</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-bold">✉️</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{selectedLease.landlord.email}</p>
                            <p className="text-xs text-gray-500">Email</p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900">Emergency Contact</h4>
                        <div className="flex items-center space-x-3 p-3 rounded-xl bg-red-50 border border-red-100">
                          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                            <span className="text-red-600 font-bold">🚨</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">+251-911-654321</p>
                            <p className="text-xs text-gray-500">24/7 Emergency Line</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Important Dates */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1000" style={{ animationFillMode: "forwards" }}>
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-xl">
                    <Calendar className="h-6 w-6 text-orange-600" />
                    <span>Important Dates</span>
                  </CardTitle>
                  <CardDescription>Key dates and deadlines for your lease</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-100">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                        <Calendar className="h-8 w-8 text-emerald-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Lease Start</h3>
                      <p className="text-lg font-bold text-emerald-600">{new Date(selectedLease.startDate).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-500">Agreement began</p>
                    </div>
                    <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-100">
                      <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
                        <Clock className="h-8 w-8 text-yellow-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Lease End</h3>
                      <p className="text-lg font-bold text-yellow-600">{new Date(selectedLease.endDate).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-500">{daysUntilExpiry} days remaining</p>
                    </div>
                    <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
                      <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                        <FileText className="h-8 w-8 text-purple-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Notice Period</h3>
                      <p className="text-lg font-bold text-purple-600">{selectedLease.noticePeriod} days</p>
                      <p className="text-sm text-gray-500">Required for termination</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lease Actions */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1200" style={{ animationFillMode: "forwards" }}>
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Lease Actions</CardTitle>
                  <CardDescription>Manage your lease agreement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      asChild
                      className="h-20 flex-col space-y-2 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                    >
                      <Link href={`/dashboard/tenant/lease/${selectedLease.id}/renewal`}>
                        <FileText className="h-6 w-6" />
                        <span className="text-sm">Request Renewal</span>
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDownloadPDF(selectedLease.id)}
                      className="h-20 flex-col space-y-2 bg-transparent border-blue-200 hover:bg-blue-50"
                    >
                      <Download className="h-6 w-6 text-blue-600" />
                      <span className="text-sm">Download PDF</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex-col space-y-2 bg-transparent border-purple-200 hover:bg-purple-50"
                    >
                      <User className="h-6 w-6 text-purple-600" />
                      <span className="text-sm">Contact Landlord</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}