// Full Geographical & Cultural Data Architecture for India 3D Experience

export const STATE_COLOR_PALETTE = {
  tn: "#8B5CF6", // Tamil Nadu -> Purple
  kl: "#10B981", // Kerala -> Emerald
  ka: "#3B82F6", // Karnataka -> Blue
  ap: "#F97316", // Andhra Pradesh -> Orange
  ts: "#EC4899", // Telangana -> Pink
  mh: "#F59E0B", // Maharashtra -> Golden
  gj: "#06B6D4", // Gujarat -> Cyan
  rj: "#7C3AED", // Rajasthan -> Violet
  pb: "#22C55E", // Punjab -> Green
  hp: "#0EA5E9", // Himachal Pradesh -> Sky Blue
  up: "#EAB308", // Uttar Pradesh -> Yellow
  wb: "#F43F5E", // West Bengal -> Coral
  as: "#14B8A6", // Assam -> Teal
  or: "#EF4444", // Odisha -> Red
  dl: "#6366F1", // Delhi -> Indigo
  mp: "#84CC16", // Madhya Pradesh -> Lime
  cg: "#10B981", // Chhattisgarh -> Green
  br: "#F97316", // Bihar -> Amber
  jh: "#A855F7", // Jharkhand -> Purple
  hr: "#3B82F6", // Haryana -> Blue
  uk: "#0EA5E9", // Uttarakhand -> Sky
  ga: "#EC4899", // Goa -> Rose
  tr: "#14B8A6", // Tripura -> Teal
  ml: "#10B981", // Meghalaya -> Emerald
  mn: "#8B5CF6", // Manipur -> Purple
  mz: "#F59E0B", // Mizoram -> Amber
  nl: "#EF4444", // Nagaland -> Red
  sk: "#06B6D4", // Sikkim -> Cyan
  jk: "#3B82F6", // Jammu & Kashmir -> Royal Blue
  ladakh: "#0EA5E9", // Ladakh -> Ice Blue
  py: "#EC4899", // Puducherry -> Pink
  ch: "#6366F1", // Chandigarh -> Indigo
  an: "#14B8A6", // Andaman & Nicobar -> Turquoise
  ld: "#06B6D4", // Lakshadweep -> Lagoon Cyan
  dd: "#F59E0B"  // Dadra & Nagar Haveli and Daman & Diu -> Gold
};

export const FREEDOM_FIGHTERS = [
  {
    id: "gandhi",
    name: "Mahatma Gandhi",
    title: "Father of the Nation",
    lifespan: "1869 – 1948",
    image: "/freedom-fighters/gandhi.jpg",
    quote: "Be the change that you wish to see in the world.",
    role: "Pioneered Satyagraha and Non-Violent Civil Disobedience movements including the Dandi Salt March and Quit India Movement, inspiring global civil rights.",
    keyEvents: ["Champaran Satyagraha (1917)", "Dandi Salt March (1930)", "Quit India Movement (1942)"]
  },
  {
    id: "subhas",
    name: "Netaji Subhas Chandra Bose",
    title: "Supreme Commander of Azad Hind Fauj",
    lifespan: "1897 – 1945",
    image: "/freedom-fighters/subhas.jpg",
    quote: "Give me blood, and I shall give you freedom!",
    role: "Founded the Indian National Army (Azad Hind Fauj) and established the Provisional Government of Free India to wage armed struggle for national liberation.",
    keyEvents: ["Forward Bloc Formation (1939)", "Azad Hind Government (1943)", "Battle of Kohima & Imphal (1944)"]
  },
  {
    id: "bhagat",
    name: "Shaheed Bhagat Singh",
    title: "Heroic Revolutionary Martyr",
    lifespan: "1907 – 1931",
    image: "/freedom-fighters/bhagat.jpg",
    quote: "They may kill me, but they cannot kill my ideas.",
    role: "Leader of the Hindustan Socialist Republican Association whose revolutionary zeal and supreme sacrifice at age 23 ignited mass patriotic awakening across India.",
    keyEvents: ["Naujawan Bharat Sabha (1926)", "Central Assembly Protest (1929)", "Lahore Conspiracy Trial (1930)"]
  },
  {
    id: "patel",
    name: "Sardar Vallabhbhai Patel",
    title: "Iron Man of India & Architect of National Integration",
    lifespan: "1875 – 1950",
    image: "/freedom-fighters/patel.jpg",
    quote: "Manpower without unity is not a strength unless it is harmonized and united properly.",
    role: "India's first Deputy Prime Minister and Home Minister who successfully integrated 565 princely states into the sovereign Republic of India.",
    keyEvents: ["Bardoli Satyagraha (1928)", "Integration of Princely States (1947–49)", "All India Services Foundation"]
  },
  {
    id: "lakshmibai",
    name: "Rani Lakshmibai",
    title: "The Valiant Queen of Jhansi",
    lifespan: "1828 – 1858",
    image: "/freedom-fighters/lakshmibai.jpg",
    quote: "I shall not surrender my Jhansi!",
    role: "Symbol of bravery and resistance who led her troops fiercely in the First War of Indian Independence in 1857, fighting on the frontlines on horseback.",
    keyEvents: ["Siege of Jhansi (1858)", "Battle of Kotah-ki-Serai", "Immortalized in Indian folklore as warrior queen"]
  },
  {
    id: "ambedkar",
    name: "Dr. B. R. Ambedkar",
    title: "Chief Architect of the Indian Constitution",
    lifespan: "1891 – 1956",
    image: "/freedom-fighters/ambedkar.jpg",
    quote: "Educate, Agitate, Organize.",
    role: "Jurist, social reformer, and Chairman of the Constitution Drafting Committee who drafted the world's most comprehensive constitution guaranteeing equal rights.",
    keyEvents: ["Mahad Satyagraha (1927)", "Drafting of the Constitution (1947–50)", "First Law Minister of Independent India"]
  }
];

export const POPULAR_WONDERS_OF_INDIA = [
  {
    id: "taj",
    name: "Taj Mahal",
    location: "Agra, Uttar Pradesh",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    built: "1632–1653 CE",
    era: "Mughal Architecture",
    description: "An ivory-white marble mausoleum on the south bank of the Yamuna river. A UNESCO World Heritage Site and universally admired masterpiece of world heritage.",
    importance: "Regarded as the pinnacle of Mughal architectural brilliance and one of the Seven Wonders of the Modern World."
  },
  {
    id: "red-fort",
    name: "Red Fort (Lal Qila)",
    location: "Old Delhi",
    image: "/red-fort.jpg",
    built: "1638–1648 CE",
    era: "Mughal Empire",
    description: "A monumental red sandstone fortress that served as the main residence of Mughal emperors and the site where the Prime Minister hoists the National Flag on Independence Day.",
    importance: "Epicentre of Indian sovereignty and symbol of India's independence from colonial rule."
  },
  {
    id: "india-gate",
    name: "India Gate",
    location: "New Delhi",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80",
    built: "1921–1931 CE",
    era: "National War Memorial",
    description: "A 42-metre war memorial standing astride the Rajpath, honouring the 84,000 soldiers of the British Indian Army who made the supreme sacrifice in World War I.",
    importance: "Sacred memorial home to the Amar Jawan Jyoti and National War Memorial complex."
  },
  {
    id: "golden-temple",
    name: "Sri Harmandir Sahib (Golden Temple)",
    location: "Amritsar, Punjab",
    image: "/golden-temple.jpg",
    built: "1577–1604 CE",
    era: "Sikh Heritage",
    description: "The spiritual and cultural center of the Sikh religion, covered in 162 kg of pure gold leaf and surrounded by the sacred Amrit Sarovar (Pool of Nectar).",
    importance: "Hosts the world's largest free community kitchen (Langar), feeding over 100,000 pilgrims of all faiths daily."
  },
  {
    id: "gateway-of-india",
    name: "Gateway of India",
    location: "Mumbai, Maharashtra",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80",
    built: "1911–1924 CE",
    era: "Indo-Saracenic Architecture",
    description: "A monumental 26-metre arch overlooking the Arabian Sea, built to commemorate royal visits and serving as the ceremonial entrance to India.",
    importance: "Iconic symbol of Mumbai where the last British troops departed Indian soil on 28 February 1948."
  },
  {
    id: "meenakshi-temple",
    name: "Meenakshi Amman Temple",
    location: "Madurai, Tamil Nadu",
    image: "/meenakshi-temple.jpg",
    built: "6th Century BCE / 16th Century CE",
    era: "Dravidian Architectural Marvel",
    description: "An ancient temple complex with 14 towering gopurams reaching up to 52 metres, adorned with thousands of colorful mythological stone sculptures.",
    importance: "The heart of Sangam Tamil culture and one of the greatest living temple complexes on Earth."
  },
  {
    id: "brihadeeswarar",
    name: "Brihadisvara Temple (Big Temple)",
    location: "Thanjavur, Tamil Nadu",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    built: "1010 CE by Raja Raja Chola I",
    era: "Great Living Chola Temples (UNESCO)",
    description: "A 1000-year-old temple built entirely of 130,000 tonnes of granite with a single 80-tonne granite dome (Kumbam) perched at the summit.",
    importance: "Pinnacle of Chola engineering and classical Tamil temple architecture."
  },
  {
    id: "statue-of-unity",
    name: "Statue of Unity",
    location: "Kevadia, Gujarat",
    image: "/statue-of-unity.png",
    built: "2013–2018 CE",
    era: "Modern Engineering Feat",
    description: "The world's tallest statue standing 182 metres (597 ft) on the banks of the Narmada River, dedicated to Sardar Vallabhbhai Patel.",
    importance: "Twice the height of the Statue of Liberty, celebrating national integration and unity."
  },
  {
    id: "hampi",
    name: "Hampi UNESCO World Heritage Ruins",
    location: "Vijayanagara, Karnataka",
    image: "/hampi.png",
    built: "14th–16th Century CE",
    era: "Vijayanagara Empire",
    description: "Spectacular ruins of the world's second-largest medieval-era city, featuring over 1,600 surviving monuments across dramatic boulder-strewn landscapes.",
    importance: "UNESCO World Heritage Site home to the Stone Chariot, Virupaksha Temple, and Vittala Temple musical pillars."
  }
];

export const INDIA_3D_STATES = [
  {
    id: "tn",
    name: "Tamil Nadu",
    type: "State",
    color: STATE_COLOR_PALETTE.tn,
    capital: "Chennai",
    districtsCount: 38,
    population: "76.8 Million",
    mapCoords: { x: 3.5, y: -7.5, z: 0, scale: 1.4 },
    tagline: "Land of Ancient Dravidian Temples, Literature & Automotive Innovation",
    description: "Home to 2,000-year-old Sangam literature, UNESCO Chola temples, Bharatanatyam classical dance, and India's largest automotive manufacturing corridor.",
    languages: ["Tamil", "English"],
    heritage: "Meenakshi Amman Temple, Brihadisvara Temple, Shore Temple (Mamallapuram), Chidambaram Nataraja Temple",
    famousFor: ["Dravidian Temples", "Kanchipuram Silk", "Filter Coffee", "Automotive Capital", "Carnatic Music"],
    cuisine: "Dosai, Idli, Chettinad Pepper Chicken, Filter Coffee, Jigarthanda, Pongal",
    festivals: ["Pongal", "Tamil New Year", "Karthigai Deepam", "Jallikattu", "Natyanjali"],
    famousPlaces: [
      { id: "meenakshi", name: "Meenakshi Temple, Madurai", image: "https://images.unsplash.com/photo-1621831971375-d0b4974f1c9c?auto=format&fit=crop&w=600&q=80", desc: "Iconic 14-tower temple complex dedicated to Goddess Meenakshi." },
      { id: "brihadeeswarar", name: "Brihadeeswarar Temple, Thanjavur", image: "https://images.unsplash.com/photo-1600100397608-f090742f404d?auto=format&fit=crop&w=600&q=80", desc: "1000-year-old Chola marvel built entirely of granite." },
      { id: "marina", name: "Marina Beach, Chennai", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80", desc: "Asia's longest natural urban promenade along the Bay of Bengal." },
      { id: "ooty", name: "Ooty & Nilgiri Hills", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80", desc: "Queen of Hill Stations with UNESCO heritage Nilgiri toy train." }
    ],
    districts: [
      {
        id: "chennai",
        name: "Chennai",
        headquarters: "Chennai",
        color: "#8B5CF6",
        popularity: "Gateway to South India • Healthcare Capital of Asia • Marina Beach",
        description: "The capital metropolis blending colonial architecture with Asia's largest IT corridors, healthcare hubs, and the historic Fort St. George.",
        heritage: "Fort St. George, Kapaleeshwarar Temple, San Thome Cathedral, Ripon Building",
        culture: "December Music Season, Classical Dance Sabhas, Tamil Cinema Hub",
        food: "Filter Coffee, Mylapore Idli, Marina Sundal, Chettinad Biryani",
        taluks: [
          { id: "mylapore", name: "Mylapore Taluk", color: "#8B5CF6", headquarters: "Mylapore", highlights: "Ancient Kapaleeshwarar temple, San Thome Basilica & Carnatic music sabhas" },
          { id: "guindy", name: "Guindy Taluk", color: "#3B82F6", headquarters: "Guindy", highlights: "Guindy National Park, IIT Madras & Raj Bhavan governor estate" },
          { id: "egmore", name: "Egmore Taluk", color: "#10B981", headquarters: "Egmore", highlights: "Government Museum, Connemara Library & Heritage Railway Terminus" },
          { id: "t-nagar", name: "T. Nagar Taluk", color: "#F59E0B", headquarters: "Thyagaraya Nagar", highlights: "Asia's largest silk saree & gold retail shopping precinct" },
          { id: "anna-nagar", name: "Anna Nagar Taluk", color: "#EC4899", headquarters: "Anna Nagar", highlights: "Modern residential boulevard with iconic Tower Park & commercial plazas" },
          { id: "velachery", name: "Velachery Taluk", color: "#06B6D4", headquarters: "Velachery", highlights: "IT corridor transit nexus and premier retail malls" }
        ]
      },
      {
        id: "thanjavur",
        name: "Thanjavur",
        headquarters: "Thanjavur",
        color: "#F59E0B",
        popularity: "Rice Bowl of Tamil Nadu • Brihadeeswarar Temple • Tanjore Art",
        description: "The imperial capital of the Chola Dynasty, famous worldwide for Tanjore Gold Leaf Paintings, Bronze Sculptures, and the Great Living Chola Temples.",
        heritage: "Brihadisvara Temple (UNESCO), Thanjavur Maratha Palace, Saraswathi Mahal Library",
        culture: "Tanjore Painting, Veena Making, Carnatic Music & Bharatanatyam Patronage",
        food: "Thanjavur Ponni Rice Meals, Ashoka Halwa, Kumbakonam Degree Coffee",
        taluks: [
          { id: "thanjavur-taluk", name: "Thanjavur Taluk", color: "#F59E0B", headquarters: "Thanjavur", highlights: "Big Temple UNESCO site, Royal Palace museum & Tanjore art workshops" },
          { id: "kumbakonam", name: "Kumbakonam Taluk", color: "#EC4899", headquarters: "Kumbakonam", highlights: "City of 100 Temples, sacred Mahamaham Tank & brass vessel craftsmanship" },
          { id: "thiruvaiyaru", name: "Thiruvaiyaru Taluk", color: "#10B981", headquarters: "Thiruvaiyaru", highlights: "Saint Tyagaraja Aradhana annual music festival on Kaveri river banks" },
          { id: "papanasam", name: "Papanasam Taluk", color: "#3B82F6", headquarters: "Papanasam", highlights: "Historic 108 Shivalaya temples and lush Kaveri delta agriculture" },
          { id: "pattukkottai", name: "Pattukkottai Taluk", color: "#8B5CF6", headquarters: "Pattukkottai", highlights: "Vibrant coconut agricultural trade and coastal delta fisheries" },
          { id: "orathanadu", name: "Orathanadu Taluk", color: "#06B6D4", headquarters: "Orathanadu", highlights: "Traditional Chola cattle breeds and heritage rural markets" }
        ]
      },
      {
        id: "cuddalore",
        name: "Cuddalore",
        headquarters: "Cuddalore",
        color: "#06B6D4",
        popularity: "Chidambaram Nataraja Temple • Pichavaram Mangroves • Silver Beach",
        description: "Home to the world-renowned Chidambaram Nataraja Temple celebrating the cosmic dance of Shiva, Pichavaram Mangrove forest, and coastal maritime heritage.",
        heritage: "Chidambaram Nataraja Temple, Annamalai University, Silver Beach",
        culture: "Natyanjali Annual Classical Dance Festival, Vedic Temple Traditions",
        food: "Cuddalore Sea Fish Curry, Seeraga Samba Biryani, Panruti Jackfruit & Cashews",
        taluks: [
          { id: "chidambaram-taluk", name: "Chidambaram Taluk", color: "#8B5CF6", headquarters: "Chidambaram", highlights: "Lord Nataraja Cosmic Temple, Annamalai University & Pichavaram Mangrove wetlands" },
          { id: "cuddalore-taluk", name: "Cuddalore Taluk", color: "#06B6D4", headquarters: "Cuddalore", highlights: "Port city, Silver Beach, historic Fort St. David & SIPCOT industrial zone" },
          { id: "panruti", name: "Panruti Taluk", color: "#10B981", headquarters: "Panruti", highlights: "World-famous Jackfruit and roasted Cashew nut export capital of Tamil Nadu" },
          { id: "vriddhachalam", name: "Vriddhachalam Taluk", color: "#F59E0B", headquarters: "Vriddhachalam", highlights: "Ancient Kolanjiappar temple, rich ceramic pottery & fossil wood heritage" },
          { id: "kurinjipadi", name: "Kurinjipadi Taluk", color: "#EC4899", headquarters: "Kurinjipadi", highlights: "Handloom silk weaving traditions and agricultural markets" },
          { id: "tittagudi", name: "Tittagudi Taluk", color: "#3B82F6", headquarters: "Tittagudi", highlights: "Vellar river basin agriculture and traditional craft villages" }
        ]
      },
      {
        id: "madurai",
        name: "Madurai",
        headquarters: "Madurai",
        color: "#EC4899",
        popularity: "Ancient Temple City • Meenakshi Amman • Sangam Tamil Literature",
        description: "One of the oldest continuously inhabited cities on Earth, built as a lotus around the sacred Meenakshi Temple, famed for jasmine flowers and culinary traditions.",
        heritage: "Meenakshi Amman Temple, Thirumalai Nayakkar Mahal, Gandhi Memorial Museum",
        culture: "Sangam Tamil Academy Legacy, Madurai Malli (Jasmine), Chithirai Festival",
        food: "Jigarthanda, Madurai Kari Dosa, Bun Parotta, Idiyappam",
        taluks: [
          { id: "madurai-north", name: "Madurai North", color: "#EC4899", headquarters: "Tallakulam", highlights: "Civic center, Vaigai riverbank and historic college campuses" },
          { id: "madurai-south", name: "Madurai South", color: "#8B5CF6", headquarters: "Madurai City", highlights: "Meenakshi Temple precinct, Pudhu Mandapam markets & royal palaces" },
          { id: "melur", name: "Melur Taluk", color: "#F59E0B", headquarters: "Melur", highlights: "Granite sculpting, agricultural lands & historic Jain rock-cut caves" },
          { id: "usilampatti", name: "Usilampatti Taluk", color: "#10B981", headquarters: "Usilampatti", highlights: "Scenic foothills of Western Ghats and traditional rural agriculture" },
          { id: "vadipatti", name: "Vadipatti Taluk", color: "#3B82F6", headquarters: "Vadipatti", highlights: "Kulasekaranpattinam cultural hub and Vaigai dam canals" }
        ]
      },
      {
        id: "coimbatore",
        name: "Coimbatore",
        headquarters: "Coimbatore",
        color: "#3B82F6",
        popularity: "Manchester of South India • Adiyogi Shiva • Textile & Tech Powerhouse",
        description: "The economic powerhouse of western Tamil Nadu, famous for pump manufacturing, precision engineering, spinning mills, and the 112ft Adiyogi statue.",
        heritage: "Perur Pateeswarar Temple, Marudamalai Murugan Temple, Eachanari Vinayagar",
        culture: "Kongu Region Heritage, Precision Engineering, Eco-tourism",
        food: "Kongu Cuisine, Arisi Paruppu Sadam, Pallipalayam Chicken, Siruvani Sweet Water",
        taluks: [
          { id: "coimbatore-north", name: "Coimbatore North", color: "#3B82F6", headquarters: "Gandhipuram", highlights: "Premier engineering universities, tech parks and commercial hub" },
          { id: "coimbatore-south", name: "Coimbatore South", color: "#10B981", headquarters: "Sundarapuram", highlights: "Heavy manufacturing plants, textile machinery and Adiyogi Shiva" },
          { id: "pollachi", name: "Pollachi Taluk", color: "#F59E0B", headquarters: "Pollachi", highlights: "Lush coconut plantations, movie shooting locations & Topslip Anamalai Tiger Reserve" },
          { id: "sulur", name: "Sulur Taluk", color: "#EC4899", headquarters: "Sulur", highlights: "Indian Air Force Base, precision aerospace machining & textile parks" },
          { id: "mettupalayam", name: "Mettupalayam Taluk", color: "#8B5CF6", headquarters: "Mettupalayam", highlights: "Base station for UNESCO Nilgiri Mountain Railway toy train to Ooty" }
        ]
      },
      {
        id: "salem",
        name: "Salem",
        headquarters: "Salem",
        color: "#10B981",
        popularity: "Mango City • Steel & Sago Capital • Yercaud Hill Station",
        description: "Nestled amidst mountains, Salem is famous for Steel production, Malgoa mangoes, Sago starch factories, and the serene Yercaud hill retreat.",
        heritage: "Kottai Mariamman Temple, Sugavaneswarar Temple, 1008 Shiva Temple",
        culture: "Silk and Handloom Weaving, Steel Metallurgy, Mango Festivals",
        food: "Salem Malgoa Mangoes, Thattu Vadai Set, Salem Biryani",
        taluks: [
          { id: "salem-taluk", name: "Salem Taluk", color: "#10B981", headquarters: "Salem", highlights: "Steel Plant, commercial marketplaces and historic temples" },
          { id: "yercaud", name: "Yercaud Taluk", color: "#06B6D4", headquarters: "Yercaud", highlights: "Jewel of the South hill station, coffee plantations & Emerald Lake" },
          { id: "attur", name: "Attur Taluk", color: "#F59E0B", headquarters: "Attur", highlights: "Historic Attur Fort on Vasishta River and agricultural hub" },
          { id: "mettur", name: "Mettur Taluk", color: "#3B82F6", headquarters: "Mettur", highlights: "Stanley Dam on Kaveri River, thermal power plant & hydroelectric station" }
        ]
      },
      {
        id: "tiruchirappalli",
        name: "Tiruchirappalli (Trichy)",
        headquarters: "Tiruchirappalli",
        color: "#F97316",
        popularity: "Rockfort Temple • Srirangam Ranganathaswamy • Educational Hub",
        description: "Home to the colossal Rockfort Temple perched atop a 273ft rock and Srirangam, the largest functioning Hindu temple complex in the world.",
        heritage: "Rockfort Ucchi Pillayar Temple, Sri Ranganathaswamy Temple, Jambukeswarar Temple",
        culture: "Kaveri River Temple Traditions, NIT Trichy & IIM Academic Eminence",
        food: "Trichy Banana Chips, Srirangam Puliyodharai, Kaveri Filter Coffee",
        taluks: [
          { id: "trichy-west", name: "Tiruchirappalli West", color: "#F97316", headquarters: "Trichy City", highlights: "Ancient Rockfort temple, Central Railway Junction and commerce" },
          { id: "srirangam", name: "Srirangam Taluk", color: "#8B5CF6", headquarters: "Srirangam", highlights: "Magnificent 156-acre Sri Ranganathaswamy Temple on Kaveri island" },
          { id: "lalgudi", name: "Lalgudi Taluk", color: "#10B981", headquarters: "Lalgudi", highlights: "Fertile Kaveri-Coleroon river basin and Carnatic musical heritage" },
          { id: "thiruverumbur", name: "Thiruverumbur Taluk", color: "#3B82F6", headquarters: "Thiruverumbur", highlights: "BHEL industrial city, NIT Trichy and heavy engineering corridor" }
        ]
      },
      {
        id: "kanyakumari",
        name: "Kanyakumari",
        headquarters: "Nagercoil",
        color: "#EF4444",
        popularity: "Land's End of India • Vivekananda Rock • Triveni Sangam Sunset",
        description: "The southernmost tip of the Indian mainland where the Arabian Sea, Gulf of Mannar, and Bay of Bengal converge, famous for simultaneous sunrise and sunset.",
        heritage: "Vivekananda Rock Memorial, 133ft Thiruvalluvar Statue, Bhagavathy Amman Temple",
        culture: "Tri-sea Maritime Heritage, Tamil-Malayalam Cultural Blend",
        food: "Nanjil Fish Curry, Banana Chips, Kanyakumari Halwa",
        taluks: [
          { id: "agastheeswaram", name: "Agastheeswaram Taluk", color: "#EF4444", headquarters: "Kanyakumari", highlights: "Triveni Sangam confluence, Vivekananda Rock & Thiruvalluvar Statue" },
          { id: "thovalai", name: "Thovalai Taluk", color: "#F59E0B", headquarters: "Thovalai", highlights: "Asia's largest flower market and scenic Western Ghat mountain passes" },
          { id: "kalkulam", name: "Kalkulam Taluk", color: "#10B981", headquarters: "Padmanabhapuram", highlights: "Magnificent wooden Padmanabhapuram Royal Palace of Travancore kings" }
        ]
      }
    ]
  },
  {
    id: "kl",
    name: "Kerala",
    type: "State",
    color: STATE_COLOR_PALETTE.kl,
    capital: "Thiruvananthapuram",
    districtsCount: 14,
    population: "35.1 Million",
    mapCoords: { x: 1.8, y: -8.2, z: 0, scale: 1.3 },
    tagline: "God's Own Country • Serene Backwaters, Ayurveda & High Literacy",
    description: "World famous for palm-fringed backwaters, spice plantations on mist-covered Western Ghats, Kathakali classical dance, and highest human development index.",
    languages: ["Malayalam", "English"],
    heritage: "Sree Padmanabhaswamy Temple, Mattancherry Dutch Palace, Bekal Fort, St. Francis Church",
    famousFor: ["Backwater Houseboats", "Ayurvedic Healing", "Kathakali", "Tea Gardens", "Spices"],
    cuisine: "Kerala Sadya, Appam with Stew, Malabar Parotta, Karimeen Pollichathu, Payasam",
    festivals: ["Onam", "Vishu", "Thrissur Pooram", "Vallam Kali (Snake Boat Race)"],
    famousPlaces: [
      { id: "alleppey", name: "Alleppey Backwaters", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80", desc: "Network of tranquil canals and luxury houseboat cruises." },
      { id: "munnar", name: "Munnar Tea Hills", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80", desc: "Rolling emerald tea plantations and misty Western Ghats peaks." }
    ],
    districts: [
      {
        id: "tiruvananthapuram",
        name: "Thiruvananthapuram",
        headquarters: "Thiruvananthapuram",
        color: "#10B981",
        popularity: "Padmanabhaswamy Temple • Technopark IT Hub • Kovalam Beach",
        description: "The capital city blending royal Travancore palaces, the wealthiest temple on Earth, and Technopark, India's first IT park.",
        heritage: "Sree Padmanabhaswamy Temple, Kuthira Malika Palace, Napier Museum",
        culture: "Kathakali Performance, Royal Travancore Art, Classical Music",
        food: "Thiruvananthapuram Boli with Payasam, Fish Curry Meals, Pazham Pori",
        taluks: [
          { id: "tvm-taluk", name: "Thiruvananthapuram Taluk", color: "#10B981", headquarters: "Trivandrum", highlights: "Padmanabhaswamy temple, Government Secretariat & Napier Museum" },
          { id: "neyyattinkara", name: "Neyyattinkara Taluk", color: "#3B82F6", headquarters: "Neyyattinkara", highlights: "Poovar island, golden beach estuaries & historic handloom weaving" }
        ]
      },
      {
        id: "ernakulam",
        name: "Ernakulam (Kochi)",
        headquarters: "Kochi",
        color: "#3B82F6",
        popularity: "Queen of Arabian Sea • Fort Kochi • Chinese Fishing Nets",
        description: "A cosmopolitan port city and commercial hub famous for its 500-year-old Portuguese, Dutch and British colonial heritage and Cochin Port.",
        heritage: "Fort Kochi, Jewish Synagogue, St. Francis Church, Mattancherry Palace",
        culture: "Kochi-Muziris Biennale, Multi-faith Heritage, Kathakali Theatres",
        food: "Malabar Biryani, Puttu Kadala, Fish Molee, Karimeen Pollichathu",
        taluks: [
          { id: "kochi-taluk", name: "Kochi Taluk", color: "#3B82F6", headquarters: "Fort Kochi", highlights: "Chinese fishing nets, colonial heritage lanes & Mattancherry Palace" },
          { id: "kanayannur", name: "Kanayannur Taluk", color: "#8B5CF6", headquarters: "Ernakulam", highlights: "Commercial center, Marine Drive waterfront & SmartCity IT corridor" }
        ]
      }
    ]
  },
  {
    id: "ka",
    name: "Karnataka",
    type: "State",
    color: STATE_COLOR_PALETTE.ka,
    capital: "Bengaluru",
    districtsCount: 31,
    population: "67.5 Million",
    mapCoords: { x: 1.2, y: -5.2, z: 0, scale: 1.5 },
    tagline: "One State, Many Worlds • Silicon Valley of India & Royal Vijayanagara",
    description: "The technological nerve center of Asia, home to royal palaces of Mysuru, UNESCO monuments of Hampi, and lush Coorg coffee plantations.",
    languages: ["Kannada", "English"],
    heritage: "Hampi Group of Monuments (UNESCO), Pattadakal, Mysore Palace, Gol Gumbaz",
    famousFor: ["IT & Startups", "Mysore Silk & Sandalwood", "Coffee Plantations", "Hampi Ruins"],
    cuisine: "Bisi Bele Bath, Mysore Pak, Neer Dosa, Rava Idli, Coorg Pandi Curry",
    festivals: ["Mysore Dasara", "Ugadi", "Kambala Buffalo Race", "Karaga"],
    famousPlaces: [
      { id: "bengaluru-tech", name: "Bengaluru IT Hub", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80", desc: "India's technological engine and vibrant innovation center." },
      { id: "hampi", name: "Hampi UNESCO Ruins", image: "https://images.unsplash.com/photo-1600100397608-f090742f404d?auto=format&fit=crop&w=600&q=80", desc: "Magnificent 14th-century Vijayanagara empire stone architecture." }
    ],
    districts: [
      {
        id: "bengaluru-urban",
        name: "Bengaluru Urban",
        headquarters: "Bengaluru",
        color: "#3B82F6",
        popularity: "Silicon Valley of Asia • Garden City • Tech Startups Capital",
        description: "The global IT capital of India, known for lush parks, leading aerospace research labs, and vibrant cosmopolitan culture.",
        heritage: "Bangalore Palace, Tipu Sultan's Summer Palace, Vidhana Soudha",
        culture: "Tech Innovation Meetups, Classical Yakshagana, Theatre & Music",
        food: "Rava Dosa at MTR, Filter Coffee, Benne Dosa, Mysore Masala Dosa",
        taluks: [
          { id: "bengaluru-north", name: "Bengaluru North", color: "#3B82F6", headquarters: "Yelahanka", highlights: "International Airport tech corridor, Manyata Tech Park & research labs" },
          { id: "bengaluru-south", name: "Bengaluru South", color: "#10B981", headquarters: "Jayanagar", highlights: "Cultural centers, Lalbagh botanical garden & Electronic City IT hub" }
        ]
      },
      {
        id: "mysuru",
        name: "Mysuru",
        headquarters: "Mysuru",
        color: "#F59E0B",
        popularity: "City of Palaces • Mysore Dasara • Sandalwood & Silk",
        description: "The royal cultural capital of Karnataka, famous for the magnificent illuminated Mysore Palace, sandalwood carvings, and Dasara processions.",
        heritage: "Mysore Palace, Jaganmohan Palace, Chamundeshwari Temple",
        culture: "Royal Dasara Jumboo Savari, Mysore Silk Weaving, Yoga Capital",
        food: "Mysore Pak, Mysore Masala Dosa, Mysore Rasam",
        taluks: [
          { id: "mysuru-taluk", name: "Mysuru Taluk", color: "#F59E0B", headquarters: "Mysuru", highlights: "Grand Mysore Palace, Chamundi Hill & Devaraja heritage market" }
        ]
      }
    ]
  },
  {
    id: "mh",
    name: "Maharashtra",
    type: "State",
    color: STATE_COLOR_PALETTE.mh,
    capital: "Mumbai",
    districtsCount: 36,
    population: "123.1 Million",
    mapCoords: { x: -0.8, y: -2.5, z: 0, scale: 1.6 },
    tagline: "Financial Capital & Gateway to India • Land of Chhatrapati Shivaji Maharaj",
    description: "The economic growth engine of India, land of Chhatrapati Shivaji Maharaj, Bollywood cinema, Ajanta Ellora Caves, and Sahyadri mountain fortresses.",
    languages: ["Marathi", "Hindi", "English"],
    heritage: "Ajanta & Ellora Caves (UNESCO), Chhatrapati Shivaji Maharaj Terminus, Raigad Fort, Elephanta Caves",
    famousFor: ["Financial District", "Bollywood", "Ganesh Utsav", "Sahyadri Forts", "Dabbawalas"],
    cuisine: "Vada Pav, Misal Pav, Puran Poli, Pav Bhaji, Modak, Poha",
    festivals: ["Ganesh Chaturthi", "Gudi Padwa", "Shiv Jayanti", "Diwali"],
    famousPlaces: [
      { id: "mumbai-gateway", name: "Gateway of India, Mumbai", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80", desc: "Iconic waterfront monument overlooking the Arabian Sea." },
      { id: "ellora", name: "Ellora Kailasa Temple", image: "https://images.unsplash.com/photo-1600100397608-f090742f404d?auto=format&fit=crop&w=600&q=80", desc: "World's largest monolithic rock-cut cave temple." }
    ],
    districts: [
      {
        id: "mumbai-city",
        name: "Mumbai City",
        headquarters: "Mumbai",
        color: "#F59E0B",
        popularity: "Financial Capital of India • Bollywood • Gateway of India",
        description: "The City of Dreams, financial center of India, featuring Victorian Gothic architecture, Bombay Stock Exchange, and coastal Marine Drive.",
        heritage: "Gateway of India, CSMT Station, Elephanta Caves, Marine Drive",
        culture: "Bollywood Film Industry, Dabbawalas, Kala Ghoda Arts Festival",
        food: "Vada Pav, Pav Bhaji, Bombay Sandwich, Kanda Poha",
        taluks: [
          { id: "colaba", name: "Colaba & Fort Taluk", color: "#F59E0B", headquarters: "Fort", highlights: "Heritage business district, Gateway of India & Taj Mahal Palace" },
          { id: "dadar", name: "Dadar & Bandra Taluk", color: "#EC4899", headquarters: "Dadar", highlights: "Cultural hub, Shivaji Park, Bandra-Worli Sea Link & Bollywood lanes" }
        ]
      },
      {
        id: "pune",
        name: "Pune",
        headquarters: "Pune",
        color: "#8B5CF6",
        popularity: "Oxford of the East • Cultural Capital of Maharashtra • IT & Automotive Hub",
        description: "The cultural, academic, and IT capital of Maharashtra, historical seat of the Peshwas, surrounded by Sahyadri forts and Western Ghats retreats.",
        heritage: "Shaniwar Wada Palace, Aga Khan Palace, Sinhagad Fort, Dagadusheth Temple",
        culture: "Ganesh Utsav Dhol Tasha Pathak, Pune International Film Festival, Classical Music",
        food: "Punaykari Misal Pav, Bakarwadi, Sujata Mastani, Bun Maska",
        taluks: [
          { id: "pune-city-taluk", name: "Pune City Taluk", color: "#8B5CF6", headquarters: "Pune City", highlights: "Shaniwar Wada palace, Dagadusheth Ganpati shrine & Deccan Gymkhana" },
          { id: "haveli-taluk", name: "Haveli Taluk", color: "#3B82F6", headquarters: "Pimpri-Chinchwad", highlights: "Hinjawadi IT park, Pimpri manufacturing hub & Sinhagad fort foothills" },
          { id: "maval-taluk", name: "Maval (Lonavala) Taluk", color: "#10B981", headquarters: "Lonavala", highlights: "Lonavala-Khandala hill stations, Karla Bhaja Buddhist caves & waterfalls" }
        ]
      },
      {
        id: "nagpur",
        name: "Nagpur",
        headquarters: "Nagpur",
        color: "#10B981",
        popularity: "Orange City • Tiger Capital of India • Geographical Center of India",
        description: "The winter capital of Maharashtra, famous for juicy Nagpur Oranges, Zero Mile Stone (geographical center of undivided India), and tiger reserve gateways.",
        heritage: "Zero Mile Stone, Deekshabhoomi Monument, Sitabuldi Fort",
        culture: "Central Indian Trade Hub, Dhammachakra Pravartan Din",
        food: "Nagpuri Saoji Mutton Curry, Tarri Poha, Orange Barfi",
        taluks: [
          { id: "nagpur-urban", name: "Nagpur Urban Taluk", color: "#10B981", headquarters: "Nagpur", highlights: "Zero Mile marker, Futala lake promenade & Deekshabhoomi stupa" },
          { id: "ramtek", name: "Ramtek Taluk", color: "#F59E0B", headquarters: "Ramtek", highlights: "Historic Lord Rama temple, Kalidasa memorial & Pench Tiger Reserve gateway" }
        ]
      },
      {
        id: "nashik",
        name: "Nashik",
        headquarters: "Nashik",
        color: "#EC4899",
        popularity: "Wine Capital of India • Kumbh Mela • Trimbakeshwar Jyotirlinga",
        description: "Situated on the banks of holy Godavari River, Nashik is famous for the quadrennial Kumbh Mela, Trimbakeshwar Jyotirlinga, and premier vineyards.",
        heritage: "Trimbakeshwar Shiva Temple, Panchavati, Pandavleni Caves",
        culture: "Kumbh Mela Pilgrimage, Vineyard Oenology, Godavari Aarti",
        food: "Nashik Misal, Grapes & Fine Wine, Chivda",
        taluks: [
          { id: "nashik-city-taluk", name: "Nashik City Taluk", color: "#EC4899", headquarters: "Nashik", highlights: "Panchavati sacred bathing ghats, Ramkund & Sula Vineyards" },
          { id: "trimbak", name: "Trimbakeshwar Taluk", color: "#3B82F6", headquarters: "Trimbak", highlights: "Trimbakeshwar Jyotirlinga temple at source of Godavari river" }
        ]
      }
    ]
  },
  {
    id: "gj",
    name: "Gujarat",
    type: "State",
    color: STATE_COLOR_PALETTE.gj,
    capital: "Gandhinagar",
    districtsCount: 33,
    population: "70.4 Million",
    mapCoords: { x: -3.5, y: -0.5, z: 0, scale: 1.5 },
    tagline: "Jewel of Western India • Land of Mahatma Gandhi & Statue of Unity",
    description: "Home to the world's tallest statue (Statue of Unity), Asiatic lions of Gir Forest, Rann of Kutch salt desert, and vibrant Garba dance.",
    languages: ["Gujarati", "Hindi", "English"],
    heritage: "Statue of Unity, Sabarmati Ashram, Somnath Temple, Rani ki Vav (UNESCO)",
    famousFor: ["Statue of Unity", "Gir Asiatic Lions", "Rann Utsav", "Garba & Dandiya", "Diamond & Textile Capital"],
    cuisine: "Dhokla, Thepla, Gujarati Thali, Fafda Jalebi, Undhiyu, Khandvi",
    festivals: ["Navratri Garba", "Uttarayan Kite Festival", "Rann Utsav"],
    famousPlaces: [
      { id: "statue-unity", name: "Statue of Unity, Kevadia", image: "/statue-of-unity.png", desc: "182-metre world's tallest statue dedicated to Sardar Patel." }
    ],
    districts: [
      {
        id: "ahmedabad",
        name: "Ahmedabad",
        headquarters: "Ahmedabad",
        color: "#06B6D4",
        popularity: "First UNESCO World Heritage City of India • Sabarmati Ashram",
        description: "India's first UNESCO World Heritage City, blending Mahatma Gandhi's Sabarmati Ashram with modern Riverfront promenades and textile trade.",
        heritage: "Sabarmati Ashram, Adalaj Stepwell, Sidi Saiyyed Mosque",
        culture: "International Kite Festival, Garba Nights, Textile Weaving",
        food: "Fafda Jalebi, Manek Chowk Street Food, Gujarati Thali",
        taluks: [
          { id: "ahmedabad-city-taluk", name: "Ahmedabad City Taluk", color: "#06B6D4", headquarters: "Ahmedabad", highlights: "Sabarmati Ashram, Riverfront promenade & Heritage Pol houses" }
        ]
      }
    ]
  },
  {
    id: "rj",
    name: "Rajasthan",
    type: "State",
    color: STATE_COLOR_PALETTE.rj,
    capital: "Jaipur",
    districtsCount: 50,
    population: "81.0 Million",
    mapCoords: { x: -2.8, y: 2.2, z: 0, scale: 1.6 },
    tagline: "The Land of Kings • Royal Palaces, Forts & Thar Desert Sand Dunes",
    description: "Land of majestic Rajput hill forts, pink and blue royal cities, Thar Desert camel safaris, and legendary royal hospitality.",
    languages: ["Rajasthani", "Hindi"],
    heritage: "Amer Fort (UNESCO), Hawa Mahal, City Palace Jaipur, Mehrangarh Fort Jodhpur",
    famousFor: ["Royal Forts & Palaces", "Thar Desert", "Ghoomar Dance", "Block Prints", "Puppet Shows"],
    cuisine: "Dal Baati Churma, Laal Maas, Ghevar, Pyaz Kachori, Ker Sangri",
    festivals: ["Pushkar Camel Fair", "Teej", "Gangaur", "Desert Festival Jaisalmer"],
    famousPlaces: [
      { id: "jaipur-pink", name: "Hawa Mahal, Jaipur", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80", desc: "Iconic 953-window pink sandstone Palace of Winds." }
    ],
    districts: [
      {
        id: "jaipur",
        name: "Jaipur",
        headquarters: "Jaipur",
        color: "#7C3AED",
        popularity: "Pink City • UNESCO Heritage City • Hawa Mahal & Amer Fort",
        description: "The royal Pink City capital of Rajasthan, world famous for grid-planned heritage streets, Hawa Mahal, Jal Mahal, and Amer Fort.",
        heritage: "Amer Fort, Hawa Mahal, Jantar Mantar Observatory, City Palace",
        culture: "Ghoomar Dance, Royal Gemstone Cutting, Blue Pottery",
        food: "Dal Baati Churma, Rawat Pyaz Kachori, Ghevar",
        taluks: [
          { id: "jaipur-taluk", name: "Jaipur City Taluk", color: "#7C3AED", headquarters: "Jaipur", highlights: "Hawa Mahal, City Palace bazaar & Jantar Mantar UNESCO site" }
        ]
      }
    ]
  },
  {
    id: "dl",
    name: "Delhi",
    type: "Union Territory",
    color: STATE_COLOR_PALETTE.dl,
    capital: "New Delhi",
    districtsCount: 11,
    population: "30.0 Million",
    mapCoords: { x: -1.2, y: 3.5, z: 0, scale: 1.2 },
    tagline: "Capital of India • Millennia of History & National Governance",
    description: "The political heart of India, home to Rashtrapati Bhavan, Parliament House, Red Fort, Humayun's Tomb, and vibrant Chandni Chowk.",
    languages: ["Hindi", "English", "Punjabi", "Urdu"],
    heritage: "Red Fort (UNESCO), Qutub Minar (UNESCO), Humayun's Tomb (UNESCO), India Gate",
    famousFor: ["National Capital", "Mughal & British Architecture", "Street Food", "Parliament"],
    cuisine: "Chole Bhature, Butter Chicken, Paranthe Wali Gali, Dahi Bhalla",
    festivals: ["Republic Day Parade", "Diwali", "Independence Day"],
    famousPlaces: [
      { id: "red-fort-delhi", name: "Red Fort (Lal Qila)", image: "/red-fort.jpg", desc: "Historic Mughal red sandstone fortress where the Prime Minister hoists the National Flag." }
    ],
    districts: [
      {
        id: "new-delhi",
        name: "New Delhi",
        headquarters: "New Delhi",
        color: "#6366F1",
        popularity: "National Seat of Power • India Gate • Rashtrapati Bhavan",
        description: "The official national capital precinct housing Rashtrapati Bhavan, Kartavya Path, Parliament, and diplomatic enclaves.",
        heritage: "India Gate, Rashtrapati Bhavan, Parliament House, Connaught Place",
        culture: "National Ceremonies, Diplomatic Conventions, Museums",
        food: "Pandara Road Butter Chicken, Connaught Place Street Snacks",
        taluks: [
          { id: "chanakyapuri", name: "Chanakyapuri Taluk", color: "#6366F1", headquarters: "Chanakyapuri", highlights: "Diplomatic mission enclaves, Nehru Planetarium & National Rose Garden" }
        ]
      }
    ]
  }
];

export const INDIA_SPACE_MILESTONES = [
  {
    id: "chandrayaan-1",
    name: "Chandrayaan-1",
    year: "2008",
    type: "Lunar Orbiter Mission",
    status: "Success / Historic",
    desc: "India's first mission to the Moon. The Moon Impact Probe (MIP) discovered water molecules (H2O and OH) on the lunar surface, a monumental discovery in lunar science.",
    highlights: ["First Indian Moon Orbiter", "Discovered Lunar Water", "Mapped Lunar Surface in 3D"],
    icon: "🛰️"
  },
  {
    id: "chandrayaan-2",
    name: "Chandrayaan-2",
    year: "2019",
    type: "Lunar Orbiter, Lander & Rover",
    status: "Partial Success (Orbiter Active)",
    desc: "Sent an orbiter, lander (Vikram), and rover (Pragyan) to the Moon. While the soft-landing failed, the highly advanced orbiter is actively mapping the Moon's polar mineral composition.",
    highlights: ["Advanced Orbiter Active", "High-Resolution Lunar Camera", "Mapped Polar Ice Deposits"],
    icon: "🚀"
  },
  {
    id: "chandrayaan-3",
    name: "Chandrayaan-3",
    year: "2023",
    type: "Lunar Soft-Landing Mission",
    status: "Grand Success / Historic World First",
    desc: "Historic mission that made India the FIRST country to soft-land near the Lunar South Pole, and the fourth country to land on the Moon. Confirmed sulfur and analyzed lunar soil properties.",
    highlights: ["Lunar South Pole Landing", "World-First Success", "In-situ Soil & Temperature Analysis"],
    icon: "🌕"
  },
  {
    id: "mangalyaan",
    name: "Mangalyaan (MOM)",
    year: "2014",
    type: "Mars Orbiter Mission",
    status: "Grand Success / Historic World First",
    desc: "India became the first nation to reach Martian orbit on its maiden attempt, and at a fraction of the cost of Western space missions ($74 million).",
    highlights: ["First Attempt Success", "Most Cost-Effective Mars Mission", "Methane & Atmospheric Analysis"],
    icon: "🔴"
  },
  {
    id: "gaganyaan",
    name: "Gaganyaan",
    year: "2025–26",
    type: "Human Spaceflight Programme",
    status: "Upcoming / Active Training",
    desc: "India's premier human spaceflight mission, designed to send a 3-member crew of astronaut-designates (Gaganauts) into a 400km low Earth orbit for 3 days.",
    highlights: ["First Indigenous Human Spaceflight", "Crew & Safe Return Module", "Gaganauts undergoing advanced training"],
    icon: "👨‍🚀"
  }
];

export const NATIONAL_LEGENDS = [
  {
    id: "abdul-kalam",
    name: "Dr. A.P.J. Abdul Kalam",
    title: "The Missile Man & 11th President of India",
    lifespan: "1931 – 2015",
    image: "/scientists/kalam.jpg",
    quote: "Dream is not that which you see while sleeping, it is something that does not let you sleep.",
    role: "Led India's satellite launch vehicle (SLV-3) development and guided the Agni and Prithvi missile systems. Served as the beloved 'People's President' of India and inspired millions of students.",
    keyEvents: ["Project Director, SLV-3 (1980)", "Pokhran-II Nuclear Tests Leader (1998)", "President of India (2002–2007)", "Recipient of Bharat Ratna (1997)"]
  },
  {
    id: "vikram-sarabhai",
    name: "Dr. Vikram Sarabhai",
    title: "Father of the Indian Space Programme",
    lifespan: "1919 – 1971",
    image: "/scientists/sarabhai.jpg",
    quote: "We must be second to none in the application of advanced technologies to the real problems of man and society.",
    role: "Visionary physicist who established the Indian Space Research Organisation (ISRO) and spearheaded India's space vision, setting up the Thumba equatorial launch station.",
    keyEvents: ["ISRO Founded (1969)", "Physical Research Laboratory (1947)", "Aryabhata Satellite Concept (1975)"]
  },
  {
    id: "homi-bhabha",
    name: "Dr. Homi J. Bhabha",
    title: "Father of the Indian Nuclear Programme",
    lifespan: "1909 – 1966",
    image: "/scientists/bhabha.jpg",
    quote: "A cheap and abundant supply of power is the primary requirement for all industrial development.",
    role: "Founding director of TIFR and Bhabha Atomic Research Centre (BARC). Formulated India's three-stage nuclear power program utilizing native thorium reserves.",
    keyEvents: ["Tata Institute of Fundamental Research (1945)", "Atomic Energy Commission Chair (1948)", "Architect of Apsara Reactor (1956)"]
  }
];

