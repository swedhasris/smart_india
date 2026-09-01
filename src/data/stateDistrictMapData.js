import { REAL_TAMIL_NADU_DISTRICTS } from './tnRealDistricts';

export const TAMIL_NADU_DISTRICT_PATHS = REAL_TAMIL_NADU_DISTRICTS;

// High-fidelity Multi-Colored Organic Interlocking Taluks per District
export const DISTRICT_TALUKS_MAP = {
  cuddalore: [
    {
      id: 'cuddalore-taluk',
      name: 'Cuddalore Taluk',
      color: '#06B6D4',
      path: 'M380,65 L530,80 L515,200 L390,150 Z',
      cx: 450, cy: 120,
      hq: 'Cuddalore',
      highlights: 'Silver Beach port coast, Fort St. David & SIPCOT industrial manufacturing corridor'
    },
    {
      id: 'panruti',
      name: 'Panruti Taluk',
      color: '#10B981',
      path: 'M260,70 L380,65 L390,150 L270,160 Z',
      cx: 325, cy: 110,
      hq: 'Panruti',
      highlights: 'World-famous Jackfruit orchards, cashew nut processing & ceramic kilns'
    },
    {
      id: 'vriddhachalam',
      name: 'Vriddhachalam Taluk',
      color: '#F59E0B',
      path: 'M110,130 L260,70 L270,160 L210,260 L100,210 Z',
      cx: 175, cy: 165,
      hq: 'Vriddhachalam',
      highlights: 'Ancient Kolanjiappar Temple, Manimukthar river basin & pottery ceramic heritage'
    },
    {
      id: 'kurinjipadi',
      name: 'Kurinjipadi Taluk',
      color: '#EC4899',
      path: 'M270,160 L390,150 L380,280 L250,280 L210,260 Z',
      cx: 300, cy: 220,
      hq: 'Kurinjipadi',
      highlights: 'Traditional handloom lungi & silk weaving clusters and agro-markets'
    },
    {
      id: 'chidambaram-taluk',
      name: 'Chidambaram Taluk',
      color: '#8B5CF6',
      path: 'M390,150 L515,200 L500,350 L380,280 Z',
      cx: 445, cy: 245,
      hq: 'Chidambaram',
      highlights: 'Nataraja Cosmic Temple, Annamalai University & Pichavaram Mangrove Wetlands'
    },
    {
      id: 'tittagudi',
      name: 'Tittagudi Taluk',
      color: '#3B82F6',
      path: 'M100,210 L210,260 L250,280 L230,360 L110,350 Z',
      cx: 165, cy: 290,
      hq: 'Tittagudi',
      highlights: 'Wellington Reservoir irrigation, fertile black soil farming & historic temples'
    }
  ],

  thanjavur: [
    {
      id: 'thiruvaiyaru',
      name: 'Thiruvaiyaru Taluk',
      color: '#10B981',
      path: 'M160,70 L300,60 L285,170 L150,150 Z',
      cx: 220, cy: 110,
      hq: 'Thiruvaiyaru',
      highlights: 'Saint Tyagaraja Samadhi & national Carnatic Aradhana music festival'
    },
    {
      id: 'kumbakonam',
      name: 'Kumbakonam Taluk',
      color: '#EC4899',
      path: 'M300,60 L480,75 L460,195 L285,170 Z',
      cx: 380, cy: 125,
      hq: 'Kumbakonam',
      highlights: 'City of 100 Temples, sacred Mahamaham Tank, brass lamps & Degree Coffee'
    },
    {
      id: 'thanjavur-taluk',
      name: 'Thanjavur Taluk',
      color: '#F59E0B',
      path: 'M150,150 L285,170 L260,290 L130,270 Z',
      cx: 205, cy: 220,
      hq: 'Thanjavur',
      highlights: 'Big Temple UNESCO World Heritage site, Maratha Palace & Tanjore Painting ateliers'
    },
    {
      id: 'papanasam',
      name: 'Papanasam Taluk',
      color: '#3B82F6',
      path: 'M285,170 L460,195 L430,310 L260,290 Z',
      cx: 360, cy: 240,
      hq: 'Papanasam',
      highlights: '108 Shivalaya temples, rich Kaveri delta paddy & agricultural commerce'
    },
    {
      id: 'orathanadu',
      name: 'Orathanadu Taluk',
      color: '#06B6D4',
      path: 'M130,270 L260,290 L240,400 L110,380 Z',
      cx: 185, cy: 335,
      hq: 'Orathanadu',
      highlights: 'Traditional Chola native cattle breeding and heritage weekly markets'
    },
    {
      id: 'pattukkottai',
      name: 'Pattukkottai Taluk',
      color: '#8B5CF6',
      path: 'M260,290 L430,310 L400,420 L240,400 Z',
      cx: 330, cy: 355,
      hq: 'Pattukkottai',
      highlights: 'Coastal delta fishing harbor, vast coconut plantations & handcrafts'
    }
  ],

  chennai: [
    {
      id: 'anna-nagar',
      name: 'Anna Nagar Taluk',
      color: '#EC4899',
      path: 'M100,60 L230,75 L210,170 L90,155 Z',
      cx: 155, cy: 115,
      hq: 'Anna Nagar',
      highlights: 'Cosmopolitan planned avenue with landmark Tower Park & commercial plazas'
    },
    {
      id: 'egmore',
      name: 'Egmore Taluk',
      color: '#10B981',
      path: 'M230,75 L380,90 L355,190 L210,170 Z',
      cx: 290, cy: 130,
      hq: 'Egmore',
      highlights: 'Government Museum, Connemara Library & Heritage Railway Terminus'
    },
    {
      id: 't-nagar',
      name: 'T. Nagar Taluk',
      color: '#F59E0B',
      path: 'M90,155 L210,170 L190,275 L70,260 Z',
      cx: 140, cy: 215,
      hq: 'Thyagaraya Nagar',
      highlights: 'Asia’s largest silk saree & gold jewellery retail shopping boulevard'
    },
    {
      id: 'mylapore',
      name: 'Mylapore Taluk',
      color: '#8B5CF6',
      path: 'M210,170 L355,190 L330,300 L190,275 Z',
      cx: 270, cy: 235,
      hq: 'Mylapore',
      highlights: 'Ancient Kapaleeshwarar temple, San Thome Basilica & Carnatic music sabhas'
    },
    {
      id: 'guindy',
      name: 'Guindy Taluk',
      color: '#3B82F6',
      path: 'M70,260 L190,275 L170,380 L50,365 Z',
      cx: 120, cy: 320,
      hq: 'Guindy',
      highlights: 'Guindy National Park, IIT Madras campus & Raj Bhavan presidential estate'
    },
    {
      id: 'velachery',
      name: 'Velachery Taluk',
      color: '#06B6D4',
      path: 'M190,275 L330,300 L305,405 L170,380 Z',
      cx: 250, cy: 340,
      hq: 'Velachery',
      highlights: 'IT corridor transit hub, Phoenix Marketcity mall & residential towers'
    }
  ]
};

