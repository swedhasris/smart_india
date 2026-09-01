import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { INDIA_SVG_MAP, getStateMetadata } from '../data/indiaRealBoundaries';

export default function India3DCanvas({
  viewLevel = 'INDIA',
  selectedState = null,
  selectedDistrict = null,
  hoveredStateId = null,
  onHoverState,
  onSelectState,
}) {
  const mountRef = useRef(null);

  // Three.js object refs
  const sceneRef       = useRef(null);
  const cameraRef      = useRef(null);
  const rendererRef    = useRef(null);
  const mapGroupRef    = useRef(null);
  const stateMeshesRef = useRef([]);
  const stateCenterMapRef = useRef({});
  const particlesRef   = useRef(null);
  const reqAnimRef     = useRef(null);

  // Live refs to avoid stale closures inside the rAF loop
  const targetCamPosRef   = useRef({ x: 0, y: 0.6, z: 17.5 });
  const mouseNormRef      = useRef({ x: 0, y: 0 });
  const hoveredIdRef      = useRef(null);
  const selectedStateRef  = useRef(null);
  const viewLevelRef      = useRef('INDIA');

  // Keep live refs in sync with props on every render
  hoveredIdRef.current     = hoveredStateId;
  selectedStateRef.current = selectedState;
  viewLevelRef.current     = viewLevel;

  // Mount effect — build scene once
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width  = container.clientWidth  || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // ─── Scene ───────────────────────────────────────────────
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x080C18, 0.028);

    // ─── Camera ──────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0.6, 17.5);
    camera.lookAt(0, 0.6, 0);
    cameraRef.current = camera;

    // ─── Renderer ────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true, alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ─── Lighting ────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.85));

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.6);
    dirLight.position.set(8, 20, 18);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(2048, 2048);
    scene.add(dirLight);

    // Subtle rim light from bottom
    const rimLight = new THREE.DirectionalLight(0x446688, 0.5);
    rimLight.position.set(-5, -15, 10);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(0x8B5CF6, 2.5, 28);
    pointLight.position.set(0, 0, 7);
    scene.add(pointLight);

    // ─── Particles ───────────────────────────────────────────
    const pCount = 350;
    const pPositions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPositions[i]     = (Math.random() - 0.5) * 40;
      pPositions[i + 1] = (Math.random() - 0.5) * 40;
      pPositions[i + 2] = (Math.random() - 0.5) * 22;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x7C6FCD, size: 0.1, transparent: true,
      opacity: 0.45, blending: THREE.AdditiveBlending, depthWrite: false
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);
    particlesRef.current = particles;

    // ─── India Map Group ─────────────────────────────────────
    const mapGroup = new THREE.Group();
    mapGroup.name = 'IndiaRealMap';
    scene.add(mapGroup);
    mapGroupRef.current = mapGroup;

    const svgLoader = new SVGLoader();
    const mapScale  = 0.018;
    const mapWidth  = 612;
    const mapHeight = 696;
    const offsetX   = -(mapWidth  * mapScale) / 2;
    const offsetY   =  (mapHeight * mapScale) / 2 + 0.6;

    stateMeshesRef.current = [];
    stateCenterMapRef.current = {};

    INDIA_SVG_MAP.locations.forEach((loc) => {
      const stateMeta = getStateMetadata(loc.id);
      const svgStr = `<svg viewBox="0 0 ${mapWidth} ${mapHeight}"><path d="${loc.path}" /></svg>`;

      try {
        const parsed = svgLoader.parse(svgStr);
        parsed.paths.forEach((path) => {
          const shapes = SVGLoader.createShapes(path);
          if (!shapes || !shapes.length) return;

          const extrudeSettings = {
            steps: 1, depth: 32,
            bevelEnabled: true,
            bevelThickness: 3, bevelSize: 2, bevelSegments: 3
          };

          const geometry = new THREE.ExtrudeGeometry(shapes, extrudeSettings);
          geometry.computeBoundingBox();

          // World-space centre for camera targeting
          const bboxCenter = new THREE.Vector3();
          geometry.boundingBox.getCenter(bboxCenter);
          const wc = {
            x: offsetX + bboxCenter.x * mapScale,
            y: offsetY - bboxCenter.y * mapScale,
            z: 0
          };
          stateCenterMapRef.current[stateMeta.id] = wc;
          stateCenterMapRef.current[loc.id]       = wc;

          const colorHex = parseInt(stateMeta.color.replace('#', '0x'), 16);
          const material = new THREE.MeshStandardMaterial({
            color: colorHex, roughness: 0.3, metalness: 0.18,
            emissive: colorHex, emissiveIntensity: 0.14,
            transparent: true, opacity: 1
          });

          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(offsetX, offsetY, 0);
          mesh.scale.set(mapScale, -mapScale, mapScale);
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.userData = {
            stateObj: { ...stateMeta, svgId: loc.id, worldCenter: wc }
          };

          mapGroup.add(mesh);
          stateMeshesRef.current.push(mesh);
        });
      } catch (err) {
        console.warn(`3D boundary error for ${loc.name}:`, err);
      }
    });

    // ─── Raycaster ───────────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const getHitState = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(stateMeshesRef.current);
      return hits.length > 0 ? hits[0].object.userData.stateObj : null;
    };

    const handlePointerMove = (e) => {
      // Only interactive at INDIA level
      if (viewLevelRef.current !== 'INDIA') return;
      mouseNormRef.current = {
        x: ((e.clientX / window.innerWidth) - 0.5) * 2,
        y: ((e.clientY / window.innerHeight) - 0.5) * 2
      };
      const hit = getHitState(e);
      container.style.cursor = hit ? 'pointer' : 'default';
      if (onHoverState) onHoverState(hit, hit ? { x: e.clientX, y: e.clientY } : null);
    };

    const handlePointerClick = (e) => {
      if (viewLevelRef.current !== 'INDIA') return;
      const hit = getHitState(e);
      if (hit && onSelectState) onSelectState(hit);
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('click', handlePointerClick);

    // ─── Animation Loop ──────────────────────────────────────
    const clock = new THREE.Clock();

    const animate = () => {
      reqAnimRef.current = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const vl = viewLevelRef.current;
      const hId = hoveredIdRef.current;
      const sel = selectedStateRef.current;

      // Particle drift
      if (particlesRef.current) {
        particlesRef.current.rotation.y = t * 0.025;
        particlesRef.current.rotation.x = Math.sin(t * 0.018) * 0.035;
      }

      // Smooth camera interpolation
      const tgt = targetCamPosRef.current;
      camera.position.x += (tgt.x - camera.position.x) * 0.055;
      camera.position.y += (tgt.y - camera.position.y) * 0.055;
      camera.position.z += (tgt.z - camera.position.z) * 0.055;
      camera.lookAt(tgt.x, tgt.y, 0);

      // Parallax tilt (only at INDIA level)
      if (mapGroupRef.current && vl === 'INDIA') {
        const mx = mouseNormRef.current.x;
        const my = mouseNormRef.current.y;
        mapGroupRef.current.rotation.y += (mx * 0.07 - mapGroupRef.current.rotation.y) * 0.05;
        mapGroupRef.current.rotation.x += (-my * 0.06 - mapGroupRef.current.rotation.x) * 0.05;
      } else if (mapGroupRef.current) {
        mapGroupRef.current.rotation.y += (0 - mapGroupRef.current.rotation.y) * 0.04;
        mapGroupRef.current.rotation.x += (0 - mapGroupRef.current.rotation.x) * 0.04;
      }

      // Per-mesh hover / selection / fade animation
      stateMeshesRef.current.forEach((m) => {
        const sd = m.userData.stateObj;
        const isHov = hId && (sd.id === hId || sd.svgId === hId);
        const isSel = sel && (sd.id === sel.id || sd.svgId === sel.id);

        // Z elevation
        let targetZ = 0;
        if (isHov)                          targetZ = 0.55;
        else if (isSel && vl !== 'INDIA')   targetZ = 0.3;
        m.position.z += (targetZ - m.position.z) * 0.12;

        // Emissive glow
        let targetEmit = 0.14;
        if (isHov)                          targetEmit = 0.55;
        else if (isSel)                     targetEmit = 0.38;
        else if (vl !== 'INDIA' && !isSel) targetEmit = 0.06;
        m.material.emissiveIntensity += (targetEmit - m.material.emissiveIntensity) * 0.12;

        // Opacity fade for non-selected in state/district views
        let targetOpacity = 1;
        if (vl !== 'INDIA' && !isSel) targetOpacity = 0.22;
        m.material.opacity += (targetOpacity - m.material.opacity) * 0.08;
        m.material.transparent = true;
      });

      renderer.render(scene, camera);
    };

    animate();

    // ─── Resize ──────────────────────────────────────────────
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth  || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('click', handlePointerClick);
      if (reqAnimRef.current) cancelAnimationFrame(reqAnimRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Camera zoom effect — reacts to viewLevel / selectedState / selectedDistrict
  useEffect(() => {
    const centers = stateCenterMapRef.current;

    if (viewLevel === 'INDIA') {
      targetCamPosRef.current = { x: 0, y: 0.6, z: 17.5 };
    } else if ((viewLevel === 'STATE' || viewLevel === 'DISTRICT' || viewLevel === 'TALUK') && selectedState) {
      const sc = centers[selectedState.id] || centers[selectedState.svgId] ||
                 selectedState.worldCenter || { x: 0, y: 0.6 };
      const z = viewLevel === 'STATE' ? 8.2
              : viewLevel === 'DISTRICT' ? 5.8
              : 4.5; // TALUK
      targetCamPosRef.current = { x: sc.x, y: sc.y, z };
    }
  }, [viewLevel, selectedState, selectedDistrict]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        zIndex: 1, overflow: 'hidden'
      }}
    />
  );
}
