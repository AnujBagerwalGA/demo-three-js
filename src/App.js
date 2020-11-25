import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { RoughnessMipmapper } from 'three/examples/jsm/utils/RoughnessMipmapper.js';
import { MathUtils } from 'three';

const App = () => {
  const [Img, setImg] = useState('');
  const [fieldValue, setFieldValue] = useState('');

  let renderer, stats, scene, camera;

  const init = () => {
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    let cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    let animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  };

  const DrawLine = () => {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      500
    );
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();

    //create a blue LineBasicMaterial
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    // After material we will need a geometry with some vertices:

    const points = [];
    points.push(new THREE.Vector3(-10, 0, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(10, 0, 0));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry, material);

    scene.add(line);
    renderer.render(scene, camera);
  };

  const Image = () => {
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    let camera = new THREE.PerspectiveCamera(
      75, //fov
      window.innerWidth / window.innerHeight, //expect ratio fov
      0.1, // near
      1000 // far
    );

    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = -35;

    let fbxLoader = new GLTFLoader();
    fbxLoader.load('/og.gltf', (obj) => {
      console.log('MODEL: ', obj);
      scene.add(obj.scene);
      renderer.render(scene, camera);
    });
  };

  const CarImage = () => {
    let scene, camera, renderer, car;
    scene = new THREE.Scene();
    // scene.background = new THREE.Color(0xdddddd);

    camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      5000
    );
    camera.rotation.y = (45 / 180) * Math.PI;
    camera.position.x = 800;
    camera.position.y = 100;
    camera.position.z = 1000;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let loader = new FBXLoader();
    loader.load('datsun240k.fbx', (gltf) => {
      console.log('MODEL: ', gltf);
      car = gltf.children[0];
      car.scale.set(0.5, 0.5, 0.5);
      scene.add(gltf);
    });
  };

  const UploasImageMesh = () => {
    // Scene
    const scene = new THREE.Scene();
    const aspect = window.innerWidth / window.innerHeight;

    // Camera
    const camera = new THREE.PerspectiveCamera(70, aspect, 0.1, 1000);

    // camera.position.y = 0.3;
    camera.position.z = 5;

    const geometry = new THREE.PlaneBufferGeometry(3, 3, 3);
    const size = 1;
    const divisions = 1;

    const gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);
    // const material = new THREE.MeshBasicMaterial({
    //   color: 0xffff00,
    // });

    // const plane = new THREE.Mesh(geometry, material);
    // plane.rotation.x = 1.5;
    // plane.position.y = -0.03;
    // scene.add(plane);

    // renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 100;
    controls.maxDistance = 1000;

    renderer.render(scene, camera);
  };

  const GetGrid = () => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa9a9a9);
    const camera = new THREE.PerspectiveCamera(
      95,
      window.innerWidth / window.innerHeight,
      0.5,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const size = 5;
    const divisions = 5;

    const gridHelper = new THREE.GridHelper(size, divisions);
    // gridHelper.rotation.x = Math.PI / 2;
    scene.add(gridHelper);

    const controls = new OrbitControls(camera, renderer.domElement);
    // const loader = new OBJLoader();

    // // load a resource
    // loader.load(
    //   // resource URL
    //   'Lamborginhi Aventador OBJ',
    //   // called when resource is loaded
    //   (object) => {
    //     console.log('object', object);
    //     object.scale.x = 0.1;
    //     object.scale.y = 0.1;
    //     object.scale.z = 0.1;

    //     scene.add(object);
    //   }
    // );

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
  };

  const Imgdata = () => {
    const loader = new THREE.TextureLoader();

    // load a resource
    loader.load(
      // resource URL
      // 'logo192.png',
      Img,

      // onLoad callback
      function (texture) {
        // in this example we create the material when the texture is loaded
        console.log('texture', texture);
        const geometry = new THREE.PlaneBufferGeometry(2, 2);
        const material = new THREE.MeshBasicMaterial({
          map: texture,
        });
        const mesh = new THREE.Mesh(geometry, material);
        // scene.add(mesh);
      }
    );
  };

  useEffect(() => {
    GetGrid();
  }, []);

  useEffect(() => {
    Imgdata();
  }, [Img]);

  return (
    <div>
      {fieldValue && alert(fieldValue)}
      <button className="btn upload">
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
      </button>
    </div>
  );
};

export default App;
