"use client"

import { useState } from "react"
import { CreditCard, DollarSign, Calendar, User, Building, ArrowLeft, Save, Receipt } from "lucide-react"
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

const paymentMethods = [
  { value: "cash", label: "Cash" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "mobile_money", label: "Mobile Money" },
  { value: "check", label: "Check" },
  { value: "online", label: "Online Payment" },
]

const tenants = [
  { id: "1", name: "Abebe Kebede", property: "Sunrise Apartments", unit: "4A", monthlyRent: 15000 },
  { id: "2", name: "Sara Lemma", property: "Green Valley Complex", unit: "2B", monthlyRent: 18000 },
  { id: "3", name: "Mulugeta Assefa", property: "City Center Plaza", unit: "1C", monthlyRent: 22000 },
  { id: "4", name: "Fatima Ali", property: "Riverside Towers", unit: "3A", monthlyRent: 20000 },
]

export default function RecordPaymentPage() {
  const [formData, setFormData] = useState({
    tenantId: "",
    amount: "",
    paymentDate: new Date(),
    dueDate: new Date(),
    paymentMethod: "",
    referenceNumber: "",
    notes: "",
    paymentType: "rent",
    lateFee: "",
    discount: "",
    receiptNumber: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const selectedTenant = tenants.find(t => t.id === formData.tenantId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validation
    if (!formData.tenantId || !formData.amount || !formData.paymentMethod) {
      setError("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    if (parseFloat(formData.amount) <= 0) {
      setError("Payment amount must be greater than 0")
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Payment Recorded Successfully!",
        description: `Payment of ${formData.amount} ETB has been recorded for ${selectedTenant?.name}.`,
      })
      router.push("/dashboard/admin/payments")
    }, 2000)
  }

  const calculateTotal = () => {
    const amount = parseFloat(formData.amount) || 0
    const lateFee = parseFloat(formData.lateFee) || 0
    const discount = parseFloat(formData.discount) || 0
    return amount + lateFee - discount
  }

  return (
    <DashboardLayout userRole="admin" userName="Admin Aseffa Bekele" userEmail="aseffa@akeray.et">
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-in fade-in duration-1000">
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="outline" asChild className="border-emerald-300 hover:bg-emerald-50">
              <Link href="/dashboard/admin/payments">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Payments
              </Link>
            </Button>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Record Payment
            </h1>
            <p className="text-lg text-gray-600">Record a new rental payment in the system</p>
            <p className="text-sm text-gray-500">Track tenant payments and generate receipts</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="xl:col-span-2 space-y-8">
              {/* Payment Details */}
              <div className="animate-in fade-in slide-in-from-left-4 duration-700 delay-300" style={{ animationFillMode: "forwards" }}>
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Payment Details</CardTitle>
                    <CardDescription>Enter payment information and amount</CardDescription>
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
                                  <p className="text-xs text-gray-500">{tenant.property} - Unit {tenant.unit}</p>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedTenant && (
                      <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <Building className="h-5 w-5 text-emerald-600" />
                          <h4 className="font-semibold text-emerald-800">Tenant Information</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-emerald-700 font-medium">Property:</p>
                            <p className="text-emerald-600">{selectedTenant.property}</p>
                          </div>
                          <div>
                            <p className="text-emerald-700 font-medium">Unit:</p>
                            <p className="text-emerald-600">{selectedTenant.unit}</p>
                          </div>
                          <div>
                            <p className="text-emerald-700 font-medium">Monthly Rent:</p>
                            <p className="text-emerald-600">{selectedTenant.monthlyRent.toLocaleString()} ETB</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount" className="text-sm font-semibold text-gray-700">
                          Payment Amount (ETB) *
                        </Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="amount"
                            type="number"
                            placeholder={selectedTenant ? selectedTenant.monthlyRent.toString() : "0"}
                            className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="paymentMethod" className="text-sm font-semibold text-gray-700">
                          Payment Method *
                        </Label>
                        <Select value={formData.paymentMethod} onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}>
                          <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                          <SelectContent>
                            {paymentMethods.map((method) => (
                              <SelectItem key={method.value} value={method.value}>
                                {method.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">
                          Payment Date *
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 justify-start text-left font-normal"
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {formData.paymentDate ? format(formData.paymentDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={formData.paymentDate}
                              onSelect={(date) => date && setFormData({ ...formData, paymentDate: date })}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">
                          Due Date
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 justify-start text-left font-normal"
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {formData.dueDate ? format(formData.dueDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={formData.dueDate}
                              onSelect={(date) => date && setFormData({ ...formData, dueDate: date })}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="lateFee" className="text-sm font-semibold text-gray-700">
                          Late Fee (ETB)
                        </Label>
                        <Input
                          id="lateFee"
                          type="number"
                          placeholder="0"
                          className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                          value={formData.lateFee}
                          onChange={(e) => setFormData({ ...formData, lateFee: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="discount" className="text-sm font-semibold text-gray-700">
                          Discount (ETB)
                        </Label>
                        <Input
                          id="discount"
                          type="number"
                          placeholder="0"
                          className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                          value={formData.discount}
                          onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="receiptNumber" className="text-sm font-semibold text-gray-700">
                          Receipt Number
                        </Label>
                        <Input
                          id="receiptNumber"
                          placeholder="RCP-001"
                          className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                          value={formData.receiptNumber}
                          onChange={(e) => setFormData({ ...formData, receiptNumber: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="referenceNumber" className="text-sm font-semibold text-gray-700">
                        Reference Number
                      </Label>
                      <Input
                        id="referenceNumber"
                        placeholder="Transaction reference or check number"
                        className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                        value={formData.referenceNumber}
                        onChange={(e) => setFormData({ ...formData, referenceNumber: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes" className="text-sm font-semibold text-gray-700">
                        Notes
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="Additional payment notes or comments..."
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
              {/* Payment Summary */}
              <div className="animate-in fade-in slide-in-from-right-4 duration-700 delay-600" style={{ animationFillMode: "forwards" }}>
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm sticky top-8">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Payment Summary</CardTitle>
                    <CardDescription>Review payment calculation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Base Amount:</span>
                        <span className="font-medium">{parseFloat(formData.amount || "0").toLocaleString()} ETB</span>
                      </div>
                      
                      {formData.lateFee && parseFloat(formData.lateFee) > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-red-600">Late Fee:</span>
                          <span className="font-medium text-red-600">+{parseFloat(formData.lateFee).toLocaleString()} ETB</span>
                        </div>
                      )}
                      
                      {formData.discount && parseFloat(formData.discount) > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-emerald-600">Discount:</span>
                          <span className="font-medium text-emerald-600">-{parseFloat(formData.discount).toLocaleString()} ETB</span>
                        </div>
                      )}
                      
                      <div className="border-t pt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                          <span className="text-2xl font-bold text-emerald-600">{calculateTotal().toLocaleString()} ETB</span>
                        </div>
                      </div>
                    </div>

                    {selectedTenant && (
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 mt-6">
                        <h4 className="font-semibold text-blue-800 mb-2">Tenant Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-blue-700">Name:</span>
                            <span className="text-blue-600 font-medium">{selectedTenant.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">Property:</span>
                            <span className="text-blue-600">{selectedTenant.property}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">Unit:</span>
                            <span className="text-blue-600">{selectedTenant.unit}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">Monthly Rent:</span>
                            <span className="text-blue-600 font-medium">{selectedTenant.monthlyRent.toLocaleString()} ETB</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Payment Type */}
              <div className="animate-in fade-in slide-in-from-right-4 duration-700 delay-900" style={{ animationFillMode: "forwards" }}>
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Payment Type</CardTitle>
                    <CardDescription>Specify the type of payment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Select value={formData.paymentType} onValueChange={(value) => setFormData({ ...formData, paymentType: value })}>
                      <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rent">Monthly Rent</SelectItem>
                        <SelectItem value="deposit">Security Deposit</SelectItem>
                        <SelectItem value="utilities">Utilities</SelectItem>
                        <SelectItem value="maintenance">Maintenance Fee</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Receipt className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Payment will be recorded immediately</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Receipt will be generated automatically</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1200" style={{ animationFillMode: "forwards" }}>
            <div className="flex justify-end space-x-4 mt-8">
              <Button type="button" variant="outline" asChild className="border-gray-300 hover:bg-gray-50">
                <Link href="/dashboard/admin/payments">Cancel</Link>
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Recording Payment...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Save className="h-5 w-5" />
                    <span>Record Payment</span>
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