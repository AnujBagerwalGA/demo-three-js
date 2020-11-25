import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

const Demo = () => {
  let scene, camera, renderer;
  const [Img, setImg] = useState('logo512.png');

  const [fieldValue, setFieldValue] = useState('');

  useEffect(() => {
    init();
  }, []);

  // useEffect(() => {
  //   init();
  //   // render();
  // }, [Img]);

  console.log('object', Img);

  const update = () => {
    setImg('newFood.jpg');
  };

  const init = () => {
    // scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa9a9a9);

    // camera

    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.set(0, 25, 0);
    camera.lookAt(scene.position);

    // ground

    // const groundGeometry = new THREE.PlaneBufferGeometry(20, 20, 10, 10);
    // const groundMaterial = new THREE.MeshBasicMaterial({
    //   color: 0xcccccc,
    // });
    // groundMaterial.needsUpdate = true;
    // const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    // ground.rotation.x = Math.PI * -0.5;
    // scene.add(ground);

    // const textureLoader = new THREE.TextureLoader();
    // const t1 = textureLoader.load(Img);
    // const groundGeometry = new THREE.PlaneBufferGeometry(20, 20, 10, 10);
    // const groundMaterial = new THREE.MeshBasicMaterial({
    //   map: t1,
    // });
    // const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    // ground.rotation.x = Math.PI * -0.5;
    // scene.add(ground);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(Img, (map) => {
      console.log('map', map);
      const groundGeometry = new THREE.PlaneBufferGeometry(20, 20, 10, 10);
      const groundMaterial = new THREE.MeshBasicMaterial({
        map: map,
      });
      const ground = new THREE.Mesh(groundGeometry, groundMaterial);
      scene.add(ground);
    });
    //   console.log('map', map);
    //   groundMaterial.map = map;
    //   //   groundMaterial.transparent = true;
    //   //   groundMaterial.visible = true;
    //   groundMaterial.needsUpdate = true;
    // });

    // renderer

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 5;
    controls.maxDistance = 50;
    animate();
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
      {fieldValue && alert(fieldValue)}
      <button type="button" onClick={() => update()}>
        Update
      </button>
      {/* <button className="btn upload">
        <span>Upload Image</span>
        <input
          type="file"
          name="image"
          accept="image/png , image/jpeg , image/jpg"
          onChange={(e) => {
            const { files } = e.target;
            console.log('files', files);
            setFieldValue('');
            if (files[0].size > 2000000) {
              setFieldValue('File is too Big');
            } else if (!files[0].name.match(/\.(png|jpg|jpeg)$/)) {
              setFieldValue('File Extension is not correct');
            } else {
              const reader = new FileReader();
              reader.readAsDataURL(files[0]);
              reader.onloadend = (e) => {
                setImg(e.target.result);
                console.log('e.target.result', e.target.result);
              };
            }
          }}
        />
      </button> */}
    </div>
  );
};

export default Demo;
