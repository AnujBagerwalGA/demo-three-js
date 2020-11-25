import React, { useEffect } from 'react';
import './App.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import TrackballControls from 'three-trackballcontrols';

const App = () => {
  let renderer,
    camera,
    controls,
    scene,
    width = window.innerWidth,
    height = window.innerHeight;

  const init = () => {
    //RENDERER
    renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('canvas'),
      antialias: true,
    });
    renderer.setClearColor(0x111111);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    //CAMERA
    camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
    camera.position.z = 100;

    // //CONTROLS
    // controls = new THREE.TrackballControls(camera);
    // controls.addEventListener('change', render);

    //SCENE
    scene = new THREE.Scene();

    //LIGHTS
    const light1 = new THREE.AmbientLight(0xffffff, 0.5),
      light2 = new THREE.DirectionalLight(0xffffff);

    light2.position.set(1, 1, 1);

    scene.add(light1);
    scene.add(light2);

    //width Resize
    // window.addEventListener('resize', onWindowResize, false);
  };

  // const animate = () => {
  //   requestAnimationFrame(animate);
  //   controls.update();
  // };

  const render = () => {
    renderer.render(scene, camera);
  };

  // const onWindowResize = () => {
  //   camera.aspect = width / height;
  //   camera.updateProjectionMatrix();
  //   camera.setSize(width / height);
  //   controls.handleResize();
  // };

  const addShapes = () => {
    let geometry = new THREE.BoxGeometry(10, 10, 10),
      material = new THREE.MeshNormalMaterial({ color: 0xff00ff });

    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  };

  useEffect(() => {
    init();
    // animate();
    addShapes();
    render();
  }, []);

  return <div className="App"></div>;
};

export default App;
