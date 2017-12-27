var camera,
	scene,
	renderer;

function init() {

	var stats = initStats();

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(
		45, window.innerWidth / window.innerHeight, 0.1, 1000
	);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(new THREE.Color(0x696969));
	renderer.shadowMap.enabled = true;
	

	var axes = new THREE.AxesHelper(20);
	scene.add(axes);

	var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
	var planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;

	plane.rotation.x = -0.5 * Math.PI;
	plane.position.x = 15;
	plane.position.y = 0;
	plane.position.z = 0;

	scene.add(plane);

	var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
	var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000, wireframe: false});
	var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	cube.castShadow = true;


	cube.position.x = -4;
	cube.position.y = 3;
	cube.position.z = 0;

	scene.add(cube);
	
	var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
	var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff, wireframe: false});
	var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	sphere.castShadow = true;
	

	sphere.position.x = 20;
	sphere.position.y = 4;
	sphere.position.z= 2;

	scene.add(sphere);

	var spotLight = new THREE.SpotLight(0xffffff, 1);
	spotLight.position.set(-40, 60, -10);
	spotLight.castShadow = true;
	spotLight.shadow.mapSize.width = 3024;
	spotLight.shadow.mapSize.height = 3024;
	scene.add(spotLight);
	

	camera.position.x = -30;
	camera.position.y = 40;
	camera.position.z = 30;

	camera.lookAt(scene.position);

	
	

	var controls = new function() {
		this.rotationSpeed = 0.02;
		this.bouncingSpeed = 0.03;
	}

	var gui = new dat.GUI();
	gui.add(controls, 'rotationSpeed', 0, 0.5);
	gui.add(controls, 'bouncingSpeed', 0, 0.5);

	var step = 0;
	
	function renderScene() {
		stats.update();

		step += controls.bouncingSpeed;
		sphere.position.x = 20 + (10 * (Math.cos(step)));
		sphere.position.y = 2 + (10*Math.abs(Math.sin(step)));

		cube.rotation.x += controls.rotationSpeed;
		cube.rotation.y += controls.rotationSpeed;
		cube.rotation.z += controls.rotationSpeed;

		requestAnimationFrame(renderScene);
		renderer.render(scene, camera);
	}
	
	function initStats() {
		var stats = new Stats();
		stats.setMode(0);
		stats.domElement.style.positon = 'absolute';
		stats.domElement.style.left = '0px';
		stats.domElement.style.top= '0px';
		document.getElementById('Stats-output').appendChild(stats.domElement);
		return stats;
	}

	document.getElementById("WebGL-output").appendChild(renderer.domElement);
	renderScene();
}

window.addEventListener('resize', onResize, false);

function onResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}



window.onload = init;