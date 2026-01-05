# 🌱 CampusSwap

**CampusSwap** is a secure, point-based marketplace platform ecosystem designed specifically for university students. It solves the trust issue in campus buying/selling by introducing a curated environment and an escrow-like transaction system.

---

## 💡 About The Project

CampusSwap isn't just a marketplace; it's a **secure ecosystem**. Unlike traditional platforms where scams can happen easily, CampusSwap uses a **Point System** combined with **Atomic Transactions** to ensure fairness.

### Core Philosophy:

- **Security First:** Transactions are protected by an escrow mechanism. Points are locked until the buyer confirms physical receipt of the item.
- **Curated Content:** Every item listed must go through an **Admin Verification** process before appearing in the catalog.
- **Data Integrity:** Built with strict database transactions to prevent race conditions or balance discrepancies.

---

## ✨ Key Features

### 👤 For Students (Users)

- **Escrow Transaction System:** "Safe Trade" mechanism where points are held by the system (Double Confirmation).
- **Digital Wallet & History:** Real-time point tracking with detailed transaction logs (Earn, Spend, Top-up).
- **Verified Listings:** Buy with confidence knowing items have been reviewed.
- **Interactive Chat:** Integrated negotiation rooms between buyers and sellers.

### 👮‍♂️ For Administrators

- **Content Curation:** Dedicated dashboard to Approve/Reject item submissions.
- **Transaction Monitor:** Full visibility/logs of all point flows within the system.
- **User Management:** Overview of registered students and platform statistics.

---

## 🏗️ System Architecture

CampusSwap is built using a **Modern Fullstack Monolith** architecture on top of **Next.js 15 (App Router)**.

### Quality Standards

1.  **Authentication:** Stateless session management using Custom JWT & HttpOnly Cookies.
2.  **Performance:** Optimized Server-Side Rendering (SSR) for fast catalog loading.
3.  **Data Integrity:** Utilization of **Prisma Atomic Transactions** (`$transaction`) ensures that point transfers are ACID-compliant (All-or-Nothing), guaranteeing zero balance errors.
4.  **Security:** Role-Based Access Control (RBAC) middleware protects sensitive admin routes.

---

## 🚀 Tech Stack

| Category      | Technology                         |
| :------------ | :--------------------------------- |
| **Framework** | Next.js 15 (App Router)            |
| **Language**  | TypeScript                         |
| **Database**  | MySQL (Relational)                 |
| **ORM**       | Prisma                             |
| **Styling**   | Tailwind CSS, Shadcn UI, HeroUI    |
| **Storage**   | UploadThing (Cloud Object Storage) |

---

#### **Built with ❤️ for Campus Community**
