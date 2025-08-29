"use client";

import { useState } from "react";
import {
	Building,
	ArrowLeft,
	Save,
	User,
	Phone,
	Mail,
	Calendar,
	DollarSign,
	FileText,
	CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

// Mock data for property without units
const getPropertyData = (propertyId: string) => ({
	property: {
		id: parseInt(propertyId),
		name: "Green Valley Villa",
		address: "Kazanchis, Addis Ababa",
		monthlyRent: 35000,
		deposit: 70000,
		availableFrom: "2025-02-01",
		bedrooms: 4,
		bathrooms: 3,
		area: "180 sqm",
		minLeaseTerm: 12,
	},
});

export default function PropertyRentRequestPage() {
	const params = useParams();
	const router = useRouter();
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [moveInDate, setMoveInDate] = useState<Date>();

	const [formData, setFormData] = useState({
		fullName: "Meron Tadesse",
		phone: "+251911234567",
		email: "meron@email.com",
		occupation: "Software Engineer",
		monthlyIncome: "",
		leaseDuration: "12",
		numberOfOccupants: "1",
		hasChildren: false,
		hasPets: false,
		emergencyContactName: "",
		emergencyContactPhone: "",
		emergencyContactRelation: "",
		additionalRequests: "",
		agreeToTerms: false,
		agreeToBackgroundCheck: false,
		leaseType: "online",
	});

	const data = getPropertyData(params.id as string);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		if (
			!formData.monthlyIncome ||
			!formData.emergencyContactName ||
			!formData.emergencyContactPhone
		) {
			setError("Please fill in all required fields");
			setIsLoading(false);
			return;
		}

		if (!formData.agreeToTerms || !formData.agreeToBackgroundCheck) {
			setError("Please agree to all terms and conditions");
			setIsLoading(false);
			return;
		}

		setTimeout(() => {
			setIsLoading(false);
			toast({
				title: "Rental Request Submitted!",
				description: `Your request for ${data.property.name} has been submitted successfully.`,
			});
			router.push(`/dashboard/tenant/rental-requests`);
		}, 2000);
	};

	const totalUpfront = data.property.monthlyRent + data.property.deposit;

	return (
		<DashboardLayout
			userRole="tenant"
			userName="Meron Tadesse"
			userEmail="meron@email.com"
		>
			<div className="space-y-8">
				{/* Header */}
				<div className="animate-in fade-in duration-1000">
					<div className="flex items-center space-x-4 mb-6">
						<Button
							variant="outline"
							asChild
							className="border-emerald-300 hover:bg-emerald-50"
						>
							<Link href={`/dashboard/tenant/properties/${params.id}`}>
								<ArrowLeft className="h-4 w-4 mr-2" />
								Back to Property Details
							</Link>
						</Button>
					</div>
					<div>
						<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
							Rental Application
						</h1>
						<p className="text-lg text-gray-600">
							Apply to rent {data.property.name}
						</p>
						<p className="text-sm text-gray-500">
							Complete the application form to submit your rental request
						</p>
					</div>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
						{/* Main Form */}
						<div className="xl:col-span-2 space-y-8">
							{/* Personal Information */}
							<div
								className="animate-in fade-in slide-in-from-left-4 duration-700 delay-300"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Personal Information
										</CardTitle>
										<CardDescription>
											Your basic information for the rental application
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-6">
										{error && (
											<Alert variant="destructive">
												<AlertDescription>{error}</AlertDescription>
											</Alert>
										)}

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label
													htmlFor="fullName"
													className="text-sm font-semibold text-gray-700"
												>
													Full Name *
												</Label>
												<Input
													id="fullName"
													value={formData.fullName}
													onChange={(e) =>
														setFormData({
															...formData,
															fullName: e.target.value,
														})
													}
													className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													required
												/>
											</div>

											<div className="space-y-2">
												<Label
													htmlFor="occupation"
													className="text-sm font-semibold text-gray-700"
												>
													Occupation *
												</Label>
												<Input
													id="occupation"
													value={formData.occupation}
													onChange={(e) =>
														setFormData({
															...formData,
															occupation: e.target.value,
														})
													}
													className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													required
												/>
											</div>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label
													htmlFor="phone"
													className="text-sm font-semibold text-gray-700"
												>
													Phone Number *
												</Label>
												<Input
													id="phone"
													value={formData.phone}
													onChange={(e) =>
														setFormData({ ...formData, phone: e.target.value })
													}
													className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													required
												/>
											</div>

											<div className="space-y-2">
												<Label
													htmlFor="email"
													className="text-sm font-semibold text-gray-700"
												>
													Email Address *
												</Label>
												<Input
													id="email"
													type="email"
													value={formData.email}
													onChange={(e) =>
														setFormData({ ...formData, email: e.target.value })
													}
													className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													required
												/>
											</div>
										</div>

										<div className="space-y-2">
											<Label
												htmlFor="monthlyIncome"
												className="text-sm font-semibold text-gray-700"
											>
												Monthly Income (ETB) *
											</Label>
											<div className="relative">
												<DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
												<Input
													id="monthlyIncome"
													type="number"
													placeholder="50000"
													className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													value={formData.monthlyIncome}
													onChange={(e) =>
														setFormData({
															...formData,
															monthlyIncome: e.target.value,
														})
													}
													required
												/>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Rental Preferences */}
							<div
								className="animate-in fade-in slide-in-from-left-4 duration-700 delay-600"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Rental Preferences
										</CardTitle>
										<CardDescription>
											Your preferences for the lease
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-6">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label
													htmlFor="leaseDuration"
													className="text-sm font-semibold text-gray-700"
												>
													Preferred Lease Duration
												</Label>
												<Select
													value={formData.leaseDuration}
													onValueChange={(value) =>
														setFormData({ ...formData, leaseDuration: value })
													}
												>
													<SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="6">6 months</SelectItem>
														<SelectItem value="12">12 months</SelectItem>
														<SelectItem value="24">24 months</SelectItem>
														<SelectItem value="36">36 months</SelectItem>
													</SelectContent>
												</Select>
											</div>

											<div className="space-y-2">
												<Label
													htmlFor="numberOfOccupants"
													className="text-sm font-semibold text-gray-700"
												>
													Number of Occupants
												</Label>
												<Select
													value={formData.numberOfOccupants}
													onValueChange={(value) =>
														setFormData({
															...formData,
															numberOfOccupants: value,
														})
													}
												>
													<SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="1">1 person</SelectItem>
														<SelectItem value="2">2 people</SelectItem>
														<SelectItem value="3">3 people</SelectItem>
														<SelectItem value="4">4 people</SelectItem>
														<SelectItem value="5+">5+ people</SelectItem>
													</SelectContent>
												</Select>
											</div>
										</div>

										<div className="space-y-2">
											<Label className="text-sm font-semibold text-gray-700">
												Preferred Move-in Date
											</Label>
											<Popover>
												<PopoverTrigger asChild>
													<Button
														variant="outline"
														className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 justify-start text-left font-normal"
													>
														<Calendar className="mr-2 h-4 w-4" />
														{moveInDate
															? format(moveInDate, "PPP")
															: "Select move-in date"}
													</Button>
												</PopoverTrigger>
												<PopoverContent className="w-auto p-0">
													<CalendarComponent
														mode="single"
														selected={moveInDate}
														onSelect={setMoveInDate}
														initialFocus
													/>
												</PopoverContent>
											</Popover>
										</div>

										<div className="grid grid-cols-2 gap-6">
											<div className="flex items-center space-x-3">
												<Checkbox
													id="hasChildren"
													checked={formData.hasChildren}
													onCheckedChange={(checked) =>
														setFormData({
															...formData,
															hasChildren: checked as boolean,
														})
													}
												/>
												<Label htmlFor="hasChildren" className="text-sm">
													I have children
												</Label>
											</div>
											<div className="flex items-center space-x-3">
												<Checkbox
													id="hasPets"
													checked={formData.hasPets}
													onCheckedChange={(checked) =>
														setFormData({
															...formData,
															hasPets: checked as boolean,
														})
													}
												/>
												<Label htmlFor="hasPets" className="text-sm">
													I have pets
												</Label>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Emergency Contact */}
							<div
								className="animate-in fade-in slide-in-from-left-4 duration-700 delay-900"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Emergency Contact
										</CardTitle>
										<CardDescription>
											Contact information for verification
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-6">
										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											<div className="space-y-2">
												<Label
													htmlFor="emergencyContactName"
													className="text-sm font-semibold text-gray-700"
												>
													Full Name *
												</Label>
												<Input
													id="emergencyContactName"
													value={formData.emergencyContactName}
													onChange={(e) =>
														setFormData({
															...formData,
															emergencyContactName: e.target.value,
														})
													}
													className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													required
												/>
											</div>
											<div className="space-y-2">
												<Label
													htmlFor="emergencyContactPhone"
													className="text-sm font-semibold text-gray-700"
												>
													Phone Number *
												</Label>
												<Input
													id="emergencyContactPhone"
													value={formData.emergencyContactPhone}
													onChange={(e) =>
														setFormData({
															...formData,
															emergencyContactPhone: e.target.value,
														})
													}
													className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													required
												/>
											</div>
											<div className="space-y-2">
												<Label
													htmlFor="emergencyContactRelation"
													className="text-sm font-semibold text-gray-700"
												>
													Relationship
												</Label>
												<Select
													value={formData.emergencyContactRelation}
													onValueChange={(value) =>
														setFormData({
															...formData,
															emergencyContactRelation: value,
														})
													}
												>
													<SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
														<SelectValue placeholder="Select relationship" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="parent">Parent</SelectItem>
														<SelectItem value="sibling">Sibling</SelectItem>
														<SelectItem value="spouse">Spouse</SelectItem>
														<SelectItem value="friend">Friend</SelectItem>
														<SelectItem value="other">Other</SelectItem>
													</SelectContent>
												</Select>
											</div>
										</div>

										<div className="space-y-2">
											<Label
												htmlFor="additionalRequests"
												className="text-sm font-semibold text-gray-700"
											>
												Additional Requests or Comments
											</Label>
											<Textarea
												id="additionalRequests"
												placeholder="Any special requests, questions, or additional information..."
												className="min-h-20 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
												value={formData.additionalRequests}
												onChange={(e) =>
													setFormData({
														...formData,
														additionalRequests: e.target.value,
													})
												}
											/>
										</div>

										<div className="space-y-4">
											<div className="flex items-start space-x-3">
												<Checkbox
													id="agreeToTerms"
													checked={formData.agreeToTerms}
													onCheckedChange={(checked) =>
														setFormData({
															...formData,
															agreeToTerms: checked as boolean,
														})
													}
													className="mt-1"
												/>
												<Label
													htmlFor="agreeToTerms"
													className="text-sm text-gray-700 cursor-pointer leading-relaxed"
												>
													I agree to the lease terms and conditions, including the
													monthly rent of {data.property.monthlyRent.toLocaleString()}{" "}
													ETB and security deposit of{" "}
													{data.property.deposit.toLocaleString()} ETB.
												</Label>
											</div>

											<div className="flex items-start space-x-3">
												<Checkbox
													id="agreeToBackgroundCheck"
													checked={formData.agreeToBackgroundCheck}
													onCheckedChange={(checked) =>
														setFormData({
															...formData,
															agreeToBackgroundCheck: checked as boolean,
														})
													}
													className="mt-1"
												/>
												<Label
													htmlFor="agreeToBackgroundCheck"
													className="text-sm text-gray-700 cursor-pointer leading-relaxed"
												>
													I consent to background verification and reference checks.
												</Label>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Sidebar */}
						<div className="xl:col-span-1 space-y-8">
							{/* Application Summary */}
							<div
								className="animate-in fade-in slide-in-from-right-4 duration-700 delay-600"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm sticky top-8">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Application Summary
										</CardTitle>
										<CardDescription>
											Review your rental application
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
											<h4 className="font-semibold text-blue-800 mb-3">
												Property Details
											</h4>
											<div className="space-y-2 text-sm">
												<div className="flex justify-between">
													<span className="text-blue-700">Property:</span>
													<span className="text-blue-600 font-medium">
														{data.property.name}
													</span>
												</div>
												<div className="flex justify-between">
													<span className="text-blue-700">Area:</span>
													<span className="text-blue-600 font-medium">
														{data.property.area}
													</span>
												</div>
												<div className="flex justify-between">
													<span className="text-blue-700">Available From:</span>
													<span className="text-blue-600 font-medium">
														{new Date(
															data.property.availableFrom
														).toLocaleDateString()}
													</span>
												</div>
											</div>
										</div>

										<div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
											<h4 className="font-semibold text-emerald-800 mb-3">
												Financial Summary
											</h4>
											<div className="space-y-2 text-sm">
												<div className="flex justify-between">
													<span className="text-emerald-700">
														Monthly Rent:
													</span>
													<span className="text-emerald-600 font-medium">
														{data.property.monthlyRent.toLocaleString()} ETB
													</span>
												</div>
												<div className="flex justify-between">
													<span className="text-emerald-700">
														Security Deposit:
													</span>
													<span className="text-emerald-600 font-medium">
														{data.property.deposit.toLocaleString()} ETB
													</span>
												</div>
												<div className="border-t border-emerald-200 pt-2 mt-2">
													<div className="flex justify-between">
														<span className="text-emerald-700 font-semibold">
															Total Upfront:
														</span>
														<span className="text-emerald-600 font-bold text-lg">
															{totalUpfront.toLocaleString()} ETB
														</span>
													</div>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>
					</div>

					{/* Submit Button */}
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1200"
						style={{ animationFillMode: "forwards" }}
					>
						<div className="flex justify-end space-x-4 mt-8">
							<Button
								type="button"
								variant="outline"
								asChild
								className="border-gray-300 hover:bg-gray-50"
							>
								<Link href={`/dashboard/tenant/properties/${params.id}`}>
									Cancel
								</Link>
							</Button>
							<Button
								type="submit"
								className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
								disabled={isLoading}
							>
								{isLoading ? (
									<div className="flex items-center space-x-3">
										<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
										<span>Submitting Application...</span>
									</div>
								) : (
									<div className="flex items-center space-x-3">
										<Save className="h-5 w-5" />
										<span>Submit Rental Application</span>
									</div>
								)}
							</Button>
						</div>
					</div>
				</form>
			</div>
		</DashboardLayout>
	);
}