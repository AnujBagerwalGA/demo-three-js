import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

const App1 = () => {
  let scene, camera, renderer, controls;
  let aspect = window.innerWidth / window.innerHeight;
  const [Img, setImg] = useState('logo512.png');

  useEffect(() => {
    init();
  }, []);

  //   useEffect(() => {
  //     init();
  //   }, [Img]);

  const init = () => {
    LoadRest();
    LoadScene();
    LoadCamera();
    LoadRenderer();
    LoadControl();
    LoadFloor();
    animate();
  };

  const LoadRest = () => {
    scene = {};
    camera = {};
    renderer = {};
    controls = {};
  };

  const LoadScene = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa9a9a9);
  };

  const LoadCamera = () => {
    camera = new THREE.PerspectiveCamera(75, aspect, 1, 1000);
  };

  const LoadRenderer = () => {
    // renderer = null;
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
  };

  const LoadControl = () => {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 5;
    controls.maxDistance = 50;
    controls.update();

    // orbitControl = new OrbitControls(camera, renderer.domElement);
    // orbitControl.enableKeys = false;
    //orbitControl.damping = 0.2;
    //orbitControl.update();
    //orbitControl.addEventListener('change',renderCanvas);
  };

  const LoadFloor = () => {
    const textureLoader = new THREE.TextureLoader();
    const t1 = textureLoader.load(Img);
    const groundGeometry = new THREE.PlaneBufferGeometry(20, 20, 10, 10);
    const groundMaterial = new THREE.MeshBasicMaterial({
      map: t1,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI * -0.5;
    ground.scale.x = 0.3;
    ground.scale.y = 0.3;
    ground.scale.z = 0.3;

    scene.add(ground);
  };

  const animate = () => {
    requestAnimationFrame(animate);
    render();
  };

  const render = () => {
    renderer.render(scene, camera);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setImg('newFood.jpg');
          //   init();
        }}
      >
        Update
      </button>
    </div>
  );
};

export default App1;
