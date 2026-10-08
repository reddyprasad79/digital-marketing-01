/**
 * Stackly Travel & Tours - Interactive Website Script
 * Clean, lightweight Vanilla JavaScript for South India Tour Booking
 */

document.addEventListener('DOMContentLoaded', () => {
  // Update current year in footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------------
     1. Toast Notification Helper
     ------------------------------------------------------------------------ */
  const toast = document.getElementById('toast');
  let toastTimeout;

  window.showToast = (message, icon = '✓') => {
    if (!toast) return;
    toast.innerHTML = `<span style="color: #10B981; font-weight: bold; font-size: 1.15rem;">${icon}</span> <span>${message}</span>`;
    toast.classList.add('active');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('active');
    }, 4000);
  };

  /* ------------------------------------------------------------------------
     2. Mobile Navigation Menu Toggle
     ------------------------------------------------------------------------ */
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-actions a');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });

    // Close mobile menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* ------------------------------------------------------------------------
     3. Sticky Header Scroll Effect & Back-to-Top Button
     ------------------------------------------------------------------------ */
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------------------
     3b. Scroll Spy for Header Navigation (Home, About, Services, Packages, Contact)
     ------------------------------------------------------------------------ */
  const navSectionLinks = document.querySelectorAll('.nav-menu .nav-link[href^="#"]');
  if (navSectionLinks.length > 0) {
    const sections = [];
    navSectionLinks.forEach(link => {
      const targetId = link.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) sections.push({ link, targetEl });
    });

    if (sections.length > 0) {
      const updateActiveNavOnScroll = () => {
        const scrollPos = window.scrollY + 140;
        let currentSection = sections[0];
        for (let i = 0; i < sections.length; i++) {
          if (scrollPos >= sections[i].targetEl.offsetTop) {
            currentSection = sections[i];
          }
        }
        sections.forEach(s => s.link.classList.remove('active'));
        if (currentSection) {
          currentSection.link.classList.add('active');
        }
      };

      window.addEventListener('scroll', updateActiveNavOnScroll, { passive: true });
    }
  }

  /* ------------------------------------------------------------------------
     4. Animated Stats Counter (Intersection Observer)
     ------------------------------------------------------------------------ */
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute('data-target'));
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const decimalPlaces = parseInt(el.getAttribute('data-decimal') || '0', 10);
    const duration = 1800; // ms
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = target * easeProgress;

      el.textContent = `${prefix}${currentVal.toLocaleString(undefined, {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces
      })}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = `${prefix}${target.toLocaleString(undefined, {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces
        })}${suffix}`;
      }
    };

    requestAnimationFrame(updateCounter);
  };

  if ('IntersectionObserver' in window && statNumbers.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statNumbers.forEach(stat => observer.observe(stat));
  }

  /* ------------------------------------------------------------------------
     5. Multi-Tab Marketing Audit Generator Widget
     ------------------------------------------------------------------------ */
  const searchTabs = document.querySelectorAll('.search-widget .search-tab-btn');
  const websiteInput = document.getElementById('auditWebsite');
  let currentAuditTab = 'seo';

  searchTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      searchTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentAuditTab = tab.getAttribute('data-tab');

      if (websiteInput) {
        if (currentAuditTab === 'seo') {
          websiteInput.placeholder = 'https://yourbrand.com (SEO & Organic Audit)';
        } else if (currentAuditTab === 'ppc') {
          websiteInput.placeholder = 'https://yourbrand.com (Google & Meta Ads ROAS)';
        } else {
          websiteInput.placeholder = 'https://yourbrand.com (Social & CRO Conversion Audit)';
        }
      }
    });
  });

  window.handleHeroAudit = () => {
    const site = websiteInput ? websiteInput.value.trim() : '';
    const objective = document.getElementById('auditObjective')?.value;
    const budget = document.getElementById('auditBudget')?.value;

    if (!site) {
      showToast('Please enter your website URL.', '⚠️');
      return;
    }

    showToast(`Analyzing ${site} for growth opportunities...`, '🚀');
    const packagesSec = document.getElementById('popular-packages');
    if (packagesSec) {
      packagesSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* ------------------------------------------------------------------------
     6. 3D Flip Card Package Filtering & Flip Triggers
     ------------------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll('.package-filter-btn');
  const packageCards = document.querySelectorAll('.package-card-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      packageCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const secCat = card.getAttribute('data-secondary');

        if (filter === 'all' || cat === filter || secCat === filter) {
          card.style.display = 'block';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Tap or Click to Flip 3D Card
  const flipTriggers = document.querySelectorAll('.trigger-flip');
  flipTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const wrapper = btn.closest('.flip-card-wrapper');
      if (wrapper) {
        wrapper.classList.toggle('flipped');
      }
    });
  });

  // Mobile touch tap on card toggles flip if user taps outside action buttons
  const flipCardWrappers = document.querySelectorAll('.flip-card-wrapper');
  flipCardWrappers.forEach(wrapper => {
    wrapper.addEventListener('click', (e) => {
      if (window.innerWidth <= 880 && !e.target.closest('a') && !e.target.closest('.trigger-book-now')) {
        wrapper.classList.toggle('flipped');
      }
    });
  });



  /* ------------------------------------------------------------------------
     9. FAQ Accordion Interaction
     ------------------------------------------------------------------------ */
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const headerBtn = item.querySelector('.accordion-header');
    if (!headerBtn) return;

    headerBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      accordionItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherIcon = other.querySelector('.bi-chevron-down');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      const icon = item.querySelector('.bi-chevron-down');
      if (isActive) {
        item.classList.remove('active');
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        item.classList.add('active');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  /* ------------------------------------------------------------------------
     10. Growth Consultation Inquiry Form Submission
     ------------------------------------------------------------------------ */
  window.handleMarketingInquiry = () => {
    const name = document.getElementById('contactName')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const phone = document.getElementById('contactPhone')?.value.trim();
    const submitBtn = document.getElementById('growthSubmitBtn');
    const successMsg = document.getElementById('growthSuccessMsg');
    const inquiryForm = document.getElementById('marketingInquiryForm');

    if (!name || !email || !phone) {
      showToast('Please fill in your name, email, and phone number.', '⚠️');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Analyzing Marketing Metrics...';
    }

    setTimeout(() => {
      if (inquiryForm) inquiryForm.style.display = 'none';
      if (successMsg) successMsg.style.display = 'block';

      showToast(`Thank you, ${name}! Our Growth Director will send your audit within 24 hours.`, '🎉');
    }, 900);
  };
});
