// Select all navigation links and the logo link
const navLinks  = document.querySelectorAll('nav a');
const logoLink  = document.querySelector('.logo');
const sections  = document.querySelectorAll('section[id]');
const barsBox   = document.querySelector('.bars-box');

const menuIcon  = document.getElementById('menu-icon');
const sideMenu  = document.getElementById('side-menu');
const closeIcon = document.getElementById('close-icon');

// Mobile-side links
const sideMenuLinks = sideMenu.querySelectorAll('.nav-link');

// Function to activate a specific section
const activePage = (idx) => {
  navLinks.forEach(link => link.classList.remove('active'));
  barsBox?.classList.remove('active');

  setTimeout(() => {
    barsBox?.classList.add('active');
    sections.forEach(section => section.classList.remove('active'));
    sections[idx]?.classList.add('active');
  }, 1100);
};

// Set --i custom property for bar animation
document.querySelectorAll('.bars-box .bar').forEach((bar, index) => {
  bar.style.setProperty('--i', index);
});

// Add click events to desktop navigation links
navLinks.forEach((link, idx) => {
  link.addEventListener('click', () => {
    if (!link.classList.contains('active')) {
      activePage(idx);
      link.classList.add('active');
    }
  });
});

// Logo click returns to first section
logoLink?.addEventListener('click', () => {
  if (!navLinks[0].classList.contains('active')) {
    activePage(0);
    navLinks[0].classList.add('active');
  }
});

// Resume tab switching
const resumeBtns = document.querySelectorAll('.resume-btn');
const resumeDetails = document.querySelectorAll('.resume-detail');

resumeBtns.forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    resumeBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    resumeDetails.forEach(detail => detail.classList.remove('active'));
    resumeDetails[idx]?.classList.add('active');
  });
});

// Portfolio carousel
const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');
const imgItems = document.querySelectorAll('.portfolio-carousel .img-item');
const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
const portfolioDetails = document.querySelectorAll('.portfolio-detail');

let index = 0;
const updateCarousel = () => {
  if (!imgSlide) return;
  imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;
  portfolioDetails.forEach(d => d.classList.remove('active'));
  portfolioDetails[index]?.classList.add('active');
  arrowLeft?.classList.toggle('disabled', index === 0);
  arrowRight?.classList.toggle('disabled', index === imgItems.length - 1);
};

arrowRight?.addEventListener('click', () => {
  if (index < imgItems.length - 1) index++;
  updateCarousel();
});
arrowLeft?.addEventListener('click', () => {
  if (index > 0) index--;
  updateCarousel();
});

updateCarousel();

// Download resume function
function downloadResume() {
  const link = document.createElement('a');
  link.href = 'images/Dhasarathan Resume.pdf';
  link.download = 'Dhasarathan.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Mobile menu controls
menuIcon?.addEventListener('click', () => {
  sideMenu?.classList.add('active');
});
closeIcon?.addEventListener('click', () => {
  sideMenu?.classList.remove('active');
});

// Auto-close side menu when a mobile link is clicked & navigate
sideMenuLinks.forEach((link, idx) => {
  link.addEventListener('click', () => {
    sideMenu?.classList.remove('active');
    activePage(idx);
    navLinks.forEach(l => l.classList.remove('active'));
    navLinks[idx]?.classList.add('active');
  });
});

// Optional: Maintain .active styling inside the side menu
sideMenuLinks.forEach(link => {
  link.addEventListener('click', function () {
    sideMenuLinks.forEach(nav => nav.classList.remove('active'));
    this.classList.add('active');
  });
});
