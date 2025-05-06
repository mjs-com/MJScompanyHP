// MJS Company Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
        }
      }
    });
  });
  
  // Form validation for contact form
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
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
        // In a real application, you would send the form data to a server here
        // For now, we'll just show a success message
        const formData = new FormData(contactForm);
        const formValues = {};
        
        for (let [key, value] of formData.entries()) {
          formValues[key] = value;
        }
        
        // Log form data to console (for demonstration)
        console.log('Form submitted:', formValues);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success';
        successMessage.textContent = 'お問い合わせありがとうございます。2〜3営業日以内にご返信いたします。';
        
        contactForm.reset();
        contactForm.parentNode.insertBefore(successMessage, contactForm);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      }
    });
  }
  
  // Helper functions for form validation
  function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    if (!formGroup.querySelector('.error-message')) {
      formGroup.appendChild(errorElement);
    }
    
    input.classList.add('is-invalid');
  }
  
  function removeError(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
      errorElement.remove();
    }
    
    input.classList.remove('is-invalid');
  }
});