import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { HolloEffect } from "./HoloEffect";

import GUI from "lil-gui";
import gsap from "gsap"
// Supondo que human.glb esteja no diretório correto
import humanModelUrl from './shader/human.glb';
import env from './img/env.jpg'

export default class Sketch {
  constructor(options) {
    this.scene = new THREE.Scene();

    this.container = options.dom;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0x0d0b0e);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.001, 1000);

    // Configura a posição da câmera para focalizar no objeto 3D humano
    this.camera.position.set(-0.001, 0.9, 0.03);
    this.camera.lookAt(0, 0, 0);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.render.toneMapping = THREE.ACESFilmicToneMapping;
    this.render.toneMappingExposure = 0.8;

    this.setupDRACOLoader();
    this.settings();

    this.initPost();

    this.addObjects();
    this.addLights();
    this.resize();
    this.setupResize();
    this.render();
  }

  initPost() {
    this.renderScene = new RenderPass(this.scene, this.camera);
    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5,0.4,0.85);
    this.bloomPass.threshold = this.settings.bloomThreshold;
    this.bloomPass.strength = this.settings.bloomStrength;
    this.bloomPass.radius = this.settings.bloomRadius;


    this.holloEffect = new ShaderPass(HolloEffect);


    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(this.renderScene);
    this.composer.addPass(this.bloomPass);
    this.composer.addPass(this.holloEffect);

  }

  settings(){
    let that = this;
    this.settings = {
      exposure:2,
      bloomStrength: 0.8,
      bloomThreshold: 0.1,
      bloomRadius: 0.8
    }
    /*
    this.gui = new GUI();
    this.gui.add(this.settings,"exposure",0,3,0.01).onChange(()=>{
      that.renderer.toneMappingExposure = this.settings.exposure
    });*/
  }

  setupDRACOLoader() {
    this.dracoLoader = new DRACOLoader();
    // Use uma CDN ou caminho local para os decoders DRACO compatível com a versão r147
    this.dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.1/');
    this.gltfLoader = new GLTFLoader();
    this.gltfLoader.setDRACOLoader(this.dracoLoader);
  }

  addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.composer.setSize(this.width,this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  addObjects() {

    this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.pmremGenerator.compileEquirectangularShader();
    this.envMap = new THREE.TextureLoader().load(env, (texture) => {
      this.envMap = this.pmremGenerator.fromEquirectangular(texture).texture;
      //this.envMap.mapping = THREE.EquirectangularReflectionMapping;

      this.pmremGenerator.dispose();

      this.gltfLoader.load(humanModelUrl, (gltf) => {
        this.human = gltf.scene.children[0]
        this.scene.add(this.human);

        this.m = new THREE.MeshStandardMaterial({
          metalness:1,
          roughness:0.28
        })

        this.m.envMap = this.envMap;
        this.m.onBeforeCompile = (shader) =>{
          shader.uniforms.uTime = {value:0};
          shader.fragmentShader = `
          uniform float uTime;
          mat4 rotation3d(vec3 axis, float angle) {
            axis = normalize(axis);
            float s = sin(angle);
            float c = cos(angle);
            float oc = 1.0 - c;
          
            return mat4(
              oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
              oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
              oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
              0.0,                                0.0,                                0.0,                                1.0
            );
          }
          vec3 rotate(vec3 v, vec3 axis, float angle) {
            mat4 m = rotation3d(axis, angle);
            return (m * vec4(v,1.0)).xyz;
          }
          ` + shader.fragmentShader;

          shader.fragmentShader = shader.fragmentShader.replace(`#include <envmap_physical_pars_fragment>`,
          `
          #if defined( USE_ENVMAP )

	vec3 getIBLIrradiance( const in vec3 normal ) {

		#if defined( ENVMAP_TYPE_CUBE_UV )

			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );

			return PI * envMapColor.rgb * envMapIntensity;

		#else

			return vec3( 0.0 );

		#endif

	}

	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {

		#if defined( ENVMAP_TYPE_CUBE_UV )

			vec3 reflectVec = reflect( - viewDir, normal );

			// Mixing the reflection with the normal is more accurate and keeps rough objects from gathering light from behind their tangent plane.
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );

			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );

      reflectVec = rotate( reflectVec, vec3(1.0,0.0,0.0), uTime * 0.05);

			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );

			return envMapColor.rgb * envMapIntensity;

		#else

			return vec3( 0.0 );

		#endif

	}
#endif
          `);

          this.m.userData.shader = shader;
        }
  
        // Altera os materiais para exibir como malha (wireframe) e preto
        this.human.traverse((child) => {
          if (child.isMesh) {
            child.material = this.m;
            //child.material = new THREE.MeshBasicMaterial({
           //   color: 0xff6600
            //})
            //child.material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
          }
        });
  
        this.human.scale.set(0.1, 0.1, 0.1);
        this.human.geometry.center();
        // Adiciona evento de mudança de posição da câmera

        setInterval(()=>{
          const mode = sessionStorage.getItem('animationT');

          switch(mode){
            case '0':
              gsap.to(this.camera.position, {
                x: 0,
                y: 1,//(-0.001, 0.9, 0.03)
                z: 0.5,
                duration: 2, // Tempo de duração da animação
                onUpdate: () => {
                  this.camera.lookAt(0, 0.8, 0); // Mantém a câmera olhando para o objeto
                }
              });
            break;
            case '1':
              gsap.to(this.camera.position, {
                x: 0,
                y: 0.5,//(-0.001, 0.9, 0.03)
                z: 0.2,
                duration: 2, // Tempo de duração da animação
                onUpdate: () => {
                  this.camera.lookAt(0, 0.5, -0.5); // Mantém a câmera olhando para o objeto
                }
              });
            break;
            case '2':
              gsap.to(this.camera.position, {
                x: 0,
                y: 0,//(-0.001, 0.9, 0.03)
                z: 0.2,
                duration: 2, // Tempo de duração da animação
                onUpdate: () => {
                  this.camera.lookAt(-1, -1, -2); // Mantém a câmera olhando para o objeto
                }
              });
            break;
            case '3':
              gsap.to(this.camera.position, {
                x: 0,
                y: 0,//(-0.001, 0.9, 0.03)
                z: 0.4,
                duration: 2, // Tempo de duração da animação
                onUpdate: () => {
                  this.camera.lookAt(-1, -2, 0); // Mantém a câmera olhando para o objeto
                }
              });
            break;
            case '4':
              gsap.to(this.camera.position, {
                x: 0,
                y: 1,//(-0.001, 0.9, 0.03)
                z: 2,
                duration: 2, // Tempo de duração da animação
                onUpdate: () => {
                  this.camera.lookAt(0, 0, 0); // Mantém a câmera olhando para o objeto
                }
              });
          }
        },500)

  
      }, undefined, (error) => {
        console.error(error);
      });
    })    
  }

  render() {
    //this.renderer.render(this.scene, this.camera);
    this.composer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));

    if (this.human) {
      if(this.m.userData){
        this.m.userData.shader.uniforms.uTime.value += 0.05;

        this.holloEffect.uniforms.uTime.value += 0.05;
      }
      //this.human.rotation.y += 0.005;
    }
  }


  
}

new Sketch({
  dom: document.getElementById('container')
});
