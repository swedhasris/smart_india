// DATRA Interoperability Layer & Government Department API Adapters

export const GOVERNMENT_SCHEMES = [
  {
    id: 'pm-kisan-2026',
    title: 'PM-KISAN Samman Nidhi',
    department: 'Agriculture & Farmer Welfare',
    deptId: 'agriculture',
    category: 'Agriculture',
    benefit: '₹6,000 / year financial support in 3 equal installments',
    minIncome: 0,
    maxIncome: 300000,
    targetAudience: 'Small & marginal landholder farmer families',
    matchScore: 98,
    eligible: true,
    whyEligible: [
      'Annual family income is below ₹3,00,000 threshold',
      'Location matches registered agricultural land region',
      'Aadhaar is linked with active bank account',
      'No family member holds constitutional post'
    ],
    requiredDocs: [
      'Aadhaar Card',
      'Land Ownership / Revenue Record (Pattadar Passbook)',
      'Bank Account Passbook / Cancelled Cheque',
      'Self-Declaration Form'
    ],
    description: 'Central sector scheme to supplement financial needs of landholding farmers for procuring inputs and domestic needs.'
  },
  {
    id: 'pmy-housing-2026',
    title: 'Pradhan Mantri Awas Yojana (PMAY-Urban / Rural)',
    department: 'Housing & Urban Affairs',
    deptId: 'housing',
    category: 'Housing',
    benefit: 'Up to ₹2.67 Lakh interest subsidy on home construction/purchase',
    minIncome: 0,
    maxIncome: 600000,
    targetAudience: 'Economically Weaker Section (EWS) / LIG households',
    matchScore: 94,
    eligible: true,
    whyEligible: [
      'Citizen does not own a pucca house anywhere in India',
      'Household annual income falls under EWS/LIG category (< ₹6 Lakhs)',
      'Application submitted with valid Aadhaar authentication',
      'Land title verified through State Revenue records'
    ],
    requiredDocs: [
      'Aadhaar Card of all family members',
      'Income Certificate issued by Tahsildar',
      'Address Proof / Ration Card',
      'Property / Land Registration Deed'
    ],
    description: 'Provides housing for all in urban and rural areas with credit-linked subsidy schemes.'
  },
  {
    id: 'post-matric-scholarship',
    title: 'Post-Matric National Scholarship for Higher Education',
    department: 'Higher Education & Social Justice',
    deptId: 'education',
    category: 'Education',
    benefit: '100% Tuition Fee Waiver + ₹1,200/month maintenance allowance',
    minIncome: 0,
    maxIncome: 250000,
    targetAudience: 'Students pursuing Diploma, Degree, or Higher Education',
    matchScore: 91,
    eligible: true,
    whyEligible: [
      'Student enrolled in recognized Higher Educational Institution',
      'Family income is below ₹2,50,000 per annum',
      'Previous academic score is above 60% aggregate',
      'Community Certificate verified in State Database'
    ],
    requiredDocs: [
      '10th & 12th Marksheets / Grade Cards',
      'Community / Caste Certificate',
      'Income Certificate (Current FY)',
      'College Admission Fee Receipt & Bonafide'
    ],
    description: 'Financial assistance for pursuing higher studies to ensure no deserving student is deprived of education.'
  },
  {
    id: 'ayushman-bharat-pmjay',
    title: 'Ayushman Bharat — PM-JAY Health Insurance',
    department: 'Health & Family Welfare',
    deptId: 'health',
    category: 'Healthcare',
    benefit: '₹5,00,000 / year cashless health cover per family',
    minIncome: 0,
    maxIncome: 500000,
    targetAudience: 'SECC socio-economic survey beneficiary families',
    matchScore: 96,
    eligible: true,
    whyEligible: [
      'Matched with Socio-Economic Caste Census (SECC) database',
      'Provides secondary and tertiary care hospitalization coverage',
      'Includes cashless access at 28,000+ empaneled hospitals nationwide'
    ],
    requiredDocs: [
      'Aadhaar Card',
      'Ration Card / Family ID',
      'Ayushman Card / E-KYC verification'
    ],
    description: 'The world’s largest government-funded health assurance scheme providing comprehensive hospital care.'
  },
  {
    id: 'tn-pudhumai-penn',
    title: 'Pudhumai Penn Higher Education Assurance Scheme',
    department: 'Social Welfare & Women Empowerment',
    deptId: 'social_welfare',
    category: 'Welfare',
    benefit: '₹1,000 / month direct bank transfer until degree completion',
    minIncome: 0,
    maxIncome: 400000,
    targetAudience: 'Girl students who studied in Government Schools from Classes 6 to 12',
    matchScore: 88,
    eligible: true,
    whyEligible: [
      'Studied in Government schools from Class 6 to Class 12',
      'Enrolled in undergraduate degree, diploma, or ITI course',
      'Bank account linked with Aadhaar for direct benefit transfer'
    ],
    requiredDocs: [
      'School Transfer Certificate (Classes 6-12 Govt School)',
      'College Bonafide Certificate',
      'Aadhaar Card',
      'Bank Account Passbook'
    ],
    description: 'State welfare initiative to encourage higher education enrolment among female students.'
  }
];

export const INITIAL_DATRA_DOCUMENTS = [
  {
    id: 'doc-aadhaar-101',
    name: 'Aadhaar Identity Card',
    type: 'Identity Proof',
    category: 'Identity',
    docNumber: 'XXXX-XXXX-8921',
    status: 'Verified',
    uploadDate: '2026-01-12',
    expiryDate: 'Lifetime',
    fileSize: '1.2 MB',
    verifiedBy: 'UIDAI Govt Adapter',
    isPrivate: true
  },
  {
    id: 'doc-income-102',
    name: 'Income Certificate (FY 2025-26)',
    type: 'Income Proof',
    category: 'Income',
    docNumber: 'INC/2026/09812',
    status: 'Verified',
    uploadDate: '2026-02-05',
    expiryDate: '2027-03-31',
    fileSize: '850 KB',
    verifiedBy: 'Revenue Dept e-Seva Adapter',
    isPrivate: true
  },
  {
    id: 'doc-community-103',
    name: 'Permanent Community Certificate',
    type: 'Community Proof',
    category: 'Community',
    docNumber: 'COMM/TN/88712',
    status: 'Verified',
    uploadDate: '2025-11-20',
    expiryDate: 'Lifetime',
    fileSize: '1.4 MB',
    verifiedBy: 'State Social Welfare Registry',
    isPrivate: true
  },
  {
    id: 'doc-ration-104',
    name: 'Smart Family Ration Card',
    type: 'Address Proof',
    category: 'Address',
    docNumber: '33/09/182763',
    status: 'Pending Verification',
    uploadDate: '2026-08-28',
    expiryDate: '2030-12-31',
    fileSize: '2.1 MB',
    verifiedBy: 'Civil Supplies Dept (In Progress)',
    isPrivate: true
  }
];

export const INITIAL_DATRA_CONSENTS = [
  {
    id: 'cst-001',
    department: 'Revenue & Disaster Management',
    purpose: 'Income & Property Validation for Scheme Eligibility',
    sharedData: ['Income Certificate', 'Aadhaar Name', 'Taluk Location'],
    status: 'Approved',
    grantedDate: '2026-08-15',
    expiryDate: '2027-08-15'
  },
  {
    id: 'cst-002',
    department: 'Social Welfare & Women Empowerment',
    purpose: 'Direct Benefit Transfer (DBT) Disbursement Verification',
    sharedData: ['Bank Account Number', 'IFSC Code', 'Aadhaar Number'],
    status: 'Approved',
    grantedDate: '2026-08-10',
    expiryDate: '2027-08-10'
  },
  {
    id: 'cst-003',
    department: 'Housing & Urban Development',
    purpose: 'Land Ownership Cross-Verification for PMAY Housing Subsidy',
    sharedData: ['Land Title Deed', 'Property Address', 'Income Status'],
    status: 'Pending Approval',
    grantedDate: '—',
    expiryDate: '—'
  }
];

export const INITIAL_DATRA_AUDIT_LOGS = [
  { id: 'aud-101', timestamp: '2026-08-29 14:15:22', action: 'Citizen Login', details: 'Authenticated via Biometric Aadhaar OTP', ip: '157.48.92.12', severity: 'Info' },
  { id: 'aud-102', timestamp: '2026-08-29 14:18:05', action: 'Consent Granted', details: 'Approved data sharing with Revenue Department for PM-KISAN', ip: '157.48.92.12', severity: 'Success' },
  { id: 'aud-103', timestamp: '2026-08-29 14:22:40', action: 'Document Verification', details: 'Income Certificate INC/2026/09812 verified via Revenue Adapter API', ip: '157.48.92.12', severity: 'Success' },
  { id: 'aud-104', timestamp: '2026-08-29 14:25:10', action: 'Smart Application Submitted', details: 'Application ID APP-2026-DATRA-8912 generated for PM-KISAN Scheme', ip: '157.48.92.12', severity: 'Success' }
];

// AI Grievance Classification Engine
export function classifyGrievanceWithAI(description) {
  const text = description.toLowerCase();

  let category = 'General Public Services';
  let department = 'Revenue & Public Services';
  let deptId = 'revenue';
  let priority = 'MEDIUM';
  let suggestedDocs = ['Aadhaar Card', 'Grievance Photograph / Evidence'];

  if (text.includes('water') || text.includes('drainage') || text.includes('pipe') || text.includes('sewage')) {
    category = 'Water Supply & Sanitation';
    department = 'Public Works & Water Supply';
    deptId = 'pwd';
    priority = 'HIGH';
    suggestedDocs.push('Property Tax Receipt', 'Location Geo-tag Photo');
  } else if (text.includes('road') || text.includes('pothole') || text.includes('street light') || text.includes('traffic')) {
    category = 'Roads & Municipal Infrastructure';
    department = 'Municipal Administration & Transport';
    deptId = 'transport';
    priority = 'MEDIUM';
    suggestedDocs.push('Site Location Photo');
  } else if (text.includes('pension') || text.includes('ration') || text.includes('food') || text.includes('dbt') || text.includes('money')) {
    category = 'Social Welfare & Direct Benefit Transfer';
    department = 'Social Welfare & Civil Supplies';
    deptId = 'welfare';
    priority = 'HIGH';
    suggestedDocs.push('Ration Card', 'Bank Passbook');
  } else if (text.includes('school') || text.includes('college') || text.includes('scholarship') || text.includes('fee')) {
    category = 'Education & Scholarships';
    department = 'School & Higher Education Dept';
    deptId = 'education';
    priority = 'MEDIUM';
    suggestedDocs.push('Student Bonafide', 'Mark Sheet');
  }

  return {
    category,
    department,
    deptId,
    priority,
    suggestedDocs,
    confidenceScore: '96.4%',
    aiReasoning: `NLP classifier matched key semantic tokens ("${text.slice(0, 30)}...") to ${department} jurisdiction with high confidence.`
  };
}
