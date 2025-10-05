// Enhanced Stars in CSS with more variety
const starsContainer = document.createElement("div");
starsContainer.style.cssText =
  "position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none;";

// Create different types of stars
for (let i = 0; i < 200; i++) {
  const star = document.createElement("div");
  const size = Math.random() * 4 + 1;
  const brightness = Math.random() * 0.8 + 0.2;
  const twinkleSpeed = Math.random() * 4 + 2;
  const delay = Math.random() * 5;

  star.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background: ${Math.random() > 0.7 ? "#fff" : "#e6e6fa"};
    border-radius: 50%;
    left: ${Math.random() * 100}%;
    top: ${Math.random() * 70}%;
    box-shadow: 0 0 ${size * 3}px rgba(255, 255, 255, ${brightness});
    animation: twinkle ${twinkleSpeed}s ease-in-out infinite;
    animation-delay: ${delay}s;
    opacity: ${brightness};
  `;
  starsContainer.appendChild(star);
}

// Add some shooting stars
for (let i = 0; i < 3; i++) {
  const shootingStar = document.createElement("div");
  shootingStar.style.cssText = `
    position: absolute;
    width: 2px;
    height: 2px;
    background: white;
    border-radius: 50%;
    left: ${Math.random() * 100}%;
    top: ${Math.random() * 50}%;
    box-shadow: 0 0 10px white;
    animation: shootingStarMove ${Math.random() * 3 + 2}s linear infinite;
    animation-delay: ${Math.random() * 10}s;
  `;
  starsContainer.appendChild(shootingStar);
}

document.body.insertBefore(starsContainer, document.body.firstChild);

const style = document.createElement("style");
style.textContent = `
  @keyframes twinkle {
    0%, 100% { 
      opacity: 1; 
      transform: scale(1); 
    }
    25% { 
      opacity: 0.3; 
      transform: scale(0.8); 
    }
    50% { 
      opacity: 0.8; 
      transform: scale(1.2); 
    }
    75% { 
      opacity: 0.5; 
      transform: scale(0.9); 
    }
  }
  
  @keyframes shootingStarMove {
    0% {
      transform: translateX(0) translateY(0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateX(300px) translateY(150px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Three.js Scene Setup
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x020024, 10, 80);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);

// Enhanced Lighting for village scene
const ambientLight = new THREE.AmbientLight(0x404080, 0.8);
scene.add(ambientLight);

// Bright moonlight
const moonLight = new THREE.PointLight(0xfff9e6, 4, 150);
moonLight.position.set(10, 15, 10);
moonLight.castShadow = true;
scene.add(moonLight);

// Warm village lights
const villageLight1 = new THREE.PointLight(0xffeb3b, 1.5, 30);
villageLight1.position.set(-8, 2, 5);
scene.add(villageLight1);

const villageLight2 = new THREE.PointLight(0xffeb3b, 1.2, 25);
villageLight2.position.set(8, 2, 3);
scene.add(villageLight2);

// Enhanced Stars in 3D space
const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({
  color: 0xe6e6fa,
  size: 0.2,
  transparent: true,
  opacity: 0.9,
});
const starsVertices = [];
const starsColors = [];
for (let i = 0; i < 15000; i++) {
  starsVertices.push(
    (Math.random() - 0.5) * 300,
    Math.random() * 150 + 50,
    (Math.random() - 0.5) * 300
  );

  // Add color variation to stars
  const color = new THREE.Color();
  if (Math.random() > 0.8) {
    color.setHSL(0.1, 0.3, 1); // Slightly yellow stars
  } else {
    color.setHSL(0.6, 0.2, 1); // Blue-white stars
  }
  starsColors.push(color.r, color.g, color.b);
}
starsGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(starsVertices, 3)
);
starsGeometry.setAttribute(
  "color",
  new THREE.Float32BufferAttribute(starsColors, 3)
);
starsMaterial.vertexColors = true;
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// Enhanced Clouds with more realistic positioning
const cloudGeometry = new THREE.SphereGeometry(3, 16, 16);
const cloudMaterial = new THREE.MeshPhongMaterial({
  color: 0xb0c4de,
  transparent: true,
  opacity: 0.3,
});
const clouds = [];
for (let i = 0; i < 12; i++) {
  const cloudGroup = new THREE.Group();
  for (let j = 0; j < 5; j++) {
    const cloudPart = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloudPart.position.set(
      Math.random() * 6 - 3,
      Math.random() * 3 - 1.5,
      Math.random() * 4 - 2
    );
    cloudPart.scale.setScalar(Math.random() * 0.7 + 0.3);
    cloudGroup.add(cloudPart);
  }
  cloudGroup.position.set(
    Math.random() * 60 - 30,
    Math.random() * 10 + 8,
    Math.random() * 40 - 25
  );
  clouds.push(cloudGroup);
  scene.add(cloudGroup);
}

camera.position.set(0, 6, 20);

// Enhanced Mouse Interaction
const mouse = new THREE.Vector2();
const mouseLight = new THREE.PointLight(0xff69b4, 2, 20);
scene.add(mouseLight);

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  mouseLight.position.set(mouse.x * 15, mouse.y * 10 + 5, 8);

  // Create a rainbow effect for mouse light
  const hue = (Date.now() % 5000) / 5000;
  mouseLight.color.setHSL(hue, 1, 0.6);
}

window.addEventListener("mousemove", onMouseMove);

// Enhanced Fireworks
class Firework {
  constructor(x, y, colors = null) {
    this.x = x;
    this.y = y;
    this.particles = [];
    this.exploded = false;
    this.colors = colors || [
      "#ff6b6b",
      "#e6e6fa",
      "#ff69b4",
      "#b0c4de",
      "#ffa500",
      "#ffeb3b",
      "#4fc3f7",
    ];
    this.centerParticle = {
      x,
      y: window.innerHeight,
      vx: (Math.random() - 0.5) * 3,
      vy: -(Math.random() * 6 + 15),
      size: 5,
      trail: [],
    };
  }

  update() {
    if (!this.exploded) {
      this.centerParticle.trail.push({
        x: this.centerParticle.x,
        y: this.centerParticle.y,
        alpha: 1,
      });
      if (this.centerParticle.trail.length > 15)
        this.centerParticle.trail.shift();
      this.centerParticle.trail.forEach((t) => (t.alpha *= 0.9));
      this.centerParticle.x += this.centerParticle.vx;
      this.centerParticle.y += this.centerParticle.vy;
      this.centerParticle.vy += 0.3;
      if (this.centerParticle.vy >= 0) this.explode();
    } else {
      this.particles = this.particles.filter((p) => p.alpha > 0);
      this.particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.alpha -= 0.012;
        p.size *= 0.985;
      });
    }
  }

  explode() {
    this.exploded = true;
    const particleCount = 200 + Math.random() * 100;
    const color = this.colors[Math.floor(Math.random() * this.colors.length)];
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = Math.random() * 8 + 4;
      this.particles.push({
        x: this.centerParticle.x,
        y: this.centerParticle.y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        color:
          Math.random() > 0.3
            ? color
            : this.colors[Math.floor(Math.random() * this.colors.length)],
        alpha: 1,
        size: Math.random() * 5 + 2,
      });
    }
  }

  draw(ctx) {
    if (!this.exploded) {
      this.centerParticle.trail.forEach((t, index) => {
        ctx.save();
        ctx.globalAlpha = t.alpha;
        ctx.fillStyle = "#e6e6fa";
        ctx.beginPath();
        ctx.arc(
          t.x,
          t.y,
          (this.centerParticle.size * t.alpha * (index + 1)) /
            this.centerParticle.trail.length,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.restore();
      });
      ctx.save();
      ctx.fillStyle = "#fff";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#e6e6fa";
      ctx.beginPath();
      ctx.arc(
        this.centerParticle.x,
        this.centerParticle.y,
        this.centerParticle.size,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.restore();
    } else {
      this.particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 5;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }
  }
}

let fireworks = [];
let fireworkCanvas, fireworkCtx;

function initFireworks() {
  fireworkCanvas = document.createElement("canvas");
  fireworkCanvas.width = window.innerWidth;
  fireworkCanvas.height = window.innerHeight;
  fireworkCanvas.style.cssText =
    "position: fixed; top: 0; left: 0; pointer-events: none; z-index: 40;";
  document.body.appendChild(fireworkCanvas);
  fireworkCtx = fireworkCanvas.getContext("2d");
}

function animateFireworks() {
  fireworkCtx.clearRect(0, 0, fireworkCanvas.width, fireworkCanvas.height);
  fireworks = fireworks.filter((f) => {
    f.update();
    f.draw(fireworkCtx);
    return !f.exploded || f.particles.length > 0;
  });
  requestAnimationFrame(animateFireworks);
}

initFireworks();
animateFireworks();

// Lanterns
function createLanterns() {
  const lanternPositions = [
    { left: "5%", top: "20%", delay: "0s" },
    { left: "15%", top: "60%", delay: "2s" },
    { left: "85%", top: "25%", delay: "1s" },
    { left: "75%", top: "70%", delay: "3s" },
  ];
  lanternPositions.forEach((pos) => {
    const lantern = document.createElement("div");
    lantern.className = "lantern";
    lantern.style.cssText = `left: ${pos.left}; top: ${pos.top}; animation-delay: ${pos.delay};`;
    lantern.innerHTML =
      '<div class="lantern-body"></div><div class="lantern-tassel"></div>';
    lantern.addEventListener("click", () =>
      createFirework(
        (parseInt(pos.left) * window.innerWidth) / 100,
        (parseInt(pos.top) * window.innerHeight) / 100
      )
    );
    document.body.appendChild(lantern);
  });
}

// Moon Cakes
function createMoonCakes() {
  const moonCakePositions = [
    { left: "10%", top: "30%", delay: "0s" },
    { left: "80%", top: "35%", delay: "2s" },
    { left: "35%", top: "25%", delay: "1s" },
  ];
  moonCakePositions.forEach((pos) => {
    const moonCake = document.createElement("div");
    moonCake.className = "moon-cake";
    moonCake.style.cssText = `left: ${pos.left}; top: ${pos.top}; animation-delay: ${pos.delay};`;
    moonCake.innerHTML = '<div class="moon-cake-body">🥮</div>';
    moonCake.addEventListener("click", () =>
      createFirework(
        (parseInt(pos.left) * window.innerWidth) / 100,
        (parseInt(pos.top) * window.innerHeight) / 100,
        ["#d4a574", "#8b6239", "#e6e6fa"]
      )
    );
    document.body.appendChild(moonCake);
  });
}

// Rabbits
function createRabbits() {
  const rabbitPositions = [
    { left: "8%", top: "50%", delay: "0s" },
    { left: "88%", top: "60%", delay: "2s" },
  ];
  rabbitPositions.forEach((pos) => {
    const rabbit = document.createElement("div");
    rabbit.className = "rabbit";
    rabbit.style.cssText = `left: ${pos.left}; top: ${pos.top}; animation-delay: ${pos.delay};`;
    rabbit.innerHTML = `
      <div class="rabbit-body"></div>
      <div class="rabbit-ear left"></div>
      <div class="rabbit-ear right"></div>
      <div class="rabbit-eye left"></div>
      <div class="rabbit-eye right"></div>
      <div class="rabbit-nose"></div>
    `;
    rabbit.addEventListener("click", () => {
      alert("🎁 Chúc chị Ngọc nhận được nhiều lì xì và may mắn! 🧧");
      createFirework(
        (parseInt(pos.left) * window.innerWidth) / 100,
        (parseInt(pos.top) * window.innerHeight) / 100,
        ["#e6e6fa", "#ffb6c1", "#ff69b4"]
      );
    });
    document.body.appendChild(rabbit);
  });
}

// Enhanced Particles
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  setInterval(() => {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = Math.random() * 8 + 8 + "s";
    particle.style.background = ["#e6e6fa", "#ff69b4", "#b0c4de", "#ffeb3b"][
      Math.floor(Math.random() * 4)
    ];
    particle.style.width = particle.style.height = Math.random() * 6 + 2 + "px";
    particlesContainer.appendChild(particle);
    setTimeout(() => particle.remove(), 16000);
  }, 800);
}

// Button Functions
function createFirework(x, y, colors = null) {
  fireworks.push(new Firework(x, y, colors));
}

function createFireworkShow() {
  for (let i = 0; i < 8; i++) {
    setTimeout(
      () =>
        createFirework(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight * 0.5 + window.innerHeight * 0.2
        ),
      i * 500
    );
  }
}

function releaseMoreLanterns() {
  const specialEffects = document.getElementById("special-effects");
  for (let i = 0; i < 7; i++) {
    setTimeout(() => {
      const lantern = document.createElement("div");
      lantern.className = "floating-lantern";
      lantern.style.left = Math.random() * 80 + 10 + "%";
      lantern.innerHTML = '<div class="floating-lantern-body"></div>';
      specialEffects.appendChild(lantern);
      setTimeout(() => lantern.remove(), 10000);
    }, i * 600);
  }
}

function specialWish() {
  const wishes = [
    "🌟 Được 6 năm và 2 ngày quen biết nhau rồi đóoo. Hãy luôn thật hạnh phúc và tươi cười, luôn có được mọi thứ mình muốn nha🌟",
  ];
  alert(wishes[Math.floor(Math.random() * wishes.length)]);
  for (let i = 0; i < 12; i++) {
    setTimeout(
      () =>
        createFirework(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight * 0.5,
          ["#ff69b4", "#e6e6fa", "#b0c4de", "#ffeb3b"]
        ),
      i * 400
    );
  }
}

// Event Listeners
window.addEventListener("click", (e) => {
  // Only create firework if not clicking on a button
  if (!e.target.closest("button")) {
    createFirework(e.clientX, e.clientY);
  }
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  if (fireworkCanvas) {
    fireworkCanvas.width = window.innerWidth;
    fireworkCanvas.height = window.innerHeight;
  }
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate stars slowly
  stars.rotation.y += 0.0002;

  // Animate clouds
  clouds.forEach((cloud, i) => {
    cloud.position.x += Math.sin(Date.now() * 0.0001 + i) * 0.01;
    cloud.rotation.y += 0.0001;
  });

  // Animate moon light intensity
  moonLight.intensity = 4 + Math.sin(Date.now() * 0.001) * 0.5;

  renderer.render(scene, camera);
}

// Initialize
createLanterns();
createMoonCakes();
createRabbits();
createParticles();
animate();

// Random fireworks
setInterval(() => {
  if (Math.random() > 0.85) {
    createFirework(
      Math.random() * window.innerWidth,
      Math.random() * window.innerHeight * 0.5 + window.innerHeight * 0.2
    );
  }
}, 5000);

// Add some ambient sounds effect (visual representation)
setInterval(() => {
  if (Math.random() > 0.9) {
    // Create a subtle flash effect for lightning in the distance
    const flash = document.createElement("div");
    flash.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.1);
      pointer-events: none;
      z-index: 1;
      animation: flash 0.2s ease-out;
    `;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 200);
  }
}, 15000);

// Add flash animation
const flashStyle = document.createElement("style");
flashStyle.textContent = `
  @keyframes flash {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
  }
`;
document.head.appendChild(flashStyle);
