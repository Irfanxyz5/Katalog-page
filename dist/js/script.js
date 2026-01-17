const toggle = document.querySelector('.bx-menu');
let menuIcon = document.getElementById('menu-toggle');
const menu = document.querySelector('.menu');
const btnFilter = document.querySelectorAll('.produk-box ul li');
const imgFilter = document.querySelectorAll('.produk-list img');
const canvas = document.querySelector('.particles');
const ctx = canvas.getContext('2d');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  menu.classList.toggle('menu-active');
};

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const el = entry.target;
      const section = el.closest('nav, section, footer');
      const baseDelay = section?.dataset.delay || 0;

      if (entry.isIntersecting) {
        el.style.animationDelay = `${baseDelay + (el.dataset.index || 0) * 0.1}s`;
        el.classList.add('animate');
      } else {
        el.classList.remove('animate');
        el.style.animationDelay = '';
      }
    });
  },
  {
    threshold: 0.25,
  }
);

document.querySelectorAll('section, nav, footer').forEach(section => {
  section.querySelectorAll('.animation-on-scroll').forEach((el, i) => {
    el.dataset.index = i;
    observer.observe(el);
  });
});

window.onscroll = () => {
  menu.classList.remove('menu-active');
};

btnFilter.forEach(data => {
  data.onclick = () => {
    btnFilter.forEach(data => {
      data.className = '';
    });

    data.className = 'active';

    // Filter Produk
    const btnTxt = data.textContent;
    console.log(btnTxt);
    imgFilter.forEach(img => {
      img.style.display = 'none';

      if (img.getAttribute('data-filter') == btnTxt.toLowerCase() || btnTxt == 'ALL Produk') {
        img.style.display = 'block';
      }
    });
  };
});

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const particles = [];
const particleCount = 120;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.8;
    this.speedY = (Math.random() - 0.5) * 0.8;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fill();
  }
}

function initParticles() {
  particles.length = 0;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animate);
}

initParticles();
animate();
