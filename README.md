# Smart India - One-Stop Citizen Government Portal & National 3D Discovery Platform

A modern, high-performance, unified government portal built for citizens, departments, and administrators across India. Features interactive 3D national maps, real political district survey maps, OTP SMS authentication, inter-departmental workflows, DATRAA, and TETRAN modules.

## Features
- **3D National Geographical Discovery**: Interactive 3D visualization of Indian States, UTs, Monuments, Space Milestones, and Historical Legends.
- **Dynamic State → District → Taluk Navigation**: Real political boundaries for all 36 States/UTs with interactive survey district maps and local taluk exploration.
- **OTP SMS Authentication**: Integrated MySQL backend API with Express endpoints (`/api/auth/send-otp`, `/api/auth/verify-otp`) for 6-digit secure phone verification.
- **Citizen & Admin Portals**: Seamless single window service applications, tracking, department workspaces, DATRAA, and TETRAN.
- **Offline High-Res Assets**: Authentic historical portraits and monument imagery stored locally in `/public`.

## Tech Stack
- **Frontend**: React 18, Vite, Three.js, React-Leaflet, Lucide React, CSS3
- **Backend API**: Node.js, Express, MySQL 8.0, CORS, Body-Parser
- **Maps & Boundaries**: `@svg-maps/india`, OpenStreetMap, Esri GIS Tile Layers

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Backend API Server
```bash
node server/index.js
```

### 3. Start Frontend Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```
