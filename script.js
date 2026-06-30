document.addEventListener("DOMContentLoaded", () => {
  
  /* --- 1. Ambient Mouse Glow Tracking --- */
  const glow = document.querySelector('.mouse-glow');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    glow.style.transform = `translate(${glowX - 400}px, ${glowY - 400}px)`;
    requestAnimationFrame(animateGlow);
  }
  
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  animateGlow();

  /* --- 2. Scroll Reveal Observer --- */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* --- 3. NEW: 3D Interactive Card Tilt --- */
  const glassCards = document.querySelectorAll('.glass-card');
  
  glassCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation based on mouse distance from center
      const rotateX = ((y - centerY) / centerY) * -8; // Max 8 degrees tilt
      const rotateY = ((x - centerX) / centerX) * 8;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.transition = 'transform 0.1s ease';
      card.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', () => {
      // Reset smoothly to default active state to preserve scroll reveal
      card.style.transform = 'translateY(0) perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      card.style.zIndex = '1';
    });
  });

  /* --- 4. Magnetic Hover Effect --- */
  const magneticElements = document.querySelectorAll('.magnetic');
  
  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const h = rect.width / 2;
      const v = rect.height / 2;
      const x = e.clientX - rect.left - h;
      const y = e.clientY - rect.top - v;
      
      el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = `translate(0px, 0px)`;
    });
  });

 

/* --- 5. Submit Form --- */

const form = document.getElementById("notify-form");
const successMsg = document.getElementById("success-msg");
const submitBtn = document.getElementById("submit-btn");
const btnText = document.querySelector(".btn-text-submit");

form.addEventListener("submit", () => {

    submitBtn.disabled = true;

    btnText.textContent = "Submitting...";

    setTimeout(() => {

        successMsg.classList.remove("hidden");

        btnText.textContent = "Reserved ✓";

        form.reset();

        submitBtn.disabled = false;

    }, 1500);



});
});
