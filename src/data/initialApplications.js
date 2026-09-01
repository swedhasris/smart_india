export const INITIAL_APPLICATIONS = [
  {
    id: "GOV-894210",
    serviceId: "income-cert",
    serviceName: "Income Certificate",
    departmentName: "Revenue Department",
    icon: "💰",
    applicantName: "Rajesh Sharma",
    appliedDate: "2026-08-20",
    status: "Approved",
    currentStep: 4,
    timeline: [
      { status: "Submitted", date: "2026-08-20 10:30 AM", completed: true, note: "Application received and assigned to VAO Office" },
      { status: "Under Verification", date: "2026-08-21 02:15 PM", completed: true, note: "Village Administrative Officer verified income records" },
      { status: "Document Verification", date: "2026-08-22 11:00 AM", completed: true, note: "Aadhaar & Salary certificates verified online" },
      { status: "Officer Review", date: "2026-08-23 04:45 PM", completed: true, note: "Tahsildar approved the certificate issuance" },
      { status: "Approved", date: "2026-08-24 09:00 AM", completed: true, note: "Digital Certificate generated with QR Signature" }
    ],
    certificateUrl: "#"
  },
  {
    id: "GOV-612094",
    serviceId: "driving-licence",
    serviceName: "Driving Licence",
    departmentName: "Transport Department",
    icon: "🪪",
    applicantName: "Rajesh Sharma",
    appliedDate: "2026-08-23",
    status: "Under Verification",
    currentStep: 2,
    timeline: [
      { status: "Submitted", date: "2026-08-23 11:00 AM", completed: true, note: "LLR-88491 verification completed" },
      { status: "Under Verification", date: "2026-08-24 03:20 PM", completed: true, note: "Biometric and physical RTO slot scheduled for 28 Aug" },
      { status: "Officer Review", date: "Pending", completed: false, note: "Awaiting physical driving track evaluation" },
      { status: "Approved", date: "Pending", completed: false, note: "Smartcard dispatch pending" }
    ]
  },
  {
    id: "GOV-430112",
    serviceId: "tnhb-flat",
    serviceName: "Housing Board Flat Scheme",
    departmentName: "Housing Department",
    icon: "🏠",
    applicantName: "Rajesh Sharma",
    appliedDate: "2026-08-24",
    status: "Submitted",
    currentStep: 1,
    timeline: [
      { status: "Submitted", date: "2026-08-24 05:40 PM", completed: true, note: "Application registered under EWS Category" },
      { status: "Inter-Dept Verification", date: "In Progress", completed: false, note: "Cross-verifying income with Revenue & Ration Card with PDS" },
      { status: "Officer Review", date: "Pending", completed: false, note: "Awaiting eligibility clearance for digital lottery" },
      { status: "Approved", date: "Pending", completed: false, note: "Final allotment letter" }
    ]
  }
];
