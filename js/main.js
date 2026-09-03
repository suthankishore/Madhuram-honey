/**
 * Madhuram Honey — V1 Interactive Script
 * Handles:
 * - Mobile Navigation Menu & Backdrop
 * - Header Scroll States & Active Link Highlighting
 * - Quantity Selector & Dynamic WhatsApp Link Generation
 * - Accessible FAQ Accordion (Single-open)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configuration
  const CONFIG = {
    whatsappNumber: '919384978114', // Madhuram Honey WhatsApp Number
    productName: 'Madhuram Honey',
    productSize: '750 ml',
    unitPrice: 650,
    minQty: 1,
    maxQty: 20
  };

  function scrollToProductCard() {
    const productCard = document.getElementById('product-card');
    if (!productCard) return;

    const header = document.getElementById('site-header');
    const isMobile = window.innerWidth <= 768;
    // Account for sticky/fixed navbar height dynamically
    const headerHeight = header ? header.getBoundingClientRect().height : (isMobile ? 70 : 72);
    // Appropriate spacing so product card is comfortably visible below navbar
    const offsetPadding = isMobile ? 14 : 24;
    const cardRect = productCard.getBoundingClientRect();
    const currentScrollY = window.pageYOffset || window.scrollY || document.documentElement.scrollTop || 0;
    const targetScrollY = currentScrollY + cardRect.top - headerHeight - offsetPadding;

    window.scrollTo({
      top: Math.max(0, Math.round(targetScrollY)),
      behavior: 'smooth'
    });
  }

  const heroWhatsappBtn = document.getElementById('heroWhatsappBtn');
  if (heroWhatsappBtn) {
    heroWhatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToProductCard();
    });
  }

  const heroExploreBtn = document.getElementById('heroExploreBtn');
  if (heroExploreBtn) {
    heroExploreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToProductCard();
    });
  }

  const revealElements = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(element => revealObserver.observe(element));
  } else {
    revealElements.forEach(element => element.classList.add('revealed'));
  }

  /* ==========================================
     1. Mobile Navigation & Drawer
     ========================================== */
  const hamburger = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-footer .btn');

  function openMobileMenu() {
    hamburger.classList.add('is-active');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    mobileBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    hamburger.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    mobileBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (hamburger && mobileNav && mobileBackdrop) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.contains('is-active');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    mobileBackdrop.addEventListener('click', closeMobileMenu);

    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && hamburger.classList.contains('is-active')) {
        closeMobileMenu();
      }
    });
  }

  /* ==========================================
     2. Sticky Header & Active Link Observer
     ========================================== */
  const header = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(sec => sectionObserver.observe(sec));
  }

  /* ==========================================
     3. Single Product Quantity & WhatsApp Link
     ========================================== */
  let currentQuantity = 1;
  const qtyDisplay = document.getElementById('product-qty-val');
  const qtyMinusBtn = document.getElementById('qty-minus');
  const qtyPlusBtn = document.getElementById('qty-plus');
  const orderTotalPrice = document.getElementById('order-total-price');
  const orderCtaBtn = document.getElementById('product-whatsapp-cta');

  function updateOrderState() {
    const totalAmount = currentQuantity * CONFIG.unitPrice;
    
    if (qtyDisplay) qtyDisplay.textContent = currentQuantity;
    if (orderTotalPrice) {
      orderTotalPrice.textContent = `₹${totalAmount.toLocaleString('en-IN')}`;
    }

    if (orderCtaBtn) {
      const message = `Hello Madhuram Honey, I would like to order ${currentQuantity} bottle(s) of ${CONFIG.productName} (${CONFIG.productSize}) for ₹${totalAmount.toLocaleString('en-IN')}. Please confirm my order.`;
      const encodedMsg = encodeURIComponent(message);
      orderCtaBtn.setAttribute('href', `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMsg}`);
    }

    // Disable/enable buttons at bounds
    if (qtyMinusBtn) {
      qtyMinusBtn.disabled = currentQuantity <= CONFIG.minQty;
      qtyMinusBtn.style.opacity = currentQuantity <= CONFIG.minQty ? '0.4' : '1';
    }
    if (qtyPlusBtn) {
      qtyPlusBtn.disabled = currentQuantity >= CONFIG.maxQty;
      qtyPlusBtn.style.opacity = currentQuantity >= CONFIG.maxQty ? '0.4' : '1';
    }
  }

  if (qtyMinusBtn && qtyPlusBtn) {
    qtyMinusBtn.addEventListener('click', () => {
      if (currentQuantity > CONFIG.minQty) {
        currentQuantity--;
        updateOrderState();
      }
    });

    qtyPlusBtn.addEventListener('click', () => {
      if (currentQuantity < CONFIG.maxQty) {
        currentQuantity++;
        updateOrderState();
      }
    });

    // Initialize state
    updateOrderState();
  }

  /* ==========================================
     4. FAQ Accordion (Single Item Open)
     ========================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (questionBtn && answer) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // Close all items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('is-open');
          const otherBtn = otherItem.querySelector('.faq-question');
          const otherAns = otherItem.querySelector('.faq-answer');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAns) otherAns.style.maxHeight = null;
        });

        // Open clicked item if it was closed
        if (!isOpen) {
          item.classList.add('is-open');
          questionBtn.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  // Open first FAQ item by default
  if (faqItems.length > 0) {
    const firstItem = faqItems[0];
    const firstBtn = firstItem.querySelector('.faq-question');
    const firstAns = firstItem.querySelector('.faq-answer');
    if (firstBtn && firstAns) {
      firstItem.classList.add('is-open');
      firstBtn.setAttribute('aria-expanded', 'true');
      firstAns.style.maxHeight = firstAns.scrollHeight + 'px';
    }
  }

  /* ==========================================
     5. Scroll To Top Button
     ========================================== */
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollToTopBtn.classList.add('is-visible');
      } else {
        scrollToTopBtn.classList.remove('is-visible');
      }
    }, { passive: true });

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================
     6. Premium WhatsApp Order Modal Flow
     ========================================== */
  const orderModalBackdrop = document.getElementById('order-modal-backdrop');
  const orderModalCloseBtn = document.getElementById('order-modal-close');
  const orderForm = document.getElementById('order-form');

  const modalQtyMinusBtn = document.getElementById('modal-qty-minus');
  const modalQtyPlusBtn = document.getElementById('modal-qty-plus');
  const modalQtyDisplay = document.getElementById('modal-qty-val');
  const modalTotalPriceDisplay = document.getElementById('modal-total-price');

  // Customer details fields
  const nameInput = document.getElementById('order-customer-name');
  const phoneInput = document.getElementById('order-customer-phone');
  const nameError = document.getElementById('name-error');
  const phoneError = document.getElementById('phone-error');
  const groupName = document.getElementById('group-name');
  const groupPhone = document.getElementById('group-phone');

  // Delivery details fields
  const stateInput = document.getElementById('order-state');
  const districtInput = document.getElementById('order-district');
  const cityInput = document.getElementById('order-city');
  const areaInput = document.getElementById('order-area');
  const streetInput = document.getElementById('order-street');
  const pincodeInput = document.getElementById('order-pincode');
  const landmarkInput = document.getElementById('order-landmark');

  const stateError = document.getElementById('state-error');
  const districtError = document.getElementById('district-error');
  const cityError = document.getElementById('city-error');
  const areaError = document.getElementById('area-error');
  const streetError = document.getElementById('street-error');
  const pincodeError = document.getElementById('pincode-error');

  const groupState = document.getElementById('group-state');
  const groupDistrict = document.getElementById('group-district');
  const groupCity = document.getElementById('group-city');
  const groupArea = document.getElementById('group-area');
  const groupStreet = document.getElementById('group-street');
  const groupPincode = document.getElementById('group-pincode');

  const STATES_LIST = [
    'Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana',
    'Puducherry', 'Maharashtra', 'Delhi', 'Gujarat', 'Goa',
    'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Haryana',
    'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Madhya Pradesh',
    'Odisha', 'Punjab', 'Rajasthan', 'Uttar Pradesh', 'Uttarakhand',
    'West Bengal', 'Other State'
  ];

  const DISTRICTS_MAP = {
    'Tamil Nadu': [
      'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri',
      'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanyakumari', 'Karur',
      'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris',
      'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga',
      'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli',
      'Tirupattur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore',
      'Viluppuram', 'Virudhunagar'
    ],
    'Kerala': [
      'Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam',
      'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram',
      'Thrissur', 'Wayanad'
    ],
    'Karnataka': [
      'Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 'Bidar',
      'Chamarajanagar', 'Chikkaballapura', 'Chikkamagaluru', 'Chitradurga', 'Dakshina Kannada',
      'Davanagere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri', 'Kalaburagi', 'Kodagu', 'Kolar',
      'Koppal', 'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga', 'Tumakuru',
      'Udupi', 'Uttara Kannada', 'Vijayapura', 'Yadgir'
    ],
    'Andhra Pradesh': [
      'Alluri Sitharama Raju', 'Anakapalli', 'Ananthapuramu', 'Annamayya', 'Bapatla',
      'Chittoor', 'Dr. B.R. Ambedkar Konaseema', 'East Godavari', 'Eluru', 'Guntur',
      'Kakinada', 'Krishna', 'Kurnool', 'Nandyal', 'NTR', 'Palnadu', 'Parvathipuram Manyam',
      'Prakasam', 'Srikakulam', 'Sri Potti Sriramulu Nellore', 'Sri Sathya Sai',
      'Tirupati', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa'
    ],
    'Telangana': [
      'Adilabad', 'Bhadradri Kothagudem', 'Hyderabad', 'Jagtial', 'Jangaon',
      'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar', 'Khammam',
      'Kumuram Bheem', 'Mahabubabad', 'Mahabubnagar', 'Mancherial', 'Medak',
      'Medchal-Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Nalgonda', 'Narayanpet', 'Nirmal',
      'Nizamabad', 'Peddapalli', 'Rajanna Sircilla', 'Rangareddy', 'Sangareddy', 'Siddipet',
      'Suryapet', 'Vikarabad', 'Wanaparthy', 'Warangal', 'Hanamkonda', 'Yadadri Bhuvanagiri'
    ],
    'Puducherry': ['Puducherry', 'Karaikal', 'Mahe', 'Yanam'],
    'Maharashtra': ['Mumbai City', 'Mumbai Suburban', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Chhatrapati Sambhajinagar', 'Solapur', 'Kolhapur', 'Other District'],
    'Delhi': ['Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi', 'North West Delhi', 'Shahdara', 'South Delhi', 'South East Delhi', 'South West Delhi', 'West Delhi'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar', 'Junagadh', 'Anand', 'Other District'],
    'Goa': ['North Goa', 'South Goa'],
    'Other State': ['Other District']
  };

  function getAvailableDistricts() {
    const rawState = stateInput ? stateInput.value.trim() : '';
    if (!rawState) return [];

    const matchedKey = Object.keys(DISTRICTS_MAP).find(
      key => key.toLowerCase() === rawState.toLowerCase()
    );

    if (matchedKey && DISTRICTS_MAP[matchedKey]) {
      return DISTRICTS_MAP[matchedKey];
    }
    return ['Other District'];
  }

  function setupSearchableCombobox({
    inputEl,
    listEl,
    wrapEl,
    arrowBtn,
    groupEl,
    errorEl,
    getItems,
    onSelect
  }) {
    if (!inputEl || !listEl || !wrapEl) return null;

    let highlightedIndex = -1;
    let currentMatches = [];

    function renderList(query = '') {
      const items = getItems();
      const q = (query || '').toLowerCase().trim();
      currentMatches = q ? items.filter(item => item.toLowerCase().includes(q)) : items;

      listEl.innerHTML = '';
      highlightedIndex = -1;

      if (currentMatches.length === 0) {
        const emptyLi = document.createElement('li');
        emptyLi.className = 'order-combobox-empty';
        emptyLi.textContent = 'No matching options';
        listEl.appendChild(emptyLi);
      } else {
        currentMatches.forEach((item, idx) => {
          const li = document.createElement('li');
          li.className = 'order-combobox-item';
          li.setAttribute('role', 'option');
          li.setAttribute('id', `${inputEl.id}-opt-${idx}`);
          if (item.toLowerCase() === inputEl.value.trim().toLowerCase()) {
            li.classList.add('is-selected');
          }
          li.textContent = item;

          li.addEventListener('mousedown', (e) => {
            e.preventDefault();
            selectOption(item);
          });

          listEl.appendChild(li);
        });
      }
    }

    function openList() {
      renderList(inputEl.value.trim());
      listEl.hidden = false;
      wrapEl.classList.add('is-open');
      inputEl.setAttribute('aria-expanded', 'true');
    }

    function closeList() {
      listEl.hidden = true;
      wrapEl.classList.remove('is-open');
      inputEl.setAttribute('aria-expanded', 'false');
      highlightedIndex = -1;
    }

    function selectOption(value) {
      inputEl.value = value;
      closeList();
      if (groupEl) groupEl.classList.remove('has-error');
      if (errorEl) errorEl.textContent = '';
      if (typeof onSelect === 'function') {
        onSelect(value);
      }
    }

    function updateHighlight() {
      const itemEls = listEl.querySelectorAll('.order-combobox-item');
      itemEls.forEach((el, idx) => {
        if (idx === highlightedIndex) {
          el.classList.add('is-highlighted');
          el.scrollIntoView({ block: 'nearest' });
          inputEl.setAttribute('aria-activedescendant', el.id);
        } else {
          el.classList.remove('is-highlighted');
        }
      });
    }

    // Input interaction
    inputEl.addEventListener('focus', () => {
      openList();
    });

    inputEl.addEventListener('click', () => {
      if (listEl.hidden) {
        openList();
      }
    });

    inputEl.addEventListener('input', () => {
      openList();
      if (groupEl) groupEl.classList.remove('has-error');
      if (errorEl) errorEl.textContent = '';
      if (typeof onSelect === 'function') {
        onSelect(inputEl.value.trim());
      }
    });

    inputEl.addEventListener('keydown', (e) => {
      if (listEl.hidden && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        e.preventDefault();
        openList();
        return;
      }

      if (listEl.hidden) return;

      const itemEls = listEl.querySelectorAll('.order-combobox-item');
      if (itemEls.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        highlightedIndex = (highlightedIndex + 1) % itemEls.length;
        updateHighlight();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        highlightedIndex = (highlightedIndex - 1 + itemEls.length) % itemEls.length;
        updateHighlight();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < currentMatches.length) {
          selectOption(currentMatches[highlightedIndex]);
        } else if (currentMatches.length === 1) {
          selectOption(currentMatches[0]);
        } else {
          closeList();
        }
      } else if (e.key === 'Escape') {
        closeList();
      }
    });

    // Arrow button toggle
    if (arrowBtn) {
      arrowBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (listEl.hidden) {
          inputEl.focus();
          openList();
        } else {
          closeList();
        }
      });
    }

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!wrapEl.contains(e.target)) {
        closeList();
      }
    });

    return {
      openList,
      closeList,
      renderList
    };
  }

  let stateCombobox = null;
  let districtCombobox = null;

  // Initialize State Combobox
  stateCombobox = setupSearchableCombobox({
    inputEl: stateInput,
    listEl: document.getElementById('order-state-list'),
    wrapEl: document.getElementById('wrap-state'),
    arrowBtn: document.getElementById('btn-toggle-state'),
    groupEl: groupState,
    errorEl: stateError,
    getItems: () => STATES_LIST,
    onSelect: (stateVal) => {
      // Validate district against new state; reset if incompatible
      const validDistricts = getAvailableDistricts();
      if (districtInput && districtInput.value.trim()) {
        const curDist = districtInput.value.trim().toLowerCase();
        const matches = validDistricts.some(d => d.toLowerCase() === curDist);
        if (!matches) {
          districtInput.value = '';
        }
      }
      if (districtCombobox) {
        districtCombobox.renderList('');
      }
    }
  });

  // Initialize District Combobox
  districtCombobox = setupSearchableCombobox({
    inputEl: districtInput,
    listEl: document.getElementById('order-district-list'),
    wrapEl: document.getElementById('wrap-district'),
    arrowBtn: document.getElementById('btn-toggle-district'),
    groupEl: groupDistrict,
    errorEl: districtError,
    getItems: () => {
      const sVal = stateInput ? stateInput.value.trim() : '';
      if (!sVal) {
        return ['Please select a State first'];
      }
      return getAvailableDistricts();
    },
    onSelect: (districtVal) => {
      if (districtVal === 'Please select a State first') {
        if (districtInput) districtInput.value = '';
        if (stateInput) stateInput.focus();
      }
    }
  });

  let modalQuantity = 1;

  function updateModalPrice() {
    const total = modalQuantity * CONFIG.unitPrice;
    if (modalQtyDisplay) modalQtyDisplay.textContent = modalQuantity;
    if (modalTotalPriceDisplay) {
      modalTotalPriceDisplay.textContent = `₹${total.toLocaleString('en-IN')}`;
    }
    if (modalQtyMinusBtn) {
      modalQtyMinusBtn.disabled = modalQuantity <= CONFIG.minQty;
      modalQtyMinusBtn.style.opacity = modalQuantity <= CONFIG.minQty ? '0.4' : '1';
    }
    if (modalQtyPlusBtn) {
      modalQtyPlusBtn.disabled = modalQuantity >= CONFIG.maxQty;
      modalQtyPlusBtn.style.opacity = modalQuantity >= CONFIG.maxQty ? '0.4' : '1';
    }
  }

  function openOrderModal() {
    if (!orderModalBackdrop) return;

    // Initial quantity MUST come from the Product Card
    modalQuantity = currentQuantity;
    updateModalPrice();

    // Clear any previous validation errors
    clearErrors();

    // Display modal
    orderModalBackdrop.classList.add('is-open');
    orderModalBackdrop.setAttribute('aria-hidden', 'false');

    // Prevent background scrolling
    document.body.style.overflow = 'hidden';

    // Focus first input field
    setTimeout(() => {
      if (nameInput) nameInput.focus();
    }, 100);
  }

  function closeOrderModal() {
    if (!orderModalBackdrop) return;
    orderModalBackdrop.classList.remove('is-open');
    orderModalBackdrop.setAttribute('aria-hidden', 'true');

    // Restore background scrolling
    document.body.style.overflow = '';
  }

  function clearErrors() {
    const groups = [groupName, groupPhone, groupState, groupDistrict, groupCity, groupArea, groupStreet, groupPincode];
    groups.forEach(g => { if (g) g.classList.remove('has-error'); });
    const errors = [nameError, phoneError, stateError, districtError, cityError, areaError, streetError, pincodeError];
    errors.forEach(e => { if (e) e.textContent = ''; });
  }

  // Real-time error clearing on input/change
  const inputBindings = [
    { el: nameInput, group: groupName, err: nameError },
    { el: phoneInput, group: groupPhone, err: phoneError },
    { el: stateInput, group: groupState, err: stateError },
    { el: districtInput, group: groupDistrict, err: districtError },
    { el: cityInput, group: groupCity, err: cityError },
    { el: areaInput, group: groupArea, err: areaError },
    { el: streetInput, group: groupStreet, err: streetError },
    { el: pincodeInput, group: groupPincode, err: pincodeError }
  ];

  inputBindings.forEach(binding => {
    if (binding.el) {
      binding.el.addEventListener(binding.event || 'input', () => {
        if (binding.group) binding.group.classList.remove('has-error');
        if (binding.err) binding.err.textContent = '';
      });
    }
  });

  // Modal Quantity adjustment (+ / -)
  if (modalQtyMinusBtn) {
    modalQtyMinusBtn.addEventListener('click', () => {
      if (modalQuantity > CONFIG.minQty) {
        modalQuantity--;
        updateModalPrice();
      }
    });
  }

  if (modalQtyPlusBtn) {
    modalQtyPlusBtn.addEventListener('click', () => {
      if (modalQuantity < CONFIG.maxQty) {
        modalQuantity++;
        updateModalPrice();
      }
    });
  }

  // Close triggers
  if (orderModalCloseBtn) {
    orderModalCloseBtn.addEventListener('click', closeOrderModal);
  }

  if (orderModalBackdrop) {
    orderModalBackdrop.addEventListener('click', (e) => {
      if (e.target === orderModalBackdrop) {
        closeOrderModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && orderModalBackdrop && orderModalBackdrop.classList.contains('is-open')) {
      closeOrderModal();
    }
  });

  // Product Card "Place Order" button -> Opens Order Form
  if (orderCtaBtn) {
    orderCtaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openOrderModal();
    });
  }

  // Navbar "Order Now" button -> Smooth scroll directly to Product Card
  const navOrderBtn = document.getElementById('nav-whatsapp-cta');
  if (navOrderBtn) {
    navOrderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToProductCard();
    });
  }

  // Mobile Drawer "Order Now" button -> Close drawer and smooth scroll to Product Card
  const mobileDrawerOrderBtn = document.getElementById('mobile-drawer-order-btn');
  if (mobileDrawerOrderBtn) {
    mobileDrawerOrderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof closeMobileMenu === 'function') {
        closeMobileMenu();
      }
      scrollToProductCard();
    });
  }

  // Final CTA "Order on WhatsApp" button -> Smooth scroll directly to Product Card
  const finalCtaOrderBtn = document.getElementById('final-cta-order');
  if (finalCtaOrderBtn) {
    finalCtaOrderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToProductCard();
    });
  }

  // Validate Indian mobile numbers (10 digits, starting with 6-9)
  function validateIndianPhone(number) {
    const cleaned = number.trim().replace(/[\s\-\(\)]/g, '');
    let digits = cleaned;
    if (digits.startsWith('+91')) digits = digits.slice(3);
    else if (digits.startsWith('91') && digits.length === 12) digits = digits.slice(2);
    else if (digits.startsWith('0') && digits.length === 11) digits = digits.slice(1);

    return /^[6-9]\d{9}$/.test(digits) ? digits : null;
  }

  // Form Validation & WhatsApp Redirection
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      let isValid = true;
      let firstInvalidEl = null;

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      const stateVal = stateInput ? stateInput.value.trim() : '';
      const districtVal = districtInput ? districtInput.value.trim() : '';
      const cityVal = cityInput ? cityInput.value.trim() : '';
      const areaVal = areaInput ? areaInput.value.trim() : '';
      const streetVal = streetInput ? streetInput.value.trim() : '';
      const pincodeVal = pincodeInput ? pincodeInput.value.trim() : '';
      const landmarkVal = landmarkInput ? landmarkInput.value.trim() : '';

      // 1. Full Name Validation
      if (!nameVal || nameVal.length < 2) {
        isValid = false;
        if (groupName) groupName.classList.add('has-error');
        if (nameError) nameError.textContent = 'Please enter your full name.';
        if (!firstInvalidEl) firstInvalidEl = nameInput;
      }

      // 2. Phone Number Validation
      const validatedPhone = validateIndianPhone(phoneVal);
      if (!phoneVal) {
        isValid = false;
        if (groupPhone) groupPhone.classList.add('has-error');
        if (phoneError) phoneError.textContent = 'Phone number is required.';
        if (!firstInvalidEl) firstInvalidEl = phoneInput;
      } else if (!validatedPhone) {
        isValid = false;
        if (groupPhone) groupPhone.classList.add('has-error');
        if (phoneError) phoneError.textContent = 'Please enter a valid 10-digit Indian mobile number.';
        if (!firstInvalidEl) firstInvalidEl = phoneInput;
      }

      // 3. State Validation
      if (!stateVal) {
        isValid = false;
        if (groupState) groupState.classList.add('has-error');
        if (stateError) stateError.textContent = 'Please select or enter your state.';
        if (!firstInvalidEl) firstInvalidEl = stateInput;
      }

      // 4. District Validation
      if (!districtVal) {
        isValid = false;
        if (groupDistrict) groupDistrict.classList.add('has-error');
        if (districtError) districtError.textContent = 'Please select or enter your district.';
        if (!firstInvalidEl) firstInvalidEl = districtInput;
      }

      // 5. City / Town Validation
      if (!cityVal || cityVal.length < 2) {
        isValid = false;
        if (groupCity) groupCity.classList.add('has-error');
        if (cityError) cityError.textContent = 'Please enter city or town.';
        if (!firstInvalidEl) firstInvalidEl = cityInput;
      }

      // 6. Area / Locality Validation
      if (!areaVal || areaVal.length < 2) {
        isValid = false;
        if (groupArea) groupArea.classList.add('has-error');
        if (areaError) areaError.textContent = 'Please enter area or locality.';
        if (!firstInvalidEl) firstInvalidEl = areaInput;
      }

      // 7. Door No. & Street Validation
      if (!streetVal || streetVal.length < 3) {
        isValid = false;
        if (groupStreet) groupStreet.classList.add('has-error');
        if (streetError) streetError.textContent = 'Please enter door no. and street.';
        if (!firstInvalidEl) firstInvalidEl = streetInput;
      }

      // 8. Pincode Validation (6 digits)
      if (!pincodeVal || !/^[1-9][0-9]{5}$/.test(pincodeVal)) {
        isValid = false;
        if (groupPincode) groupPincode.classList.add('has-error');
        if (pincodeError) pincodeError.textContent = 'Please enter a valid 6-digit pincode.';
        if (!firstInvalidEl) firstInvalidEl = pincodeInput;
      }

      if (!isValid) {
        if (firstInvalidEl) firstInvalidEl.focus();
        return;
      }

      // Format Delivery Address for Message
      const addressLines = [
        streetVal,
        `${areaVal}, ${cityVal}`,
        `${districtVal}, ${stateVal} - ${pincodeVal}`
      ];
      if (landmarkVal) {
        addressLines.push(`Landmark: ${landmarkVal}`);
      }
      const formattedAddress = addressLines.map(line => `  ${line}`).join('\n');

      // Format Total and Phone
      const finalTotal = modalQuantity * CONFIG.unitPrice;
      const formattedTotal = finalTotal.toLocaleString('en-IN');

      // Exact Message Template Requested
      const message = `🍯 *Madhuram Honey – New Order*

Hello Madhuram Honey! 👋

I would like to place an order.

📦 *Order Details*
• Product: Madhuram Honey
• Size: 750 ml
• Quantity: ${modalQuantity}
• Total: ₹${formattedTotal}

👤 *Customer Details*
• Name: ${nameVal}
• Phone: ${phoneVal}
• Delivery Address:
${formattedAddress}

Please confirm my order. Thank you! 😊`;

      const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

      // Open WhatsApp
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      // Close modal
      closeOrderModal();
    });
  }

  // =========================================================================
  // Mobile Reviews Auto Slider / Carousel (Mobile Only: <= 767px)
  // =========================================================================
  function initMobileReviewsSlider() {
    const track = document.getElementById('reviews-track');
    const dotsContainer = document.getElementById('reviews-dots');
    if (!track || !dotsContainer) return;

    const originalCards = Array.from(track.querySelectorAll('.review-card:not(.review-card-clone)'));
    if (originalCards.length < 2) return;

    const dots = Array.from(dotsContainer.querySelectorAll('.review-dot'));
    const totalOriginal = originalCards.length;

    // Create clone of first card for seamless continuous forward loop
    let clone = track.querySelector('.review-card-clone');
    if (!clone) {
      clone = originalCards[0].cloneNode(true);
      clone.classList.add('review-card-clone');
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    }

    let currentIndex = 0;
    let autoSlideTimer = null;
    let isTransitioning = false;

    function updateDots(index) {
      const activeIdx = index % totalOriginal;
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIdx);
      });
    }

    function goToSlide(index, smooth = true) {
      if (window.innerWidth > 767) {
        track.style.transform = '';
        return;
      }
      isTransitioning = smooth;
      track.style.transition = smooth ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'none';
      track.style.transform = `translateX(-${index * 100}%)`;
      currentIndex = index;
      updateDots(index);
    }

    function nextSlide() {
      if (window.innerWidth > 767 || isTransitioning) return;
      goToSlide(currentIndex + 1, true);
    }

    // Handle continuous loop when transition ends on clone
    track.addEventListener('transitionend', (e) => {
      if (e.target !== track) return;
      isTransitioning = false;
      if (currentIndex === totalOriginal) {
        // Instant reset back to original first slide without visual flicker
        goToSlide(0, false);
      }
    });

    function startTimer() {
      stopTimer();
      if (window.innerWidth <= 767) {
        autoSlideTimer = setInterval(nextSlide, 3000);
      }
    }

    function stopTimer() {
      if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
      }
    }

    // Dots click navigation
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        stopTimer();
        goToSlide(idx, true);
        startTimer();
      });
    });

    // Touch / Swipe support
    let startX = 0;
    let currentX = 0;
    let isTouching = false;

    track.addEventListener('touchstart', (e) => {
      if (window.innerWidth > 767) return;
      stopTimer();
      isTouching = true;
      startX = e.touches[0].clientX;
      currentX = startX;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
      if (!isTouching || window.innerWidth > 767) return;
      currentX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', () => {
      if (!isTouching || window.innerWidth > 767) return;
      isTouching = false;
      const diffX = currentX - startX;
      if (diffX < -40) {
        nextSlide();
      } else if (diffX > 40) {
        stopTimer();
        const prevIdx = currentIndex === 0 ? totalOriginal - 1 : currentIndex - 1;
        goToSlide(prevIdx, true);
      }
      startTimer();
    });

    // Pause on user hover if using mouse on small window
    track.addEventListener('mouseenter', stopTimer);
    track.addEventListener('mouseleave', () => {
      if (window.innerWidth <= 767) startTimer();
    });

    // Tab visibility handling
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopTimer();
      } else if (window.innerWidth <= 767) {
        startTimer();
      }
    });

    // Handle responsive window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 767) {
        stopTimer();
        track.style.transition = 'none';
        track.style.transform = '';
      } else {
        if (!autoSlideTimer) {
          goToSlide(0, false);
          startTimer();
        }
      }
    });

    // Start auto slider on mobile
    if (window.innerWidth <= 767) {
      goToSlide(0, false);
      startTimer();
    }
  }

  initMobileReviewsSlider();
});
