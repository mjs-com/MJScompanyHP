// MJS Company Website - Modern JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Header scroll effect
  const header = document.querySelector('header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Hide/show header on scroll
    if (currentScroll > lastScroll && currentScroll > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
  });
  
  // Mobile Navigation Toggle with animation
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      
      // Animate hamburger menu
      const spans = navToggle.querySelectorAll('span');
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
      } else {
        spans[0].style.transform = 'rotate(0) translateY(0)';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'rotate(0) translateY(0)';
      }
    });
  }
  
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        
        // Stagger animations for child elements
        const children = entry.target.querySelectorAll('.animate-child');
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('fade-in-visible');
          }, index * 100);
        });
      }
    });
  }, observerOptions);
  
  // Add fade-in class to elements
  const animateElements = document.querySelectorAll('.problem-card, .product-card, .strength-item, .service-item');
  animateElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
  
  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
  }
  
  // Smooth scrolling for anchor links with easing
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;
        
        window.requestAnimationFrame(step);
        
        function step(timestamp) {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const easing = easeInOutCubic(progress);
          window.scrollTo(0, startPosition + distance * easing);
          
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        }
        
        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          const spans = navToggle.querySelectorAll('span');
          spans[0].style.transform = 'rotate(0) translateY(0)';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'rotate(0) translateY(0)';
        }
      }
    });
  });
  
  // Easing function
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }
  
  // Mouse hover effects for cards
  const cards = document.querySelectorAll('.problem-card, .product-card, .strength-item, .service-item');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / centerY * 5;
      const rotateY = (centerX - x) / centerX * 5;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
  
  // Form validation with modern styling
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    // Add floating label effect
    const formGroups = contactForm.querySelectorAll('.form-group');
    formGroups.forEach(group => {
      const input = group.querySelector('.form-control');
      const label = group.querySelector('label');
      
      if (input && label) {
        input.addEventListener('focus', () => {
          label.classList.add('active');
        });
        
        input.addEventListener('blur', () => {
          if (!input.value) {
            label.classList.remove('active');
          }
        });
        
        // Check if input has value on load
        if (input.value) {
          label.classList.add('active');
        }
      }
    });
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const nameInput = document.querySelector('#name');
      const emailInput = document.querySelector('#email');
      const messageInput = document.querySelector('#message');
      
      // Simple validation
      if (nameInput && nameInput.value.trim() === '') {
        isValid = false;
        showError(nameInput, 'お名前を入力してください');
      } else if (nameInput) {
        removeError(nameInput);
      }
      
      if (emailInput) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
          isValid = false;
          showError(emailInput, 'メールアドレスを入力してください');
        } else if (!emailRegex.test(emailInput.value.trim())) {
          isValid = false;
          showError(emailInput, '有効なメールアドレスを入力してください');
        } else {
          removeError(emailInput);
        }
      }
      
      if (messageInput && messageInput.value.trim() === '') {
        isValid = false;
        showError(messageInput, 'メッセージを入力してください');
      } else if (messageInput) {
        removeError(messageInput);
      }
      
      if (isValid) {
        // Add loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = '送信中...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
          // Show success message with animation
          const successMessage = document.createElement('div');
          successMessage.className = 'alert alert-success fade-in';
          successMessage.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>お問い合わせありがとうございます。2〜3営業日以内にご返信いたします。</span>
          `;
          
          contactForm.reset();
          contactForm.parentNode.insertBefore(successMessage, contactForm);
          
          // Reset button
          submitButton.textContent = originalText;
          submitButton.disabled = false;
          
          // Animate success message
          setTimeout(() => {
            successMessage.classList.add('fade-in-visible');
          }, 100);
          
          // Remove success message after 5 seconds
          setTimeout(() => {
            successMessage.style.opacity = '0';
            setTimeout(() => successMessage.remove(), 300);
          }, 5000);
        }, 1500);
      }
    });
  }
  
  // Helper functions for form validation
  function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    
    errorElement.className = 'error-message fade-in';
    errorElement.textContent = message;
    
    if (!formGroup.querySelector('.error-message')) {
      formGroup.appendChild(errorElement);
      setTimeout(() => errorElement.classList.add('fade-in-visible'), 10);
    }
    
    input.classList.add('is-invalid');
  }
  
  function removeError(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
      errorElement.style.opacity = '0';
      setTimeout(() => errorElement.remove(), 300);
    }
    
    input.classList.remove('is-invalid');
  }
  
  // Add CSS classes for animations
  const style = document.createElement('style');
  style.textContent = `
    .fade-in {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .fade-in-visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .alert {
      padding: 1rem 1.5rem;
      border-radius: 10px;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      font-weight: 500;
    }
    
    .alert-success {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
    }
    
    .alert-error {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      color: white;
      box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
    }
    
    .error-message {
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.5rem;
      font-weight: 500;
    }
    
    .is-invalid {
      border-color: #ef4444 !important;
    }
    
    .form-group label.active {
      transform: translateY(-25px) scale(0.85);
      color: var(--primary-color);
    }
  `;
  document.head.appendChild(style);
  
  // Loading animation
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });
});

// Utility function for smooth number animation
function animateNumber(element, start, end, duration) {
  const range = end - start;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = start + range * easeInOutCubic(progress);
    
    element.textContent = Math.round(current);
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }
  
  requestAnimationFrame(update);
}
