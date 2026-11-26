// js/app.js
document.addEventListener('DOMContentLoaded', () => {
	const entryScreen = document.getElementById('entryScreen');
	const hubScreen = document.getElementById('hubScreen');
	const authModal = document.getElementById('authModal');
	const navActions = document.getElementById('navActions');
	const welcomeUser = document.getElementById('welcomeUser');

	const loginForm = document.getElementById('loginForm');
	const signupForm = document.getElementById('signupForm');
	const tabBtns = document.querySelectorAll('.tab-btn');

	window.openAuthModal = function (mode = 'login') {
		authModal.classList.remove('hidden');
		switchTab(mode);
	};

	function closeAuthModal() {
		authModal.classList.add('hidden');
	}

	function switchTab(mode) {
		tabBtns.forEach((btn) => {
			btn.classList.toggle('active', btn.dataset.tab === mode);
		});
		if (mode === 'login') {
			loginForm.classList.remove('hidden');
			signupForm.classList.add('hidden');
		} else {
			signupForm.classList.remove('hidden');
			loginForm.classList.add('hidden');
		}
	}

	document.getElementById('openLoginBtn').addEventListener('click', () => openAuthModal('login'));
	document.getElementById('openSignupBtn').addEventListener('click', () => openAuthModal('signup'));
	document.getElementById('startBtn').addEventListener('click', () => openAuthModal('signup'));
	document.getElementById('closeModalBtn').addEventListener('click', closeAuthModal);

	authModal.addEventListener('click', (e) => {
		if (e.target === authModal) closeAuthModal();
	});

	tabBtns.forEach((btn) => {
		btn.addEventListener('click', () => switchTab(btn.dataset.tab));
	});

	function enterHub(name, role) {
		closeAuthModal();
		entryScreen.classList.add('hidden');
		navActions.classList.add('hidden');
		hubScreen.classList.remove('hidden');
		welcomeUser.textContent = `Xush kelibsiz, ${name} (${role})!`;
	}

	document.getElementById('demoBtn').addEventListener('click', () => {
		enterHub('Mehmon', 'Demo');
	});

	loginForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const user = document.getElementById('loginUser').value.trim();
		const displayName = user.includes('@') ? user.split('@')[0] : user;
		enterHub(displayName || 'Foydalanuvchi', 'A’zo');
	});

	signupForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const name = document.getElementById('signupName').value.trim();
		const role = document.querySelector('input[name="role"]:checked').value;
		enterHub(name || 'Foydalanuvchi', role);
	});

	document.getElementById('logoutBtn').addEventListener('click', () => {
		hubScreen.classList.add('hidden');
		entryScreen.classList.remove('hidden');
		navActions.classList.remove('hidden');
	});

	document.getElementById('openGeometryLab').addEventListener('click', () => {
		alert('Keyingi bosqichda aynan shu yerga 3D Geometriya va Kesim Laboratoriyasi sahifasini ulaymiz!');
	});
});
