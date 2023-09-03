import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { markerData } from './utils/markers';
import countries from './utils/globe-data-min.json';

import './App.css';

const App = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Sizes
    const sizes = {
      width: 500,
      height: 500,
    };

    // Create Globe
    const Globe = new ThreeGlobe()
      .showAtmosphere(false)
      .ringsData(markerData)
      .ringColor('ringColor')
      .ringMaxRadius('maxR')
      .ringPropagationSpeed('propagationSpeed')
      .ringRepeatPeriod('repeatPeriod')
      .ringResolution(64)
      .pointsData(markerData)
      .pointAltitude(0.002)
      .pointColor('color')
      .pointRadius('radius')
      .pointResolution(64)
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(0)
      .hexPolygonMargin(0.3)
      .hexPolygonColor((e) => {
        if (['IND'].includes(e.properties.ISO_A3)) {
          return 'rgb(235, 131, 52)';
        } else return 'hsla(220, 4%, 85%, 1)';
      });

    const globeMaterial = Globe.globeMaterial();
    globeMaterial.opacity = 0.9;
    globeMaterial.color = new THREE.Color(0xffffff);

    Globe.rotation.x = 0.3;
    Globe.rotation.y = -1.35;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    scene.add(Globe);
    scene.add(new THREE.AmbientLight(0xbbbbbb, 1.3));

    // Camera
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 300);
    camera.position.z = 270;
    camera.updateProjectionMatrix();

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dynamicDampingFactor = 0.01;
    controls.enablePan = true;
    controls.minDistance = 101;
    controls.maxDistance = 370;
    controls.rotateSpeed = 1;
    controls.zoomSpeed = 1;
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI / 3.5;
    controls.maxPolarAngle = Math.PI - Math.PI / 3;

    // Animation
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    function scrollHandler(e) {
      e.preventDefault();
      e.stopPropagation();

      if (e.deltaY > 0) {
        Globe.hexPolygonColor((e) => {
          if (['IND'].includes(e.properties.ISO_A3)) {
            return 'rgb(235, 131, 52)';
          } else return 'hsla(220, 4%, 85%, 1)';
        });
        Globe.rotation.y -= 0.05;
      }
      if (e.deltaY < 0) {
        Globe.hexPolygonColor((e) => {
          if (['USA'].includes(e.properties.ISO_A3)) {
            return 'rgb(235, 131, 52)';
          } else return 'hsla(220, 4%, 85%, 1)';
        });
        Globe.rotation.y += 0.05;
      }
    }

    setTimeout(() => {
      Globe.hexPolygonResolution(3);
    }, 1000);

    canvasRef.current.addEventListener('wheel', scrollHandler);

    return () => {
      canvasRef.current.removeEventListener('wheel', scrollHandler);
    };
  }, []);

  return (
    <>
      <>
        <h1>dummy</h1>
        <h1>dummy</h1>
        <h1>dummy</h1>
        <h1>dummy</h1>
        <h1>dummy</h1>
        <h1>dummy</h1>
        <h1>dummy</h1>
        <h1>dummy</h1>
        <h1>dummy</h1>
        <h1>dummy</h1>
        <h1>dummy</h1>
        <h1>dummy</h1>
        <h1>dummy</h1>
        <h1>dummy</h1>
        <h1>dummy</h1>
      </>
      <div className='world-map'>
        <canvas ref={canvasRef}></canvas>
      </div>
    </>
  );
};

export default App;
