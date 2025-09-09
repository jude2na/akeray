// Enhanced Invoice Generation utility
export interface InvoiceData {
	id: string;
	invoiceNumber: string;
	type: "rental" | "sale";
	property: {
		name: string;
		address: string;
	};
	unit?: {
		name: string;
	};
	tenant: {
		name: string;
		phone: string;
		email: string;
		address: string;
	};
	owner: {
		businessName: string;
		name: string;
		tinNumber: string;
		phone: string;
		email: string;
		address: string;
		bankName?: string;
		bankAccount?: string;
		vatNumber?: string;
	};
	amount: number;
	vatAmount: number;
	total: number;
	date: string;
	dueDate: string;
	status: string;
	month?: string;
	paymentInstructions?: string[];
	terms?: string;
	footer?: string;
}

export const generateInvoicePDF = (invoice: InvoiceData): string => {
	const pdfContent = `
AKERAY PROPERTY MANAGEMENT SYSTEM
OFFICIAL INVOICE

Invoice Number: ${invoice.invoiceNumber}
Date: ${new Date(invoice.date).toLocaleDateString()}
Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}
Type: ${invoice.type === "rental" ? "Rental Invoice" : "Purchase Invoice"}

FROM:
${invoice.owner.businessName}
${invoice.owner.name}
TIN: ${invoice.owner.tinNumber}
${invoice.owner.vatNumber ? `VAT: ${invoice.owner.vatNumber}` : ""}
Address: ${invoice.owner.address}
Phone: ${invoice.owner.phone}
Email: ${invoice.owner.email}

TO:
${invoice.tenant.name}
${invoice.type === "rental" ? "Tenant" : "Buyer"}
Phone: ${invoice.tenant.phone}
Email: ${invoice.tenant.email}
Address: ${invoice.tenant.address}

PROPERTY INFORMATION:
Property: ${invoice.property.name}
${invoice.unit ? `Unit: ${invoice.unit.name}` : "Entire Property"}
Address: ${invoice.property.address}
${invoice.month ? `Billing Period: ${invoice.month}` : ""}

INVOICE DETAILS:
Description: ${invoice.type === "rental" ? "Monthly Rent" : "Property Purchase"}
Amount: ${invoice.amount.toLocaleString()} ETB
VAT (15%): ${invoice.vatAmount.toLocaleString()} ETB
TOTAL AMOUNT: ${invoice.total.toLocaleString()} ETB

PAYMENT INSTRUCTIONS:
${invoice.paymentInstructions ? invoice.paymentInstructions.join('\n') : `
- Bank Transfer: ${invoice.owner.bankName || "Contact owner for bank details"}
- Account: ${invoice.owner.bankAccount || "Contact owner for account number"}
- Mobile Money: ${invoice.owner.phone}
- Reference: ${invoice.invoiceNumber}
`}

TERMS & CONDITIONS:
${invoice.terms || "Payment due within 30 days. Late payment fees may apply."}

${invoice.footer || "Thank you for your business."}

Generated on: ${new Date().toLocaleDateString()}
Akeray Property Management System
	`.trim();

	return pdfContent;
};

export const downloadInvoicePDF = (invoice: InvoiceData) => {
	const content = generateInvoicePDF(invoice);
	const blob = new Blob([content], { type: "application/pdf" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `invoice-${invoice.invoiceNumber}-${invoice.property.name.replace(
		/\s+/g,
		"-"
	)}.pdf`;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
};

export const generateInvoiceHTML = (invoice: InvoiceData): string => {
	return `
		<html>
			<head>
				<title>Invoice ${invoice.invoiceNumber}</title>
				<style>
					body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
					.header { background: linear-gradient(135deg, #059669, #3B82F6); color: white; padding: 30px; margin: -20px -20px 30px -20px; text-align: center; }
					.invoice-info { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin: 30px 0; }
					.invoice-table { width: 100%; border-collapse: collapse; margin: 30px 0; }
					.invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 15px; }
					.invoice-table th { background: #f8f9fa; font-weight: bold; }
					.total-row { background: #f0f9ff; font-weight: bold; font-size: 18px; }
					.footer { margin-top: 40px; padding: 20px; background: #f8f9fa; border-radius: 8px; }
					.amount { color: #059669; }
					.logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
					.status-badge { padding: 5px 10px; border-radius: 5px; font-weight: bold; }
					.status-paid { background: #d1fae5; color: #065f46; }
					.status-pending { background: #fef3c7; color: #92400e; }
				</style>
			</head>
			<body>
				<div class="header">
					<div class="logo">AKERAY PROPERTY MANAGEMENT SYSTEM</div>
					<h1>OFFICIAL INVOICE</h1>
					<p>Professional Property Management Services</p>
				</div>
				
				<div class="invoice-info">
					<div>
						<h3>From:</h3>
						<p><strong>${invoice.owner.businessName}</strong></p>
						<p>${invoice.owner.name}</p>
						<p>TIN: ${invoice.owner.tinNumber}</p>
						${invoice.owner.vatNumber ? `<p>VAT: ${invoice.owner.vatNumber}</p>` : ""}
						<p>Address: ${invoice.owner.address}</p>
						<p>Phone: ${invoice.owner.phone}</p>
						<p>Email: ${invoice.owner.email}</p>
					</div>
					<div>
						<h3>Invoice Information:</h3>
						<p><strong>Invoice #:</strong> ${invoice.invoiceNumber}</p>
						<p><strong>Date:</strong> ${new Date(invoice.date).toLocaleDateString()}</p>
						<p><strong>Due Date:</strong> ${new Date(invoice.dueDate).toLocaleDateString()}</p>
						<p><strong>Type:</strong> ${invoice.type === "rental" ? "Rental Invoice" : "Purchase Invoice"}</p>
						<p><strong>Status:</strong> <span class="status-badge status-${invoice.status}">${invoice.status.toUpperCase()}</span></p>
					</div>
				</div>
				
				<div>
					<h3>To:</h3>
					<p><strong>${invoice.tenant.name}</strong></p>
					<p>${invoice.type === "rental" ? "Tenant" : "Buyer"}</p>
					<p>Phone: ${invoice.tenant.phone}</p>
					<p>Email: ${invoice.tenant.email}</p>
					<p>Address: ${invoice.tenant.address}</p>
				</div>
				
				<div style="margin: 30px 0;">
					<h3>Property Information:</h3>
					<p><strong>Property:</strong> ${invoice.property.name}</p>
					${invoice.unit ? `<p><strong>Unit:</strong> ${invoice.unit.name}</p>` : ""}
					<p><strong>Address:</strong> ${invoice.property.address}</p>
					${invoice.month ? `<p><strong>Billing Period:</strong> ${invoice.month}</p>` : ""}
				</div>
				
				<table class="invoice-table">
					<thead>
						<tr>
							<th>Description</th>
							<th style="text-align: center;">Quantity</th>
							<th style="text-align: right;">Unit Price (ETB)</th>
							<th style="text-align: right;">Amount (ETB)</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>${invoice.type === "rental" ? "Monthly Rent" : "Property Purchase"}</td>
							<td style="text-align: center;">1</td>
							<td style="text-align: right;">${invoice.amount.toLocaleString()}</td>
							<td style="text-align: right;">${invoice.amount.toLocaleString()}</td>
						</tr>
						<tr>
							<td>VAT (15%)</td>
							<td style="text-align: center;">-</td>
							<td style="text-align: right;">-</td>
							<td style="text-align: right;">${invoice.vatAmount.toLocaleString()}</td>
						</tr>
						<tr class="total-row">
							<td colspan="3"><strong>TOTAL AMOUNT</strong></td>
							<td style="text-align: right;" class="amount"><strong>${invoice.total.toLocaleString()}</strong></td>
						</tr>
					</tbody>
				</table>
				
				<div class="footer">
					<h4>Payment Instructions:</h4>
					${invoice.paymentInstructions ? invoice.paymentInstructions.map(instruction => `<p>• ${instruction}</p>`).join('') : `
						<p>• Bank Transfer: ${invoice.owner.bankName || "Contact for bank details"}</p>
						<p>• Account: ${invoice.owner.bankAccount || "Contact for account number"}</p>
						<p>• Mobile Money: ${invoice.owner.phone}</p>
						<p>• Reference: ${invoice.invoiceNumber}</p>
					`}
					
					${invoice.terms ? `
						<div style="margin-top: 20px;">
							<h4>Terms & Conditions:</h4>
							<p style="font-size: 12px;">${invoice.terms}</p>
						</div>
					` : ""}
					
					<div style="margin-top: 30px; text-align: center; font-size: 12px; color: #666;">
						${invoice.footer ? `<p>${invoice.footer}</p>` : ""}
						<p>Generated on: ${new Date().toLocaleDateString()}</p>
						<p>Akeray Property Management System | Professional Property Services</p>
						<p>For support: support@akeray.et | +251-911-654321</p>
					</div>
				</div>
			</body>
		</html>
	`;
};

export const printInvoice = (invoice: InvoiceData) => {
	const printContent = generateInvoiceHTML(invoice);
	const printWindow = window.open("", "_blank");
	if (printWindow) {
		printWindow.document.write(printContent);
		printWindow.document.close();
		printWindow.print();
	}
};

// Auto-generate invoice after payment confirmation
export const autoGenerateInvoice = (
	leaseData: any,
	paymentData: any,
	ownerBusinessData: any
): InvoiceData => {
	const invoiceNumber = `INV-${leaseData.type === "rental" ? "R" : "S"}-${Date.now().toString().slice(-6)}`;
	const vatRate = 0.15;
	const vatAmount = Math.round(paymentData.amount * vatRate);
	const total = paymentData.amount + vatAmount;

	return {
		id: `invoice-${Date.now()}`,
		invoiceNumber,
		type: leaseData.type,
		property: {
			name: leaseData.property.name,
			address: leaseData.property.address,
		},
		unit: leaseData.unit,
		tenant: {
			name: leaseData.tenant.name,
			phone: leaseData.tenant.phone,
			email: leaseData.tenant.email,
			address: leaseData.tenant.address || "Addis Ababa, Ethiopia",
		},
		owner: ownerBusinessData,
		amount: paymentData.amount,
		vatAmount,
		total,
		date: new Date().toISOString().split('T')[0],
		dueDate: leaseData.type === "rental" 
			? new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0]
			: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0],
		status: "generated",
		month: leaseData.type === "rental" ? new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : undefined,
		paymentInstructions: [
			`Bank Transfer: ${ownerBusinessData.bankName || "Contact owner for bank details"}`,
			`Account: ${ownerBusinessData.bankAccount || "Contact owner for account number"}`,
			`Mobile Money: ${ownerBusinessData.phone}`,
			`Reference: ${invoiceNumber}`,
			`Late fee of ${ownerBusinessData.lateFeeAmount || 500} ETB applies after ${ownerBusinessData.lateFeeDays || 5} days`,
		],
		terms: ownerBusinessData.invoiceTerms,
		footer: ownerBusinessData.invoiceFooter,
	};
};

// Send invoice via SMS/Email
export const sendInvoiceNotification = async (invoice: InvoiceData, method: "sms" | "email" | "both") => {
	const message = `
New Invoice Generated!

Invoice: ${invoice.invoiceNumber}
Property: ${invoice.property.name}${invoice.unit ? ` - ${invoice.unit.name}` : ""}
Amount: ${invoice.total.toLocaleString()} ETB
Due: ${new Date(invoice.dueDate).toLocaleDateString()}

View in your Akeray dashboard: Invoices section
Payment: ${invoice.owner.phone} (Mobile Money) or Bank Transfer

Akeray Properties
	`.trim();

	// In a real implementation, this would integrate with Geez SMS API and email service
	console.log(`Sending invoice notification via ${method}:`, message);
	
	// Simulate API call
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({ success: true, message: "Invoice notification sent successfully" });
		}, 1000);
	});
};

export const scheduleRecurringInvoices = (leaseData: any, ownerBusinessData: any) => {
	// In a real implementation, this would set up recurring invoice generation
	// for rental properties on a monthly basis
	console.log("Scheduling recurring invoices for lease:", leaseData.id);
	
	// This would typically integrate with a job scheduler or cron service
	// to automatically generate and send monthly rental invoices
};