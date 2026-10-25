# QSR Platform — Online Ordering, POS & Kitchen Management System

> **Product Requirements & Technical Architecture**  
> **Prepared by:** Temidayo Akanbi-Bello | **Version:** 1.0  
> **Target:** Multi-Outlet Quick Service Restaurant (QSR) Brand (5 Outlets)

---

## 📌 Executive Summary

The **QSR Platform** is an enterprise multi-outlet restaurant management solution designed for a brand operating across **5 physical outlets**. It unifies the entire restaurant workflow into a single connected real-time ecosystem:

- **Customers** order online for pickup or delivery from the nearest outlet.
- **Cashiers** ring up walk-in orders on an offline-resilient Point of Sale (POS) till.
- **Kitchen Staff** view incoming orders instantly on a Kitchen Display System (KDS) with audio alerts.
- **Management & Owners** track multi-outlet sales, manage menus, control pricing overrides, and monitor inventory from a centralized dashboard.

When an item sells out at the counter or kitchen, it reflects across all online customer channels instantly.

---

## 🏗️ Architecture & Monorepo Structure

The project is built as a modular monorepo managed with **Turborepo** and **pnpm** workspaces:

```
qsr_app/
├── apps/
│   ├── api/             # Backend service (NestJS, Drizzle ORM, PostgreSQL, Redis)
│   ├── pos/             # Cashier Point of Sale (React 19, Vite, Dexie IndexedDB, PWA)
│   └── web/             # Customer Website & Online Ordering (Next.js 16, Tailwind CSS)
├── packages/
│   └── shared/          # Shared TypeScript models, contracts, DTOs & utilities (@qsr/shared)
├── docker-compose.yml   # Local PostgreSQL 16 & Redis 7 services
├── pnpm-workspace.yaml  # Workspace package declarations
└── turbo.json           # Pipeline build and task orchestration
```

### Technology Stack

| Layer | Technology | Key Capabilities |
| :--- | :--- | :--- |
| **Customer Web** | Next.js 16, React 19, Tailwind CSS | Server-Side Rendering (SEO), Geolocation, Mobile-first responsive UI |
| **Point of Sale** | React 19, Vite, Dexie (IndexedDB), PWA | Offline-first local storage, touch-optimized, receipt printing, background sync |
| **Backend API** | NestJS 12, Node.js (ESM), Drizzle ORM | Real-time WebSocket/SSE order dispatch, RBAC, multi-outlet routing |
| **Data Layer** | PostgreSQL 16, Redis 7 | Relational transactional persistence, caching, pub/sub for order queues |
| **Tooling** | Turborepo, pnpm, Vitest, Oxlint, Prettier | Fast caching, deterministic builds, type-aware linting |

---

## 🔄 End-to-End Order Workflow

```mermaid
flowchart TD
    subgraph Channels["1. Channels"]
        WEB["🌐 Customer Website\n(Online Delivery / Pickup)"]
        POS["🖥️ Counter POS Till\n(Walk-in Dine-in / Takeaway)"]
    end

    subgraph Core["2. Central API & Data Engine"]
        API["⚙️ Central Backend API\n(NestJS + Drizzle + Redis)"]
        GEO["📍 Geolocation & Outlet Router\n(Selects nearest of 5 outlets)"]
        DB[("🗄️ PostgreSQL + Redis")]
    end

    subgraph Fulfillment["3. Outlet Operations"]
        KDS["🍳 Kitchen Display Screen (KDS)\n(Audio alert, Accept, Prepare, Ready)"]
        DISPATCH["🛵 Dispatch & Rider Management\n(In-house riders / Chowdeck / Glovo)"]
        CUSTOMER["📦 Customer Receives Order\n(Live Tracking / Counter Pickup)"]
    end

    WEB --> GEO --> API
    POS --> API
    API <--> DB
    API -->|Real-time alert| KDS
    KDS -->|Mark Ready| DISPATCH
    DISPATCH --> CUSTOMER
```

### Step-by-Step Flow:
1. **Discovery & Outlet Routing:** Customer opens the site, enters an address or enables GPS. The system identifies the nearest serving outlet, showing live open/closed status and outlet-specific menu and prices.
2. **Order Placement:** Customer customizes items (sizes, add-ons, notes) and pays online (Paystack / Flutterwave) or selects Pay on Delivery. (Walk-in orders follow the same flow via the cashier on the POS).
3. **Kitchen Notification:** The order arrives at that specific outlet's kitchen screen with an immediate audio chime.
4. **Preparation & Status Updates:** Kitchen staff tap to update status: `Accept` → `Preparing` → `Ready`.
5. **Dispatch / Pickup:** For delivery, the system assigns an internal rider or external courier (e.g., Glovo, Chowdeck). For pickup, the customer collects at the counter.
6. **Analytics & Sync:** Sales and inventory adjustments update across the central dashboard and reports in real time.

---

## 👥 User Roles & Access Control

| Role | Primary Responsibilities |
| :--- | :--- |
| **Customer** | Browses menu, selects outlet, configures options, pays, and tracks live order status. |
| **Cashier** | Enters walk-in counter orders, accepts cash/POS/bank transfer, manages till shifts & cash balancing. |
| **Kitchen Staff** | Monitors incoming outlet orders, acknowledges chimes, updates prep status, marks sold-out items. |
| **Rider** | Receives assigned deliveries, updates delivery milestones, collects cash on delivery where enabled. |
| **Outlet Manager** | Oversees branch operations, shifts, local stock levels, staff attendance, and daily cash reconciliation. |
| **Owner / Admin** | Manages all 5 outlets, global menu catalogs, pricing rules, promo campaigns, and aggregate financials. |

---

## 📦 Core Feature Modules

### 1. Customer Website (`apps/web`)
- **Fast, Mobile-First Ordering:** Optimized for high performance even on congested mobile data networks.
- **Guest Checkout:** Frictionless ordering without mandatory account registration; optional customer accounts for order history.
- **Outlet Micro-Pages:** Dedicated SEO-optimized pages for each outlet featuring addresses, maps, operating hours, and delivery boundaries.
- **Dynamic Store Availability:** Live open/closed indicators preventing orders during off-hours.

### 2. Kitchen & Outlet Display Screen (KDS) (`apps/kitchen`)
- **Outlet-Isolated Stream:** Kitchen staff only view orders designated for their specific outlet.
- **Audio Chime Alerts:** Audio notifications for newly arrived tickets.
- **One-Tap Status Progression:** Intuitive status buttons (`Accept`, `Preparing`, `Ready`, `Dispatched`).
- **Instant Item 86'ing:** One-click ability to mark an ingredient or menu item as "sold out", instantly updating the website and POS.

### 3. Point of Sale Till (`apps/pos`)
- **Touch-Friendly Counter Interface:** Built for rapid high-volume order entry.
- **Flexible Payments:** Supports cash, external card terminals, and bank transfers.
- **Receipts:** Digital receipts sent via SMS / WhatsApp, plus standard thermal receipt printer output.
- **Shift & Cash Reconciliation:** Daily opening float, closing balance, and variance reporting per cashier.
- **Manager Overrides:** Protected discounts, price adjustments, and ticket cancellations requiring supervisor approval.
- **Offline Mode:** Uses IndexedDB (`Dexie`) to continue taking orders during internet blackouts, automatically syncing upon reconnection.

### 4. Admin Management Dashboard
- **Centralized Catalog:** Manage categories, base items, variants, and extras across all branches.
- **Outlet Overrides:** Configure localized pricing, tax rules, and menu variations per location.
- **Staff & RBAC:** Role-based access control for cashiers, managers, and kitchen accounts.
- **Unified Analytics:** Real-time metrics breakdown by outlet, hour, day, item, and channel (online vs. walk-in).

### 5. Delivery & Logistics
- **Fleet Flexibility:** Supports in-house delivery riders as well as third-party delivery partners (e.g., Glovo, Chowdeck).
- **Zoned Delivery Pricing:** Define delivery boundaries and tiered delivery pricing per outlet.
- **Rider Cash Settlement:** Track cash on delivery collected by riders before shift handover.

### 6. Promotions & Loyalty
- **Discount Engine:** Promo codes with date ranges, minimum order thresholds, and outlet exclusions.
- **Phone-Number-Based Loyalty:** Earn points on counter and web purchases; redeem points during checkout.

---

## ⚙️ Configurable System Options

| Domain | Supported Configurations |
| :--- | :--- |
| **Menu Strategy** | Shared master catalog **OR** outlet-specific localized pricing & menu variations. |
| **Fulfillment** | In-house delivery riders, 3rd-party delivery APIs, customer pickup, or all three. |
| **Payments** | Online payment gateways (Paystack/Flutterwave), Card POS, Cash on Delivery, Bank Transfer. |
| **Promotions** | Percentage discounts, fixed amount vouchers, and/or tier-based loyalty points. |

---

## 🗓️ Delivery Phases & Roadmap

```
Phase 1: Online Ordering (10 - 12 Weeks)
├── Customer ordering website & SEO outlet pages
├── Geolocation outlet selection
├── Payment integration (Paystack/Flutterwave & Pay-on-Delivery)
├── Kitchen display system (KDS) with audio alerts
└── Central admin dashboard with basic multi-outlet reporting

Phase 2: Point of Sale (8 - 10 Weeks)
├── Touch-friendly POS cashier till
├── Offline-first storage & automated background sync
├── Cashier shift floats & daily cash reconciliation
├── Receipts (Thermal printer & WhatsApp/SMS)
└── Manager override approvals for discounts/voids

Phase 3: Growth Tools & Scale (8 - 10 Weeks)
├── In-house rider tracking & cash collection
├── 3rd-party delivery partner integrations (Glovo / Chowdeck)
├── Promo codes & phone-linked loyalty points system
├── Real-time inventory tracking & auto-depletion
└── Advanced multi-outlet financial and performance reports
```

---

## 🎯 Key Success Metrics

- ⚡ **Order Placement Time:** Customer checkout completed in under **2 minutes**.
- ⏱️ **Ticket Dispatch Latency:** Orders appear on kitchen screens within **seconds**.
- 📈 **Digital Growth:** Consistent month-over-month growth in online order share.
- 🎯 **Accuracy:** Reduction in manual copying errors and wrong tickets.
- 💵 **Reconciliation Speed:** Cashier end-of-day register closing reduced from hours to minutes.
- 🔁 **Retention:** Increased repeat customer order rates driven by loyalty rewards.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v20.x` or later
- **pnpm**: `v9.x` or later (`npm i -g pnpm`)
- **Docker & Docker Compose**: For local PostgreSQL and Redis

### 1. Clone & Install Dependencies

```bash
git clone <repository-url>
cd qsr_app

# Install dependencies across all workspace apps
pnpm install
```

### 2. Start Supporting Infrastructure

Launch PostgreSQL and Redis in the background:

```bash
docker compose up -d
```

### 3. Environment Configuration

Copy the example environment files for the API:

```bash
cd apps/api
cp .env.example .env # Ensure DATABASE_URL and REDIS connection strings match docker-compose
cd ../..
```

Default local database connection:
```env
DATABASE_URL=postgres://qsr:qsr@localhost:5432/qsr
```

### 4. Database Migrations & Schemas

Generate and apply database migrations using Drizzle ORM:

```bash
pnpm --filter api db:generate
pnpm --filter api db:migrate
```

To explore data in the GUI Drizzle Studio:
```bash
pnpm --filter api db:studio
```

### 5. Running the Development Environment

Start all applications in development mode simultaneously via Turborepo:

```bash
pnpm dev
```

Or run individual apps:

```bash
pnpm --filter web dev        # Customer Website on http://localhost:3000
pnpm --filter admin dev      # Operations & Outlet Management on http://localhost:3003
pnpm --filter kitchen dev    # Kitchen Display System on http://localhost:3002
pnpm --filter pos dev        # Point of Sale on http://localhost:5173
pnpm --filter api dev        # Backend API on http://localhost:4000
```

---

## 🧪 Testing & Code Quality

Run tests, type checks, and linting across the monorepo:

```bash
# Run all unit and integration tests
pnpm --filter api test

# Run type checks
pnpm --filter api exec tsc --noEmit
pnpm --filter pos exec tsc -b
pnpm --filter kitchen exec tsc -b
pnpm --filter admin exec tsc -b

# Run linter
pnpm --filter api lint
pnpm --filter pos lint
```

---

## 📄 License & Attribution

- **Project:** Multi-Outlet Online Ordering and POS Platform
- **PRD Author:** Temidayo Akanbi-Bello
- **Version:** 1.0 (24 October 2026)
- **Status:** Proprietary / Client Confidential
