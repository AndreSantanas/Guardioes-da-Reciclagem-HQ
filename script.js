import * as THREE from 'three';

// ======================================================
// PARTE 1: GLOBO HOLOGRÁFICO E PARTÍCULAS
// ======================================================
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('globo-container').appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const oceanMap = textureLoader.load('./assets/mapa-brilho.png'); 

// --- GLOBO (DUAS CAMADAS) ---
const continentsGeometry = new THREE.SphereGeometry(2, 64, 64);
const continentsMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(0x000000) });
const continents = new THREE.Mesh(continentsGeometry, continentsMaterial);
scene.add(continents);

const oceansGeometry = new THREE.SphereGeometry(2.01, 64, 64);
const oceansMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(0x00ff00), wireframe: true, alphaMap: oceanMap, transparent: true, opacity: 0.2 });
const oceans = new THREE.Mesh(oceansGeometry, oceansMaterial);
scene.add(oceans);

// --- PARTÍCULAS FLUTUANTES ---
const particlesGeometry = new THREE.BufferGeometry;
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: 0x00ff00
});
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// --- CÂMERA E ANIMAÇÃO ---
camera.position.z = 4.5;

const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    // Rotação do globo
    continents.rotation.y = elapsedTime * 0.2;
    oceans.rotation.y = elapsedTime * 0.2;

    // Movimento sutil das partículas
    particlesMesh.rotation.y = -elapsedTime * 0.1;
    
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


// ======================================================
// PARTE 2: SWIPER.JS
// ======================================================
const swiper = new Swiper('.swiper', {
    loop: true,
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});


// ======================================================
// PARTE 3: ANIMAÇÃO DE SCROLL
// ======================================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

const sectionsToAnimate = document.querySelectorAll('.container');
sectionsToAnimate.forEach((el) => observer.observe(el));