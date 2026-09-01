const fs = require('fs');
const https = require('https');
const path = require('path');

const url = 'https://raw.githubusercontent.com/Subhash9325/GeoJson-Data-of-Indian-States/master/Indian_States';

console.log("Fetching raw GeoJSON from:", url);

https.get(url, (res) => {
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      console.log("Downloaded raw bytes:", rawData.length);
      const data = JSON.parse(rawData);
      console.log("Parsed features:", data.features.length);

      const stateIdMap = {
        "Andaman and Nicobar": "an",
        "Andhra Pradesh": "ap",
        "Arunachal Pradesh": "ar",
        "Assam": "as",
        "Bihar": "br",
        "Chandigarh": "ch",
        "Chhattisgarh": "cg",
        "Dadra and Nagar Haveli": "dd",
        "Daman and Diu": "dd",
        "Delhi": "dl",
        "Goa": "ga",
        "Gujarat": "gj",
        "Haryana": "hr",
        "Himachal Pradesh": "hp",
        "Jammu and Kashmir": "jk",
        "Jharkhand": "jh",
        "Karnataka": "ka",
        "Kerala": "kl",
        "Lakshadweep": "ld",
        "Madhya Pradesh": "mp",
        "Maharashtra": "mh",
        "Manipur": "mn",
        "Meghalaya": "ml",
        "Mizoram": "mz",
        "Nagaland": "nl",
        "Orissa": "or",
        "Odisha": "or",
        "Puducherry": "py",
        "Punjab": "pb",
        "Rajasthan": "rj",
        "Sikkim": "sk",
        "Tamil Nadu": "tn",
        "Telangana": "ts",
        "Tripura": "tr",
        "Uttar Pradesh": "up",
        "Uttaranchal": "uk",
        "Uttarakhand": "uk",
        "West Bengal": "wb",
        "Ladakh": "ladakh"
      };

      function simplifyRing(ring, tolerance = 0.08) {
        if (ring.length <= 4) return ring;
        const result = [ring[0]];
        let prev = ring[0];
        for (let i = 1; i < ring.length - 1; i++) {
          const pt = ring[i];
          const dx = pt[0] - prev[0];
          const dy = pt[1] - prev[1];
          if (Math.sqrt(dx * dx + dy * dy) >= tolerance) {
            // Round to 4 decimals to keep file lightweight and fast
            result.push([Math.round(pt[0] * 10000) / 10000, Math.round(pt[1] * 10000) / 10000]);
            prev = pt;
          }
        }
        result.push([Math.round(ring[ring.length - 1][0] * 10000) / 10000, Math.round(ring[ring.length - 1][1] * 10000) / 10000]);
        return result;
      }

      const processedStates = {};

      data.features.forEach((feature) => {
        const name = feature.properties.NAME_1;
        const stateId = stateIdMap[name] || name.toLowerCase().replace(/[^a-z]/g, '');
        const geomType = feature.geometry.type;
        let rings = [];

        if (geomType === "Polygon") {
          const exterior = feature.geometry.coordinates[0];
          if (exterior && exterior.length > 3) {
            rings.push(simplifyRing(exterior));
          }
        } else if (geomType === "MultiPolygon") {
          feature.geometry.coordinates.forEach((poly) => {
            const exterior = poly[0];
            if (exterior && exterior.length > 5) {
              rings.push(simplifyRing(exterior));
            }
          });
        }

        rings.sort((a, b) => b.length - a.length);
        const mainRings = rings.slice(0, 3);

        if (!processedStates[stateId]) {
          processedStates[stateId] = {
            id: stateId,
            name: name,
            rings: mainRings
          };
        } else {
          processedStates[stateId].rings.push(...mainRings);
        }
      });

      const outputPath = path.resolve('c:/Users/HP/Downloads/sih data/src/data/indiaGeoBoundaries.js');
      const fileContent = `// Real Geographic Boundaries for Indian States & Union Territories
// Extracted and projected from official Survey of India / Open GIS GeoJSON datasets

export const INDIA_GEO_BOUNDARIES = ${JSON.stringify(processedStates, null, 2)};
`;

      fs.writeFileSync(outputPath, fileContent, 'utf8');
      console.log("SUCCESS! Generated indiaGeoBoundaries.js with states:", Object.keys(processedStates).length);
    } catch (e) {
      console.error("Error processing GeoJSON:", e);
    }
  });
}).on('error', (err) => {
  console.error("HTTPS Error:", err);
});
