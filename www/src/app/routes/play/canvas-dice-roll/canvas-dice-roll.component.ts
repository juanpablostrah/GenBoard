import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import * as CANNON from 'cannon';
import { DiceManager, DiceD6, DiceD20 } from 'threejs-dice'
import { OrbitControls } from 'three-orbitcontrols-ts';


@Component({
  selector: 'app-canvas-dice-roll',
  templateUrl: './canvas-dice-roll.component.html',
  styleUrls: ['./canvas-dice-roll.component.css']
})
export class CanvasDiceRollComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var container, scene, camera, renderer, controls, world, dice = [];
    // SCENE
  	scene = new THREE.Scene();
  	// CAMERA
  	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
  	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.01, FAR = 20000;
  	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
  	scene.add(camera);
  	camera.position.set(0,30,30);
  	// RENDERER
    renderer = new THREE.WebGLRenderer( {antialias:true} );
  	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  	container = document.getElementById( 'ThreeJS' );
  	container.appendChild( renderer.domElement );
  	// EVENTS
  	// CONTROLS
  	controls = new OrbitControls( camera, renderer.domElement );

  	let ambient = new THREE.AmbientLight('#ffffff', 0.1);
  	scene.add(ambient);

    let directionalLight = new THREE.DirectionalLight('#ffffff', 0.5);
    directionalLight.position.x = -1000;
    directionalLight.position.y = 1000;
    directionalLight.position.z = 1000;
    scene.add(directionalLight);

    let light = new THREE.SpotLight(0xefdfd5, 0.5);
    light.position.y = 100;
    light.target.position.set(0, 0, 0);
    // light.castShadow = true;
    // light.shadow.camera.near = 50;
    // light.shadow.camera.far = 110;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    scene.add(light);


  	// FLOOR
  	var floorMaterial = new THREE.MeshPhongMaterial( { color: '#00aa00', side: THREE.DoubleSide } );
  	var floorGeometry = new THREE.PlaneGeometry(30, 30, 10, 10);
  	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
  	floor.receiveShadow  = true;
  	floor.rotation.x = Math.PI / 2;
  	scene.add(floor);
  	// SKYBOX/FOG
  	var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
  	var skyBoxMaterial = new THREE.MeshPhongMaterial( { color: 0x9999ff, side: THREE.BackSide } );
  	var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
  	scene.add(skyBox);
  	scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );

  	////////////
  	// CUSTOM //
  	////////////
    world = new CANNON.World();

    world.gravity.set(0, -9.82 * 20, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 16;

    window['THREE'] = THREE;
    window['CANNON'] = CANNON;

    DiceManager.setWorld(world);

    //Floor
    let floorBody = new CANNON.Body({mass: 0, material: DiceManager.floorBodyMaterial});
    floorBody.addShape(new CANNON.Plane())
    floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    world.add(floorBody);

    //Walls

    var colors = ['#ff0000', '#ffff00', '#00ff00', '#0000ff', '#ff00ff'];
    for (var i = 0; i < 5; i++) {
        var die = new DiceD6({size: 1.5, backColor: colors[i]});
        scene.add(die.getObject());
        dice.push(die);
    }

    var die20 = new DiceD20({size: 1.5, backColor: '#ffffff'});
    scene.add(die20.getObject());
    dice.push(die20);

    function randomDiceThrow() {
        var diceValues = [];

        for (var i = 0; i < dice.length; i++) {
            let yRand = Math.random() * 20
            dice[i].getObject().position.x = -15 - (i % 3) * 1.5;
            dice[i].getObject().position.y = 2 + Math.floor(i / 3) * 1.5;
            dice[i].getObject().position.z = -15 + (i % 3) * 1.5;
            dice[i].getObject().quaternion.x = (Math.random()*90-45) * Math.PI / 180;
            dice[i].getObject().quaternion.z = (Math.random()*90-45) * Math.PI / 180;
            dice[i].updateBodyFromMesh();
            let rand = Math.random() * 5;
            dice[i].getObject().body.velocity.set(25 + rand, 40 + yRand, 15 + rand);
            dice[i].getObject().body.angularVelocity.set(20 * Math.random() -10, 20 * Math.random() -10, 20 * Math.random() -10);

            diceValues.push({dice: dice[i], value: i + 1});
        }

        DiceManager.prepareValues(diceValues);
    }

    setInterval(randomDiceThrow, 100000);
    randomDiceThrow();

    function animate() {
      updatePhysics();
    	render();
    	update();
      requestAnimationFrame( animate );
    }

    function updatePhysics() {
      world.step(1.0 / 15.0);
      for (var i in dice) {
          dice[i].updateMeshFromBody();
      }
    }

    function update() {
    	controls.update();
    }

    function render() {
    	renderer.render( scene, camera );
    }

    requestAnimationFrame( animate );

  }

}
