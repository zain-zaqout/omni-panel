# Admin Dashboard (Omni Panel)

An e-commerce admin dashboard built with Next.js (App Router), featuring modern UI, charts, and data tables for products, orders, and customers.

لوحة تحكم لإدارة متجر إلكتروني مبنية بـ Next.js (App Router) مع واجهة حديثة، رسوم بيانية، وجداول بيانات لإدارة المنتجات والطلبات والعملاء.

**Features**
- Overview dashboard with KPI cards and charts.
- Detailed analytics powered by `ApexCharts`.
- Orders management with search, filters, and payment status.
- Products management (add/edit/delete) with `localStorage` persistence.
- Customers management with cards, tables, and filters.
- Profile page with editable details, security, and preferences.
- Demo login using `auth_token` cookie protected by `middleware`.
- Theme support via `next-themes` and motion via `framer-motion`.

**المزايا**
- لوحة نظرة عامة مع بطاقات إحصائية ورسوم بيانية.
- تحليلات تفصيلية باستخدام `ApexCharts`.
- إدارة الطلبات مع بحث وفلاتر وحالة الدفع.
- إدارة المنتجات (إضافة/تعديل/حذف) مع حفظ محلي عبر `localStorage`.
- إدارة العملاء مع بطاقات وجداول وفلاتر.
- صفحة الملف الشخصي مع تعديل البيانات والأمان والتفضيلات.
- تسجيل دخول تجريبي يعتمد على كوكي `auth_token` مع حماية عبر `middleware`.
- دعم الثيمات عبر `next-themes` وانتقالات `framer-motion`.

**Routes**
- `/` Overview
- `/analytics` Analytics
- `/orders` Orders
- `/products` Products
- `/customers` Customers
- `/profile` Profile
- `/login` Login

**المسارات الأساسية**
- `/` نظرة عامة
- `/analytics` التحليلات
- `/orders` الطلبات
- `/products` المنتجات
- `/customers` العملاء
- `/profile` الملف الشخصي
- `/login` تسجيل الدخول

**Tech Stack**
- `Next.js 15.2.9` + `React 19.0.0`
- `TypeScript`
- `Tailwind CSS 4`
- `@tanstack/react-table 8.21.2`
- `ApexCharts 4.0.0` + `react-apexcharts 1.7.0`
- `framer-motion 11.11.17`
- `next-themes 0.4.3`
- `lucide-react`
- `react-icons 5.6.0`
- `sonner 1.7.0` for toasts

**التقنيات المستخدمة**
- `Next.js 15.2.9` + `React 19.0.0`
- `TypeScript`
- `Tailwind CSS 4`
- `@tanstack/react-table 8.21.2`
- `ApexCharts 4.0.0` + `react-apexcharts 1.7.0`
- `framer-motion 11.11.17`
- `next-themes 0.4.3`
- `lucide-react`
- `react-icons 5.6.0`
- `sonner 1.7.0` للتنبيهات

**Run Locally**
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

**تشغيل المشروع محليًا**
```bash
npm install
npm run dev
```
افتح `http://localhost:3000`.

**Build and Start**
```bash
npm run build
npm start
```

**البناء والتشغيل**
```bash
npm run build
npm start
```

**Lint**
```bash
npm run lint
```

**الفحص**
```bash
npm run lint
```

**Project Structure**
- `src/app` App routes and pages.
- `src/components` UI components (cards, tables, charts, navigation).
- `src/contexts` State management and seed data.
- `src/middleware.js` Auth redirect logic.
- `public/assets` Static images and assets.

**هيكل المجلدات**
- `src/app` صفحات المشروع والمسارات.
- `src/components` مكوّنات الواجهة (بطاقات، جداول، رسوم، تنقل).
- `src/contexts` إدارة الحالة والبيانات الافتراضية.
- `src/middleware.js` منطق التوجيه والحماية.
- `public/assets` الصور والأصول.

**Data Notes**
- Seed data lives in `contexts`.
- Product/order/customer/profile changes persist in `localStorage`.
- Clear browser storage to restore defaults.

**ملاحظات البيانات**
- البيانات الافتراضية مخزنة داخل `contexts`.
- التغييرات على المنتجات/الطلبات/العملاء والملف الشخصي تُحفظ في `localStorage`.
- يمكن مسح البيانات المحلية من المتصفح لإعادة الحالة الافتراضية.

**Login**
- `/login` sets a demo `auth_token` cookie and redirects to `/`.
- `middleware` blocks other routes without the cookie.

**تسجيل الدخول**
- صفحة `/login` تضيف كوكي `auth_token` تجريبية ثم تعيد التوجيه إلى الصفحة الرئيسية.
- `middleware` يمنع الوصول لباقي الصفحات بدون الكوكي.