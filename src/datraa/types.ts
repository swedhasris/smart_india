export interface UserProfile {
  uid: string;
  name: string;
  photo: string;
  aadhaar: string;
  dob: string;
  gender: "Male" | "Female" | "Other";
  bloodGroup: string;
  phone: string;
  email: string;
  address: string;
  role: "citizen" | "admin";
  is_verified?: boolean;
}

export interface Document {
  id?: string;
  uid: string;
  type: "Aadhaar" | "PAN" | "Passport" | "Driving License" | "Voter ID" | "Birth Certificate" | "Ration Card";
  docNumber: string;
  fileUrl: string;
  fileName: string;
  uploadedAt: string;
  status?: "Verified" | "Pending" | "Missing";
  isBlockchainVerified?: boolean;
}

export interface Education {
  id?: string;
  uid: string;
  level: "10th" | "12th" | "Degree";
  institution: string;
  year: number;
  marks: Record<string, number>;
  cgpa?: number;
  subjects: string[];
}

export interface Employment {
  id?: string;
  uid: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  salary: number;
  isCurrent: boolean;
}

export interface TaxRecord {
  id?: string;
  uid: string;
  type: "Income" | "Property" | "Vehicle" | "Utility";
  amount: number;
  status: "Paid" | "Pending";
  year: number;
  details: string;
}

export interface UtilityBill {
  id?: string;
  uid: string;
  type: "Electricity" | "Water" | "Gas";
  billNumber: string;
  amount: number;
  dueDate: string;
  status: "Paid" | "Unpaid";
}

export interface Loan {
  id?: string;
  uid: string;
  type: "Education" | "Gold" | "Land";
  amount: number;
  emi: number;
  balance: number;
  bank: string;
}

export interface Ration {
  id?: string;
  uid: string;
  members: string[];
  purchaseHistory: any[];
  storeDetails: string;
}

export interface AuditLog {
  id?: string;
  uid: string;
  action: string;
  timestamp: string;
  hash: string;
  previousHash: string;
}
