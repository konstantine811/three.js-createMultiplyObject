var camera,
	scene,
	renderer;

function init() {

	var stats = initStats();

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(
		45, window.innerWidth / window.innerHeight, 0.1, 1000
	);
	//create a render and set the size
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(new THREE.Color(0x696969));
	renderer.shadowMap.enabled = true;
	
	//create the ground plane
	var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
	var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;

	plane.rotation.x = -0.5 * Math.PI;
	plane.position.x = 0;
	plane.position.y = 0;
	plane.position.z = 0;

	scene.add(plane);

	//add subtle ambient lighting
	var ambientLigh = new THREE.AmbientLight(0x0c0c0c);
	scene.add(ambientLigh);

	//add fog 
	scene.fog = new THREE.FogExp2(0xffffff, 0.01);

	//add spotLight for the shadows
	var spotLight = new THREE.SpotLight(0xffffff, 1);
	spotLight.position.set(-40, 60, -10);
	spotLight.castShadow = true;
	spotLight.shadow.mapSize.width = 3024;
	spotLight.shadow.mapSize.height = 3024;
	scene.add(spotLight);
	
	camera.lookAt(scene.position);

	//add the output of the renderer to the html element
	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	var controls = new function() {
		this.rotationSpeed = 0.02;
		this.cameraX = 14.5;
		this.cameraY = 14;
		this.cameraZ = 60;
		this.numberOfObjects = scene.children.length;

		this.removeCube = function() {
			var allChildren = scene.children;
			var lastObject = allChildren[allChildren.length - 1];
			if(lastObject instanceof THREE.Mesh) {
				scene.remove(lastObject);
				this.numberOfObjects = scene.children.length;
			}
		};

		this.addCube = function() {
			var cubeSize = Math.ceil((Math.random() * 3));
			var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
			var cubeMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff});
			var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
			cube.catShadow = true;
			cube.name = "cube-" + scene.children.lenght;

			//position the cube randomly in the scene
			cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width));
			cube.position.y = Math.round((Math.random() * 5));
			cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));

			//add the cube to the scene
			scene.add(cube);
			this.numberOfObjects = scene.children.length;
		}

		this.outputObjects = function() {
			console.log(scene.children);
		}
	}

	var gui = new dat.GUI();
	gui.add(controls, 'rotationSpeed', 0, 0.5);
	gui.add(controls, 'addCube');
	gui.add(controls, 'removeCube');
	gui.add(controls, 'outputObjects');
	gui.add(controls, 'numberOfObjects').listen();
	gui.add(controls, 'cameraX', -100, 100);
	gui.add(controls, 'cameraY', -100, 100);
	gui.add(controls, 'cameraZ', -100, 100);


	renderScene();
	function renderScene() {

		camera.position.x = controls.cameraX;
		camera.position.y = controls.cameraY;
		camera.position.z = controls.cameraZ;
		stats.update();

		//rotate the cube around its axes
		scene.traverse(function(e) {
			if( e instanceof THREE.Mesh && e != plane) {
				e.rotation.x += controls.rotationSpeed;
				e.rotation.y += controls.rotationSpeed;
				e.rotation.z += controls.rotationSpeed;
			}
		})

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
}

window.addEventListener('resize', onResize, false);

function onResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}



window.onload = init;