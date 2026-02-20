/**
 * TrustFlow Plumbing — Conversion-Optimized JavaScript
 * 
 * Features:
 * 1. Scroll reveal animations (engagement)
 * 2. Counter animations (social proof)
 * 3. FAQ accordion (objection handling)
 * 4. Mobile navigation (accessibility)
 * 5. Sticky header shadow (polish)
 * 6. Form validation + success state (lead capture)
 * 7. Smooth scroll to sections (navigation)
 * 8. Click tracking for CTA analytics (performance data)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ══════════════════════════════════════════════
  // 1. SCROLL REVEAL ANIMATIONS
  // Engagement: Animated elements draw the eye and
  // create a sense of quality and modernity.
  // ══════════════════════════════════════════════
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach((el) => revealObserver.observe(el));

  // ══════════════════════════════════════════════
  // 2. COUNTER ANIMATIONS
  // Social Proof: Animated numbers are more engaging
  // and memorable than static text. Creates a sense
  // of scale and credibility.
  // ══════════════════════════════════════════════
  const counters = document.querySelectorAll('.proof-number[data-target]');
  let countersAnimated = false;

  const animateCounters = () => {
    if (countersAnimated) return;
    countersAnimated = true;

    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target'));
      const suffix = counter.querySelector('span')?.textContent || '';
      const duration = 2000;
      const startTime = performance.now();

      const easeOutQuad = (t) => t * (2 - t);

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuad(progress);
        const current = Math.round(target * easedProgress);

        // Format large numbers with commas
        const formatted = current.toLocaleString();
        counter.textContent = formatted + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  const counterSection = document.getElementById('social-proof');
  if (counterSection) {
    const counterObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        counterObserver.unobserve(counterSection);
      }
    }, { threshold: 0.3 });

    counterObserver.observe(counterSection);
  }

  // ══════════════════════════════════════════════
  // 3. FAQ ACCORDION
  // Objection Handling: Users get answers to
  // concerns without leaving the page. Reduces
  // "I need to think about it" responses.
  // ══════════════════════════════════════════════
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all FAQ items
      faqItems.forEach((faq) => {
        faq.classList.remove('active');
        const answer = faq.querySelector('.faq-answer');
        answer.style.maxHeight = '0';
        faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
        const answer = item.querySelector('.faq-answer');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ══════════════════════════════════════════════
  // 4. MOBILE NAVIGATION
  // Accessibility: Clean slide-in drawer with
  // overlay provides clear navigation on mobile.
  // Includes CTAs within the menu itself.
  // ══════════════════════════════════════════════
  const hamburger = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  const mobileNavClose = document.getElementById('mobile-nav-close');

  const toggleMobileNav = (open) => {
    if (open) {
      mobileNav.classList.add('open');
      mobileNavOverlay.classList.add('visible');
      hamburger.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      mobileNav.classList.remove('open');
      mobileNavOverlay.classList.remove('visible');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      toggleMobileNav(!isOpen);
    });
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', () => toggleMobileNav(false));
  }

  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', () => toggleMobileNav(false));
  }

  // Close mobile nav when a link is clicked
  const mobileNavLinks = mobileNav?.querySelectorAll('a[href^="#"]');
  mobileNavLinks?.forEach((link) => {
    link.addEventListener('click', () => toggleMobileNav(false));
  });

  // ══════════════════════════════════════════════
  // 5. STICKY HEADER SHADOW
  // Polish: Subtle shadow on scroll indicates the
  // header is sticky and creates depth. Smooth
  // transition adds to premium feel.
  // ══════════════════════════════════════════════
  const header = document.getElementById('main-header');
  let lastScrollY = 0;

  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ══════════════════════════════════════════════
  // 6. FORM VALIDATION + SUBMISSION
  // Lead Capture: Client-side validation prevents
  // errors. Success animation reinforces the action.
  // Phone number formatting improves UX.
  // ══════════════════════════════════════════════
  const form = document.getElementById('estimate-form');
  const formContainer = document.getElementById('lead-capture-form');
  const successMessage = document.getElementById('form-success');

  // Phone number auto-formatting
  const phoneInput = document.getElementById('form-phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');

      if (value.length > 10) value = value.substring(0, 10);

      if (value.length >= 6) {
        value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
      } else if (value.length >= 3) {
        value = `(${value.substring(0, 3)}) ${value.substring(3)}`;
      } else if (value.length > 0) {
        value = `(${value}`;
      }

      e.target.value = value;
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const name = document.getElementById('form-name');
      const phone = document.getElementById('form-phone');
      const service = document.getElementById('form-service');

      let valid = true;

      // Reset previous errors
      [name, phone, service].forEach((field) => {
        field.style.borderColor = '';
      });

      if (!name.value.trim()) {
        name.style.borderColor = 'var(--danger)';
        name.focus();
        valid = false;
      }

      if (!phone.value.trim() || phone.value.replace(/\D/g, '').length < 10) {
        phone.style.borderColor = 'var(--danger)';
        if (valid) phone.focus();
        valid = false;
      }

      if (!service.value) {
        service.style.borderColor = 'var(--danger)';
        if (valid) service.focus();
        valid = false;
      }

      if (!valid) return;

      // Simulate form submission
      const submitBtn = document.getElementById('form-submit-btn');
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      formContainer.classList.add('loading');

      setTimeout(() => {
        form.style.display = 'none';
        document.querySelector('.lead-form-header').style.display = 'none';
        successMessage.classList.add('show');
        formContainer.classList.remove('loading');

        // Track conversion
        trackEvent('form_submission', {
          service: service.value,
          source: 'website'
        });
      }, 1500);
    });
  }

  // ══════════════════════════════════════════════
  // 7. SMOOTH SCROLL
  // Navigation: Smooth scrolling provides a premium
  // feel and keeps users oriented on the page.
  // ══════════════════════════════════════════════
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ══════════════════════════════════════════════
  // 8. CTA CLICK TRACKING
  // Analytics: Track which CTAs users interact
  // with to optimize placement and messaging.
  // ══════════════════════════════════════════════
  const trackableElements = {
    'emergency-call-link': { action: 'call', location: 'emergency_bar' },
    'header-phone-link': { action: 'call', location: 'header' },
    'mobile-header-call': { action: 'call', location: 'header_mobile' },
    'hero-call-btn': { action: 'call', location: 'hero' },
    'hero-estimate-btn': { action: 'estimate', location: 'hero' },
    'mid-cta-call': { action: 'call', location: 'mid_cta' },
    'mid-cta-form': { action: 'estimate', location: 'mid_cta' },
    'sticky-call-btn': { action: 'call', location: 'sticky_mobile' },
    'sticky-estimate-btn': { action: 'estimate', location: 'sticky_mobile' },
    'mobile-nav-call': { action: 'call', location: 'mobile_nav' }
  };

  Object.entries(trackableElements).forEach(([id, data]) => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('click', () => {
        trackEvent('cta_click', data);
      });
    }
  });

  function trackEvent(eventName, data) {
    // In production, this would send to Google Analytics, Facebook Pixel, etc.
    console.log(`[TrustFlow Analytics] ${eventName}:`, data);

    // Example: Google Analytics 4
    // gtag('event', eventName, data);

    // Example: Facebook Pixel
    // fbq('track', eventName === 'form_submission' ? 'Lead' : 'Contact', data);
  }

  // ══════════════════════════════════════════════
  // 9. DYNAMIC AVAILABILITY CHECK
  // Urgency: Shows real-time availability based on
  // time of day. Creates authentic urgency.
  // ══════════════════════════════════════════════
  const updateAvailability = () => {
    const now = new Date();
    const hour = now.getHours();
    const badge = document.querySelector('.hero-badge');

    if (badge) {
      if (hour >= 7 && hour < 20) {
        badge.innerHTML = '<span class="hero-badge-dot"></span>Available Now — Technicians Standing By';
      } else {
        badge.innerHTML = '<span class="hero-badge-dot"></span>🌙 Night Service Active — Emergency Crews Ready';
      }
    }
  };

  updateAvailability();

  // ══════════════════════════════════════════════
  // 10. PERFORMANCE: Lazy load images
  // Speed: Only load images when they're about to
  // enter viewport. Critical for mobile performance.
  // ══════════════════════════════════════════════
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          imageObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    lazyImages.forEach((img) => imageObserver.observe(img));
  }

});
