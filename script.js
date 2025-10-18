// Inisialisasi scene Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha untuk transparansi
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('threejs-container').appendChild(renderer.domElement);

// Tambahkan cahaya
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

// Buat kartu bank sebagai plane dengan tekstur
const textureLoader = new THREE.TextureLoader();
const cardTexture = textureLoader.load('card.png'); // Ganti dengan path gambar kartu Anda
const cardGeometry = new THREE.PlaneGeometry(2, 1.2); // Ukuran kartu (seperti kartu kredit)
const cardMaterial = new THREE.MeshLambertMaterial({ map: cardTexture, transparent: true });
const card = new THREE.Mesh(cardGeometry, cardMaterial);
scene.add(card);

// Posisi awal kartu (jatuh dari atas)
card.position.set(0, 10, 0); // Mulai di atas
camera.position.z = 5;

// Variabel untuk animasi
let scrollY = 0;
let cardY = 10; // Posisi Y kartu
const fallSpeed = 0.02; // Kecepatan jatuh slow motion

// Fungsi animasi
function animate() {
    requestAnimationFrame(animate);
    
    // Kartu jatuh perlahan
    if (cardY > -5) { // Jatuh sampai batas bawah
        cardY -= fallSpeed;
        card.position.y = cardY;
    }
    
    // Efek parallax: kartu mengikuti scroll (gerak naik-turun berdasarkan scroll)
    const scrollOffset = window.scrollY * 0.01; // Faktor untuk gerakan
    card.position.y = cardY + scrollOffset; // Tambahkan offset scroll
    
    // Rotasi kartu untuk efek dinamis
    card.rotation.x += 0.005;
    card.rotation.y += 0.01;
    
    renderer.render(scene, camera);
}

// Update ukuran saat resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Update scroll
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
});

// Mulai animasi
animate();