import { DEPT_LOGOS_MAP } from './deptLogos';

// Government Ecosystem Seed Data for Enterprise RBAC Portal

export const USER_ROLES = {
  ULTRA_SUPER_ADMIN: 'ULTRA_SUPER_ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  AGENT: 'AGENT',
  CITIZEN: 'CITIZEN',
};

export const DEMO_USERS = [
  {
    id: 'USR-ULTRA-001',
    name: 'Dr. Vikramaditya Verma, IAS',
    email: 'ultra@gov.in',
    phone: '+91 98100 11001',
    role: USER_ROLES.ULTRA_SUPER_ADMIN,
    title: 'Principal Secretary & Chief Digital Officer',
    department: 'National E-Governance Division (NeGD)',
    departmentId: 'negd',
    state: 'National / All States',
    district: 'New Delhi HQ',
    office: 'Cabinet Secretariat, New Delhi',
    status: 'active',
    avatar: '👨‍💼',
    lastLogin: 'Today at 09:15 AM',
    password: 'ultra123'
  },
  {
    id: 'USR-SUPER-001',
    name: 'Smt. Ananya Sundaram, IAS',
    email: 'superadmin@gov.in',
    phone: '+91 98400 22002',
    role: USER_ROLES.SUPER_ADMIN,
    title: 'State Commissioner & Regional Administrator',
    department: 'Revenue & Public Grievances Administration',
    departmentId: 'revenue',
    state: 'Tamil Nadu',
    district: 'All Districts',
    office: 'State Secretariat, Fort St. George, Chennai',
    status: 'active',
    avatar: '👩‍💼',
    lastLogin: 'Today at 09:40 AM',
    password: 'super123'
  },
  {
    id: 'USR-ADMIN-001',
    name: 'K. R. Narayanan, DRO',
    email: 'admin@gov.in',
    phone: '+91 98410 33003',
    role: USER_ROLES.ADMIN,
    title: 'District Revenue Officer (DRO)',
    department: 'Revenue Department',
    departmentId: 'revenue',
    state: 'Tamil Nadu',
    district: 'Chennai District',
    office: 'District Collectorate, Rajaji Salai, Chennai',
    status: 'active',
    avatar: '👨‍⚖️',
    lastLogin: 'Today at 10:05 AM',
    password: 'admin123'
  },
  {
    id: 'USR-AGENT-001',
    name: 'Priya Ramachandran, VAO',
    email: 'agent@gov.in',
    phone: '+91 98420 44004',
    role: USER_ROLES.AGENT,
    title: 'Village Administrative Officer & Verification Agent',
    department: 'Revenue Department',
    departmentId: 'revenue',
    state: 'Tamil Nadu',
    district: 'Chennai District',
    office: 'Taluk Office, Mylapore, Chennai',
    status: 'active',
    avatar: '👩‍💻',
    workload: 4,
    avgProcessingHours: '4.2 hrs',
    isAvailable: true,
    lastLogin: 'Today at 10:15 AM',
    password: 'agent123'
  },
  {
    id: 'USR-CITIZEN-001',
    name: 'Rajesh Sharma',
    email: 'citizen@gov.in',
    phone: '+91 98765 43210',
    role: USER_ROLES.CITIZEN,
    title: 'Citizen',
    state: 'Tamil Nadu',
    district: 'Chennai',
    office: 'Mylapore Zone',
    aadhaar: 'XXXX-XXXX-8921',
    status: 'active',
    avatar: '👤',
    lastLogin: 'Just now',
    password: 'citizen123'
  }
];

export const OTHER_AGENTS = [
  {
    id: 'USR-AGENT-002',
    name: 'Suresh Kumar, Revenue Inspector',
    email: 'suresh.ki@gov.in',
    phone: '+91 98420 44005',
    role: USER_ROLES.AGENT,
    department: 'Revenue Department',
    departmentId: 'revenue',
    district: 'Chennai District',
    office: 'Taluk Office, Guindy, Chennai',
    status: 'active',
    workload: 8,
    avgProcessingHours: '6.1 hrs',
    isAvailable: true,
  },
  {
    id: 'USR-AGENT-003',
    name: 'Meenakshi Iyer, Junior Assistant',
    email: 'meenakshi.i@gov.in',
    phone: '+91 98420 44006',
    role: USER_ROLES.AGENT,
    department: 'Revenue Department',
    departmentId: 'revenue',
    district: 'Chennai District',
    office: 'Taluk Office, T. Nagar, Chennai',
    status: 'active',
    workload: 2,
    avgProcessingHours: '3.5 hrs',
    isAvailable: true,
  },
  {
    id: 'USR-AGENT-004',
    name: 'M. Vijay Anand, Verification Officer',
    email: 'vijay.anand@gov.in',
    phone: '+91 98420 44007',
    role: USER_ROLES.AGENT,
    department: 'Housing Department',
    departmentId: 'housing',
    district: 'Chennai District',
    office: 'TNHB Head Office, Nandanam',
    status: 'active',
    workload: 5,
    avgProcessingHours: '5.0 hrs',
    isAvailable: true,
  }
];

export const STATES_DATA = [
  { id: 'tn', name: 'Tamil Nadu', code: 'TN', districtCount: 38, superAdmin: 'Smt. Ananya Sundaram, IAS', activeOffices: 412, population: '7.6 Crores', status: 'active' },
  { id: 'kl', name: 'Kerala', code: 'KL', districtCount: 14, superAdmin: 'Shri. K. R. Ramesh, IAS', activeOffices: 180, population: '3.5 Crores', status: 'active' },
  { id: 'ka', name: 'Karnataka', code: 'KA', districtCount: 31, superAdmin: 'Shri. B. S. Patil, IAS', activeOffices: 350, population: '6.8 Crores', status: 'active' },
  { id: 'mh', name: 'Maharashtra', code: 'MH', districtCount: 36, superAdmin: 'Dr. Nitin Gadkari, IAS', activeOffices: 480, population: '12.3 Crores', status: 'active' },
  { id: 'dl', name: 'Delhi NCR', code: 'DL', districtCount: 11, superAdmin: 'Smt. Radhika Roy, IAS', activeOffices: 120, population: '2.0 Crores', status: 'active' }
];

export const DISTRICTS_DATA = [
  { id: 'chennai', name: 'Chennai', stateId: 'tn', admin: 'K. R. Narayanan, DRO', activeOffices: 45, population: '71 Lakhs', performance: 94, status: 'active' },
  { id: 'coimbatore', name: 'Coimbatore', stateId: 'tn', admin: 'M. S. Karthik, DRO', activeOffices: 32, population: '34 Lakhs', performance: 92, status: 'active' },
  { id: 'madurai', name: 'Madurai', stateId: 'tn', admin: 'S. Alagarsamy, DRO', activeOffices: 28, population: '30 Lakhs', performance: 89, status: 'active' },
  { id: 'tiruvananthapuram', name: 'Thiruvananthapuram', stateId: 'kl', admin: 'P. V. Nair, DRO', activeOffices: 22, population: '33 Lakhs', performance: 91, status: 'active' },
  { id: 'bengaluru', name: 'Bengaluru Urban', stateId: 'ka', admin: 'R. K. Rao, DRO', activeOffices: 52, population: '1.2 Crores', performance: 95, status: 'active' }
];

export const OFFICES_DATA = [
  { id: 'off-chn-01', name: 'District Collectorate Office', districtId: 'chennai', districtName: 'Chennai', stateId: 'tn', departmentId: 'revenue', departmentName: 'Revenue Department', admin: 'K. R. Narayanan, DRO', agentCount: 24, applicationCount: 1420, performance: 94, status: 'active', address: 'Rajaji Salai, Chennai 600001' },
  { id: 'off-chn-02', name: 'Taluk Office - Mylapore', districtId: 'chennai', districtName: 'Chennai', stateId: 'tn', departmentId: 'revenue', departmentName: 'Revenue Department', admin: 'R. Vasanth, Tahsildar', agentCount: 8, applicationCount: 680, performance: 91, status: 'active', address: 'Kutchery Road, Mylapore, Chennai 600004' },
  { id: 'off-chn-03', name: 'Greater Chennai Police Commissionerate', districtId: 'chennai', districtName: 'Chennai', stateId: 'tn', departmentId: 'police', departmentName: 'Police Department', admin: 'J. Sandeep, IPS', agentCount: 45, applicationCount: 2150, performance: 88, status: 'active', address: 'Vepery High Road, Chennai 600007' },
  { id: 'off-chn-04', name: 'TNHB Regional Office', districtId: 'chennai', districtName: 'Chennai', stateId: 'tn', departmentId: 'housing', departmentName: 'Housing Department', admin: 'G. Mohan, Ex. Engineer', agentCount: 12, applicationCount: 890, performance: 86, status: 'active', address: 'Anna Salai, Nandanam, Chennai 600035' },
  { id: 'off-chn-05', name: 'Civil Supplies District Office', districtId: 'chennai', districtName: 'Chennai', stateId: 'tn', departmentId: 'food', departmentName: 'Food & Civil Supplies', admin: 'T. Revathi, DSO', agentCount: 16, applicationCount: 1120, performance: 90, status: 'active', address: 'Chepauk, Chennai 600005' },
];

// All 35 Government Departments
export const DEPARTMENTS = [
  {
    id: 'revenue',
    name: 'Revenue Department',
    description: 'Land records, Patta transfer, income, community, nativity and legal heir certificates',
    icon: 'revenue',
    logo: DEPT_LOGOS_MAP.revenue.url,
    serviceCount: 15,
    performanceScore: 94,
    color: '#8b5cf6',
    services: [
      { id: 'income-cert', name: 'Income Certificate', time: '3-5 Days', fee: '₹60', online: true },
      { id: 'community-cert', name: 'Community Certificate', time: '7 Days', fee: '₹60', online: true },
      { id: 'nativity-cert', name: 'Nativity Certificate', time: '5 Days', fee: '₹60', online: true },
      { id: 'residence-cert', name: 'Residence Certificate', time: '3 Days', fee: '₹60', online: true },
      { id: 'legal-heir', name: 'Legal Heir Certificate', time: '15 Days', fee: '₹100', online: true },
      { id: 'patta-transfer', name: 'Patta Transfer (Mutation)', time: '15 Days', fee: '₹100', online: true },
      { id: 'land-records', name: 'View & Download Land Records', time: 'Instant', fee: '₹0', online: true },
      { id: 'land-survey', name: 'Land Sub-Division & Survey', time: '30 Days', fee: '₹400', online: true },
      { id: 'solvency-cert', name: 'Solvency Certificate', time: '10 Days', fee: '₹120', online: true },
      { id: 'crop-relief', name: 'Crop Damage Relief Claim', time: '20 Days', fee: '₹0', online: true },
      { id: 'gov-land-extract', name: 'Government Land Extract', time: 'Instant', fee: '₹50', online: true },
      { id: 'encroachment-complaint', name: 'Encroachment Complaint', time: '7 Days', fee: '₹0', online: true }
    ]
  },
  {
    id: 'police',
    name: 'Police Department',
    description: 'FIR registration, verification, lost documents, cybercrime and character certificate',
    icon: 'police',
    logo: DEPT_LOGOS_MAP.police.url,
    serviceCount: 8,
    performanceScore: 88,
    color: '#3b82f6',
    services: [
      { id: 'police-fir', name: 'Online FIR / Complaint Filing', time: 'Instant', fee: '₹0', online: true },
      { id: 'lost-doc-report', name: 'Lost Document / Mobile Report', time: 'Instant', fee: '₹0', online: true },
      { id: 'police-verification', name: 'Police Verification Certificate (PCC)', time: '10 Days', fee: '₹500', online: true },
      { id: 'passport-verification', name: 'Passport Police Verification Status', time: '7 Days', fee: '₹0', online: true },
      { id: 'cybercrime-complaint', name: 'Cyber Crime Reporting Portal', time: '24 Hours', fee: '₹0', online: true },
      { id: 'missing-person-report', name: 'Missing Person Report', time: 'Instant', fee: '₹0', online: true }
    ]
  },
  {
    id: 'education',
    name: 'Education Department',
    description: 'School admissions, scholarships, exam services, certificates and welfare grants',
    icon: 'education',
    logo: DEPT_LOGOS_MAP.education.url,
    serviceCount: 12,
    performanceScore: 91,
    color: '#10b981',
    services: [
      { id: 'post-matric-scholarship', name: 'Post-Matric Scholarship', time: '30 Days', fee: '₹0', online: true },
      { id: 'rte-admission', name: 'RTE 25% School Admission Portal', time: '15 Days', fee: '₹0', online: true },
      { id: 'duplicate-marksheet', name: 'Duplicate Marksheet Issuance', time: '10 Days', fee: '₹150', online: true },
      { id: 'migration-cert', name: 'Migration Certificate', time: '5 Days', fee: '₹100', online: true }
    ]
  },
  {
    id: 'health',
    name: 'Health Department',
    description: 'Hospital booking, birth/death certificates, health schemes and vaccination records',
    icon: 'health',
    logo: DEPT_LOGOS_MAP.health.url,
    serviceCount: 10,
    performanceScore: 89,
    color: '#ef4444',
    services: [
      { id: 'birth-cert', name: 'Birth Certificate Download & Correction', time: '3 Days', fee: '₹50', online: true },
      { id: 'death-cert', name: 'Death Certificate Download', time: '3 Days', fee: '₹50', online: true },
      { id: 'health-insurance', name: 'Chief Minister Comprehensive Health Insurance', time: '7 Days', fee: '₹0', online: true }
    ]
  },
  {
    id: 'housing',
    name: 'Housing Department',
    description: 'Affordable housing schemes, TNHB flat allotment, ownership transfer and approvals',
    icon: 'housing',
    logo: DEPT_LOGOS_MAP.housing.url,
    serviceCount: 9,
    performanceScore: 86,
    color: '#f59e0b',
    services: [
      { id: 'pmay-housing', name: 'PMAY Affordable Housing Scheme Application', time: '30 Days', fee: '₹100', online: true },
      { id: 'tnhb-flat', name: 'TNHB Housing Allotment Application', time: '45 Days', fee: '₹500', online: true },
      { id: 'housing-noc', name: 'Housing Board NOC Issuance', time: '15 Days', fee: '₹250', online: true }
    ]
  },
  {
    id: 'food',
    name: 'Food & Civil Supplies',
    description: 'Smart ration card, member addition, address change and fair price shop services',
    icon: 'food-supplies',
    logo: DEPT_LOGOS_MAP["food-supplies"].url,
    serviceCount: 8,
    performanceScore: 92,
    color: '#06b6d4',
    services: [
      { id: 'new-ration-card', name: 'New Smart Family Ration Card', time: '15 Days', fee: '₹20', online: true },
      { id: 'ration-member-add', name: 'Add Family Member to Ration Card', time: '7 Days', fee: '₹0', online: true },
      { id: 'ration-address-change', name: 'Ration Card Address Change', time: '5 Days', fee: '₹0', online: true }
    ]
  },
  {
    id: 'transport',
    name: 'Transport Department',
    description: 'Driving licence, vehicle registration, road tax payment, permit and fitness',
    icon: 'transport',
    logo: DEPT_LOGOS_MAP.transport.url,
    serviceCount: 14,
    performanceScore: 90,
    color: '#6366f1',
    services: [
      { id: 'learner-licence', name: 'Learner Licence (LLR) Online Test', time: 'Instant', fee: '₹200', online: true },
      { id: 'driving-licence', name: 'Permanent Driving Licence Slot Booking', time: '7 Days', fee: '₹800', online: true },
      { id: 'rc-transfer', name: 'Vehicle Ownership Transfer (RC)', time: '15 Days', fee: '₹500', online: true }
    ]
  },
  {
    id: 'finance',
    name: 'Finance Department',
    description: 'Treasury pensions, GPF portal, e-stamps, payment gateway and subsidies',
    icon: 'finance',
    logo: DEPT_LOGOS_MAP.finance.url,
    serviceCount: 7,
    performanceScore: 95,
    color: '#14b8a6',
    services: [
      { id: 'e-stamp-purchase', name: 'Online E-Stamp Paper Generation', time: 'Instant', fee: 'Variable', online: true },
      { id: 'pension-life-cert', name: 'Digital Life Certificate (Jeevan Pramaan)', time: 'Instant', fee: '₹0', online: true }
    ]
  },
  {
    id: 'registration',
    name: 'Registration Department',
    description: 'Document registration, marriage registration, encumbrance certificate (EC)',
    icon: 'registration',
    logo: DEPT_LOGOS_MAP.registration.url,
    serviceCount: 8,
    performanceScore: 91,
    color: '#ec4899',
    services: [
      { id: 'encumbrance-cert', name: 'Encumbrance Certificate (EC) Search', time: 'Instant', fee: '₹100', online: true },
      { id: 'marriage-registration', name: 'Marriage Registration Slot Booking', time: '7 Days', fee: '₹200', online: true }
    ]
  },
  { id: 'agriculture', name: 'Agriculture Department', description: 'Farmer schemes, crop insurance, fertilizer subsidy and PM-KISAN', icon: 'agriculture', logo: DEPT_LOGOS_MAP.agriculture.url, serviceCount: 9, performanceScore: 87, color: '#84cc16' },
  { id: 'social_welfare', name: 'Social Welfare Department', description: 'Old age pension, widow pension, disability benefits and marriage assistance', icon: 'social-welfare', logo: DEPT_LOGOS_MAP["social-welfare"].url, serviceCount: 11, performanceScore: 89, color: '#a855f7' },
  { id: 'women_child', name: 'Women & Child Development', description: 'Maternity assistance, girl child scheme and Anganwadi services', icon: 'women-child', logo: DEPT_LOGOS_MAP["women-child"].url, serviceCount: 7, performanceScore: 92, color: '#f43f5e' },
  { id: 'labour', name: 'Labour Department', description: 'Unorganised workers registration, labour welfare fund and claims', icon: 'labour', logo: DEPT_LOGOS_MAP.labour.url, serviceCount: 8, performanceScore: 85, color: '#f97316' },
  { id: 'employment', name: 'Employment & Training', description: 'Employment exchange registration, skill development and jobs', icon: 'employment', logo: DEPT_LOGOS_MAP.employment.url, serviceCount: 6, performanceScore: 86, color: '#38bdf8' },
  { id: 'msme', name: 'MSME & Industries', description: 'Udyam registration, single window industrial clearance and subsidies', icon: 'msme', logo: DEPT_LOGOS_MAP.msme.url, serviceCount: 10, performanceScore: 93, color: '#eab308' },
  { id: 'energy', name: 'Energy / Electricity Board', description: 'New power connection, bill payment, name transfer and solar subsidy', icon: 'energy', logo: DEPT_LOGOS_MAP.energy.url, serviceCount: 8, performanceScore: 94, color: '#facc15' },
  { id: 'water', name: 'Water Resources & Supply', description: 'Water connection, drainage approval and rainwater harvesting compliance', icon: 'water-resources', logo: DEPT_LOGOS_MAP["water-resources"].url, serviceCount: 6, performanceScore: 88, color: '#0ea5e9' },
  { id: 'pwd', name: 'Public Works Department', description: 'Govt contractor registration, building approvals and e-tenders', icon: 'pwd', logo: DEPT_LOGOS_MAP.pwd.url, serviceCount: 7, performanceScore: 87, color: '#64748b' },
  { id: 'rural_dev', name: 'Rural Development', description: 'MGNREGA job card, rural housing and sanitation schemes', icon: 'rural-dev', logo: DEPT_LOGOS_MAP["rural-dev"].url, serviceCount: 8, performanceScore: 89, color: '#16a34a' },
  { id: 'panchayati_raj', name: 'Panchayati Raj Department', description: 'Village panchayat approvals, birth records and trade licenses', icon: 'panchayati-raj', logo: DEPT_LOGOS_MAP["panchayati-raj"].url, serviceCount: 6, performanceScore: 84, color: '#65a30d' },
  { id: 'urban_dev', name: 'Urban Development & Municipal', description: 'Property tax payment, building plan approval and trade licenses', icon: 'urban-dev', logo: DEPT_LOGOS_MAP["urban-dev"].url, serviceCount: 12, performanceScore: 90, color: '#0284c7' },
  { id: 'commercial_taxes', name: 'Commercial Taxes & GST', description: 'State GST assistance, commercial tax clearance and refund tracking', icon: 'commercial-taxes', logo: DEPT_LOGOS_MAP["commercial-taxes"].url, serviceCount: 6, performanceScore: 93, color: '#7c3aed' },
  { id: 'forest', name: 'Forest & Wildlife Department', description: 'Forest transit permit, timber felling permission and eco-tourism', icon: 'forest', logo: DEPT_LOGOS_MAP.forest.url, serviceCount: 5, performanceScore: 86, color: '#15803d' },
  { id: 'environment', name: 'Environment & Pollution Control', description: 'Pollution consent to establish/operate and environmental NOC', icon: 'environment', logo: DEPT_LOGOS_MAP.environment.url, serviceCount: 6, performanceScore: 89, color: '#059669' },
  { id: 'fire', name: 'Fire & Rescue Services', description: 'Fire safety NOC, building inspection and event safety clearance', icon: 'fire-rescue', logo: DEPT_LOGOS_MAP["fire-rescue"].url, serviceCount: 5, performanceScore: 92, color: '#dc2626' },
  { id: 'disaster', name: 'Disaster Management', description: 'Emergency alerts, cyclone relief claims and community rescue portal', icon: 'disaster-mgmt', logo: DEPT_LOGOS_MAP["disaster-mgmt"].url, serviceCount: 4, performanceScore: 96, color: '#b91c1c' },
  { id: 'food_safety', name: 'Food Safety (FSSAI State)', description: 'FSSAI food license, hygiene rating and adulteration complaint', icon: 'food-safety', logo: DEPT_LOGOS_MAP["food-safety"].url, serviceCount: 5, performanceScore: 90, color: '#d97706' },
  { id: 'drug_control', name: 'Drug Control Department', description: 'Pharmacy retail/wholesale license and drug quality verification', icon: 'drug-control', logo: DEPT_LOGOS_MAP["drug-control"].url, serviceCount: 6, performanceScore: 91, color: '#4f46e5' },
  { id: 'animal_husbandry', name: 'Animal Husbandry & Dairy', description: 'Cattle insurance, veterinary hospital appointment and dairy grants', icon: 'animal-husbandry', logo: DEPT_LOGOS_MAP["animal-husbandry"].url, serviceCount: 5, performanceScore: 87, color: '#78716c' },
  { id: 'fisheries', name: 'Fisheries Department', description: 'Boat registration, fisherman identity card and diesel subsidy', icon: 'fisheries', logo: DEPT_LOGOS_MAP.fisheries.url, serviceCount: 6, performanceScore: 85, color: '#0284c7' },
  { id: 'law', name: 'Law & Judiciary Department', description: 'Legal aid services, notary public appointment and court e-services', icon: 'law-dept', logo: DEPT_LOGOS_MAP["law-dept"].url, serviceCount: 5, performanceScore: 88, color: '#475569' },
  { id: 'home', name: 'Home Department', description: 'Arms licence issuance, VIP security protocol and state gazette', icon: 'home-dept', logo: DEPT_LOGOS_MAP["home-dept"].url, serviceCount: 6, performanceScore: 93, color: '#334155' },
  { id: 'prison', name: 'Prison & Correctional Services', description: 'Prisoner e-visit booking, legal counsel interview and welfare', icon: 'prison-dept', logo: DEPT_LOGOS_MAP["prison-dept"].url, serviceCount: 4, performanceScore: 89, color: '#52525b' },
  { id: 'tourism', name: 'Tourism & Culture Department', description: 'Heritage hotel recognition, tourist guide license and cultural grants', icon: 'tourism', logo: DEPT_LOGOS_MAP.tourism.url, serviceCount: 7, performanceScore: 91, color: '#0d9488' },
  { id: 'backward_classes', name: 'Backward Classes & Minority Welfare', description: 'Pre-matric and post-matric minority scholarships and hostel admissions', icon: 'social-welfare', logo: DEPT_LOGOS_MAP["social-welfare"].url, serviceCount: 8, performanceScore: 90, color: '#9333ea' }
];

// Seed Applications for demonstration
export const INITIAL_APPLICATIONS = [
  {
    id: 'GOV-2026-894102',
    citizenId: 'USR-CITIZEN-001',
    citizenName: 'Rajesh Sharma',
    citizenEmail: 'citizen@gov.in',
    serviceId: 'income-cert',
    serviceName: 'Income Certificate',
    departmentId: 'revenue',
    departmentName: 'Revenue Department',
    assignedAgentId: 'USR-AGENT-001',
    assignedAgentName: 'Priya Ramachandran, VAO',
    status: 'approved',
    submittedAt: '2026-08-20 10:30 AM',
    updatedAt: '2026-08-23 04:15 PM',
    certificateId: 'TN-REV-INC-2026-98124',
    remarks: ['Field verification completed on 22-Aug. Family annual income verified as ₹1,80,000/-. Approved.'],
    documents: [
      { id: 'doc-1', name: 'Aadhaar_Card_Proof.pdf', size: '1.2 MB', verified: 'valid' },
      { id: 'doc-2', name: 'Salary_Slip_Form16.pdf', size: '850 KB', verified: 'valid' },
      { id: 'doc-3', name: 'Ration_Card_Family.pdf', size: '1.8 MB', verified: 'valid' }
    ],
    timeline: [
      { step: 1, title: 'Application Submitted Online', status: 'completed', timestamp: '20-Aug 10:30 AM', actor: 'Citizen (Rajesh Sharma)' },
      { step: 2, title: 'Department Received', status: 'completed', timestamp: '20-Aug 11:00 AM', actor: 'Revenue Gateway' },
      { step: 3, title: 'Admin Assigned Agent', status: 'completed', timestamp: '20-Aug 02:15 PM', actor: 'K. R. Narayanan (DRO)' },
      { step: 4, title: 'Agent Verified Documents', status: 'completed', timestamp: '21-Aug 11:30 AM', actor: 'Priya Ramachandran (VAO)' },
      { step: 5, title: 'Agent Added Remarks & Field Report', status: 'completed', timestamp: '22-Aug 03:00 PM', actor: 'Priya Ramachandran (VAO)' },
      { step: 6, title: 'Agent Forwarded with Recommendation', status: 'completed', timestamp: '22-Aug 04:00 PM', actor: 'Priya Ramachandran (VAO)' },
      { step: 7, title: 'Admin Final Review', status: 'completed', timestamp: '23-Aug 02:30 PM', actor: 'K. R. Narayanan (DRO)' },
      { step: 8, title: 'Approved by Competent Authority', status: 'completed', timestamp: '23-Aug 04:15 PM', actor: 'K. R. Narayanan (DRO)' },
      { step: 9, title: 'Digitally Signed Certificate Generated', status: 'completed', timestamp: '23-Aug 04:16 PM', actor: 'Automated Cryptographic Engine' },
      { step: 10, title: 'Citizen Notified via SMS & E-Mail', status: 'completed', timestamp: '23-Aug 04:17 PM', actor: 'SMS Gateway (GOVSMS)' }
    ]
  }
];
