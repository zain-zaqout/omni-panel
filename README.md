# 🎛️ Omni Panel

A modern, high-performance e-commerce **admin dashboard** built with **Next.js 15** and **React 19**, designed to deliver a seamless and blazing-fast management experience for products, orders, and customers.

## 🌐 Live Demo

Experience the live application here:  
**👉 [Omni Panel - Live Demo](https://omni-panel-alpha.vercel.app/products)**

---

## ✨ Features

- **📊 Overview Dashboard:** Dynamic KPI cards and interactive charts for a bird's-eye view of your store.
- **📈 Detailed Analytics:** Deep-dive analytics and reports powered by ApexCharts.
- **📦 Orders Management:** Full orders tracking with search, filters, and payment status.
- **🛍️ Products Management:** Complete CRUD operations (add/edit/delete) with `localStorage` persistence.
- **👥 Customers Management:** Customer cards, data tables, and advanced filters.
- **👤 Profile Page:** Editable personal details, security settings, and preferences.
- **🔐 Demo Authentication:** Secure login using `auth_token` cookie protected by middleware.
- **🎨 Theme Support:** Light/dark mode via `next-themes` with smooth `framer-motion` transitions.
- **📱 Ultra Responsive:** Fully optimized for pixel-perfect display across mobile, tablet, and desktop devices.

---

## 🚀 Technologies Used

| Technology                       | Category      | Description                                          |
| :------------------------------- | :------------ | :--------------------------------------------------- |
| **Next.js 15.2.9**               | Framework     | App Router, Server Components, and optimized routing |
| **React 19.0.0**                 | Library       | Next-generation UI rendering and modern hooks        |
| **TypeScript**                   | Language      | Type-safe development for robust, maintainable code  |
| **Tailwind CSS v4**              | Styling       | Utility-first, high-performance styling framework    |
| **@tanstack/react-table 8.21.2** | Data Tables   | Headless, powerful, and flexible table management    |
| **ApexCharts 4.0.0**             | Charts        | Interactive, responsive data visualization           |
| **Framer Motion 11.11.17**       | Animations    | Smooth, declarative animations and transitions       |
| **next-themes 0.4.3**            | Theming       | Seamless light/dark mode switching                   |
| **Lucide & React Icons**         | Icons         | Crisp, clean, and highly customizable vector icons   |
| **Sonner 1.7.0**                 | Notifications | Beautiful, non-blocking toast notifications          |

---

## 📁 Project Structure

The project follows a modular and clean directory layout using the Next.js App Router:

```text
src/
├── app/               # Next.js App Router (Pages, Layouts, & Routes)
│   ├── /              # Overview Dashboard (KPIs, Charts)
│   ├── /analytics     # Detailed Analytics & Reports
│   ├── /orders        # Orders Management & Tracking
│   ├── /products      # Products Management (CRUD)
│   ├── /customers     # Customers Management & Filters
│   ├── /profile       # User Profile & Settings
│   └── /login         # Demo Authentication
├── components/        # Reusable UI Components (Cards, Tables, Charts, Navigation)
└── contexts/          # State Management & Seed Data
```

---

## 📦 Getting Started

To get a local copy up and running, follow these simple steps:

### 1. Clone the Repository

```bash
git clone https://github.com/zain-zaqout/omni-panel.git
cd omni-panel
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🛠️ Available Scripts

In the project directory, you can run:

- `npm run dev` - Runs the app in development mode.

- `npm run build` - Builds the application for production usage.

- `npm run start` - Starts the production server after building.

- `npm run lint` - Runs ESLint to check for code quality and syntax issues.

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project

2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)

3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)

4. Push to the Branch (`git push origin feature/AmazingFeature`)

5. Open a Pull Request

---

## 👤 Author

Developed with ❤️ by **Zain**

GitHub: [@zain-zaqout](https://github.com/zain-zaqout)
