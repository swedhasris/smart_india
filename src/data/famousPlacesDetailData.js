// Rich Verified Historical & Architectural Dataset for Famous Places Exploration

export const FAMOUS_PLACES_DETAIL_DATA = {
  "brihadeeswarar": {
    id: "brihadeeswarar",
    name: "Brihadisvara Temple",
    subtitle: "Thanjavur Peruvudaiyar Kovil (The Big Temple)",
    location: "Thanjavur, Tamil Nadu",
    districtId: "thanjavur",
    stateId: "tn",
    stateName: "Tamil Nadu",
    districtName: "Thanjavur",
    talukName: "Thanjavur Taluk",
    category: "Temple / UNESCO Monument",
    heroImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80",
    built: "1010 CE (Consecrated 25th Year of Raja Raja Chola I)",
    builder: "Emperor Raja Raja Chola I",
    architect: "Kunjara Mallan Raja Raja Perunthachan",
    era: "Middle Chola Dynasty",
    architecturalStyle: "Dravidian Temple Architecture (Granite Monolithic)",
    heritageStatus: "UNESCO World Heritage Site (1987)",
    unescoCriteria: "Criteria (ii) and (iii) — Outstanding testimony to Chola artistic & architectural achievements",
    managedBy: "Archaeology Survey of India (ASI) & HR&CE Department",
    bestKnownFor: "World's first all-granite temple, 216-ft Vimana tower, and single 80-tonne granite Kumbam capstone.",

    quickStats: [
      { label: "Location", val: "Thanjavur, Tamil Nadu" },
      { label: "Built Period", val: "1003 – 1010 CE" },
      { label: "Architectural Style", val: "Dravidian Granite" },
      { label: "Heritage Designation", val: "UNESCO World Heritage Site" },
      { label: "Vimana Tower Height", val: "66 metres (216 feet)" }
    ],

    story: {
      origin: "In 1003 CE, Emperor Raja Raja Chola I commissioned the grand temple after a divine vision in South India, celebrating the victory and prosperity of the Chola Empire across South Asia and the Indian Ocean.",
      construction: "Constructed over 7 years using over 130,000 tonnes of solid granite brought from quarries over 50 km away. Built without mortar or cement, using precision puzzle-interlocking stone masonry.",
      historicalRole: "Served as the spiritual center, royal treasury, cultural university, and public administration hub of the Chola Empire, employing thousands of dancers, musicians, astronomers, and scholars.",
      modernRole: "Remains an active house of worship for over 1,000 years, attracting millions of international heritage enthusiasts, historians, and devotees annually."
    },

    timeline: [
      { year: "1003 CE", title: "Royal Commission", desc: "Emperor Raja Raja Chola I orders the construction of a temple unprecedented in scale." },
      { year: "1010 CE", title: "Kumbhabhishekam", desc: "Temple consecrated; Raja Raja Chola presents golden vessels and land grants inscribed on walls." },
      { year: "1014 CE", title: "Inscription of Names", desc: "Names of all 400 temple dancers (Talippentukal), musicians, and stonemasons carved onto outer walls." },
      { year: "1500s CE", title: "Nayaka & Maratha Additions", desc: "Nayaka rulers erect the Nandi Mandapam housing the 20-tonne monolithic Nandi bull." },
      { year: "1987 CE", title: "UNESCO Designation", desc: "Inscribed as a UNESCO World Heritage Site under 'Great Living Chola Temples'." },
      { year: "2010 CE", title: "Millennium Celebration", desc: "1,000th Anniversary celebrated with 1,000 Bharatanatyam dancers performing simultaneously." }
    ],

    architecture: {
      styleOverview: "The temple represents the apex of Dravidian architecture, featuring a soaring 16-tier Vimana tower that towers over the entrance Gopurams — a rare architectural departure from later South Indian temples.",
      materials: "Completely constructed of hard grey granite. Over 130,000 tonnes of stone were quarried, transported, and carved with intricate relief sculptures without modern machinery.",
      engineeringFeat: "The top capstone (Kumbam) weighs 80 tonnes and was lifted to a height of 216 feet via an inclined earthen ramp over 6 km long starting from the village of Sarapallam.",
      shadowFact: "At noon, the shadow of the main Vimana tower never falls on the ground outside its base layout due to its mathematical pyramid geometry."
    },

    parts: [
      {
        id: "vimana",
        name: "Dakshina Meru (Main Vimana Tower)",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        description: "A 16-storey hollow pyramid tower rising 66 metres high, crowned by an 80-tonne single granite block dome.",
        significance: "One of the tallest temple towers in the world, built entirely of interlocking granite without binder."
      },
      {
        id: "nandi",
        name: "Monolithic Nandi Mandapam",
        image: "https://images.unsplash.com/photo-1621831971375-d0b4974f1c9c?auto=format&fit=crop&w=800&q=80",
        description: "Carved from a single block of granite, measuring 12 feet high, 19.5 feet long, and weighing 20 tonnes.",
        significance: "The second largest monolithic Nandi sculpture in India, housed inside a decorative Nayaka-era pavilion."
      },
      {
        id: "inscriptions",
        name: "Chola Wall Inscriptions",
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
        description: "Thousands of lines of precise Tamil script engraved into the basement granite walls.",
        significance: "Provides invaluable socio-economic records of 11th century India, detailing salaries, land grants, and employee lists."
      },
      {
        id: "sanctum",
        name: "Garbhagriha & Massive Shivalinga",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        description: "Houses a colossal 29-foot high Lingam carved out of monolithic black granite.",
        significance: "The sanctum remains an active sanctuary of worship where daily Vedic rituals have been maintained continuously for 1,000 years."
      }
    ],

    hotspots: [
      { x: 50, y: 35, title: "80-Tonne Granite Capstone (Kumbam)", text: "Lifted 216 feet high using a 6 km inclined ramp built from Sarapallam village." },
      { x: 30, y: 65, title: "16-Tiered Interlocking Pyramid", text: "Zero mortar used; stones are interlocked like precision puzzle blocks." },
      { x: 70, y: 75, title: "Outer Prakaram Courtyard", text: "Enclosed by a massive 240m x 120m colonnaded cloister corridor with 108 Karanas sculptures." }
    ],

    culturalSignificance: "Brihadisvara Temple is the beating heart of Tamil classical arts. Raja Raja Chola I patronized 400 classical dancers (Talippentukal), 212 musicians, and Vedic reciters, laying the groundwork for modern Bharatanatyam and Carnatic music.",

    famousFor: ["1000-Year-Old Granite Construction", "80-Tonne Capstone", "UNESCO Heritage", "Shadowless Noon Geometry", "Chola Epigraphy", "Bharatanatyam Heritage"],

    interestingFacts: [
      "No granite quarries exist within 50 km of Thanjavur; all 130,000 tonnes of granite were transported across rivers by elephant fleets.",
      "The shadow of the main Vimana tower never touches the ground outside the temple courtyard at noon throughout the year.",
      "The temple has survived 6 major earthquakes and centuries of monsoon storms without any structural displacement.",
      "Inscriptions detail the exact wages paid in paddy to every worker, including barbers, tailors, accountants, and torchbearers."
    ],

    thenNow: {
      then: "In 1010 CE, the temple operated as the imperial administrative epicenter, royal treasury, and university of the Chola Empire.",
      now: "Today, managed by the Archaeological Survey of India (ASI) and HR&CE, it is a protected UNESCO world monument and vibrant active worship shrine."
    },

    preservation: {
      authority: "Archaeological Survey of India (ASI)",
      efforts: "Chemical cleaning of granite surfaces, non-invasive laser scanning, stabilization of inner murals, and strict eco-zone traffic management around temple precinct.",
      tourismRules: "Footwear allowed only outside outer Gopuram; photography permitted in courtyards; sacred sanctum reserved for silent worship."
    },

    visitorInfo: {
      hours: "6:00 AM – 12:30 PM & 4:00 PM – 8:30 PM",
      entry: "Free Entry (No ticket required)",
      bestTime: "October to March (Winter Season)",
      locationText: "Membalam, Thanjavur, Tamil Nadu 613007",
      accessibility: "Ramped access available at outer precinct; battery vehicles for elderly visitors."
    },

    nearbyPlaces: [
      { id: "gangaikonda", name: "Gangaikonda Cholapuram", location: "Jayankondam (70 km)", image: "https://images.unsplash.com/photo-1600100397608-f090742f404d?auto=format&fit=crop&w=600&q=80", desc: "The sister Chola temple built by Rajendra Chola I." },
      { id: "thanjavur-palace", name: "Thanjavur Maratha Palace & Art Gallery", location: "Thanjavur Town (2 km)", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80", desc: "Historic royal palace housing Chola bronze statues." },
      { id: "swamimalai", name: "Swamimalai Bronze Casting Village", location: "Kumbakonam (35 km)", image: "https://images.unsplash.com/photo-1621831971375-d0b4974f1c9c?auto=format&fit=crop&w=600&q=80", desc: "World famous traditional lost-wax Chola bronze artisans." }
    ]
  },

  "taj": {
    id: "taj",
    name: "Taj Mahal",
    subtitle: "Crown of the Palaces — Immortal Monument to Love",
    location: "Agra, Uttar Pradesh",
    districtId: "agra",
    stateId: "up",
    stateName: "Uttar Pradesh",
    districtName: "Agra",
    talukName: "Agra Sadar",
    category: "Mausoleum / World Wonder",
    heroImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=80",
    built: "1632–1653 CE",
    builder: "Mughal Emperor Shah Jahan",
    architect: "Ustad Ahmad Lahori",
    era: "Mughal Empire Golden Age",
    architecturalStyle: "Indo-Islamic Mughal Architecture",
    heritageStatus: "UNESCO World Heritage Site (1983) & New 7 Wonders of the World",
    unescoCriteria: "Criteria (i) — The jewel of Muslim art in India and universally admired masterpiece",
    managedBy: "Archaeological Survey of India (ASI)",
    bestKnownFor: "Pure white Makrana marble dome, symmetrical Charbagh gardens, and exquisite Pietra Dura stone inlay art.",

    quickStats: [
      { label: "Location", val: "Agra, Uttar Pradesh" },
      { label: "Built Period", val: "1632 – 1653 CE (21 Years)" },
      { label: "Architectural Style", val: "Indo-Islamic Mughal" },
      { label: "Heritage Designation", val: "UNESCO World Heritage Site" },
      { label: "Main Dome Height", val: "73 metres (240 feet)" }
    ],

    story: {
      origin: "Commissioned in 1631 by Mughal Emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal, who died giving birth to their 14th child.",
      construction: "Over 20,000 artisans, sculptors, calligraphers, and stonemasons from across Asia worked for 21 years using translucent white Makrana marble brought 300 km from Rajasthan by 1,000 elephants.",
      historicalRole: "Served as the supreme imperial mausoleum of the Mughal Dynasty. Shah Jahan was later buried alongside Mumtaz Mahal inside the central octagonal chamber in 1666.",
      modernRole: "India's most famous global landmark, welcoming over 6 million visitors per year as an enduring symbol of love and architectural perfection."
    },

    timeline: [
      { year: "1631 CE", title: "Mumtaz Mahal Passes Away", desc: "Shah Jahan vows to build an unprecedented tomb of eternal beauty." },
      { year: "1632 CE", title: "Construction Commences", desc: "Ustad Ahmad Lahori leads 20,000 artisans in laying deep well-brick foundations." },
      { year: "1648 CE", title: "Mausoleum & Dome Completed", desc: "The central marble structure and 73-meter dome are finished." },
      { year: "1653 CE", title: "Charbagh Gardens & Outbuildings", desc: "The entire 42-acre complex including Jawab, Mosque, and gateway is finalized." },
      { year: "1983 CE", title: "UNESCO World Heritage Inscription", desc: "Recognized universally as an extraordinary cultural treasure." },
      { year: "2007 CE", title: "New Seven Wonders of the World", desc: "Voted one of the New Seven Wonders of the World by global poll." }
    ],

    architecture: {
      styleOverview: "Combines Islamic, Persian, Ottoman Turkish, and Indian architectural traditions into perfect bilateral symmetry centered on the main dome.",
      materials: "Translucent white Makrana marble inlaid with 28 types of semi-precious gems including lapis lazuli, jade, crystal, turquoise, and carnelian.",
      engineeringFeat: "Built on a flexible timber-and-brick well foundation anchored into the Yamuna riverbank to withstand soil shift and seismic tremors.",
      shadowFact: "The four 40-meter corner minarets are purposefully tilted 2 degrees outward so if an earthquake strikes, they fall away from the main dome."
    },

    parts: [
      {
        id: "dome",
        name: "Onion Dome (Amrud)",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
        description: "A 35-meter high double dome topped with a lotus motif and brass finial.",
        significance: "The double dome design creates acoustic resonance while reducing dead load weight."
      },
      {
        id: "inlay",
        name: "Pietra Dura (Parchin Kari) Marble Inlay",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
        description: "Intricate floral and calligraphic scrollwork created by setting cut gemstones into hand-carved marble grooves.",
        significance: "Single flowers contain over 50 individually cut semi-precious stone pieces."
      },
      {
        id: "gardens",
        name: "Charbagh (Four Gardens of Paradise)",
        image: "https://images.unsplash.com/photo-1598981457915-aea220950616?auto=format&fit=crop&w=800&q=80",
        description: "A 300-meter square Persian quadrangle garden divided into 16 sunken flowerbeds by reflecting water channels.",
        significance: "Symbolizes the 4 rivers of Paradise mentioned in classical Islamic literature."
      }
    ],

    hotspots: [
      { x: 50, y: 40, title: "Central Marble Onion Dome", text: "Double-walled marble shell engineered for acoustics and balance." },
      { x: 25, y: 70, title: "Outward Tilted Minarets", text: "Tilted 2° outward so earthquake collapse would never damage the central mausoleum." },
      { x: 50, y: 85, title: "Reflecting Pool (Al-Kawthar)", text: "Mirrors the Taj Mahal image perfectly across the central marble axis." }
    ],

    culturalSignificance: "The Taj Mahal is the ultimate expression of Mughal romantic poetry and artistic synthesis, drawing over 6 million domestic and international tourists annually.",

    famousFor: ["White Makrana Marble", "Pietra Dura Inlay", "Bilateral Symmetry", "UNESCO World Heritage", "New 7 Wonders of World", "Mughal Architecture"],

    interestingFacts: [
      "The Taj Mahal changes color throughout the day — pinkish in the morning, milky white in the afternoon, and golden under full moonlight.",
      "Shah Jahan spent 32 million Mughal rupees constructing the monument (equivalent to over $1 billion USD today).",
      "During World War II and the 1971 Indo-Pak war, the main dome was covered with bamboo scaffolding to camouflage it from enemy air reconnaissance.",
      "The four sides of the Taj Mahal are built with 100% perfect mathematical symmetry."
    ],

    thenNow: {
      then: "In the 17th century, it was surrounded by lush orchards along the bustling Yamuna trade river.",
      now: "Today, it is protected by a 10,400 sq km Taj Trapezium Zone (TTZ) pollution control sanctuary and ASI conservation experts."
    },

    preservation: {
      authority: "Archaeological Survey of India (ASI)",
      efforts: "Clay pack (Mud pack) herbal treatment to remove yellowing stains, strict electric vehicle zone within 500m radius.",
      tourismRules: "Night view allowed on full moon nights; electronic items restricted inside main dome tomb area."
    },

    visitorInfo: {
      hours: "Sunrise to Sunset (Closed on Fridays for prayers)",
      entry: "₹50 for Indian Citizens, ₹1100 for Foreign Tourists",
      bestTime: "October to March",
      locationText: "Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001",
      accessibility: "Golf carts & electric wheelchairs available at East and West gates."
    },

    nearbyPlaces: [
      { id: "agra-fort", name: "Agra Fort", location: "Agra (2.5 km)", image: "/agra-fort.png", desc: "Mughal imperial red sandstone palace complex." },
      { id: "fatehpur", name: "Fatehpur Sikri", location: "Agra Outskirts (35 km)", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80", desc: "Emperor Akbar's utopian desert capital city." }
    ]
  },

  "meenakshi-temple": {
    id: "meenakshi-temple",
    name: "Meenakshi Amman Temple",
    subtitle: "Historic Sangam Dravidian Gopuram Marvel",
    location: "Madurai, Tamil Nadu",
    districtId: "madurai",
    stateId: "tn",
    stateName: "Tamil Nadu",
    districtName: "Madurai",
    talukName: "Madurai South",
    category: "Temple Complex / Living Heritage",
    heroImage: "/meenakshi-temple.jpg",
    built: "6th Century BCE (Original) / 16th Century CE (Expanded by Nayakas)",
    builder: "Pandyan Kings & King Thirumalai Nayak",
    architect: "Classical Dravidian Guilds",
    era: "Pandyan & Nayaka Dynasties",
    architecturalStyle: "Dravidian Gopuram Architecture",
    heritageStatus: "National Heritage Monument & Nominee for New 7 Wonders",
    unescoCriteria: "Under consideration for UNESCO World Heritage Status",
    managedBy: "Madurai Arulmigu Meenakshi Sundareswarar Thirukoil Board & ASI",
    bestKnownFor: "14 soaring multi-colored Gopuram towers adorned with 33,000 mythological stone sculptures and the 1,000-Pillar Hall.",

    quickStats: [
      { label: "Location", val: "Madurai, Tamil Nadu" },
      { label: "Built Period", val: "6th Century BCE – 17th Century CE" },
      { label: "Gopuram Towers", val: "14 Towering Sculpted Gopurams" },
      { label: "Tallest Tower", val: "Southern Gopuram (52 metres / 170 ft)" },
      { label: "Sculptures Count", val: "33,000 Hand-Painted Stone Statues" }
    ],

    story: {
      origin: "Mentioned in 2,000-year-old Sangam literature, the temple was founded by Indran and developed by Pandyan kings to honor Goddess Meenakshi (Parvati) and Sundareswarar (Shiva).",
      construction: "Expanded extensively by Thirumalai Nayak (1623–1659 CE), who added soaring outer towers, sacred lotus tanks, and sprawling colonnaded mandapam halls.",
      historicalRole: "Served as the epicenter of Tamil language, poetry, Sangam literature assemblies, and divine coronation ceremonies.",
      modernRole: "Welcomes over 20,000 pilgrims daily and hosts the world-renowned Chithirai Thiruvizha festival with over 1 million attendees."
    },

    timeline: [
      { year: "600 BCE", title: "Ancient Sangam Foundations", desc: "Early Tamil texts record the founding of the Madurai lotus temple city." },
      { year: "1310 CE", title: "Malik Kafur Raid & Restoration", desc: "Plundered during Delhi Sultanate raids; later restored by Vijayanagara & Nayaka rulers." },
      { year: "1650 CE", title: "Thirumalai Nayak Golden Era", desc: "Construction of the Thousand Pillar Hall, Potramarai Kulam tank, and Southern Gopuram." },
      { year: "1995 CE", title: "Mural & Sculpture Restoration", desc: "Comprehensive conservation of 33,000 sculptures using natural herb dyes." },
      { year: "2017 CE", title: "Swachh Bharat Cleanest Monument", desc: "Awarded India's cleanest iconic place for eco-waste management." }
    ],

    architecture: {
      styleOverview: "A concentric rectangular grid layout covering 45 acres enclosed by high granite walls and dominated by 14 multi-storey Gopuram gateways.",
      materials: "Solid granite foundation and lower walls, topped with intricate lime-stucco mythological statues painted in vivid natural colors.",
      engineeringFeat: "The Ayiram Kaal Mandapam (1,000-Pillar Hall) contains 985 carved pillars arranged so that from any angle, they align in perfectly straight rows.",
      shadowFact: "Musical stone pillars near the North Gopuram produce distinct musical notes (Sa Re Ga Ma Pa) when struck with a wooden mallet."
    },

    parts: [
      {
        id: "gopuram",
        name: "Southern Gopuram Tower",
        image: "https://images.unsplash.com/photo-1621831971375-d0b4974f1c9c?auto=format&fit=crop&w=800&q=80",
        description: "The tallest tower in the complex at 52 meters (170 ft), decorated with over 1,500 colorful mythological figures.",
        significance: "Acts as the principal entrance landmark of Madurai city."
      },
      {
        id: "tank",
        name: "Potramarai Kulam (Golden Lotus Tank)",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        description: "A sacred rectangular water reservoir surrounded by pillared corridors with ancient ceiling murals.",
        significance: "Legend holds that the Sangam Tamil poets tested literary works by floating manuscripts on its waters."
      },
      {
        id: "hall1000",
        name: "Ayiram Kaal Mandapam (1,000 Pillar Hall)",
        image: "https://images.unsplash.com/photo-1600100397608-f090742f404d?auto=format&fit=crop&w=800&q=80",
        description: "A magnificent hall containing 985 sculptured pillars showcasing Yali mythological beasts and Chola-Nayaka art.",
        significance: "Now houses the Temple Art Museum featuring ancient bronzes, coins, and ivory carvings."
      }
    ],

    hotspots: [
      { x: 50, y: 25, title: "170-ft Southern Gopuram", text: "Adorned with 1,511 painted stone statues refreshed every 12 years." },
      { x: 40, y: 70, title: "Potramarai Kulam Lotus Tank", text: "Historic reservoir where Sangam poets evaluated Tamil literary works." },
      { x: 75, y: 65, title: "Musical Stone Pillars", text: "Monolithic stone pillars tuned to produce classical musical notes when tapped." }
    ],

    culturalSignificance: "Madurai is the cultural capital of Tamil Nadu. The temple is the center of Tamil devotional literature, Bharatanatyam dance, and traditional handloom Madurai Sungudi saree weaving.",

    famousFor: ["14 Towering Gopurams", "33,000 Sculptures", "1000 Pillar Hall", "Sangam Literature", "Golden Lotus Tank", "Chithirai Festival"],

    interestingFacts: [
      "The temple city of Madurai was designed in a Lotus layout radiating outward from the Meenakshi temple sanctum.",
      "The Thousand Pillar Hall actually contains 985 beautifully carved pillars; the remaining space holds 2 shrine sanctums.",
      "Over 33,000 statues line the 14 towers, and every 12 years, traditional craftsmen repair and repaint them during the Ashta Bandhana Kumbhabhishekam.",
      "Goddess Meenakshi is one of the very few female deities in India worshipped as the primary sovereign ruler of a major temple kingdom."
    ],

    thenNow: {
      then: "In the 16th century, it was the administrative and cultural heart of the Nayaka Kingdom.",
      now: "Today, it is a bustling spiritual magnet receiving 20,000 visitors daily with state-of-the-art heritage preservation."
    },

    preservation: {
      authority: "Hindu Religious & Charitable Endowments (HR&CE) & ASI",
      efforts: "Plastic-free temple zone, restoration of ancient ceiling frescoes using natural vegetable dyes.",
      tourismRules: "Dress code required (traditional Indian wear); mobile phones stored in security lockers prior to entry."
    },

    visitorInfo: {
      hours: "5:00 AM – 12:30 PM & 4:00 PM – 10:00 PM",
      entry: "Free Entry (₹50 for 1000 Pillar Hall Museum)",
      bestTime: "October to March (Chithirai Festival in April/May)",
      locationText: "Madurai Main, Madurai, Tamil Nadu 625001",
      accessibility: "Wheelchair accessible pathways and dedicated darshan lines for senior citizens."
    },

    nearbyPlaces: [
      { id: "thirumalai-nayak", name: "Thirumalai Nayakkar Palace", location: "Madurai (2 km)", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80", desc: "Grand 17th century palace featuring 82-foot stucco pillars." },
      { id: "alagar-kovil", name: "Alagar Kovil Temple & Kallazhagar", location: "Madurai Hills (21 km)", image: "https://images.unsplash.com/photo-1600100397608-f090742f404d?auto=format&fit=crop&w=600&q=80", desc: "Vishnu hill temple situated amidst dense reserve forests." }
    ]
  }
};
