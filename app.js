// Reload Electronics - Focused & Simple Core JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Set current year in footer
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // -------------------------------------------------------------
  // 2. Focused 2-Service Pricing Matrix
  // -------------------------------------------------------------
  const CONSOLE_PRICING = {
    ps5: {
      name: "PlayStation 5",
      hdmi: {
        price: "$150",
        turnaround: "Fast Turnaround",
        title: "PlayStation 5 • HDMI 2.1 Replacement",
        desc: "Includes removal of broken connector, microscopic pad inspection, installation of reinforced OEM HDMI 2.1 socket, and 4K@120Hz signal burn-in test."
      },
      thermal: {
        price: "$119",
        turnaround: "Fast Turnaround",
        title: "PlayStation 5 • Liquid Metal Servicing & Deep Clean",
        desc: "Complete teardown, heatsink lint extraction, scrubbing of APU liquid metal dry oxidation spots, foam seal check, and fresh high-purity liquid metal respread."
      },
      combo: {
        price: "$219",
        turnaround: "Fast Turnaround",
        title: "PlayStation 5 • The Overhaul Combo (Save $50)",
        desc: "Both services in one bench session: brand-new OEM HDMI 2.1 port replacement PLUS full disassembly, ultrasonic fan wash, and liquid metal refresh."
      }
    },
    ps4: {
      name: "PlayStation 4 / Pro / Slim",
      hdmi: {
        price: "$150",
        turnaround: "Fast Turnaround",
        title: "PlayStation 4 • HDMI Port Replacement",
        desc: "Desoldering of damaged socket, trace inspection under 45x microscope, new OEM specification port, and video output load test."
      },
      thermal: {
        price: "$110",
        turnaround: "Fast Turnaround",
        title: "PlayStation 4 • Deep Clean & Arctic Thermal Paste",
        desc: "Full teardown, power supply dust extraction, heatsink unclogging, and fresh high-viscosity non-conductive thermal paste (Arctic MX-6 / Noctua)."
      },
      combo: {
        price: "$199",
        turnaround: "Fast Turnaround",
        title: "PlayStation 4 • The Overhaul Combo (Save $61)",
        desc: "Brand-new HDMI port replacement PLUS deep internal clean and fresh thermal paste to silence jet-engine fan noise completely."
      }
    },
    xboxSeries: {
      name: "Xbox Series X / Series S",
      hdmi: {
        price: "$150",
        turnaround: "Fast Turnaround",
        title: "Xbox Series X/S • HDMI 2.1 Replacement",
        desc: "Precision hot-air removal of fractured port, micro-soldering of OEM high-durability connector, ESD filter inspection, and 120Hz test."
      },
      thermal: {
        price: "$119",
        turnaround: "Fast Turnaround",
        title: "Xbox Series X/S • Deep Clean & Rethermal Servicing",
        desc: "Split chassis teardown, heatsink vapor chamber cleaning, fan wash, and replacement of dried factory thermal interface paste."
      },
      combo: {
        price: "$219",
        turnaround: "Fast Turnaround",
        title: "Xbox Series X/S • The Overhaul Combo (Save $50)",
        desc: "Brand-new OEM HDMI 2.1 socket installation combined with full heatsink de-dusting and premium thermal paste reapplication."
      }
    },
    xboxOne: {
      name: "Xbox One / S / X",
      hdmi: {
        price: "$150",
        turnaround: "Fast Turnaround",
        title: "Xbox One • HDMI Port Replacement",
        desc: "Replacement of broken HDMI 'Out' socket with factory-grade replacement, pad rework, and 1080p/4K display verification."
      },
      thermal: {
        price: "$110",
        turnaround: "Fast Turnaround",
        title: "Xbox One • Deep Clean & Fresh Thermal Paste",
        desc: "Removal of accumulated dust buildup inside power unit and heatsink fins, plus fresh thermal paste to keep temperatures stable."
      },
      combo: {
        price: "$199",
        turnaround: "Fast Turnaround",
        title: "Xbox One • The Overhaul Combo (Save $61)",
        desc: "Complete HDMI port repair paired with full internal cleaning and fresh thermal paste for quiet, cool gaming."
      }
    },
    switch: {
      name: "Nintendo Switch / OLED",
      hdmi: {
        price: "$129",
        turnaround: "Fast Turnaround",
        title: "Nintendo Switch • USB-C Port Replacement",
        desc: "Microscopic dual-row micro-soldering of USB-C port responsible for video output to the TV dock and fast battery charging."
      },
      thermal: {
        price: "$80",
        turnaround: "Fast Turnaround",
        title: "Nintendo Switch • Clean & Rethermal",
        desc: "Extraction of lint jammed in centrifugal fan, copper heatpipe clean, and fresh thermal compound between APU and shield."
      },
      picofly: {
        price: "$150",
        turnaround: "Fast Turnaround",
        title: "Nintendo Switch • Picofly Modchip Install",
        desc: "Precision micro-soldered Picofly RP2040 modchip installation with clean wiring, thermal compound refresh, and full boot verification."
      }
    },
    other: {
      name: "Other / Retro Console",
      hdmi: {
        price: "$95+",
        turnaround: "Determined by parts availability",
        title: "Custom / Retro Console • HDMI Service",
        desc: "HDMI port repair or digital HDMI modding consultation for legacy consoles. Quote confirmed upon bench inspection."
      },
      thermal: {
        price: "$50+",
        turnaround: "Fast Turnaround",
        title: "Custom / Retro Console • Clean & Rethermal",
        desc: "Complete chassis disassembly, power section recap evaluation, heatsink cleaning, and fresh thermal compound."
      },
      combo: {
        price: "$135+",
        turnaround: "Determined by parts availability",
        title: "Custom Console • Overhaul Combo",
        desc: "Comprehensive bench overhaul including video connection restoration and complete thermal cleanup."
      }
    }
  };

  let selectedConsole = 'ps5';
  let selectedService = 'hdmi';

  const consoleButtons = document.querySelectorAll('.console-btn');
  const serviceRadios = document.querySelectorAll('input[name="serviceChoice"]');
  const quoteTitle = document.getElementById('quoteTitle');
  const quotePrice = document.getElementById('quotePrice');
  const quoteDescription = document.getElementById('quoteDescription');
  const quoteTurnaround = document.getElementById('quoteTurnaround');
  const bookQuoteBtn = document.getElementById('bookQuoteBtn');
  const serviceOptionATitle = document.getElementById('serviceOptionATitle');
  const serviceOptionADesc = document.getElementById('serviceOptionADesc');
  const serviceOptionCBadge = document.getElementById('serviceOptionCBadge');
  const serviceOptionCTitle = document.getElementById('serviceOptionCTitle');
  const serviceOptionCDesc = document.getElementById('serviceOptionCDesc');

  function updateServiceCardsForConsole() {
    const isSwitch = selectedConsole === 'switch';
    if (serviceOptionATitle) {
      serviceOptionATitle.textContent = isSwitch ? 'USB-C Replacement' : 'HDMI Replacement';
    }
    if (serviceOptionADesc) {
      serviceOptionADesc.textContent = isSwitch
        ? 'New USB-C charging & TV dock video port solder'
        : 'New OEM HDMI socket & micro-soldering';
    }
    if (serviceOptionCBadge) {
      serviceOptionCBadge.classList.toggle('hidden', isSwitch);
    }
    if (serviceOptionCTitle) {
      serviceOptionCTitle.textContent = isSwitch ? 'Picofly Modchip Install' : 'The Overhaul Combo';
    }
    if (serviceOptionCDesc) {
      serviceOptionCDesc.textContent = isSwitch
        ? 'Micro-soldered RP2040 Picofly chip installation'
        : 'HDMI Replacement + Deep Clean & Rethermal';
    }
  }

  function updateQuoteDisplay() {
    updateServiceCardsForConsole();
    const consoleData = CONSOLE_PRICING[selectedConsole];
    if (!consoleData) return;

    const serviceData = (selectedConsole === 'switch' && selectedService === 'combo')
      ? consoleData.picofly
      : (consoleData[selectedService] || consoleData.hdmi);

    if (quoteTitle) quoteTitle.textContent = serviceData.title;
    if (quotePrice) quotePrice.textContent = serviceData.price;
    if (quoteDescription) quoteDescription.textContent = serviceData.desc;
    if (quoteTurnaround) quoteTurnaround.textContent = serviceData.turnaround;
  }

  // Handle console selection buttons
  consoleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      consoleButtons.forEach(b => {
        b.classList.remove('active', 'border-sky-600', 'bg-white', 'text-slate-900');
        b.classList.add('border-slate-200', 'text-slate-700');
      });

      btn.classList.add('active', 'border-sky-600', 'bg-white', 'text-slate-900');
      btn.classList.remove('border-slate-200', 'text-slate-700');

      selectedConsole = btn.getAttribute('data-console');
      updateQuoteDisplay();
    });
  });

  // Handle service radio choices
  serviceRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (e.target.checked) {
        selectedService = e.target.value;
        updateQuoteDisplay();
      }
    });
  });

  // Initialize quote calculation
  updateQuoteDisplay();

  const deviceModelSelectGlobal = document.getElementById('deviceModel');
  const serviceRequestedSelectGlobal = document.getElementById('serviceRequested');

  function syncBookingServiceOptions() {
    if (!deviceModelSelectGlobal || !serviceRequestedSelectGlobal) return;
    const isSwitch = deviceModelSelectGlobal.value === 'Nintendo Switch';

    Array.from(serviceRequestedSelectGlobal.options).forEach(opt => {
      if (opt.value === 'Overhaul Combo (HDMI + Rethermal)' || opt.value === 'HDMI Port Replacement') {
        opt.hidden = isSwitch;
        opt.disabled = isSwitch;
      } else if (opt.value === 'USB-C Port Replacement' || opt.value === 'Picofly Modchip Install') {
        opt.hidden = !isSwitch;
        opt.disabled = !isSwitch;
      }
    });

    const selectedOpt = serviceRequestedSelectGlobal.options[serviceRequestedSelectGlobal.selectedIndex];
    if (selectedOpt && selectedOpt.disabled) {
      serviceRequestedSelectGlobal.value = isSwitch ? 'USB-C Port Replacement' : 'HDMI Port Replacement';
    }
  }

  if (deviceModelSelectGlobal) {
    deviceModelSelectGlobal.addEventListener('change', syncBookingServiceOptions);
    syncBookingServiceOptions();
  }

  // "Book With This Quote" button transfers selection to booking form
  if (bookQuoteBtn) {
    bookQuoteBtn.addEventListener('click', () => {
      const bookingSection = document.getElementById('booking');
      const deviceModelSelect = document.getElementById('deviceModel');
      const serviceRequestedSelect = document.getElementById('serviceRequested');
      const fulfillmentMethodSelect = document.getElementById('fulfillmentMethod');

      // Map selected console to dropdown
      if (deviceModelSelect) {
        if (selectedConsole === 'ps5') deviceModelSelect.value = 'PlayStation 5';
        else if (selectedConsole === 'ps4') deviceModelSelect.value = 'PlayStation 4 / Pro';
        else if (selectedConsole === 'xboxSeries') deviceModelSelect.value = 'Xbox Series X';
        else if (selectedConsole === 'xboxOne') deviceModelSelect.value = 'Xbox One / S / X';
        else if (selectedConsole === 'switch') deviceModelSelect.value = 'Nintendo Switch';
        else deviceModelSelect.value = 'Other Console';
      }

      syncBookingServiceOptions();

      // Map service
      if (serviceRequestedSelect) {
        if (selectedConsole === 'switch') {
          if (selectedService === 'hdmi') serviceRequestedSelect.value = 'USB-C Port Replacement';
          else if (selectedService === 'thermal') serviceRequestedSelect.value = 'Deep Clean & Rethermal';
          else if (selectedService === 'combo') serviceRequestedSelect.value = 'Picofly Modchip Install';
        } else {
          if (selectedService === 'hdmi') serviceRequestedSelect.value = 'HDMI Port Replacement';
          else if (selectedService === 'thermal') serviceRequestedSelect.value = 'Deep Clean & Rethermal';
          else if (selectedService === 'combo') serviceRequestedSelect.value = 'Overhaul Combo (HDMI + Rethermal)';
        }
      }

      // Check method radio
      const methodRadio = document.querySelector('input[name="serviceMethod"]:checked');
      if (fulfillmentMethodSelect && methodRadio) {
        fulfillmentMethodSelect.value = methodRadio.value === 'mailin' ? 'Nationwide Mail-In' : 'Local Drop-Off';
      }

      // Scroll to booking form
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
        const formCard = bookingSection.querySelector('form');
        if (formCard) {
          formCard.parentElement.classList.add('ring-2', 'ring-sky-500');
          setTimeout(() => {
            formCard.parentElement.classList.remove('ring-2', 'ring-sky-500');
          }, 1500);
        }
      }
    });
  }

  // -------------------------------------------------------------
  // 3. Simple FAQ Accordion
  // -------------------------------------------------------------
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isActive = btn.classList.contains('active');

      // Close all others
      faqQuestions.forEach(otherBtn => {
        otherBtn.classList.remove('active');
        if (otherBtn.nextElementSibling) {
          otherBtn.nextElementSibling.classList.add('hidden');
        }
      });

      if (!isActive && answer) {
        btn.classList.add('active');
        answer.classList.remove('hidden');
      }
    });
  });

  // -------------------------------------------------------------
  // 4. Booking Form & Ticket Modal (Formspree for GitHub Pages)
  // -------------------------------------------------------------
  // Sign up at https://formspree.io with support@reloadelectronics.com,
  // create a form, and replace YOUR_FORMSPREE_ID below with your form ID.
  const FORMSPREE_ENDPOINT = https://formspree.io/f/xkjrklbo;

  const intakeForm = document.getElementById('intakeForm');
  const submitTicketBtn = document.getElementById('submitTicketBtn');
  const formStatusMsg = document.getElementById('formStatusMsg');
  const ticketModal = document.getElementById('ticketModal');
  const modalCard = document.getElementById('modalCard');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalTicketId = document.getElementById('modalTicketId');
  const modalClientName = document.getElementById('modalClientName');
  const modalDevice = document.getElementById('modalDevice');
  const modalService = document.getElementById('modalService');
  const modalMethod = document.getElementById('modalMethod');

  function openTicketModal(ticketData) {
    if (!ticketModal || !modalCard) return;

    if (modalTicketId) modalTicketId.textContent = ticketData.id;
    if (modalClientName) modalClientName.textContent = ticketData.name;
    if (modalDevice) modalDevice.textContent = ticketData.device;
    if (modalService) modalService.textContent = ticketData.service;
    if (modalMethod) modalMethod.textContent = ticketData.method;

    ticketModal.classList.remove('hidden');
    setTimeout(() => {
      ticketModal.classList.remove('opacity-0');
      modalCard.classList.remove('scale-95');
      modalCard.classList.add('scale-100');
    }, 10);
  }

  function closeTicketModal() {
    if (!ticketModal || !modalCard) return;
    ticketModal.classList.add('opacity-0');
    modalCard.classList.remove('scale-100');
    modalCard.classList.add('scale-95');
    setTimeout(() => {
      ticketModal.classList.add('hidden');
    }, 300);
  }

  if (intakeForm) {
      intakeForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (formStatusMsg) {
          formStatusMsg.classList.add('hidden');
          formStatusMsg.textContent = '';
        }

        const fullName = document.getElementById('fullName').value.trim();
        const deviceModel = document.getElementById('deviceModel').value;
        const serviceRequested = document.getElementById('serviceRequested').value;
        const fulfillment = document.getElementById('fulfillmentMethod').value;

        // Generate Ticket ID #RE-9xxxx so email and confirmation modal match
        const randomTicketNum = Math.floor(10000 + Math.random() * 90000);
        const ticketId = `#RE-${randomTicketNum}`;

        if (FORMSPREE_ENDPOINT.includes('YOUR_FORMSPREE_ID')) {
          if (formStatusMsg) {
            formStatusMsg.textContent = 'Form endpoint not configured yet. Add your Formspree form ID in app.js (or email support@reloadelectronics.com).';
            formStatusMsg.classList.remove('hidden');
          }
          return;
        }

        const formData = new FormData(intakeForm);
        formData.append('ticketId', ticketId);
        formData.append('_subject', `New Repair Ticket ${ticketId} - ${deviceModel} (${serviceRequested})`);

        const originalBtnHTML = submitTicketBtn ? submitTicketBtn.innerHTML : '';
        if (submitTicketBtn) {
          submitTicketBtn.disabled = true;
          submitTicketBtn.classList.add('opacity-70', 'cursor-not-allowed');
          submitTicketBtn.textContent = 'Submitting Ticket...';
        }

        try {
          const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });

          if (!response.ok) {
            throw new Error(`Submission failed with status ${response.status}`);
          }

          openTicketModal({
            id: ticketId,
            name: fullName || 'Customer',
            device: deviceModel,
            service: serviceRequested,
            method: fulfillment
          });

          intakeForm.reset();
          syncBookingServiceOptions();
        } catch (err) {
          if (formStatusMsg) {
            formStatusMsg.textContent = 'Could not submit your ticket right now. Please try again or email support@reloadelectronics.com.';
            formStatusMsg.classList.remove('hidden');
          }
        } finally {
          if (submitTicketBtn) {
            submitTicketBtn.disabled = false;
            submitTicketBtn.classList.remove('opacity-70', 'cursor-not-allowed');
            submitTicketBtn.innerHTML = originalBtnHTML;
          }
        }
      });
    }

  if (closeModalBtn) {
      closeModalBtn.addEventListener('click', closeTicketModal);
    }

    if (ticketModal) {
      ticketModal.addEventListener('click', (e) => {
        if (e.target === ticketModal) {
          closeTicketModal();
        }
      });
    }

    // -------------------------------------------------------------
    // 5. Mobile Navigation
    // -------------------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });

      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
        });
      });
    }
  });
