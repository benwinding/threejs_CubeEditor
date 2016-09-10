var container = document.getElementById("webgl-container");
var windowHalfX = GetContainerWidth() / 2;
var windowHalfY = GetContainerHeight() / 2;

var camera, scene, renderer;
var cube, plane;
var geometryCube;

var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

init();
animate();

// Container
function GetContainerWidth(){  return container.clientWidth; }
function GetContainerHeight(){  return container.clientWidth * 4/4; }

function init()
{
	// Camera
	camera = new THREE.PerspectiveCamera(30, GetContainerWidth() / GetContainerHeight(), 1,1000);
	camera.position.y = 150;
	camera.position.z = 1000;

	// Renderer
	renderer = new THREE.WebGLRenderer( { alpha: true } );
	renderer.setClearColor( 0x000000, 0 ); // the default
	container.appendChild(renderer.domElement);

	// Cube
	geometryCube = new THREE.BoxGeometry( 200, 200, 200 );
	var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5 } );
	cube = new THREE.Mesh( geometryCube, material );
	cube.position.y = 100;
	SetCubeColor(0xD1D1D1);
  // set the geometry to dynamic
  // so that it allow updates
  cube.geometry.dynamic = true;
  // changes to the vertices
  cube.geometry.verticesNeedUpdate = true;
  // changes to the normals
  cube.geometry.normalsNeedUpdate = true;

	// Plane
	var geometry2 = new THREE.PlaneBufferGeometry( 200, 200 );
	geometry2.rotateX( - Math.PI / 2 );
	var material2 = new THREE.MeshBasicMaterial( { color: 0xe0e0e0, overdraw: 0.5 } );
	plane = new THREE.Mesh( geometry2, material2 );

	// Scene
	scene = new THREE.Scene();
	scene.add( cube );
	scene.add( plane );
	onWindowResize();

  // Add event listeners
	container.addEventListener( 'mousedown', onDocumentMouseDown, false );
	container.addEventListener( 'touchstart', onDocumentTouchStart, false );
	container.addEventListener( 'touchmove', onDocumentTouchMove, false );
	container.addEventListener( 'mousedown', onDocumentMouseDown, false );
	window.addEventListener( 'resize', onWindowResize, false );
}

function render (){
  requestAnimationFrame(render);
  plane.rotation.y = cube.rotation.y += ( targetRotation - cube.rotation.y ) * 0.05;
  renderer.render(scene,camera);
}

function animate(){
	requestAnimationFrame(animate);
	render();
}

function onWindowResize() {
	windowHalfX = GetContainerWidth() / 2;
	windowHalfY = GetContainerHeight() / 2;
	camera.aspect = GetContainerWidth() / GetContainerHeight();
	camera.updateProjectionMatrix();
	renderer.setSize( GetContainerWidth()-50, GetContainerHeight() );
}

function onDocumentMouseDown( event ) {
	event.preventDefault();
	container.addEventListener( 'mousemove', onDocumentMouseMove, false );
	container.addEventListener( 'mouseup', onDocumentMouseUp, false );
	container.addEventListener( 'mouseout', onDocumentMouseOut, false );
	mouseXOnMouseDown = event.clientX - windowHalfX;
	targetRotationOnMouseDown = targetRotation;
}

function onDocumentMouseMove( event ) {
	mouseX = event.clientX - windowHalfX;
	targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.01;
}

function onDocumentMouseUp( event ) {
	container.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	container.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	container.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

function onDocumentMouseOut( event ) {
	container.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	container.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	container.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

function onDocumentTouchStart( event ) {
	if ( event.touches.length === 1 ) {
		event.preventDefault();
		mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
		targetRotationOnMouseDown = targetRotation;
	}
}

function onDocumentTouchMove( event ) {
	if ( event.touches.length === 1 ) {
		event.preventDefault();
		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;
	}
}

function SetCubeColor(hex)
{
  cube.material.color.setHex(hex);
}