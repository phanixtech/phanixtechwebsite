/* ==========================================================================
   PHANIX TECH - INTERACTIVE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. STICKY NAVBAR SCROLL EFFECT
  const mainHeader = document.querySelector('.main-header');
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      mainHeader?.classList.add('scrolled');
    } else {
      mainHeader?.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      backToTop?.classList.add('show');
    } else {
      backToTop?.classList.remove('show');
    }
  });

  // 2. MOBILE MENU TOGGLE
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const icon = hamburgerBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav?.classList.remove('open');
      const icon = hamburgerBtn?.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
      }
    });
  });

  // 3. FAQ ACCORDION TOGGLE
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other accordion items
      faqItems.forEach(otherItem => otherItem.classList.remove('active'));

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 4. PRICING MONTHLY / YEARLY TOGGLE SWITCH
  const billingToggle = document.getElementById('billingToggle');
  const monthlyPrices = document.querySelectorAll('.price-monthly');
  const yearlyPrices = document.querySelectorAll('.price-yearly');
  const monthlyLabel = document.getElementById('monthlyLabel');
  const yearlyLabel = document.getElementById('yearlyLabel');

  if (billingToggle) {
    billingToggle.addEventListener('change', (e) => {
      if (e.target.checked) {
        // Yearly
        monthlyPrices.forEach(p => p.style.display = 'none');
        yearlyPrices.forEach(p => p.style.display = 'inline');
        yearlyLabel?.classList.add('active');
        monthlyLabel?.classList.remove('active');
      } else {
        // Monthly
        yearlyPrices.forEach(p => p.style.display = 'none');
        monthlyPrices.forEach(p => p.style.display = 'inline');
        monthlyLabel?.classList.add('active');
        yearlyLabel?.classList.remove('active');
      }
    });
  }

  // 5. PORTFOLIO FILTER TABS
  const portTabs = document.querySelectorAll('.port-tab');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  portTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      portTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. TECH STACK FILTER TABS
  const techTabs = document.querySelectorAll('.tech-tab');
  const techCards = document.querySelectorAll('.tech-card');

  techTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      techTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      techCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 7. LIVE AI CHATBOT INTERACTIVE PREVIEW
  const aiChatBody = document.getElementById('aiChatBody');
  const aiChatInput = document.getElementById('aiChatInput');
  const aiSendBtn = document.getElementById('aiSendBtn');
  const aiChips = document.querySelectorAll('.ai-chip-btn');

  const botResponses = {
    "services": "PHANIX TECH builds custom Web Applications, 3D & Motion Sites, E-Commerce Platforms, Mobile Apps, AI Automation Workflows, and AI Chatbots!",
    "cost": "Our web packages start at ₹4,999/mo for Starter landing pages, ₹12,999/mo for Professional web apps, and ₹24,999/mo for Business & Enterprise solutions.",
    "fast": "Most standard projects take between 1 to 3 weeks. Urgent 48-hour delivery options are also available for landing pages!",
    "contact": "You can reach us directly via WhatsApp at +91 6381534316, email phanixtech@gmail.com, or fill in the enquiry form below!"
  };

  function sendUserMsg(msgText, responseKey) {
    if (!aiChatBody) return;
    
    // Append User Message
    const userDiv = document.createElement('div');
    userDiv.className = 'ai-msg user';
    userDiv.innerText = msgText;
    aiChatBody.appendChild(userDiv);
    aiChatBody.scrollTop = aiChatBody.scrollHeight;

    // Simulate Bot Typing Response
    setTimeout(() => {
      const botDiv = document.createElement('div');
      botDiv.className = 'ai-msg bot';
      
      let reply = botResponses[responseKey] || "Thank you for reaching out! PHANIX TECH provides end-to-end full-stack web development, AI automation, and custom digital products. How can we help your business grow?";
      botDiv.innerText = reply;
      
      aiChatBody.appendChild(botDiv);
      aiChatBody.scrollTop = aiChatBody.scrollHeight;
    }, 500);
  }

  aiChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const promptText = chip.innerText;
      const key = chip.getAttribute('data-key');
      sendUserMsg(promptText, key);
    });
  });

  if (aiSendBtn && aiChatInput) {
    aiSendBtn.addEventListener('click', () => {
      const val = aiChatInput.value.trim();
      if (val) {
        sendUserMsg(val, 'custom');
        aiChatInput.value = '';
      }
    });

    aiChatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const val = aiChatInput.value.trim();
        if (val) {
          sendUserMsg(val, 'custom');
          aiChatInput.value = '';
        }
      }
    });
  }

  // 8. ANIMATED STAT COUNTER ON SCROLL
  const statNumbers = document.querySelectorAll('.stat-num[data-target]');
  let animated = false;

  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      const suffix = stat.getAttribute('data-suffix') || '';
      let current = 0;
      const increment = Math.ceil(target / 40);

      const updateCount = () => {
        current += increment;
        if (current >= target) {
          stat.innerText = target + suffix;
        } else {
          stat.innerText = current + suffix;
          setTimeout(updateCount, 30);
        }
      };

      updateCount();
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }

  // 9. JOB APPLICATION MODAL & AJAX FORM SUBMISSION
  const jobModal = document.getElementById('jobModal');
  const closeJobModal = document.getElementById('closeJobModal');
  const openJobModalBtns = document.querySelectorAll('.open-job-modal-btn');
  const applyingPositionSelect = document.getElementById('applyingPositionSelect');
  const jobApplicationForm = document.getElementById('jobApplicationForm');
  const jobFormState = document.getElementById('jobFormState');
  const jobSuccessState = document.getElementById('jobSuccessState');
  const submitJobBtn = document.getElementById('submitJobBtn');
  const backToWebsiteBtn = document.getElementById('backToWebsiteBtn');
  const whatsappDirectLink = document.getElementById('whatsappDirectLink');

  // Open Modal
  openJobModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const role = btn.getAttribute('data-role');
      if (applyingPositionSelect && role) {
        applyingPositionSelect.value = role;
      }
      // Reset form states
      if (jobFormState) jobFormState.style.display = 'block';
      if (jobSuccessState) jobSuccessState.style.display = 'none';
      if (jobModal) jobModal.classList.add('open');
    });
  });

  // Close Modal
  function resetAndCloseModal() {
    if (jobModal) jobModal.classList.remove('open');
  }

  closeJobModal?.addEventListener('click', resetAndCloseModal);
  backToWebsiteBtn?.addEventListener('click', resetAndCloseModal);

  jobModal?.addEventListener('click', (e) => {
    if (e.target === jobModal) {
      resetAndCloseModal();
    }
  });

  // Submit Job Form via Web3Forms AJAX
  if (jobApplicationForm) {
    jobApplicationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (submitJobBtn) {
        submitJobBtn.disabled = true;
        submitJobBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Submitting Application...`;
      }

      const formData = new FormData(jobApplicationForm);
      const applicantName = formData.get('Applicant Name') || '';
      const applyingPosition = formData.get('Applying Position') || '';

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        if (submitJobBtn) {
          submitJobBtn.disabled = false;
          submitJobBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Submit Application`;
        }

        // Show Success Animation State
        if (jobFormState) jobFormState.style.display = 'none';
        if (jobSuccessState) jobSuccessState.style.display = 'block';

        // Custom WhatsApp Link with applicant details
        if (whatsappDirectLink) {
          const waText = encodeURIComponent(`Hi PHANIX TECH, I just submitted my application for the role of ${applyingPosition}! My name is ${applicantName}.`);
          whatsappDirectLink.href = `https://wa.me/916381534316?text=${waText}`;
        }

        // Reset form inputs
        jobApplicationForm.reset();
      })
      .catch(err => {
        if (submitJobBtn) {
          submitJobBtn.disabled = false;
          submitJobBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Submit Application`;
        }
        
        // Show Success Animation State
        if (jobFormState) jobFormState.style.display = 'none';
        if (jobSuccessState) jobSuccessState.style.display = 'block';
      });
    });
  }
});
