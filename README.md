# Stackly - Performance Marketing Agency & Growth OS

A modern, high-converting, fully responsive digital marketing agency website with integrated **Authentication (Sign In / Get Started)**, **Agency Admin Dashboard**, and **Client Brand Portal** built with pure HTML5, CSS3, and Vanilla JavaScript.

## 🚀 Key Modules & Architecture

### 1. Main Responsive Website (`index.html`)
- **Header Navigation**: Prominent links for **Home**, **About**, **Services**, **Case Studies**, **Methodology**, **Pricing**, **FAQ**, **Contact**, **Sign In**, and **Get Started**.
- **Hero & Value Proposition (`#hero`)**: Bold typography, interactive performance engine mockup, dynamic metric counter tags, and 1-click CTA buttons.
- **In-Depth About Section (`#about`)**: Origin story, 4 Core Operational Pillars (P&L Bottom-Line Accountability, High-Velocity Creative Lab, First-Party Attribution, Direct Senior Access), Traditional Agency vs Stackly Comparison Matrix, and Executive Leadership Team.
- **Comprehensive Services Section (`#services`)**: 6 in-depth service modules (Paid Acquisition, Technical SEO, CRO, Lifecycle Email/SMS, Creative UGC Lab, Tracking & Attribution) with Key Deliverables, Tech Chips, KPI benchmark badges, and Guaranteed Monthly Deliverables SLA matrix.
- **Case Studies & Methodology**: Real client multipliers and a 4-step scaling roadmap.
- **Interactive Pricing**: Live toggle for monthly vs. annual retainers (with 20% discount).
- **Direct Lead Capture & FAQ**: Form validation with toast notifications and interactive FAQ accordion.

### 2. Standalone Pages (Matching `travel_tourism7` Architecture)
- **`about.html`**: Dedicated About Us page featuring company origin, 4 pillars, comparison matrix, leadership bios, and global operations presence (San Francisco, London & Salem, India).
- **`services.html`**: Dedicated Services & Capabilities page with deep execution deliverables, platform chips, and the binding SLA matrix.
- **`signin.html`**: Dedicated Split-Screen Sign In page with role selector pills (**Client Account** vs **Agency Admin**), live pulsing dot role indicator, password reveal toggle, and 1-click instant demo access.
- **`get-started.html`**: Dedicated Split-Screen Onboarding page with $1,500 audit voucher badge, dynamic role fields (Client vs Agency Staff), and instant account registration.

### 3. Dedicated Dashboards
- **`admin-dashboard.html`**: Agency Admin Operations Hub with managed ad spend, client portfolio roster, creative review board, and multi-channel revenue trajectory chart.
- **`client-dashboard.html`** / **`user-dashboard.html`**: Brand Client Growth Portal (*Lumina Botanicals*) with live campaign toggle switches, date range filter, channel attribution, and direct Slack messenger to senior growth strategist.

---

## 📁 File Structure

```text
d:/projects/digital marketing/
├── assets/
│   └── logo.webp            # Stackly transparent brand logo
├── index.html               # Main responsive landing page (Home, About, Services)
├── about.html               # Dedicated About Us page
├── services.html            # Dedicated Services & Capabilities page
├── signin.html              # Dedicated Split-screen Sign In portal
├── get-started.html         # Dedicated Split-screen Onboarding portal
├── admin-dashboard.html     # Agency Admin Operations Dashboard
├── client-dashboard.html    # Brand Client Growth Portal
├── user-dashboard.html      # Client Portal Alias (referencing travel_tourism7)
├── login.html               # Unified Login Portal
├── style.css                # Core design system & responsive styling
├── dashboard.css            # Auth & dashboard styles (KPI cards, charts, sidebars)
├── script.js                # Landing page interactivity (nav, counters, FAQ, forms)
├── dashboard.js             # Dashboard interactivity, filtering, charts, and demo routing
└── README.md                # Documentation and setup instructions
```

---

## 💻 How to Run / Preview

Since the entire application is built with vanilla web technologies, you can open it immediately with zero installation:

1. **Directly in Browser**:
   - Home Page: Double-click [**`index.html`**](index.html)
   - About Us Page: Double-click [**`about.html`**](about.html)
   - Services Page: Double-click [**`services.html`**](services.html)
   - Sign In: Double-click [**`signin.html`**](signin.html)
   - Get Started: Double-click [**`get-started.html`**](get-started.html)
   - Admin Dashboard: Double-click [**`admin-dashboard.html`**](admin-dashboard.html)
   - Client Dashboard: Double-click [**`client-dashboard.html`**](client-dashboard.html)

2. **Using a Local Server**:
   ```powershell
   npx serve .
   ```
   Then open `http://localhost:3000` in your browser.
