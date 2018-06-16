import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import * as THREE from 'three';
import * as CANNON from 'cannon';
import { DiceManager, DiceD6, DiceD20, DiceD4, DiceD8, DiceD10, DiceD12 } from 'threejs-dice'
import { OrbitControls } from 'three-orbitcontrols-ts';
import { MeshBasicMaterial } from 'three';

var diceIndex = 0;

@Component({
  selector: 'app-canvas-dice-roll',
  templateUrl: './canvas-dice-roll.component.html',
  styleUrls: ['./canvas-dice-roll.component.css']
})
export class CanvasDiceRollComponent implements AfterViewInit {


  @ViewChild('renderContainer')
  renderContainerElem:ElementRef;
  arrow: any
  scene: any
  world: any
  camera: any
  renderer: any
  dice: any
  lastUpdate: any
  controls: any
  map: any;
  floorMaterial: any;
  raycaster : any ;  // A THREE.Raycaster for user mouse input.
  ground : any; // A square base on which the cylinders stand.
  cylinder : any;  // A cylinder that will be cloned to make the visible cylinders.

  //ROTATE = 1, DRAG = 2, ADD = 3, DELETE = 4;  // Possible mouse actions
  mouseAction : any;  // currently selected mouse action
  dragItem : any;  // the cylinder that is being dragged, during a drag operation
  intersects : any; //the objects intersected
  targetForDragging : any;  // An invisible object that is used as the target for raycasting while
  // dragging a cylinder.  I use it to find the new location of the
  // cylinder.  I tried using the ground for this purpose, but to get
  // the motion right, I needed a target that is at the same height
  // above the ground as the point where the user clicked the cylinder.

  constructor() {
    this.dice = []
    //this.map = "../assets/images/castle.jpg";
  }
  setMap(map : File){
    var reader = new FileReader();
    reader.onload = (evnt :any) => {
      var content : string = evnt.target.result
      var texturePainting1 : any = THREE.ImageUtils.loadTexture(content );
      this.floorMaterial.map = texturePainting1;
    }
    console.log("mapita");
    reader.readAsDataURL(map);
  }

  doRoll(dataSet: [any]){
    var colors = {4:'#ff0000', 6:'#ffff00', 8:'#00ff00', 10:'#0000ff', 12:'#ff00ff', 20:'#ff005f'};
    for (var i = 0; i < this.dice.length; i++) {
      this.scene.remove(this.dice[i].object3D); //removiendo los objetos 3d y los cuerpos de los dados
      this.world.remove(this.dice[i].object3D.body);
    }
    var diceType = {
      4: DiceD4,
      6: DiceD6,
      8: DiceD8,
      10: DiceD10,
      12: DiceD12,
      20: DiceD20,
    }
    this.dice.length = 0;

    //tiro los dados correspondiente de acuerdo a los dados elegidos y la cantidad
    for (var i = 0; i < dataSet.length; i++) {
    var dataSetItem = dataSet[i];
    for (var j = 0; j < dataSetItem.value; j++) {
      var die:any;
      var die=new diceType[dataSetItem.descriptor]({size: 1.5, backColor: colors[dataSetItem.descriptor]});
      die.indiceRomanioli = diceIndex++;
      var object3D = die.getObject()
      this.scene.add(object3D);
      this.dice.push({
        die,
        object3D,
        value:dataSetItem.results[j]
      });
    }
  }

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
    //agrego al dado a la lista con el valor que debe mostrar
    diceValues.push({dice: diceI, value: value});
  }

  DiceManager.prepareValues(diceValues);

}


mkWorld() {
  var world : any = new CANNON.World();
  world.gravity.set(0, -9.82 * 20, 0);
  world.broadphase = new CANNON.NaiveBroadphase();
  world.solver.iterations = 16;
  DiceManager.setWorld(world);
  //Floor
  let floorBody = new CANNON.Body({mass: 0, material: DiceManager.floorBodyMaterial});
  floorBody.addShape(new CANNON.Plane())
  floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
  world.add(floorBody);
  return world;
}

initialize(){
  var container, scene, camera, renderer, controls;
  var dice = this.dice;
  // SCENE
  this.scene = scene = new THREE.Scene();
  // CAMERA
  //var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
  var SCREEN_WIDTH = 800;
  var SCREEN_HEIGHT = 550;
  var VIEW_ANGLE = 20, ASPECT = 1, NEAR = 0.01, FAR = 20000;
  // var VIEW_ANGLE = 20, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.01, FAR = 20000;
  this.camera = camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
  scene.add(camera);
  camera.position.set(0,180,0);
  // RENDERER
  this.renderer = renderer = new THREE.WebGLRenderer( {antialias:true} );
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  //container = document.getElementById( 'renderContainer' );
  container = this.renderContainerElem.nativeElement;
  container.appendChild( renderer.domElement );
  // EVENTS
  // CONTROLS
  this.controls = controls = new OrbitControls( camera, renderer.domElement );

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

  // PARA CARGARLE UNA IMAGEN SOLA
  var texturePainting1 = new THREE.TextureLoader().load( "../assets/images/castle.jpg", );

  // PAR CARGARLE UNA IMAGEN Y REPETIRLA
  // var texturePainting1 = new THREE.TextureLoader().load(this.map,
  // function( texture ) {
  // texture.wrapS = THREE.RepeatWrapping;
  // texture.wrapT = THREE.RepeatWrapping;
  // texture.repeat.set( 20, 20 );
  // } );

  // var image = texturePainting1.image;
  //

  // FLOOR
  // var floorMaterial = new THREE.MeshPhongMaterial( { color: '#00aa00', side: THREE.DoubleSide } );
  // var floorGeometry = new THREE.PlaneGeometry(30, 30, 10, 10);
  var floorMaterial = this.floorMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, map: texturePainting1,side: THREE.DoubleSide } );

  var floorGeometry = new THREE.PlaneGeometry(60, 60, 10, 10);
  var floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.receiveShadow  = true;
  floor.rotation.x = Math.PI / 2;
  this.ground = floor
  scene.add(floor);
  // SKYBOX/FOG
  // var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
  // var skyBoxMaterial = new THREE.MeshPhongMaterial( { color: 0x9999ff, side: THREE.BackSide } );
  // var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
  // scene.add(skyBox);
  scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );

  ////////////
  // CUSTOM //
  ////////////
  this.world = this.mkWorld();

  this.targetForDragging = new THREE.Mesh(
    new THREE.BoxGeometry(100,0.01,100),
    new THREE.MeshBasicMaterial()
  );
  this.targetForDragging.material.visible = false;
  //Walls

  //add tokens
  this.cylinder = new THREE.Mesh(
  new THREE.CylinderGeometry(0.8,0.8,0.5,16,32),
  new THREE.MeshLambertMaterial( {color:"red"} )
);
this.cylinder.position.y = 0.70;  // places base at y = 0;

let addCylinder = (x,z) => {
  var obj = this.cylinder.clone();
  obj.position.x = x;
  obj.position.z = z;
  this.scene.add(obj);
}

addCylinder(10,10);
addCylinder(0,15);
addCylinder(-15,-7);
addCylinder(-8,5);
addCylinder(5,-12);


this.setUpMouseHander(this.renderContainerElem.nativeElement,this.doMouseDown.bind(this),this.doMouseMove.bind(this));
this.raycaster = new THREE.Raycaster();
this.render();
}

doMouseDown(x,y) {
  if (this.targetForDragging.parent == this.scene) {
    this.scene.remove(this.targetForDragging);  // I don't want to check for hits on targetForDragging
  }
  this.controls.enabled = true;

  var a = 2*x/this.renderContainerElem.nativeElement.offsetWidth - 1;
  var b = 1 - 2*y/this.renderContainerElem.nativeElement.offsetHeight;

  this.raycaster.setFromCamera( new THREE.Vector2(a,b), this.camera );

  let drawRaycastLine = (raycaster) => {
    let material = new THREE.LineBasicMaterial({
      color: 0xff0000,
      linewidth: 10
    });
    let geometry = new THREE.Geometry();
    let startVec = new THREE.Vector3(
      raycaster.ray.origin.x,
      raycaster.ray.origin.y,
      raycaster.ray.origin.z);

    let endVec = new THREE.Vector3(
      raycaster.ray.direction.x,
      raycaster.ray.direction.y,
      raycaster.ray.direction.z);

    // could be any number
    endVec.multiplyScalar(5000);

    // get the point in the middle
    let midVec = new THREE.Vector3();
    midVec.lerpVectors(startVec, endVec, 0.5);

    geometry.vertices.push(startVec);
    geometry.vertices.push(midVec);
    geometry.vertices.push(endVec);

    console.log('vec start', startVec);
    console.log('vec mid', midVec);
    console.log('vec end', endVec);

    let line = new THREE.Line(geometry, material);
    this.scene.add(line);
  }

  // drawRaycastLine(this.raycaster)

  this.intersects = this.raycaster.intersectObjects( this.scene.children );  // aca el DM hizo una negrada y se gano una comida (this.world.children era)
  if (this.intersects.length == 0) {
    return false;
  }
  var item = this.intersects[0];
  var objectHit = item.object;

  if (objectHit == this.ground) {
    return false;
  }
  else {
    this.controls.enabled = false;
    this.dragItem = objectHit;
    this.scene.add(this.targetForDragging);
    this.targetForDragging.position.set(0,item.point.y,0);
    this.render();
    return true;
  }
}

doMouseMove(x,y,evt,prevX,prevY) {
  var a = 2*x/this.renderContainerElem.nativeElement.offsetWidth - 1;
  var b = 1 - 2*y/this.renderContainerElem.nativeElement.offsetHeight;
  this.raycaster.setFromCamera( new THREE.Vector2(a,b), this.camera );
  this.intersects = this.raycaster.intersectObject( this.targetForDragging );
  console.log("intersects",this.intersects)
  if (this.intersects.length == 0) {
    return;
  }
  var locationX = this.intersects[0].point.x;
  var locationZ = this.intersects[0].point.z;
  var coords = new THREE.Vector3(locationX, 0, locationZ);
  this.scene.worldToLocal(coords);
  a = Math.min(30,Math.max(-30,coords.x));  // clamp coords to the range -19 to 19, so object stays on ground
  b = Math.min(30,Math.max(-30,coords.z));
  this.dragItem.position.set(a,0.70,b);
  this.render();
}

setUpMouseHander(element, mouseDownFunc, mouseDragFunc, mouseUpFunc?) {
  if (!element || !mouseDownFunc || !(typeof mouseDownFunc == "function")) {
    throw "Illegal arguments in setUpMouseHander";
  }
  if (typeof element == "string") {
    element = document.getElementById(element);
  }
  if (!element || !element.addEventListener) {
    throw "first argument in setUpMouseHander is not a valid element";
  }
  var dragging = false;
  var startX, startY;
  var prevX, prevY;

  function doMouseDown(evt) {
    if (dragging) {
      return;
    }
    var r = element.getBoundingClientRect();
    var x = evt.clientX - r.left;
    var y = evt.clientY - r.top;
    prevX = startX = x;
    prevY = startY = y;
    dragging = mouseDownFunc(x, y, evt);
    if (dragging) {
      document.addEventListener("mousemove", doMouseMove);
      document.addEventListener("mouseup", doMouseUp);
    }
  }

  function doMouseMove(evt) {
    if (dragging) {
      if (mouseDragFunc) {
        var r = element.getBoundingClientRect();
        var x = evt.clientX - r.left;
        var y = evt.clientY - r.top;
        mouseDragFunc(x, y, evt, prevX, prevY, startX, startY);
      }
      prevX = x;
      prevY = y;
    }
  }

  function doMouseUp(evt) {
    if (dragging) {
      document.removeEventListener("mousemove", doMouseMove);
      document.removeEventListener("mouseup", doMouseUp);
      if (mouseUpFunc) {
        var r = element.getBoundingClientRect();
        var x = evt.clientX - r.left;
        var y = evt.clientY - r.top;
        mouseUpFunc(x, y, evt, prevX, prevY, startX, startY);
      }
      dragging = false;
    }
  }
  element.addEventListener("mousedown", doMouseDown);
}

ngAfterViewInit() {
  window['THREE'] = THREE;
  window['CANNON'] = CANNON;
  this.initialize();
  requestAnimationFrame( () => this.animate() );
}

animate() {
  this.updatePhysics();
  this.render();
  this.update();
  requestAnimationFrame( () => this.animate() );
}

updatePhysics() {
  var lastUpdate = this.lastUpdate;
  this.lastUpdate = (new Date).getTime();
  this.world.step(1.0 / 60);
  for (var i in this.dice) {
    this.dice[i].die.updateMeshFromBody();
  }
}

update() {
  this.controls.update();
}
render(){
  this.renderer.render( this.scene, this.camera );
}

}
