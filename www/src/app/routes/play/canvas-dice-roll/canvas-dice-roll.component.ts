import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import * as THREE from 'three';
import * as CANNON from 'cannon';
import { DiceManager, DiceD6, DiceD20, DiceD4, DiceD8, DiceD10, DiceD12 } from 'threejs-dice'
import { OrbitControls } from 'three-orbitcontrols-ts';


@Component({
  selector: 'app-canvas-dice-roll',
  templateUrl: './canvas-dice-roll.component.html',
  styleUrls: ['./canvas-dice-roll.component.css']
})
export class CanvasDiceRollComponent implements AfterViewInit {

  @ViewChild('renderContainer')
  renderContainerElem:ElementRef;

  scene: any
  dice: any
  world: any
  camera: any
  renderer: any
  controls: any

  constructor() {
    this.dice = []
  }

  createDice() {
    var dataSet = [{
      descriptor: 4,
      value: 1
    },{
      descriptor: 6,
      value: 1
    },{
      descriptor: 8,
      value: 1
    },{
      descriptor: 10,
      value: 1
    },{
      descriptor: 12,
      value: 1
    },{
      descriptor: 20,
      value: 1
    }]

    var colors = ['#ff0000', '#ffff00', '#00ff00', '#0000ff', '#ff00ff', '#ff005f'];

    for (var i = 0; i < dataSet.length; i++) {
      var dataSetItem = dataSet[i];
      for (var j = 0; j < dataSetItem.value; j++) {
        switch(dataSetItem.descriptor ){
          case 4:
          var die = new DiceD4({size: 1.5, backColor: colors[0]});
          break;
          case 6:
          var die = new DiceD6({size: 1.5, backColor: colors[1]});
          break;
          case 8:
          var die = new DiceD8({size: 1.5, backColor: colors[2]});
          break;
          case 10:
          var die = new DiceD10({size: 1.5, backColor: colors[3]});
          break;
          case 12:
          var die = new DiceD12({size: 1.5, backColor: colors[4]});
          break;
          case 20:
          var die = new DiceD20({size: 1.5, backColor: colors[5]});
          break;
          default:
          continue;
        }
        this.scene.add(die.getObject());
        this.dice.push({die: die, value: 1});

      }
    }
  }

  doRoll(dataSet: [any]){
    this.dice = dataSet.map( (each) => {
      var sceneDie = this.dice.find((elem)=>{
        return elem.die.values == each.descriptor
      })
      sceneDie.value = each.results[0]
      return sceneDie
    })
    console.log(this.dice)
    var diceValues = [];
    for (var i = 0; i < this.dice.length; i++) {
      let diceI = this.dice[i].die;
      let value =  this.dice[i].value;
      let yRand = Math.random() * 20
      diceI.getObject().position.x = -15 - (i % 3) * 1.5;
      diceI.getObject().position.y = 2 + Math.floor(i / 3) * 1.5;
      diceI.getObject().position.z = -15 + (i % 3) * 1.5;
      diceI.getObject().quaternion.x = (Math.random()*90-45) * Math.PI / 180;
      diceI.getObject().quaternion.z = (Math.random()*90-45) * Math.PI / 180;
      diceI.updateBodyFromMesh();
      let rand = Math.random() * 5;
      diceI.getObject().body.velocity.set(25 + rand, 40 + yRand, 15 + rand);
      diceI.getObject().body.angularVelocity.set(20 * Math.random() -10, 20 * Math.random() -10, 20 * Math.random() -10);
      diceValues.push({dice: diceI, value: value});
    }

    console.log(diceValues)

    DiceManager.prepareValues(diceValues);


  }

  ngAfterViewInit() {
    var container;
    var dice = this.dice;
    // SCENE
  	this.scene = new THREE.Scene();
  	// CAMERA
  	//var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var SCREEN_WIDTH = 500;
    var SCREEN_HEIGHT = 500;
  	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.01, FAR = 20000;
  	this.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
  	this.scene.add(this.camera);
	//para la posicion de la camara arriba de frente
  	this.camera.position.set(0,180,30);
  	// RENDERER
    this.renderer = new THREE.WebGLRenderer( {antialias:true} );
  	this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  	//container = document.getElementById( 'renderContainer' );
    container = this.renderContainerElem.nativeElement;
  	container.appendChild( this.renderer.domElement );
  	// EVENTS
  	// CONTROLS
  	this.controls = new OrbitControls( this.camera, this.renderer.domElement );

  	let ambient = new THREE.AmbientLight('#ffffff', 0.1);
  	this.scene.add(ambient);

    let directionalLight = new THREE.DirectionalLight('#ffffff', 0.5);
    directionalLight.position.x = -1000;
    directionalLight.position.y = 1000;
    directionalLight.position.z = 1000;
    this.scene.add(directionalLight);

    let light = new THREE.SpotLight(0xefdfd5, 0.5);
    light.position.y = 100;
    light.target.position.set(0, 0, 0);
    // light.castShadow = true;
    // light.shadow.camera.near = 50;
    // light.shadow.camera.far = 110;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    this.scene.add(light);

	// PARA CARGARLE UNA IMAGEN SOLA
    //var texturePainting1 = new THREE.TextureLoader().load( "../assets/images/dashboard.jpg", );
    
	// PAR CARGARLE UNA IMAGEN Y REPETIRLA
	var texturePainting1 = new THREE.TextureLoader().load( "../assets/images/grid.png", function( texture ) {
				texture.wrapS = THREE.RepeatWrapping;
				texture.wrapT = THREE.RepeatWrapping;
				texture.repeat.set( 20, 20 );
			} );
      var image = texturePainting1.image;

  	// FLOOR
  	// var floorMaterial = new THREE.MeshPhongMaterial( { color: '#00aa00', side: THREE.DoubleSide } );
    var floorMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, map: texturePainting1,side: THREE.DoubleSide } );
  	var floorGeometry = new THREE.PlaneGeometry(60, 60, 10, 10);
  	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
  	floor.receiveShadow  = true;
  	floor.rotation.x = Math.PI / 2;
  	this.scene.add(floor);
  	// SKYBOX/FOG
  	//var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
	 var skyBoxGeometry = new THREE.CubeGeometry( 35, 35, 35 );
  	var skyBoxMaterial = new THREE.MeshPhongMaterial( { color: 0x9999ff, side: THREE.BackSide } );
  	var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
  	//scene.add(skyBox);
  	this.scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );

  	////////////
  	// CUSTOM //
  	////////////
    this.world = new CANNON.World();

    this.world.gravity.set(0, -9.82 * 20, 0);
    this.world.broadphase = new CANNON.NaiveBroadphase();
    this.world.solver.iterations = 16;

    window['THREE'] = THREE;
    window['CANNON'] = CANNON;

    DiceManager.setWorld(this.world);

    //Floor
    let floorBody = new CANNON.Body({mass: 0, material: DiceManager.floorBodyMaterial});
    floorBody.addShape(new CANNON.Plane())
    floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    this.world.add(floorBody);
    requestAnimationFrame( this.animate.bind(this) );
    this.createDice();
  }

  private updatePhysics() {
    this.world.step(1.0 / 60.0);
    for (var i in this.dice) {
        this.dice[i].die.updateMeshFromBody();
    }
  }

  private update() {
    this.controls.update();
  }

  private render() {
    this.renderer.render( this.scene, this.camera );
  }

  public animate() {
    this.updatePhysics();
    this.render();
    this.update();
    requestAnimationFrame( this.animate.bind(this) );
  }

}
