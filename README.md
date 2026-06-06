# Admin Dashboard (Omni Panel) 📊

> لوحة تحكم متكاملة لإدارة المتجر الإلكتروني مبنية بـ Next.js و Tailwind CSS 4 ومتصلة بـ Firebase

[![Next.js](https://img.shields.io/badge/Next.js-15.2.9-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

An e-commerce admin dashboard built with Next.js (App Router), featuring modern UI, charts, and data tables for products, orders, and customers, fully integrated with Firebase Firestore.

لوحة تحكم لإدارة متجر إلكتروني مبنية بـ Next.js (App Router) مع واجهة حديثة، رسوم بيانية، وجداول بيانات لإدارة المنتجات والطلبات والعملاء، ومتكاملة بالكامل مع قاعدة بيانات Firebase.

---

## 🌐 Live Demo

**👉 [Omni Panel - Live Demo](https://omni-panel-alpha.vercel.app)**

---

## ✨ المميزات | Features

| الميزة                           | Description                                                                                                                                         |
| :------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| 📊 **لوحة نظرة عامة**            | Overview dashboard with KPI cards and charts.                                                                                                       |
| 📈 **تحليلات تفصيلية**           | Detailed analytics powered by `ApexCharts`.                                                                                                         |
| 📦 **إدارة الطلبات**             | Orders management with search, filters, and payment status.                                                                                         |
| 🔥 **إدارة المنتجات (Firebase)** | Products management (add/edit/delete) synced with Firebase Firestore.                                                                               |
| 👥 **إدارة العملاء**             | Customers management with cards, tables, and filters.                                                                                               |
| 👤 **الملف الشخصي المتزامن**     | Profile page with editable user details and security saved via Firebase.                                                                            |
| 🔐 **مكافحة الحسابات الوهمية**   | Advanced email fraud prevention forcing real-identity verification, with secure route protection via firebase_token cookies and Next.js middleware. |
| 🎨 **دعم الثيمات والحركة**       | Theme support via `next-themes` and motion via `framer-motion`.                                                                                     |

---

## 🛠️ التقنيات المستخدمة | Tech Stack

### Frontend & Core

- **[Next.js 15.2.9](https://nextjs.org/)** — إطار عمل React المتقدم مع الـ App Router.
- **[React 19.0.0](https://react.dev/)** — مكتبة بناء واجهات المستخدم.
- **[Tailwind CSS 4](https://tailwindcss.com/)** — لتصميم عصري وسريع التجاوب بأحدث الإصدارات.

### Backend & Database

- **[Cloud Firestore (Firebase)](https://firebase.google.com/products/firestore)** — قاعدة بيانات سحابية لإدارة وتخزين بيانات المنتجات والمستخدمين في الوقت الفعلي.

### Data & Visualization

- **[@tanstack/react-table 8.21.2](https://tanstack.com/table)** — لإدارة وعرض الجداول المتقدمة.
- **[ApexCharts 4.0.0](https://apexcharts.com/) + react-apexcharts** — لبناء الرسوم البيانية التفاعلية.

### UI & UX Extensions

- **[Framer Motion 11.11.17](https://www.framer.com/motion/)** — لإضافة حركات وانتقالات سلسة للواجهة.
- **[Next Themes 0.4.3](https://github.com/pacocoursey/next-themes)** — لدعم الوضع الداكن والفاتح بسهولة.
- **[Lucide React](https://lucide.dev/) & React Icons 5.6.0** — حزم أيقونات عالية الجودة ومتنوعة.
- # **[Sonner 1.7.0](https://sonner.emilkowal.ski/)** — لظهور التنبيهات (Toasts) بشكل أنيق ومباشر.
  | Technology                       | Category      | Description                                          |
  | :------------------------------- | :------------ | :--------------------------------------------------- |
  | **Next.js 15.2.9**               | Framework     | App Router, Server Components, and optimized routing |
  | **React 19.0.0**                 | Library       | Next-generation UI rendering and modern hooks        |
  | **Tailwind CSS v4**              | Styling       | Utility-first, high-performance styling framework    |
  | **@tanstack/react-table 8.21.2** | Data Tables   | Headless, powerful, and flexible table management    |
  | **ApexCharts 4.0.0**             | Charts        | Interactive, responsive data visualization           |
  | **Framer Motion 11.11.17**       | Animations    | Smooth, declarative animations and transitions       |
  | **next-themes 0.4.3**            | Theming       | Seamless light/dark mode switching                   |
  | **Lucide & React Icons**         | Icons         | Crisp, clean, and highly customizable vector icons   |
  | **Sonner 1.7.0**                 | Notifications | Beautiful, non-blocking toast notifications          |

---

## 📁 هيكل المشروع | Project Structure

```text
src/
├── app/               # Next.js App Router (Pages, Layouts, & Routes)
│   ├── /              # Overview Dashboard (KPIs, Charts)
│   ├── /analytics     # Detailed Analytics & Reports
│   ├── /orders        # Orders Management & Tracking
│   ├── /products      # Products Management (CRUD)
│   ├── /customers     # Customers Management & Filters
│   ├── /profile       # User Profile & Settings
│   ├── /login         # Secure Firebase Authentication (Sign In)
│   ├── /signup        # New Account Creation & Credentials Registry
│   └── /verify-email  # Anti-Fake Email Gateway & Token Refresh Junction
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
