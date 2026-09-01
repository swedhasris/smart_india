import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import indiaMap from '@svg-maps/india';

const loader = new SVGLoader();
const tamilNadu = indiaMap.locations.find(l => l.id === 'tn');

const svgStr = `<svg viewBox="${indiaMap.viewBox}"><path d="${tamilNadu.path}" /></svg>`;
const svgData = loader.parse(svgStr);

console.log("Parsed paths:", svgData.paths.length);
const shapes = SVGLoader.createShapes(svgData.paths[0]);
console.log("Created shapes count:", shapes.length);

const geom = new THREE.ExtrudeGeometry(shapes, { depth: 5, bevelEnabled: true });
console.log("ExtrudeGeometry position count:", geom.attributes.position.count);
