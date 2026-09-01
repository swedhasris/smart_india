import fs from 'fs';

async function main() {
  console.log('Fetching official Tamil Nadu GeoJSON from GitHub...');
  const res = await fetch('https://raw.githubusercontent.com/tarunshah/India-D3/master/TamilNadu.geojson');
  const geojson = await res.json();

  console.log('Total features fetched:', geojson.features.length);

  let minLng = Infinity, maxLng = -Infinity, minLat = Infinity, maxLat = -Infinity;

  geojson.features.forEach(f => {
    const geom = f.geometry;
    const coords = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;
    coords.forEach(poly => {
      poly.forEach(ring => {
        ring.forEach(([lng, lat]) => {
          if (lng < minLng) minLng = lng;
          if (lng > maxLng) maxLng = lng;
          if (lat < minLat) minLat = lat;
          if (lat > maxLat) maxLat = lat;
        });
      });
    });
  });

  console.log(`Bounds: Lng [${minLng}, ${maxLng}], Lat [${minLat}, ${maxLat}]`);

  const svgWidth = 800;
  const svgHeight = 900;
  const padding = 40;

  function project(lng, lat) {
    const x = padding + ((lng - minLng) / (maxLng - minLng)) * (svgWidth - 2 * padding);
    const y = svgHeight - (padding + ((lat - minLat) / (maxLat - minLat)) * (svgHeight - 2 * padding));
    return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
  }

  const DISTRICT_COLORS = [
    '#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6',
    '#06B6D4', '#EF4444', '#F97316', '#14B8A6', '#6366F1',
    '#84CC16', '#EAB308', '#A855F7', '#0EA5E9', '#22C55E',
    '#E11D48', '#D97706', '#2563EB', '#059669', '#7C3AED',
    '#38BDF8', '#34D399', '#FBBF24', '#F472B6', '#A78BFA'
  ];

  const districts = geojson.features.map((f, idx) => {
    const rawName = f.properties.NAME_2;
    // Clean up name variations if any
    let name = rawName;
    if (name === 'Tirunelveli Kattabo') name = 'Tirunelveli';
    if (name === 'Tiruchchirappalli') name = 'Tiruchirappalli';

    const id = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const geom = f.geometry;
    const coords = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;

    let pathD = '';
    let sumX = 0, sumY = 0, ptCount = 0;

    coords.forEach(poly => {
      poly.forEach((ring) => {
        ring.forEach(([lng, lat], pIdx) => {
          const [px, py] = project(lng, lat);
          if (pIdx === 0) {
            pathD += `M${px},${py}`;
          } else {
            pathD += ` L${px},${py}`;
          }
          sumX += px;
          sumY += py;
          ptCount++;
        });
        pathD += ' Z ';
      });
    });

    const cx = Math.round((sumX / ptCount) * 10) / 10;
    const cy = Math.round((sumY / ptCount) * 10) / 10;

    return {
      id,
      name,
      color: DISTRICT_COLORS[idx % DISTRICT_COLORS.length],
      path: pathD.trim(),
      cx,
      cy
    };
  });

  fs.writeFileSync('src/data/tnRealDistricts.js', `// Real Official Geographic Boundaries for Tamil Nadu Districts\nexport const REAL_TAMIL_NADU_DISTRICTS = ${JSON.stringify(districts, null, 2)};\n`);
  console.log('Successfully generated src/data/tnRealDistricts.js with', districts.length, 'real geographic districts!');
}

main().catch(console.error);
