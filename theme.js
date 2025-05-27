// Enhanced Theme Toggle with Cybersecurity Aesthetics
class ThemeManager {
  constructor() {
    this.init();
    this.setupEventListeners();
    this.applyStoredTheme();
  }

  init() {
    // Create theme toggle button if it doesn't exist
    this.themeToggle = document.getElementById('theme-toggle');
    
    if (!this.themeToggle) {
      console.warn('Theme toggle button not found');
      return;
    }

    // Set initial state
    this.updateToggleIcon();
  }

  setupEventListeners() {
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }

    // Listen for system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme-preference')) {
          this.applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }

    // Keyboard shortcut for theme toggle (Ctrl/Cmd + Shift + T)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }

  toggleTheme() {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    this.applyTheme(newTheme);
    this.saveThemePreference(newTheme);
  }

  applyTheme(theme) {
    const body = document.body;
    
    if (theme === 'dark') {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }

    this.updateToggleIcon();
    this.animateThemeTransition();
    
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme } 
    }));
  }

  applyStoredTheme() {
    const storedTheme = localStorage.getItem('theme-preference');
    
    if (storedTheme) {
      this.applyTheme(storedTheme);
    } else {
      // Use system preference if no stored preference
      const prefersDark = window.matchMedia && 
                         window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.applyTheme(prefersDark ? 'dark' : 'light');
    }
  }

  getCurrentTheme() {
    return document.body.classList.contains('dark-theme') ? 'dark' : 'light';
  }

  saveThemePreference(theme) {
    localStorage.setItem('theme-preference', theme);
  }

  updateToggleIcon() {
    if (!this.themeToggle) return;

    const isDark = this.getCurrentTheme() === 'dark';
    const icon = this.themeToggle.querySelector('i');
    
    if (icon) {
      icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Update aria-label for accessibility
    this.themeToggle.setAttribute(
      'aria-label', 
      `Switch to ${isDark ? 'light' : 'dark'} theme`
    );
  }

  animateThemeTransition() {
    // Add transition animation class
    document.body.classList.add('theme-transitioning');
    
    // Remove transition class after animation completes
    setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
    }, 300);
  }

  // Get theme for external components
  getTheme() {
    return this.getCurrentTheme();
  }

  // Set theme programmatically
  setTheme(theme) {
    if (theme === 'dark' || theme === 'light') {
      this.applyTheme(theme);
      this.saveThemePreference(theme);
    }
  }
}

// Cybersecurity-themed particles animation
class CyberParticles {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.connections = [];
    this.mouse = { x: 0, y: 0 };
    this.init();
  }

  init() {
    this.createCanvas();
    this.setupParticles();
    this.setupEventListeners();
    this.animate();
  }

  createCanvas() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '1';
    
    heroSection.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resize();
  }

  setupParticles() {
    const particleCount = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
  }

  setupEventListeners() {
    window.addEventListener('resize', () => this.resize());
    
    if (this.canvas) {
      this.canvas.addEventListener('mousemove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
      });
    }
  }

  resize() {
    if (!this.canvas) return;
    
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  animate() {
    if (!this.ctx) return;
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update particles
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;
    });
    
    // Draw connections
    this.drawConnections();
    
    // Draw particles
    this.drawParticles();
    
    requestAnimationFrame(() => this.animate());
  }

  drawParticles() {
    this.particles.forEach(particle => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      
      const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
      const color = theme === 'dark' ? 
        `rgba(102, 140, 255, ${particle.opacity})` : 
        `rgba(74, 108, 247, ${particle.opacity})`;
      
      this.ctx.fillStyle = color;
      this.ctx.fill();
    });
  }

  drawConnections() {
    const maxDistance = 100;
    
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const opacity = (maxDistance - distance) / maxDistance * 0.2;
          
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          
          const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
          const color = theme === 'dark' ? 
            `rgba(102, 140, 255, ${opacity})` : 
            `rgba(74, 108, 247, ${opacity})`;
          
          this.ctx.strokeStyle = color;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }
  }
}

// Matrix-style terminal effect for cybersecurity theme
class MatrixEffect {
  constructor() {
    this.chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    this.fontSize = 14;
    this.drops = [];
    this.canvas = null;
    this.ctx = null;
    this.init();
  }

  init() {
    // Only show matrix effect on certain pages or sections
    const heroSection = document.querySelector('.hero-background');
    if (!heroSection || window.innerWidth < 768) return;

    this.createCanvas();
    this.setupDrops();
    this.animate();
  }

  createCanvas() {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;

    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.opacity = '0.1';
    this.canvas.style.zIndex = '1';
    
    heroBackground.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    
    window.addEventListener('resize', () => this.resize());
  }

  setupDrops() {
    const columns = Math.floor(this.canvas.width / this.fontSize);
    this.drops = Array(columns).fill(1);
  }

  resize() {
    if (!this.canvas) return;
    
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.setupDrops();
  }

  animate() {
    if (!this.ctx || !this.canvas) return;

    // Semi-transparent background for trail effect
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Set text properties
    this.ctx.fillStyle = document.body.classList.contains('dark-theme') ? 
      '#00ff41' : '#4A6CF7';
    this.ctx.font = `${this.fontSize}px monospace`;

    // Draw characters
    for (let i = 0; i < this.drops.length; i++) {
      const char = this.chars[Math.floor(Math.random() * this.chars.length)];
      const x = i * this.fontSize;
      const y = this.drops[i] * this.fontSize;

      this.ctx.fillText(char, x, y);

      // Reset drop to top with random chance
      if (y > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }

      this.drops[i]++;
    }

    setTimeout(() => {
      requestAnimationFrame(() => this.animate());
    }, 100);
  }
}

// Initialize theme management and effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme manager
  window.themeManager = new ThemeManager();
  
  // Initialize cybersecurity effects (only if not on mobile for performance)
  if (window.innerWidth >= 768) {
    window.cyberParticles = new CyberParticles();
    
    // Initialize matrix effect only on hero sections
    if (document.querySelector('.hero-section')) {
      window.matrixEffect = new MatrixEffect();
    }
  }

  // Add smooth theme transition CSS
  const themeStyles = document.createElement('style');
  themeStyles.textContent = `
    body.theme-transitioning {
      transition: background-color 0.3s ease, color 0.3s ease;
    }
    
    body.theme-transitioning * {
      transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    }
    
    .theme-toggle {
      transition: transform 0.3s ease;
    }
    
    .theme-toggle:hover {
      transform: rotate(15deg) scale(1.1);
    }
  `;
  document.head.appendChild(themeStyles);
});

// Expose theme manager globally for other scripts
window.getTheme = () => {
  return window.themeManager ? window.themeManager.getTheme() : 'light';
};

window.setTheme = (theme) => {
  if (window.themeManager) {
    window.themeManager.setTheme(theme);
  }
};
