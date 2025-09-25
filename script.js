// Copy email or phone number
document.querySelectorAll('.copy').forEach(el => {
  el.addEventListener('click', () => {
    const text = el.getAttribute('data-copy');
    navigator.clipboard.writeText(text).then(() => {
      alert(text + ' copied to clipboard!');
    });
  });
});

// Particle Background
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fill();
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.x < 0 || this.x > width) this.speedX *= -1;
    if(this.y < 0 || this.y > height) this.speedY *= -1;
  }
}

for(let i=0;i<particleCount;i++){
  particles.push(new Particle());
}

function animate(){
  ctx.clearRect(0,0,width,height);
  for(let i=0;i<particles.length;i++){
    particles[i].update();
    particles[i].draw();
    for(let j=i+1;j<particles.length;j++){
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < 100){
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,255,255,${1-dist/100})`;
        ctx.lineWidth = 1;
        ctx.moveTo(particles[i].x,particles[i].y);
        ctx.lineTo(particles[j].x,particles[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize',()=>{
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

// Scroll fade-in effect
const faders = document.querySelectorAll('.fade-in');

const appearOnScroll = () => {
  faders.forEach(fader=>{
    const rect = fader.getBoundingClientRect();
    if(rect.top < window.innerHeight-100){
      fader.classList.add('visible');
    } else {
      fader.classList.remove('visible');
    }
  });
};
window.addEventListener('scroll', appearOnScroll);
appearOnScroll();

// Hero parallax + fade on scroll
const hero = document.querySelector('.hero');
const heroContainer = document.querySelector('.hero .container');

window.addEventListener('scroll',()=>{
  const scrollY = window.scrollY;

  // Parallax
  heroContainer.style.transform = `translateY(${scrollY*0.3}px)`;

  // Fade out hero
  const maxFade = 300;
  const opacity = Math.max(0, 1 - scrollY/maxFade);
  hero.style.opacity = opacity;
});
