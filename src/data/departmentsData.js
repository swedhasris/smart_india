import { DEPT_LOGOS_MAP } from './deptLogos';

export const DEPARTMENTS = [
  {
    id: "revenue",
    name: "Revenue Department",
    icon: "revenue",
    logo: DEPT_LOGOS_MAP.revenue.url,
    officialMinistry: DEPT_LOGOS_MAP.revenue.officialMinistry,
    description: "Land records, patta, income & community certificates",
    color: "#6C5CE7",
    services: [
      { id: "land-records", name: "Land Records", icon: "🏞️", desc: "View and extract digital land ownership records" },
      { id: "patta-services", name: "Patta Services", icon: "📜", desc: "Apply for Patta transfer and ownership details" },
      { id: "land-ownership", name: "Land Ownership", icon: "📄", desc: "Verify land title and registered encumbrances" },
      { id: "land-survey", name: "Land Survey", icon: "📍", desc: "Request field measurement and boundary marking" },
      { id: "land-mutation", name: "Land Mutation", icon: "🔄", desc: "Update land revenue records after property transfer" },
      { id: "property-records", name: "Property Records", icon: "🏠", desc: "Access historical property tax and deed records" },
      { id: "income-cert", name: "Income Certificate", icon: "💰", desc: "Official proof of annual household income", featured: true },
      { id: "community-cert", name: "Community Certificate", icon: "👤", desc: "Caste/Community verification certificate" },
      { id: "nativity-cert", name: "Nativity Certificate", icon: "📍", desc: "Proof of birth and native place residence" },
      { id: "residence-cert", name: "Residence Certificate", icon: "🏡", desc: "Official residential status verification" },
      { id: "legal-heir", name: "Legal Heir Certificate", icon: "👨‍👩‍👧", desc: "Establish legal successors of deceased citizen" },
      { id: "solvency-cert", name: "Solvency Certificate", icon: "📑", desc: "Financial solvency verification for tenders/loans" },
      { id: "crop-damage", name: "Crop Damage Relief", icon: "🌾", desc: "Financial compensation claim for farm loss" },
      { id: "disaster-relief", name: "Disaster Relief", icon: "🌊", desc: "Ex-gratia relief for flood or natural disaster" },
      { id: "gov-land", name: "Government Land", icon: "🏛️", desc: "Inquire about government land allotment & leases" },
      { id: "encroachment", name: "Encroachment Complaints", icon: "🚫", desc: "Report illegal occupation on public land" }
    ]
  },
  {
    id: "police",
    name: "Police Department",
    icon: "police",
    logo: DEPT_LOGOS_MAP.police.url,
    officialMinistry: DEPT_LOGOS_MAP.police.officialMinistry,
    description: "FIR filing, police verification, lost reports & emergency",
    color: "#1A237E",
    services: [
      { id: "file-complaint", name: "File Complaint", icon: "📝", desc: "Online police complaint registration" },
      { id: "fir-services", name: "FIR Services", icon: "📋", desc: "Download & track Status of registered FIRs" },
      { id: "lost-docs", name: "Lost Documents Report", icon: "🔍", desc: "Instant lost article report for mobile, passport, certificates" },
      { id: "police-verify", name: "Police Verification Certificate", icon: "👮", desc: "Tenant, employee & background verification" },
      { id: "passport-verify", name: "Passport Verification", icon: "🛂", desc: "Track police verification status for passport" },
      { id: "cyber-complaint", name: "Cybercrime Complaint", icon: "💻", desc: "Report online fraud, phishing & cyber offenses" },
      { id: "missing-person", name: "Missing Person Report", icon: "👤", desc: "Lodge & track missing person report" }
    ]
  },
  {
    id: "education",
    name: "Education Department",
    icon: "education",
    logo: DEPT_LOGOS_MAP.education.url,
    officialMinistry: DEPT_LOGOS_MAP.education.officialMinistry,
    description: "Scholarships, admissions, certificates & teacher services",
    color: "#673AB7",
    services: [
      { id: "scholarships", name: "Scholarship Portal", icon: "🎓", desc: "Apply for pre-matric & post-matric merit scholarships" },
      { id: "student-cert", name: "Student Certificates", icon: "📜", desc: "Duplicate marksheet & transfer certificate requests" },
      { id: "school-admission", name: "RTE School Admission", icon: "🏫", desc: "Apply for 25% free quota under RTE act" },
      { id: "teacher-services", name: "Teacher Transfer & Leaves", icon: "👨‍🏫", desc: "Portal for government school faculty services" },
      { id: "exam-services", name: "Board Exam Services", icon: "✍️", desc: "Hall tickets, revaluation & duplicate certificates" },
      { id: "edu-assistance", name: "Education Financial Assistance", icon: "💰", desc: "Support for higher education in STEM & sports" }
    ]
  },
  {
    id: "health",
    name: "Health Department",
    icon: "health",
    logo: DEPT_LOGOS_MAP.health.url,
    officialMinistry: DEPT_LOGOS_MAP.health.officialMinistry,
    description: "Hospital bookings, health insurance, birth/death records",
    color: "#7C4DFF",
    services: [
      { id: "hospital-booking", name: "Hospital Appointment", icon: "🏥", desc: "Book OPD slot in government medical colleges" },
      { id: "health-schemes", name: "Universal Health Insurance", icon: "💳", desc: "Ayushman & State health card application" },
      { id: "vital-records", name: "Birth & Death Certificate", icon: "👶", desc: "Download official vital event certificates" },
      { id: "vaccination", name: "Immunization & Vaccine", icon: "💉", desc: "Book child vaccination and adult immunization" },
      { id: "disability-cert", name: "Medical Disability Cert", icon: "♿", desc: "UDID card & disability percentage evaluation" },
      { id: "blood-bank", name: "Blood Availability Search", icon: "🩸", desc: "Live status of blood units in government banks" }
    ]
  },
  {
    id: "agriculture",
    name: "Agriculture Department",
    icon: "agriculture",
    logo: DEPT_LOGOS_MAP.agriculture.url,
    officialMinistry: DEPT_LOGOS_MAP.agriculture.officialMinistry,
    description: "PM-KISAN, crop insurance, subsidies, soil test & seeds",
    color: "#388E3C",
    services: [
      { id: "farmer-reg", name: "Farmer ID Registration", icon: "👨‍🌾", desc: "Unified Farmer database registration" },
      { id: "crop-insurance", name: "Pradhan Mantri Fasal Bima", icon: "🛡️", desc: "Enroll for crop loss insurance coverage" },
      { id: "subsidy-machinery", name: "Farm Machinery Subsidy", icon: "🚜", desc: "Apply for subsidized tractors & equipment" },
      { id: "soil-health", name: "Soil Health Card", icon: "🧪", desc: "Request soil nutrient testing & fertilizer guide" },
      { id: "seed-fertilizer", name: "Subsidized Seeds & Fertilizer", icon: "🌱", desc: "Book quality seeds at nearest depot" }
    ]
  },
  {
    id: "animal-husbandry",
    name: "Animal Husbandry",
    icon: "animal-husbandry",
    logo: DEPT_LOGOS_MAP["animal-husbandry"].url,
    officialMinistry: DEPT_LOGOS_MAP["animal-husbandry"].officialMinistry,
    description: "Livestock health, cattle insurance, dairy incentives",
    color: "#8D6E63",
    services: [
      { id: "cattle-insurance", name: "Cattle Insurance Scheme", icon: "🐄", desc: "Subsidized insurance for cows and buffaloes" },
      { id: "vet-telemedicine", name: "Veterinary Tele-Consultation", icon: "🩺", desc: "Free online doctor advice for farm animals" },
      { id: "dairy-incentive", name: "Milk Producer Subsidy", icon: "🥛", desc: "Direct incentive for cooperative dairy farmers" }
    ]
  },
  {
    id: "fisheries",
    name: "Fisheries Department",
    icon: "fisheries",
    logo: DEPT_LOGOS_MAP.fisheries.url,
    officialMinistry: DEPT_LOGOS_MAP.fisheries.officialMinistry,
    description: "Fisherman boat license, diesel subsidy, aquaculture",
    color: "#0288D1",
    services: [
      { id: "boat-registration", name: "Fishing Boat Registration", icon: "⛵", desc: "Licensing and registration of mechanized boats" },
      { id: "diesel-subsidy", name: "Fishermen Diesel Subsidy", icon: "⛽", desc: "Tax exemption and rebate on marine fuel" },
      { id: "aquaculture-grant", name: "Pond Aquaculture Grant", icon: "🐟", desc: "Subsidy for fresh-water fish farming" }
    ]
  },
  {
    id: "rural-dev",
    name: "Rural Development",
    icon: "rural-dev",
    logo: DEPT_LOGOS_MAP["rural-dev"].url,
    officialMinistry: DEPT_LOGOS_MAP["rural-dev"].officialMinistry,
    description: "MGNREGA job card, rural housing, village infrastructure",
    color: "#5D4037",
    services: [
      { id: "mgnrega-jobcard", name: "MGNREGA Job Card", icon: "⛏️", desc: "Apply for 100 days guaranteed rural employment" },
      { id: "rural-housing", name: "PMAY Rural Housing", icon: "🏡", desc: "Financial grant for pucca home construction" },
      { id: "sanitation-grant", name: "Toilet Construction Grant", icon: "🚽", desc: "Swachh Bharat rural sanitation incentive" }
    ]
  },
  {
    id: "panchayati-raj",
    name: "Panchayati Raj",
    icon: "panchayati-raj",
    logo: DEPT_LOGOS_MAP["panchayati-raj"].url,
    officialMinistry: DEPT_LOGOS_MAP["panchayati-raj"].officialMinistry,
    description: "Gram panchayat trade license, house tax, birth record",
    color: "#7B1FA2",
    services: [
      { id: "panchayat-tax", name: "Panchayat Property Tax", icon: "📜", desc: "Pay rural house tax online" },
      { id: "gram-license", name: "Gram Panchayat Trade License", icon: "🏪", desc: "Commercial operating permit in village limits" },
      { id: "panchayat-noc", name: "Building Plan Approval", icon: "🏗️", desc: "NOC for rural residential building construction" }
    ]
  },
  {
    id: "urban-dev",
    name: "Urban Development",
    icon: "urban-dev",
    logo: DEPT_LOGOS_MAP["urban-dev"].url,
    officialMinistry: DEPT_LOGOS_MAP["urban-dev"].officialMinistry,
    description: "Municipal tax, building approval, trade license, water connection",
    color: "#1976D2",
    services: [
      { id: "property-tax", name: "Municipal Property Tax", icon: "🏢", desc: "Calculate & pay urban property tax" },
      { id: "urban-trade-license", name: "Urban Trade License", icon: "🏪", desc: "Apply or renew city shop & establishment permit" },
      { id: "building-plan", name: "Urban Building Sanction", icon: "📐", desc: "Online plan submission and building permit" }
    ]
  },
  {
    id: "transport",
    name: "Transport Department",
    icon: "transport",
    logo: DEPT_LOGOS_MAP.transport.url,
    officialMinistry: DEPT_LOGOS_MAP.transport.officialMinistry,
    description: "Driving licence, RC transfer, vehicle fitness & permits",
    color: "#D32F2F",
    services: [
      { id: "learner-licence", name: "Learner Licence (LLR)", icon: "🔰", desc: "Online test & application for beginner licence" },
      { id: "driving-licence", name: "Driving Licence (DL)", icon: "🪪", desc: "Book slot for permanent driving test & smartcard" },
      { id: "vehicle-reg", name: "Vehicle Registration", icon: "🚗", desc: "New vehicle RC status & duplicate RC smartcard" },
      { id: "ownership-transfer", name: "Ownership Transfer (NOC)", icon: "🔄", desc: "Transfer vehicle ownership to buyer" },
      { id: "fitness-cert", name: "Vehicle Fitness Cert (FC)", icon: "🛠️", desc: "Commercial vehicle inspection booking" },
      { id: "transport-permit", name: "Tourist / Goods Permit", icon: "🚚", desc: "State & national route permits for commercial fleets" }
    ]
  },
  {
    id: "water-resources",
    name: "Water Resources",
    icon: "water-resources",
    logo: DEPT_LOGOS_MAP["water-resources"].url,
    officialMinistry: DEPT_LOGOS_MAP["water-resources"].officialMinistry,
    description: "New tap connection, borewell permit, water bill payment",
    color: "#0097A7",
    services: [
      { id: "water-connection", name: "New Drinking Water Tap", icon: "🚰", desc: "Apply for residential tap connection" },
      { id: "borewell-permit", name: "Borewell Drilling NOC", icon: "🌊", desc: "Permission for ground water extraction" },
      { id: "water-bill", name: "Pay Water Tariff Bill", icon: "💳", desc: "Online monthly water bill payment" }
    ]
  },
  {
    id: "pwd",
    name: "Public Works Department",
    icon: "pwd",
    logo: DEPT_LOGOS_MAP.pwd.url,
    officialMinistry: DEPT_LOGOS_MAP.pwd.officialMinistry,
    description: "Government contractor registration, road complaints, tender",
    color: "#E65100",
    services: [
      { id: "contractor-reg", name: "Class-I Contractor License", icon: "👷", desc: "Register as approved PWD civil contractor" },
      { id: "road-repair", name: "Pothole & Road Complaint", icon: "🛣️", desc: "Geo-tag road defect for urgent repair" },
      { id: "pwd-tender", name: "E-Tender Portal", icon: "📊", desc: "View & submit bids for public infrastructure works" }
    ]
  },
  {
    id: "energy",
    name: "Energy Department",
    icon: "energy",
    logo: DEPT_LOGOS_MAP.energy.url,
    officialMinistry: DEPT_LOGOS_MAP.energy.officialMinistry,
    description: "New electricity connection, solar rooftop, bill payment",
    color: "#FBC02D",
    services: [
      { id: "electricity-conn", name: "New Power Connection", icon: "⚡", desc: "Domestic, commercial & industrial meter request" },
      { id: "solar-rooftop", name: "PM Surya Ghar Solar", icon: "☀️", desc: "Apply for 3kW rooftop solar panel subsidy" },
      { id: "power-bill", name: "Pay Electricity Bill", icon: "💡", desc: "Instant electricity bill view & payment" }
    ]
  },
  {
    id: "social-welfare",
    name: "Social Welfare",
    icon: "social-welfare",
    logo: DEPT_LOGOS_MAP["social-welfare"].url,
    officialMinistry: DEPT_LOGOS_MAP["social-welfare"].officialMinistry,
    description: "Pensions, disability allowance, minority scholarships",
    color: "#C2185B",
    services: [
      { id: "old-age-pension", name: "Old Age Pension (IGNOAP)", icon: "👵", desc: "Monthly financial pension for senior citizens" },
      { id: "widow-pension", name: "Destitute Widow Pension", icon: "👩", desc: "Monthly sustenance allowance for widows" },
      { id: "disability-allowance", name: "Differently Abled Allowance", icon: "♿", desc: "Monthly pension & motorized tricycle grant" },
      { id: "intercaste-marriage", name: "Inter-Caste Marriage Assistance", icon: "💍", desc: "Financial grant & gold coin scheme for newlyweds" }
    ]
  },
  {
    id: "women-child",
    name: "Women & Child Development",
    icon: "women-child",
    logo: DEPT_LOGOS_MAP["women-child"].url,
    officialMinistry: DEPT_LOGOS_MAP["women-child"].officialMinistry,
    description: "Girl child protection, Anganwadi services, maternity benefit",
    color: "#E91E63",
    services: [
      { id: "maternity-benefit", name: "PMMVY Maternity Benefit", icon: "🤱", desc: "₹6,000 cash incentive for pregnant mothers" },
      { id: "girl-child-scheme", name: "Girl Child Protection Scheme", icon: "👧", desc: "Fixed deposit scheme maturity for girl child" },
      { id: "anganwadi-enroll", name: "Anganwadi Pre-School", icon: "🧸", desc: "Enroll toddlers for free nutrition & early care" }
    ]
  },
  {
    id: "food-supplies",
    name: "Food & Civil Supplies",
    icon: "food-supplies",
    logo: DEPT_LOGOS_MAP["food-supplies"].url,
    officialMinistry: DEPT_LOGOS_MAP["food-supplies"].officialMinistry,
    description: "Ration card creation, member update, PDS shop locator",
    color: "#F57C00",
    services: [
      { id: "new-ration-card", name: "New Smart Ration Card", icon: "🍚", desc: "Apply for PHH / NPHH family ration card" },
      { id: "ration-correction", name: "Address / Name Correction", icon: "✏️", desc: "Update details on existing ration card" },
      { id: "add-member", name: "Add Family Member", icon: "👶", desc: "Add newborn or spouse to family card" },
      { id: "remove-member", name: "Remove Family Member", icon: "❌", desc: "Surrender name due to marriage or departure" },
      { id: "pds-stock", name: "Fair Price Shop Stock", icon: "🏪", desc: "Check live availability of rice, sugar & oil" }
    ]
  },
  {
    id: "labour",
    name: "Labour Department",
    icon: "labour",
    logo: DEPT_LOGOS_MAP.labour.url,
    officialMinistry: DEPT_LOGOS_MAP.labour.officialMinistry,
    description: "Unorganized worker ID, construction worker welfare, ESIC",
    color: "#512DA8",
    services: [
      { id: "eshram-card", name: "e-Shram Registration", icon: "🪪", desc: "National database of unorganized workers" },
      { id: "construction-welfare", name: "Building Worker Welfare Board", icon: "🏗️", desc: "Education & accident benefits for construction lab" },
      { id: "labour-complaint", name: "Minimum Wages Complaint", icon: "⚖️", desc: "Report wage default or non-payment of bonus" }
    ]
  },
  {
    id: "employment",
    name: "Employment Department",
    icon: "employment",
    logo: DEPT_LOGOS_MAP.employment.url,
    officialMinistry: DEPT_LOGOS_MAP.employment.officialMinistry,
    description: "Job seeker exchange registration, unemployment allowance",
    color: "#303F9F",
    services: [
      { id: "jobseeker-reg", name: "Employment Exchange Reg", icon: "💼", desc: "Register qualifications for government notifications" },
      { id: "unemploy-allowance", name: "Unemployment Allowance", icon: "💵", desc: "Monthly stipends for registered educated youth" },
      { id: "skill-training", name: "Free Government Skill Course", icon: "🎯", desc: "Enroll in PMKVY vocational training" }
    ]
  },
  {
    id: "industries",
    name: "Industries Department",
    icon: "industries",
    logo: DEPT_LOGOS_MAP.industries.url,
    officialMinistry: DEPT_LOGOS_MAP.industries.officialMinistry,
    description: "Single window industrial clearance, factory permit, land allotment",
    color: "#455A64",
    services: [
      { id: "single-window-clearance", name: "Single Window Clearance", icon: "🏭", desc: "Unified NOC for setting up manufacturing unit" },
      { id: "industrial-plot", name: "SIPCOT / IDC Land Allotment", icon: "🗺️", desc: "Lease plot in government industrial parks" },
      { id: "subsidized-power", name: "Industrial Power Tariff Rebate", icon: "⚡", desc: "Subsidy for high-tension industrial connections" }
    ]
  },
  {
    id: "msme",
    name: "MSME Department",
    icon: "msme",
    logo: DEPT_LOGOS_MAP.msme.url,
    officialMinistry: DEPT_LOGOS_MAP.msme.officialMinistry,
    description: "Udyam registration, collateral free loans, capital subsidy",
    color: "#00796B",
    services: [
      { id: "udyam-reg", name: "Udyam MSME Registration", icon: "🏪", desc: "Free instant MSME certificate with QR code" },
      { id: "msme-loan", name: "PMEGP Credit Scheme", icon: "💰", desc: "Up to ₹50 Lakh loan with 35% subsidy" },
      { id: "capital-subsidy", name: "25% Capital Subsidy", icon: "📈", desc: "Reimbursement for plant & machinery purchase" }
    ]
  },
  {
    id: "finance",
    name: "Finance Department",
    icon: "finance",
    logo: DEPT_LOGOS_MAP.finance.url,
    officialMinistry: DEPT_LOGOS_MAP.finance.officialMinistry,
    description: "Direct benefit transfers (DBT), e-Challan payment, treasury",
    color: "#283593",
    services: [
      { id: "dbt-status", name: "DBT Payment Status", icon: "💳", desc: "Track cash transfers across all government schemes" },
      { id: "echallan", name: "Government e-Challan", icon: "🧾", desc: "Pay departmental fees and court fees online" },
      { id: "pensioner-portal", name: "State Pensioner Life Certificate", icon: "👴", desc: "Digital Jeevan Pramaan submission" }
    ]
  },
  {
    id: "commercial-taxes",
    name: "Commercial Taxes / GST",
    icon: "commercial-taxes",
    logo: DEPT_LOGOS_MAP["commercial-taxes"].url,
    officialMinistry: DEPT_LOGOS_MAP["commercial-taxes"].officialMinistry,
    description: "State GST registration, waybill generation, tax return audit",
    color: "#5C6BC0",
    services: [
      { id: "gst-state-reg", name: "State GST Registration", icon: "🧾", desc: "New GSTIN application under state jurisdiction" },
      { id: "eway-bill", name: "E-Way Bill Verification", icon: "🚛", desc: "Generate & verify goods transport waybills" },
      { id: "profession-tax", name: "Professional Tax Payment", icon: "💼", desc: "Annual professional tax return filing" }
    ]
  },
  {
    id: "registration",
    name: "Registration Department",
    icon: "registration",
    logo: DEPT_LOGOS_MAP.registration.url,
    officialMinistry: DEPT_LOGOS_MAP.registration.officialMinistry,
    description: "Encumbrance certificate (EC), marriage registration, stamp duty",
    color: "#8E24AA",
    services: [
      { id: "encumbrance-cert", name: "Encumbrance Certificate (EC)", icon: "🔍", desc: "Search & download property transaction history" },
      { id: "marriage-reg", name: "Marriage Registration", icon: "💍", desc: "Book appointment & download marriage certificate" },
      { id: "guideline-value", name: "Property Guideline Value", icon: "📊", desc: "Check government valuation for land registration" }
    ]
  },
  {
    id: "forest",
    name: "Forest Department",
    icon: "forest",
    logo: DEPT_LOGOS_MAP.forest.url,
    officialMinistry: DEPT_LOGOS_MAP.forest.officialMinistry,
    description: "Tree cutting NOC, ecotourism pass, timber transit permit",
    color: "#2E7D32",
    services: [
      { id: "tree-cutting-noc", name: "Tree Felling Permission", icon: "🪓", desc: "NOC for cutting trees on private land" },
      { id: "ecotourism-booking", name: "Sanctuary Trekking Pass", icon: "🏕️", desc: "Online safari & safari cottage booking" },
      { id: "timber-transit", name: "Timber Transit Pass", icon: "🪵", desc: "Permit for transporting harvested wood" }
    ]
  },
  {
    id: "environment",
    name: "Environment Department",
    icon: "environment",
    logo: DEPT_LOGOS_MAP.environment.url,
    officialMinistry: DEPT_LOGOS_MAP.environment.officialMinistry,
    description: "Pollution NOC, plastic ban compliance, EIA clearings",
    color: "#4CAF50",
    services: [
      { id: "pollution-noc", name: "Consent to Establish / Operate", icon: "🏭", desc: "Pollution Control Board CTE/CTO NOC" },
      { id: "eia-clearance", name: "Environmental Clearance", icon: "🌍", desc: "State level environment impact assessment" },
      { id: "waste-mgmt", name: "E-Waste Producer Reg", icon: "♻️", desc: "Extended producer responsibility registration" }
    ]
  },
  {
    id: "housing",
    name: "Housing Department",
    icon: "housing",
    logo: DEPT_LOGOS_MAP.housing.url,
    officialMinistry: DEPT_LOGOS_MAP.housing.officialMinistry,
    description: "Housing board flats, affordable home scheme, slum clearance",
    color: "#D81B60",
    services: [
      { id: "tnhb-flat", name: "State Housing Board Lottery", icon: "🏠", desc: "Apply for HIG/MIG/LIG residential flats", featured: true },
      { id: "affordable-housing", name: "Urban Housing Subsidy", icon: "🔑", desc: "PM Awas Yojana interest subsidy claim" },
      { id: "tenement-allotment", name: "Slum Clearance Allotment", icon: "🏘️", desc: "Rehabilitation housing allotment status" }
    ]
  },
  {
    id: "fire-rescue",
    name: "Fire & Rescue Services",
    icon: "fire-rescue",
    logo: DEPT_LOGOS_MAP["fire-rescue"].url,
    officialMinistry: DEPT_LOGOS_MAP["fire-rescue"].officialMinistry,
    description: "Building fire NOC, cracker shop license, emergency call",
    color: "#E64A19",
    services: [
      { id: "fire-noc", name: "Fire Safety NOC", icon: "🔥", desc: "Mandatory fire certificate for commercial buildings" },
      { id: "cracker-license", name: "Temporary Fireworks License", icon: "🎆", desc: "Seasonal festival firecracker sale permit" },
      { id: "fire-standby", name: "Event Fire Engine Standby", icon: "🚒", desc: "Book fire truck for public gatherings" }
    ]
  },
  {
    id: "disaster-mgmt",
    name: "Disaster Management",
    icon: "disaster-mgmt",
    logo: DEPT_LOGOS_MAP["disaster-mgmt"].url,
    officialMinistry: DEPT_LOGOS_MAP["disaster-mgmt"].officialMinistry,
    description: "Weather alerts, flood relief claims, volunteer registration",
    color: "#F57F17",
    services: [
      { id: "weather-alert", name: "Live Severe Weather Radar", icon: "⛈️", desc: "Real-time cyclone & heavy rainfall warnings" },
      { id: "disaster-volunteer", name: "Civil Defense Volunteer", icon: "🤝", desc: "Register as trained emergency responder" },
      { id: "damage-claim", name: "Property Damage Relief", icon: "🏚️", desc: "Claim compensation for natural calamity loss" }
    ]
  },
  {
    id: "drug-control",
    name: "Drug Control Department",
    icon: "drug-control",
    logo: DEPT_LOGOS_MAP["drug-control"].url,
    officialMinistry: DEPT_LOGOS_MAP["drug-control"].officialMinistry,
    description: "Pharmacy license, medicine quality check, narcotic permit",
    color: "#00838F",
    services: [
      { id: "pharmacy-license", name: "Retail / Wholesale Drug License", icon: "💊", desc: "Open new chemist shop or pharmacy" },
      { id: "medicine-testing", name: "Not-of-Standard Quality Alert", icon: "🧪", desc: "View banned & substandard drug notices" },
      { id: "narcotics-permit", name: "Medical Oxygen & Narcotic NOC", icon: "🏥", desc: "Hospital stock permission" }
    ]
  },
  {
    id: "food-safety",
    name: "Food Safety Department",
    icon: "food-safety",
    logo: DEPT_LOGOS_MAP["food-safety"].url,
    officialMinistry: DEPT_LOGOS_MAP["food-safety"].officialMinistry,
    description: "FSSAI registration, hotel inspection, food adulteration report",
    color: "#689F38",
    services: [
      { id: "fssai-reg", name: "FSSAI Food License", icon: "🍱", desc: "Instant registration for food vendors & restaurants" },
      { id: "food-complaint", name: "Report Adulterated Food", icon: "⚠️", desc: "Lodge anonymous sample testing request" },
      { id: "hygiene-rating", name: "EAT RIGHT Hygiene Audit", icon: "⭐", desc: "Star hygiene certification for eateries" }
    ]
  },
  {
    id: "law-dept",
    name: "Law Department",
    icon: "law-dept",
    logo: DEPT_LOGOS_MAP["law-dept"].url,
    officialMinistry: DEPT_LOGOS_MAP["law-dept"].officialMinistry,
    description: "Notary public application, advocate welfare, legal aid",
    color: "#37474F",
    services: [
      { id: "free-legal-aid", name: "Free Legal Aid Application", icon: "⚖️", desc: "State legal services authority assistance" },
      { id: "notary-app", name: "Notary Public Appointment", icon: "✒️", desc: "Apply for government notary commission" },
      { id: "advocate-welfare", name: "Advocate Welfare Stamp", icon: "📜", desc: "Stamps purchase & welfare fund claims" }
    ]
  },
  {
    id: "home-dept",
    name: "Home Department",
    icon: "home-dept",
    logo: DEPT_LOGOS_MAP["home-dept"].url,
    officialMinistry: DEPT_LOGOS_MAP["home-dept"].officialMinistry,
    description: "Arms license, freedom fighter pension, VIP security clearance",
    color: "#1A237E",
    services: [
      { id: "arms-license", name: "New Arms License", icon: "🔫", desc: "Self defense weapon permit application" },
      { id: "freedom-pension", name: "Freedom Fighter Pension", icon: "🇮🇳", desc: "Honorary pension for freedom struggle veterans" },
      { id: "event-permission", name: "Loudspeaker & Rally Permit", icon: "📢", desc: "Public assembly & procession NOC" }
    ]
  },
  {
    id: "prison-dept",
    name: "Prison Department",
    icon: "prison-dept",
    logo: DEPT_LOGOS_MAP["prison-dept"].url,
    officialMinistry: DEPT_LOGOS_MAP["prison-dept"].officialMinistry,
    description: "Prisoner interview booking, inmate canteen transfer, parole",
    color: "#212121",
    services: [
      { id: "e-mulakat", name: "e-Mulakat Jail Visit", icon: "🚪", desc: "Book video or physical visit with inmate" },
      { id: "inmate-canteen", name: "PPC Canteen Money Deposit", icon: "💳", desc: "Deposit money to inmate prisoner account" },
      { id: "parole-status", name: "Parole & Remission Status", icon: "📜", desc: "Track prisoner leave of absence application" }
    ]
  },
  {
    id: "tourism",
    name: "Tourism Department",
    icon: "tourism",
    logo: DEPT_LOGOS_MAP.tourism.url,
    officialMinistry: DEPT_LOGOS_MAP.tourism.officialMinistry,
    description: "Government hotel booking, tourist guide license, heritage pass",
    color: "#00ACC1",
    services: [
      { id: "ttdc-booking", name: "Government Resort Booking", icon: "🏨", desc: "Stay at official state tourism hotels" },
      { id: "guide-license", name: "Certified Tourist Guide", icon: "🧳", desc: "Register as authorized heritage guide" },
      { id: "monument-pass", name: "Unified Heritage Site Pass", icon: "🏛️", desc: "Single entry pass for all state monuments" }
    ]
  }
];

export const SERVICE_DETAILS = {
  "income-cert": {
    id: "income-cert",
    departmentId: "revenue",
    departmentName: "Revenue Department",
    name: "Income Certificate",
    icon: "💰",
    overview: "An Income Certificate is an official document issued by the Revenue Department that certifies the total annual income of a citizen's household from all sources. It is mandatory for availing government welfare schemes, educational fee concessions, scholarships, and subsidized housing allotments.",
    eligibility: [
      "Must be a permanent resident of the State",
      "Applicant or head of family must have valid ID proof",
      "Annual household income must be verifiable from salary slips, land holding, or business turnover",
      "Applicant must not have any undisclosed commercial assets"
    ],
    requiredDocuments: [
      { name: "Aadhaar Card / Voter ID", type: "Identity & Address Proof", mandatory: true },
      { name: "Salary Slip / Form 16 / IT Return", type: "Income Proof", mandatory: true },
      { name: "Self-Declaration Affidavit", type: "Legal Statement", mandatory: true },
      { name: "Recent Passport Size Photograph", type: "Photo", mandatory: true },
      { name: "Property Tax Receipt / Ration Card", type: "Residence Proof", mandatory: false }
    ],
    applicationSteps: [
      { step: 1, title: "Personal Details", desc: "Enter basic demographic details, Aadhaar number, and contact information." },
      { step: 2, title: "Family & Income Breakdown", desc: "Specify total earning members in family and gross annual income from agriculture, salary, or trade." },
      { step: 3, title: "Document Upload", desc: "Upload scanned clear copies of identity card, income proof, and self-declaration." },
      { step: 4, title: "Review & E-Sign", desc: "Verify preview details and sign digitally or via mobile OTP." },
      { step: 5, title: "Submission & E-Ack", desc: "Receive instant Application Reference GOV-XXXXXX for live tracking." }
    ]
  },
  "patta-services": {
    id: "patta-services",
    departmentId: "revenue",
    departmentName: "Revenue Department",
    name: "Patta Services",
    icon: "📜",
    overview: "Patta is a crucial revenue document proving legal title over a plot of land or property. Citizens can apply for Patta Transfer (mutation), duplicate Patta, or extract computerized Chitta land details.",
    eligibility: [
      "Property registered deed holder or legal heir",
      "Property must be located within registered municipal or village revenue boundaries",
      "No pending court stay or injunction on the property"
    ],
    requiredDocuments: [
      { name: "Registered Sale Deed / Encumbrance Certificate", type: "Ownership Proof", mandatory: true },
      { name: "Aadhaar Card of Applicant", type: "Identity Proof", mandatory: true },
      { name: "Property Tax Receipt", type: "Tax Proof", mandatory: true }
    ],
    applicationSteps: [
      { step: 1, title: "Property Demarcation", desc: "Enter survey number, subdivision number, and village name." },
      { step: 2, title: "Upload Deeds", desc: "Upload registered sale deed and EC." },
      { step: 3, title: "Village Administrative Officer (VAO) Inspection", desc: "Field officer verifies physical possession." },
      { step: 4, title: "Patta Approval", desc: "Digital Patta generated with QR code." }
    ]
  },
  "driving-licence": {
    id: "driving-licence",
    departmentId: "transport",
    departmentName: "Transport Department",
    name: "Driving Licence",
    icon: "🪪",
    overview: "Apply for a permanent Driving Licence smartcard after holding a valid Learner Licence for at least 30 days.",
    eligibility: [
      "Must hold a valid Learner Licence (LLR) for at least 30 days",
      "Must be at least 18 years old (16 years for non-geared 50cc two-wheelers)",
      "Must pass the physical driving track test at RTO"
    ],
    requiredDocuments: [
      { name: "Valid Learner Licence Number", type: "Reference", mandatory: true },
      { name: "Medical Certificate (Form 1A)", type: "Health Proof", mandatory: true },
      { name: "Aadhaar Card", type: "Identity & Address", mandatory: true }
    ],
    applicationSteps: [
      { step: 1, title: "LLR Verification", desc: "System auto-fetches your Learner Licence details." },
      { step: 2, title: "Book RTO Test Slot", desc: "Choose date & time slot for physical driving test." },
      { step: 3, title: "Track Test", desc: "Appear at RTO track with registered vehicle." },
      { step: 4, title: "Smartcard Dispatch", desc: "Approved DL smartcard printed & speed-posted." }
    ]
  },
  "tnhb-flat": {
    id: "tnhb-flat",
    departmentId: "housing",
    departmentName: "Housing Department",
    name: "Housing Board Flat Scheme",
    icon: "🏠",
    overview: "Apply for government affordable flats (Economically Weaker Section EWS / Low Income Group LIG / Middle Income Group MIG) under the State Housing Scheme with subsidised loans.",
    eligibility: [
      "Applicant or spouse must not own any pucca residential house in the state",
      "Annual family income must fit EWS (<₹3 Lakh) or LIG (<₹6 Lakh) limits",
      "Resident of the state for over 5 years"
    ],
    requiredDocuments: [
      { name: "Income Certificate (Revenue Department)", type: "Auto-Verified", mandatory: true },
      { name: "Smart Ration Card (Food & Civil Supplies)", type: "Auto-Verified", mandatory: true },
      { name: "Aadhaar & PAN Card", type: "Identity Proof", mandatory: true }
    ],
    applicationSteps: [
      { step: 1, title: "Scheme Selection", desc: "Select preferred housing project location and apartment category." },
      { step: 2, title: "Cross-Dept Verification", desc: "System instantly fetches verified income & family status from Revenue & PDS." },
      { step: 3, title: "Application Fee Payment", desc: "Pay initial EMD online via e-Challan." },
      { step: 4, title: "Computerized Draw", desc: "Participate in transparent digital allotment lottery." }
    ]
  }
};
