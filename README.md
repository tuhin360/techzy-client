<div align="center">

  <!-- Cover Image -->
  <img src="https://i.ibb.co.com/TBK795FZ/techzy-Banner.jpg" alt="Techzy Cover" width="100%" style="border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin-bottom: 24px;" />

  <!-- Logo & Title -->
  <img src="https://img.icons8.com/fluency/96/000000/electronics.png" alt="Techzy Icon" width="70" />

  <h1 style="background: linear-gradient(90deg, #FF8C00, #FF6347, #D2691E); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 3.2em; font-weight: 900; margin: 10px 0;">
    Techzy E-commerce Platform
  </h1>

  <p><strong>🔥 Buy and Sell Gadgets with Ease — Full-Stack MERN E-commerce Client with Premium Responsive Layouts</strong></p>

  <!-- Animated Tech Badges -->
  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  </p>

  <!-- Quick Links -->
  <div style="margin: 20px 0;">
    <a href="https://techzy-client.vercel.app">
      <img src="https://img.shields.io/badge/🚀_Live_Demo-22C55E?style=plastic&logo=vercel&logoColor=white&labelColor=000000" alt="Live Demo" />
    </a>
  </div>

</div>

---

### 🌈 About Techzy
A state-of-the-art MERN stack electronics and gadgets store. Tailored with a premium, sleek dark/orange styling system, mobile-first layouts, role-based dashboards, and interactive touch controls.

---

## 🌟 Key Features & Mobile Optimizations

### 📱 Premium Mobile UI/UX Overhauls
1. **Interactive Top Navigation Header**:
   - Removed the duplicate top-right hamburger menu.
   - Inserted a sleek **Profile Avatar** in the top header. Clicking the avatar displays an elegant dropdown modal containing the logged-in username (routes directly to `/dashboard/profile` "My Profile") and a fully functional logout trigger.
   - Built a click-outside listener to automatically close the dropdown whenever the user clicks elsewhere.
2. **Collapsible Mobile Categories**:
   - Redesigned the mobile menu to feature a collapsible categories list. Categories now collapse and expand via a clean plus/minus accordion switch.
3. **Always-On Bottom Navigation Bar**:
   - Integrated a floating navigation bar that anchors to the bottom of mobile viewports, containing dedicated quick links for **Home**, **Shop**, **Cart**, and **Menu**.
4. **Perfectly Fitted Mobile Forms**:
   - Re-styled the **Sign-In** and **Sign-Up** viewports. On phone screens, all illustration panels hide automatically, and layout margins shrink so that forms fit the display perfectly without scrolling.
   - Added clean "Back to Home" (`← Back to Home`) navigational triggers at the bottom of both authentication cards.
5. **Touch-Optimized Catalogs**:
   - Scaled down the massive home catalog buttons ("Show More") on mobile devices using responsive styling rules (`px-6 py-3 md:px-10 md:py-5 text-sm md:text-lg`).
   - Redesigned the **Hot Deals** section to look beautiful and fit small viewports perfectly.

### ⚡ Core Operations & Architecture
- **Centralized Wishlist Management (`useWishlist`)**: Built a centralized wishlist synchronization hook to eliminate item duplication, manage local state, and update dynamically in real time.
- **Robust Mobile Google Auth**: Google Sign-In is optimized for cross-device authentication, supporting asynchronous user registration updates to MongoDB upon auth state updates.
- **Stripe & SSLCommerz Checkouts**: Complete payment checkout workflows supporting international credit cards (Stripe) and local electronic payment cards (SSLCommerz).
- **User Dashboard Operations**: Implemented account profile photo uploads (via ImgBB API integrations) and secure user password update modules.

---

## 👥 Dashboard Access

| Feature | Regular User | System Admin |
|:---|:---:|:---:|
| View products & categories | ✅ | ✅ |
| Manage Shopping Cart & Wishlist | ✅ | ❌ |
| Checkout with Stripe / SSLCommerz | ✅ | ❌ |
| Manage catalogs & products | ❌ | ✅ |
| View detailed dashboard analytics | ❌ | ✅ |
| Manage users & subscriber lists | ❌ | ✅ |

---

## 🧪 Tech Stack

```text
Frontend Framework:  React • Vite
Auth & Security:     Firebase Authentication • JWT Client Storage
Styling Engine:      Tailwind CSS • Vanilla CSS Custom Overrides
Icons & Assets:      Lucide React • Swiper sliders
Backend (API):       Node.js • Express.js • MongoDB
```

---

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tuhin360/techzy.git
   cd techzy-client
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Create a `.env.local` configuration file:**
   ```env
   VITE_API_KEY=yourFirebaseApiKey
   VITE_AUTH_DOMAIN=yourFirebaseAuthDomain
   VITE_PROJECT_ID=yourFirebaseProjectId
   VITE_STORAGE_BUCKET=yourFirebaseStorageBucket
   VITE_MESSAGING_SENDER_ID=yourFirebaseMessagingSenderId
   VITE_APP_ID=yourFirebaseAppId
   VITE_API_URL=http://localhost:5000
   ```

4. **Start the development server:**
   ```bash
   pnpm dev
   ```
   *Open `http://localhost:5173` in your browser.*
