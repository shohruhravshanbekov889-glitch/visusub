// js/three-entry.js
(function () {
	const container = document.getElementById('threeContainer');
	if (!container || typeof THREE === 'undefined') return;

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(
		45,
		container.clientWidth / container.clientHeight,
		0.1,
		100
	);
	camera.position.set(3.4, 2.5, 4.2);
	camera.lookAt(0, 0.2, 0);

	const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	renderer.setSize(container.clientWidth, container.clientHeight);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	container.appendChild(renderer.domElement);

	scene.add(new THREE.AmbientLight(0xffffff, 0.8));
	const dirLight = new THREE.DirectionalLight(0x38bdf8, 1.1);
	dirLight.position.set(4, 6, 5);
	scene.add(dirLight);

	const group = new THREE.Group();
	scene.add(group);

	const H = 2.4;
	const R = 1.65;

	const pyrGeo = new THREE.ConeGeometry(R, H, 4);
	const pyrMat = new THREE.MeshPhongMaterial({
		color: 0x38bdf8,
		transparent: true,
		opacity: 0.22,
		side: THREE.DoubleSide
	});
	const pyramid = new THREE.Mesh(pyrGeo, pyrMat);
	pyramid.rotation.y = Math.PI / 4;
	group.add(pyramid);

	const edges = new THREE.EdgesGeometry(pyrGeo);
	const lineMat = new THREE.LineBasicMaterial({ color: 0x7dd3fc });
	const wireframe = new THREE.LineSegments(edges, lineMat);
	wireframe.rotation.y = Math.PI / 4;
	group.add(wireframe);

	const baseSide = R * Math.sqrt(2);
	const cutGeo = new THREE.PlaneGeometry(baseSide, baseSide);
	const cutMat = new THREE.MeshBasicMaterial({
		color: 0xf59e0b,
		transparent: true,
		opacity: 0.72,
		side: THREE.DoubleSide
	});
	const cutPlane = new THREE.Mesh(cutGeo, cutMat);
	cutPlane.rotation.x = -Math.PI / 2;
	group.add(cutPlane);

	function updateCut(percent) {
		const ratio = percent / 100;
		const yPos = -H / 2 + ratio * H;
		const scale = 1 - ratio;
		cutPlane.position.y = yPos;
		cutPlane.scale.set(scale, scale, 1);
	}

	updateCut(50);

	const cutSlider = document.getElementById('cutSlider');
	const cutValue = document.getElementById('cutValue');
	if (cutSlider) {
		cutSlider.addEventListener('input', (e) => {
			const val = Number(e.target.value);
			if (cutValue) cutValue.textContent = `${val}%`;
			updateCut(val);
		});
	}

	let isDragging = false;
	let moved = false;
	let prevX = 0;
	let prevY = 0;

	container.addEventListener('pointerdown', (e) => {
		isDragging = true;
		moved = false;
		prevX = e.clientX;
		prevY = e.clientY;
	});

	window.addEventListener('pointermove', (e) => {
		if (!isDragging) return;
		const dx = e.clientX - prevX;
		const dy = e.clientY - prevY;
		if (Math.abs(dx) > 4 || Math.abs(dy) > 4) moved = true;
		group.rotation.y += dx * 0.01;
		group.rotation.x = Math.max(-0.6, Math.min(0.6, group.rotation.x + dy * 0.008));
		prevX = e.clientX;
		prevY = e.clientY;
	});

	window.addEventListener('pointerup', () => {
		if (isDragging && !moved && window.openAuthModal) {
			window.openAuthModal('login');
		}
		isDragging = false;
	});

	window.addEventListener('resize', () => {
		if (!container.clientWidth || !container.clientHeight) return;
		camera.aspect = container.clientWidth / container.clientHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(container.clientWidth, container.clientHeight);
	});

	function animate() {
		requestAnimationFrame(animate);
		if (!isDragging) group.rotation.y += 0.005;
		renderer.render(scene, camera);
	}
	animate();
})();
