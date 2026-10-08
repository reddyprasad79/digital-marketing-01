/**
 * Stackly Digital Marketing Agency - Dashboard & Authentication Interactivity
 * Comprehensive, Production-Grade Vanilla JavaScript
 * Full Mobile Responsiveness, Modal System, Dynamic Actions & File Exports
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. Toast Notification Helper
     ------------------------------------------------------------------------ */
  const toast = document.getElementById('toast');
  let toastTimer;

  window.showToast = (message, icon = '✓') => {
    if (!toast) return;
    toast.innerHTML = `<span style="color: #FB7185; font-weight: bold; font-size: 1.15rem;">${icon}</span> <span>${message}</span>`;
    toast.classList.add('active');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('active');
    }, 4000);
  };

  /* ------------------------------------------------------------------------
     2. Generic Modal System (Accessible, Responsive, Keyboard ESC support)
     ------------------------------------------------------------------------ */
  let activeModal = null;

  window.openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    activeModal = modal;
  };

  window.closeModal = (modalId) => {
    const modal = modalId ? document.getElementById(modalId) : activeModal;
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    activeModal = null;
  };

  // Close modal on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeModal) {
      closeModal();
    }
  });

  // Close modal when clicking backdrop
  document.addEventListener('click', (e) => {
    if (e.target.classList && e.target.classList.contains('dash-modal-backdrop')) {
      closeModal();
    }
  });

  /* ------------------------------------------------------------------------
     3. Mobile Dashboard Sidebar Drawer & Backdrop
     ------------------------------------------------------------------------ */
  const dashMenuToggle = document.getElementById('dash-menu-toggle');
  const dashSidebar = document.getElementById('dash-sidebar');
  let sidebarBackdrop = document.getElementById('sidebar-backdrop');

  if (dashSidebar && !sidebarBackdrop) {
    sidebarBackdrop = document.createElement('div');
    sidebarBackdrop.id = 'sidebar-backdrop';
    sidebarBackdrop.className = 'sidebar-backdrop';
    document.body.appendChild(sidebarBackdrop);
  }

  if (dashMenuToggle && dashSidebar) {
    const toggleSidebar = () => {
      dashSidebar.classList.toggle('open');
      if (sidebarBackdrop) sidebarBackdrop.classList.toggle('active');
    };

    dashMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSidebar();
    });

    if (sidebarBackdrop) {
      sidebarBackdrop.addEventListener('click', toggleSidebar);
    }

    const sidebarNavLinks = dashSidebar.querySelectorAll('.sidebar-nav-link');
    sidebarNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Update active state in sidebar
            dashSidebar.querySelectorAll('.sidebar-nav-item').forEach(item => item.classList.remove('active'));
            const parentItem = link.closest('.sidebar-nav-item');
            if (parentItem) parentItem.classList.add('active');

            try {
              history.pushState(null, null, href);
            } catch (err) {}
          }
        }

        if (window.innerWidth <= 960) {
          dashSidebar.classList.remove('open');
          if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
        }
      });
    });

    // ScrollSpy to update active sidebar link as user scrolls
    const hashLinks = Array.from(sidebarNavLinks).filter(link => {
      const href = link.getAttribute('href');
      return href && href.startsWith('#') && href.length > 1;
    });

    if (hashLinks.length > 0) {
      window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 160;
        let currentSectionId = '';

        hashLinks.forEach(link => {
          const section = document.querySelector(link.getAttribute('href'));
          if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              currentSectionId = link.getAttribute('href');
            }
          }
        });

        if (currentSectionId) {
          hashLinks.forEach(link => {
            const parentItem = link.closest('.sidebar-nav-item');
            if (parentItem) {
              if (link.getAttribute('href') === currentSectionId) {
                parentItem.classList.add('active');
              } else {
                parentItem.classList.remove('active');
              }
            }
          });
        }
      }, { passive: true });
    }
  }

  /* ------------------------------------------------------------------------
     4. Authentication Role Switching (signin.html & get-started.html)
     ------------------------------------------------------------------------ */
  let selectedRole = 'client';

  // Role selector on signin.html
  const signinRoleTabs = document.querySelectorAll('#roleSelector .role-tab');
  const roleIndicator = document.getElementById('roleIndicator');
  const roleIndicatorText = document.getElementById('roleIndicatorText');
  const signinEmailInput = document.getElementById('signin-email');

  signinRoleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      signinRoleTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      selectedRole = tab.getAttribute('data-role');

      if (selectedRole === 'admin') {
        if (roleIndicator) roleIndicator.classList.add('admin-indicator');
        if (roleIndicatorText) roleIndicatorText.textContent = 'Logging in as: Agency Admin (Sundaram S.)';
        if (signinEmailInput) signinEmailInput.value = 'admin@stacklymarketing.com';
      } else {
        if (roleIndicator) roleIndicator.classList.remove('admin-indicator');
        if (roleIndicatorText) roleIndicatorText.textContent = 'Logging in as: Client (UrbanStyle D2C Brand)';
        if (signinEmailInput) signinEmailInput.value = 'ramesh@urbanstyle.com';
      }
    });
  });

  // Role selector on get-started.html
  const regRoleTabs = document.querySelectorAll('#regRoleSelector .role-tab');
  const regRoleIndicator = document.getElementById('regRoleIndicator');
  const regRoleIndicatorText = document.getElementById('regRoleIndicatorText');
  const clientFields = document.getElementById('clientFields');
  const adminFields = document.getElementById('adminFields');
  let regSelectedRole = 'client';

  regRoleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      regRoleTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      regSelectedRole = tab.getAttribute('data-regrole');

      if (regSelectedRole === 'admin') {
        if (regRoleIndicator) regRoleIndicator.classList.add('admin-indicator');
        if (regRoleIndicatorText) regRoleIndicatorText.textContent = 'Account Type: Agency Media Buyer / Operations Admin';
        if (clientFields) clientFields.style.display = 'none';
        if (adminFields) adminFields.style.display = 'block';
      } else {
        if (regRoleIndicator) regRoleIndicator.classList.remove('admin-indicator');
        if (regRoleIndicatorText) regRoleIndicatorText.textContent = 'Account Type: D2C / B2B Brand Client Account';
        if (clientFields) clientFields.style.display = 'block';
        if (adminFields) adminFields.style.display = 'none';
      }
    });
  });

  // Password visibility toggle
  const togglePassBtns = document.querySelectorAll('.toggle-password-btn');
  togglePassBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      if (input && input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🔒';
      } else if (input) {
        input.type = 'password';
        btn.textContent = '👁️';
      }
    });
  });

  // Sign In Form Submission
  const signinForm = document.getElementById('signin-form');
  if (signinForm) {
    signinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('signin-submit-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Verifying Credentials & Telemetry...</span>';
      }

      setTimeout(() => {
        if (selectedRole === 'admin') {
          showToast('Authenticated as Agency Admin!', '✓');
          window.location.href = 'admin-dashboard.html';
        } else {
          showToast('Authenticated as Client (UrbanStyle D2C)!', '✓');
          window.location.href = 'client-dashboard.html';
        }
      }, 600);
    });
  }

  // Get Started Form Submission
  const getStartedForm = document.getElementById('get-started-form');
  if (getStartedForm) {
    getStartedForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('reg-submit-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Setting Up Growth Workspace...</span>';
      }

      setTimeout(() => {
        showToast('Growth Workspace Created! Your audit is scheduled.', '🎉');
        if (regSelectedRole === 'admin') {
          window.location.href = 'admin-dashboard.html';
        } else {
          window.location.href = 'client-dashboard.html';
        }
      }, 700);
    });
  }

  /* ------------------------------------------------------------------------
     5. Admin Dashboard Dynamic Actions & File Exports
     ------------------------------------------------------------------------ */
  // CSV Data Exporter
  window.exportAdminDataCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Account ID,Brand Name,Contact Lead,Service Scope,Monthly Ad Spend,Current ROAS,Status,Telemetry Sync\n" +
      "#STK-MKT-UB90,UrbanStyle D2C,Ramesh Kumar (Founder),Performance PPC & Meta,450000,4.82x,Scaling,Active CAPI\n" +
      "#STK-MKT-CM44,CloudMatrix Tech,Deepika Prasanth (VP Growth),B2B Lead Gen & ABM,320000,48 Demos,Active,Active GA4\n" +
      "#STK-MKT-AP19,Apex Logistics,Vignesh Sundaram (MD),Enterprise SEO & GEO,180000,38 Ranks,Dominating,GSC API\n" +
      "#STK-MKT-NV55,Nova Organics,Vikram Reddy (CMO),Viral Reels & UGC Lab,240000,1.2M Views,Sprint Active,Meta Reels\n" +
      "#STK-MKT-KC82,Kaveri Silk Sarees,Anandhi M. (Director),Meta Advantage+ & Festive Ads,380000,5.60x,Scaling,CAPI 9.8\n" +
      "#STK-MKT-HC11,Salem Ortho Clinics,Dr. Saravanan,Local Google Search Ads,120000,310 Leads,Active,Google Call Tracking\n";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Stackly_Client_Portfolio_ROAS_2026.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Downloaded Stackly_Client_Portfolio_ROAS_2026.csv", "📥");
  };

  // Manage Account Modal Trigger
  window.openManageAccountModal = (accountId, brandName, currentSpend, roas) => {
    const modalTitle = document.getElementById('manageModalBrandName');
    const modalId = document.getElementById('manageModalAccountId');
    const modalSpend = document.getElementById('manageModalSpend');
    const modalRoas = document.getElementById('manageModalRoas');

    if (modalTitle) modalTitle.textContent = brandName;
    if (modalId) modalId.textContent = accountId;
    if (modalSpend) modalSpend.textContent = currentSpend;
    if (modalRoas) modalRoas.textContent = roas;

    openModal('accountManageModal');
  };

  // Launch Ad Test Simulation
  window.triggerLaunchAdTest = () => {
    showToast("Preparing 12 A/B Hook Variations for Meta & TikTok...", "⚡");
    setTimeout(() => {
      openModal('adTestModal');
    }, 400);
  };

  // Run Server-Side Telemetry Audit
  window.triggerAuditTelemetry = () => {
    showToast("Auditing Meta CAPI & GA4 Server Endpoints...", "🔍");
    setTimeout(() => {
      openModal('telemetryModal');
    }, 400);
  };

  // Notify Clients Trigger
  window.triggerNotifyClients = () => {
    showToast("Dispatched Weekly ROAS Digest to 48 Client WhatsApp & Slack channels!", "📢");
  };

  // Open Consolidated P&L Modal
  window.triggerAgencyROIReport = () => {
    openModal('agencyRoiModal');
  };

  // Send Creatives Status Updater
  window.deployCreativeSprint = (btnElement, brandName) => {
    if (btnElement) {
      btnElement.disabled = true;
      btnElement.className = "btn btn-sm btn-outline";
      btnElement.innerHTML = '<i class="bi bi-check-circle-fill text-success"></i> Deployed';
    }
    showToast(`Dispatched 16 fresh UGC Reels hooks to ${brandName}!`, "🚀");
  };

  // Dynamically Add New Client
  window.handleOnboardNewBrand = (e) => {
    if (e) e.preventDefault();
    const brandName = document.getElementById('newBrandName')?.value || 'New Growth Client';
    const contact = document.getElementById('newBrandContact')?.value || 'Client Partner';
    const scope = document.getElementById('newBrandScope')?.value || 'Performance Paid Media';
    const spend = document.getElementById('newBrandSpend')?.value || '₹3,00,000 / mo';
    const roas = document.getElementById('newBrandRoas')?.value || '4.2x Target';

    const tableBody = document.querySelector('#bookings-feed tbody');
    if (tableBody) {
      const newRow = document.createElement('tr');
      const randomId = '#STK-MKT-' + Math.floor(1000 + Math.random() * 9000);
      newRow.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
      newRow.style.color = '#E2E8F0';
      newRow.innerHTML = `
        <td style="padding: 14px 16px; font-weight: 700; color: #FB7185;">${randomId}</td>
        <td style="padding: 14px 16px;"><strong>${brandName}</strong><br><small style="color: #94A3B8;">${contact}</small></td>
        <td style="padding: 14px 16px;">${scope}</td>
        <td style="padding: 14px 16px;">${spend}</td>
        <td style="padding: 14px 16px; color: #34D399; font-weight: 700;">${roas}</td>
        <td style="padding: 14px 16px;"><span style="color: #10B981; font-weight: 600;"><i class="bi bi-check-circle-fill"></i> Onboarded</span></td>
        <td style="padding: 14px 16px;">
          <button class="btn btn-sm btn-outline" onclick="openManageAccountModal('${randomId}', '${brandName}', '${spend}', '${roas}');">Manage</button>
        </td>
      `;
      tableBody.prepend(newRow);
    }

    closeModal('onboardBrandModal');
    showToast(`Successfully onboarded ${brandName}! Workspace initialized.`, "🎉");
  };

  /* ------------------------------------------------------------------------
     6. Client Dashboard Dynamic Actions & File Exports
     ------------------------------------------------------------------------ */
  // Download Sprint Executive Report PDF/TXT
  window.downloadSprintReport = (sprintName) => {
    const reportText = `=====================================================
STACKLY DIGITAL MARKETING AGENCY - EXECUTIVE REPORT
Sprint: ${sprintName}
Client: UrbanStyle D2C Brand (Ramesh Kumar)
=====================================================
Attributed Gross Revenue: ₹21,68,450
Monthly Ad Spend: ₹4,50,000
Blended ROAS: 4.82x (Industry Benchmark: 3.5x)
Customer Acquisition Cost (CAC): ₹420 (-42% MoM)
Server-Side Meta CAPI Event Quality: 9.4 / 10
Organic Search Visitors: 18,450 / month (+145%)

TOP PERFORMING CHANNELS:
- Instagram Reels Advantage+ Catalog: 5.40x ROAS
- Google Search Brand & High-Intent Phrases: 4.90x ROAS
- Klaviyo VIP Abandoned Cart Recovery: +₹3,40,000 Revenue

Dedicated Strategist: Ananya Ramakrishnan
Technical SEO Lead: Venkatesh Babu
=====================================================
Status: Sprint Target Exceeded. Scaling Mode Active.`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Stackly_${sprintName.replace(/\s+/g, '_')}_Report.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Downloaded ${sprintName} Executive Report!`, "📊");
  };

  // Request Budget Scale Trigger
  window.handleScaleBudgetRequest = (e) => {
    if (e) e.preventDefault();
    const newBudget = document.getElementById('scaleBudgetSelect')?.value || '₹8,00,000 / mo';
    closeModal('scaleBudgetModal');
    showToast(`Budget scale to ${newBudget} requested! Squad has updated bidding limits.`, "🚀");
  };

  // Add Module to Sprint
  window.requestGrowthModule = (moduleName, price) => {
    showToast(`Added ${moduleName} (${price}) to next monthly sprint roadmap!`, "✅");
  };

  // Switch Looker Studio Preview Tab
  window.switchLookerTab = (tabName, btn) => {
    const tabs = document.querySelectorAll('.looker-tab-btn');
    tabs.forEach(t => t.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const metaStats = document.getElementById('lookerMetaStats');
    const googleStats = document.getElementById('lookerGoogleStats');
    const blendedStats = document.getElementById('lookerBlendedStats');

    if (metaStats) metaStats.style.display = tabName === 'meta' ? 'block' : 'none';
    if (googleStats) googleStats.style.display = tabName === 'google' ? 'block' : 'none';
    if (blendedStats) blendedStats.style.display = tabName === 'blended' ? 'block' : 'none';
  };

});
