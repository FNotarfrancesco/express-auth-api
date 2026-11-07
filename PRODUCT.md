# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Evaluators, technical recruiters, and prospective clients:** Reviewing the application as a live full-stack portfolio piece, using the one-click Demo role logins (`admin`, `editor`, `viewer`) to test role-based access control (RBAC), inventory CRUD workflows, filtering, and user administration in seconds.
- **Store operators, catalog editors, and viewers (simulated operational roles):**
  - `admin`: Full operational control over the product catalog and user role/account management.
  - `editor`: Operational control to create and update product inventory, pricing, stock, and availability.
  - `viewer`: Read-only access to browse, search, filter, and export the product catalog.

## Product Purpose

A full-stack product catalog and inventory management web application built with Angular 21 and an Express/MongoDB REST API. It exists both as a functional multi-role inventory control system for general commerce and as a flagship technical demonstration of secure authentication, granular role-based permissions, and high-craft operational UI. Success means an evaluator or operator can immediately understand the role hierarchy, test real CRUD and filtering workflows without friction, and experience a production-grade interface rather than a classroom CRUD exercise.

## Positioning

Unlike generic tutorial CRUD dashboards that expose raw forms and unstyled tables, this product combines real backend security enforcement (Passport/JWT sessions, rate limiting, Mongo sanitization, role middleware) with instant role-switching demo ergonomics and an intentional, operational workspace tailored to each permission tier.

## Operating Context

- Used in desktop and mobile web browsers.
- Evaluators frequently enter via the Login screen's instant Demo buttons (`admin`, `editor`, `viewer`) to compare how the interface adapts to each permission level.
- Core workflows happen in a unified operational dashboard: scanning stock and availability status, filtering by category/price/alphabetical order/tri-state availability, searching by name, creating/editing products inline, exporting the catalog to CSV, and (for admins) auditing user accounts and switching user roles.

## Capabilities and Constraints

- **Stack:** Angular 21 standalone components (`FormsModule`, `CommonModule`, `RouterModule`), TypeScript, CSS, backed by Node.js/Express and MongoDB (`/api/auth` and `/api/v1/productos`).
- **Preserved Workflows:**
  - Login with email/password plus one-click Demo access for `admin`, `editor`, and `viewer`.
  - Registration gated by an invitation code (`code`) with password confirmation.
  - Product creation (`nombre`, `precio`, `categoria`, `stock`, `descripcion`, `disponible`).
  - Product listing with real-time search by name, sort order (`mayor`, `menor`, `az`, `za`), dynamic category selector, tri-state availability filter (`todos`, `disponible`, `no-disponible`), and expandable descriptions.
  - Inline product editing (`admin` and `editor`) and product deletion with confirmation modal (`admin` only).
  - CSV catalog export (`/api/v1/productos/export`).
  - Admin user management panel (`admin` only): list users, inline role change (`admin`, `editor`, `viewer`), and user deletion with confirmation modal.
  - Logout confirmation modal.
- **Language:** Spanish (`es-AR` / Rioplatense voseo in user-facing prompts and microcopy, e.g., "¿Seguro que querés...?", "Completá todos los campos").

## Brand Commitments

- The incumbent title is **"Mis Productos"** (with freedom to refine or elevate the branding and visual identity while keeping the application's purpose immediately clear).
- Full freedom granted by the project owner to replace the legacy dark-blue glassmorphism palette and generic layout with a cohesive, modern visual system.

## Evidence on Hand

- Existing routes: `/login`, `/register`, `/dashboard`.
- Product data model fields: `_id`, `nombre`, `descripcion`, `precio`, `categoria`, `stock`, `disponible`.
- User data model fields: `_id`, `name`, `email`, `rol` (`admin` | `editor` | `viewer`).
- No fabricated customer testimonials, external company logos, or unimplemented analytics charts should be invented; any summary metrics displayed on the dashboard must be computed directly from the live `productos` and `usuarios` arrays in state.

## Product Principles

1. **Role clarity at a glance:** The active user's role (`admin`, `editor`, `viewer`) and its corresponding capabilities must be unmistakably legible in the workspace layout and controls.
2. **Operational speed over decorative clutter:** Search, filtering, stock inspection, and inline editing are high-frequency tasks; visual hierarchy must prioritize scannability of product names, prices, stock levels, and availability states.
3. **Zero-friction evaluation:** The transition from Login (especially the Demo role triggers) into the Dashboard should feel cohesive, trustworthy, and immediately demonstrable.
4. **Honest data representation:** Every metric, badge, filter count, and status indicator must reflect real application state from the API.
