import indiaMap from '@svg-maps/india';

console.log("Total locations in @svg-maps/india:", indiaMap.locations.length);
indiaMap.locations.forEach(loc => {
  console.log(`${loc.id} -> ${loc.name}`);
});
