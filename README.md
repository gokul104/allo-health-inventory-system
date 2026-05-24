# Inventory Reservation System

A full-stack inventory reservation system built using Next.js, Prisma, PostgreSQL, and Neon DB.

The system prevents overselling during concurrent reservations using PostgreSQL transactions with Serializable isolation level.

---

# Features

- Product inventory listing
- Warehouse-based stock tracking
- Reservation workflow
- Reservation confirmation
- Reservation release/cancellation
- Overselling prevention
- Transaction-safe inventory updates
- Live deployed frontend + backend

---

# Tech Stack

- Next.js
- TypeScript
- Prisma ORM
- PostgreSQL (Neon)
- Tailwind CSS
- Vercel Deployment

---

# Live Demo

https://allo-health-inventory-system-bice.vercel.app

---

# GitHub Repository

https://github.com/gokul104/allo-health-inventory-system

---

# API Endpoints

## GET /api/products

Returns products with warehouse stock availability.

---

## POST /api/reservations

Creates inventory reservation.

Returns 409 if stock unavailable.

---

## POST /api/reservations/confirm

Confirms reservation after payment success.

---

## POST /api/reservations/release

Releases reservation and restores stock.

---

# Local Setup

## Install dependencies

```bash
npm install