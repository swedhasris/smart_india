import indiaMap from '@svg-maps/india';
import { STATE_COLOR_PALETTE, INDIA_3D_STATES } from './india3dData';

// Map SVG location IDs to our metadata state IDs
export const SVG_TO_STATE_ID_MAP = {
  tg: 'ts', // Telangana
  ct: 'cg', // Chhattisgarh
  ut: 'uk', // Uttarakhand
  or: 'or', // Odisha
  dn: 'dd', // Dadra and Nagar Haveli
  dd: 'dd'  // Daman and Diu
};

// Export raw SVG map specification
export const INDIA_SVG_MAP = indiaMap;

// Helper to get state metadata by SVG location ID or normalized ID
export function getStateMetadata(svgLocId) {
  const normId = SVG_TO_STATE_ID_MAP[svgLocId] || svgLocId;
  const found = INDIA_3D_STATES.find(s => s.id === normId || s.id === svgLocId);

  if (found) return found;

  const loc = indiaMap.locations.find(l => l.id === svgLocId);
  const stateName = loc ? loc.name : normId.toUpperCase();
  const color = STATE_COLOR_PALETTE[normId] || STATE_COLOR_PALETTE[svgLocId] || '#8B5CF6';

  const defaultDistricts = [
    {
      id: `${normId}-central`,
      name: `${stateName} Central`,
      headquarters: `${stateName} City`,
      color: color,
      popularity: `Capital & Administrative Center of ${stateName}`,
      description: `Official administrative and economic capital district of ${stateName}.`,
      heritage: `Historic Government Secretariat & Civic Monuments`,
      culture: `Regional Traditions & Civic Heritage`,
      food: `Authentic Regional Delicacies`,
      taluks: [
        { id: `${normId}-central-t1`, name: `${stateName} Central Taluk`, color: color, headquarters: `${stateName} City`, highlights: `Civic Secretariat & Commerce` },
        { id: `${normId}-central-t2`, name: `${stateName} North Taluk`, color: '#3B82F6', headquarters: `North ${stateName}`, highlights: `Educational Institutes & Suburbs` }
      ]
    },
    {
      id: `${normId}-north`,
      name: `${stateName} North`,
      headquarters: `North Town`,
      color: '#3B82F6',
      popularity: `Agricultural & Cultural Hub of ${stateName}`,
      description: `Northern administrative district known for agriculture and heritage.`,
      heritage: `Ancient Shrines & Local Craft Centers`,
      culture: `Traditional Crafts & Farming Festivals`,
      food: `Local Harvest Specialities`,
      taluks: [
        { id: `${normId}-north-t1`, name: `North Rural Taluk`, color: '#3B82F6', headquarters: `North Town`, highlights: `Agriculture & Markets` },
        { id: `${normId}-north-t2`, name: `North Industrial Taluk`, color: '#10B981', headquarters: `North Hub`, highlights: `Manufacturing & Logistics` }
      ]
    },
    {
      id: `${normId}-south`,
      name: `${stateName} South`,
      headquarters: `South Coast/Hills`,
      color: '#10B981',
      popularity: `Scenic Tourism & Natural Wonders of ${stateName}`,
      description: `Southern scenic district famous for eco-tourism and natural landscapes.`,
      heritage: `Eco Reserve & Heritage Sanctuaries`,
      culture: `Folk Traditions & Mountain Culture`,
      food: `Fresh Local Harvest & Beverages`,
      taluks: [
        { id: `${normId}-south-t1`, name: `South Valley Taluk`, color: '#10B981', headquarters: `South Town`, highlights: `Eco Trails & Waterfalls` },
        { id: `${normId}-south-t2`, name: `South Heritage Taluk`, color: '#F59E0B', headquarters: `South City`, highlights: `Historical Monuments` }
      ]
    }
  ];

  return {
    id: normId,
    svgId: svgLocId,
    name: stateName,
    type: normId === 'dl' || normId === 'ch' || normId === 'py' || normId === 'an' || normId === 'ld' || normId === 'dd' || normId === 'jk' || normId === 'ladakh' ? 'Union Territory' : 'State',
    color: color,
    capital: `${stateName} Capital`,
    districtsCount: 15,
    population: '10+ Million',
    tagline: `Official State Profile of ${stateName} • Heritage, Culture & Citizen Governance`,
    description: `Official administrative profile of ${stateName}, highlighting governance, cultural heritage, and regional district services.`,
    languages: ['Hindi', 'English'],
    famousFor: ['Heritage Monuments', 'Regional Culture', 'E-Governance'],
    famousPlaces: [],
    districts: defaultDistricts
  };
}

