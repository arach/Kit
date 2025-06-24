# Kit - Text-Based Icon Creator

## Overview

Kit is a full-stack web application for creating professional text-based icons and wordmarks using Google Fonts. The application allows users to customize typography, colors, effects, and export high-quality assets for multiple platforms (iOS, Android, macOS, and web).

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **State Management**: React hooks for local state, TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Canvas Rendering**: HTML5 Canvas API for icon generation and preview

### Backend Architecture
- **Runtime**: Node.js 20 with Express.js server
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Production**: esbuild for fast server-side bundling

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Centralized in `shared/schema.ts` for type safety
- **Migration**: Drizzle Kit for schema management
- **Storage**: In-memory storage implementation with interface for future database integration

## Key Components

### Frontend Components
1. **Kit Page** (`client/src/pages/icon-maker.tsx`)
   - Main application interface
   - Manages global settings state
   - Coordinates between sidebar controls and preview area

2. **ControlsSidebar** (`client/src/components/controls-sidebar.tsx`)
   - Typography controls (font family, size, weight)
   - Color customization (text, background)
   - Effects controls (drop shadow, text stroke)
   - Export format selection

3. **PreviewArea** (`client/src/components/preview-area.tsx`)
   - Real-time icon preview with multiple sizes
   - Platform-specific preview layouts
   - Canvas-based rendering

4. **ExportPanel** (`client/src/components/export-panel.tsx`)
   - Multi-format export functionality
   - Progress tracking for batch exports
   - Platform-specific file naming conventions

### Backend Services
1. **Route Registration** (`server/routes.ts`)
   - Health check endpoint
   - Google Fonts proxy endpoint
   - RESTful API structure

2. **Storage Layer** (`server/storage.ts`)
   - Abstract storage interface (IStorage)
   - In-memory implementation (MemStorage)
   - User management (create, retrieve)

3. **Vite Integration** (`server/vite.ts`)
   - Development server setup
   - HMR (Hot Module Replacement) support
   - Static file serving in production

### Shared Layer
- **Schema Definitions** (`shared/schema.ts`)
  - Database schema using Drizzle ORM
  - Zod validation schemas
  - TypeScript type inference

## Data Flow

1. **User Interaction**: User modifies settings in ControlsSidebar
2. **State Update**: Settings are updated in Kit component state
3. **Real-time Preview**: PreviewArea receives updated settings and re-renders canvas
4. **Font Loading**: Google Fonts are dynamically loaded when font family changes
5. **Export Process**: ExportPanel generates multiple icon sizes and formats
6. **Canvas Rendering**: HTML5 Canvas API renders icons with applied effects
7. **File Generation**: Icons are exported as PNG files with platform-specific naming

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React, shadcn/ui, Radix UI primitives
- **Styling**: Tailwind CSS, class-variance-authority, clsx
- **State Management**: TanStack React Query
- **Canvas/Export**: JSZip for batch downloads
- **Typography**: Google Fonts API integration
- **Icons**: Lucide React, React Icons

### Backend Dependencies
- **Server**: Express.js with middleware support
- **Database**: Drizzle ORM, @neondatabase/serverless
- **Development**: Vite, tsx, esbuild
- **Session Management**: connect-pg-simple (prepared for PostgreSQL sessions)

### Development Tools
- **Build System**: Vite with React plugin
- **Type Checking**: TypeScript with strict configuration
- **Code Quality**: ESLint configuration (implicit)
- **Database Tools**: Drizzle Kit for migrations

## Deployment Strategy

### Development Environment
- **Command**: `npm run dev`
- **Server**: Express with Vite middleware
- **Port**: 5000 (configured in .replit)
- **HMR**: Full hot module replacement support
- **Database**: PostgreSQL 16 module in Replit

### Production Build
- **Build Command**: `npm run build`
- **Frontend**: Vite builds to `dist/public`
- **Backend**: esbuild bundles server to `dist/index.js`
- **Start Command**: `npm run start`
- **Deployment Target**: Autoscale (Replit deployment)

### Database Setup
- **Push Command**: `npm run db:push`
- **Configuration**: Drizzle config points to `DATABASE_URL`
- **Migrations**: Stored in `./migrations` directory
- **Provider**: Configured for Neon Database serverless

## Changelog

```
Changelog:
- June 24, 2025. Initial setup with IconMaker Pro
- June 24, 2025. Renamed to Kit and changed default text to Scout
- June 24, 2025. Replaced canvas rendering with HTML/CSS for crisp vector text
- June 24, 2025. Simplified Kit logo - removed gradient, made icon larger and clearer
- June 24, 2025. Fixed font size slider to properly scale all preview elements
- June 24, 2025. Added Google Fonts API search with 500+ fonts available
- June 24, 2025. Fixed Google Fonts loading mechanism with proper weight formatting
- June 24, 2025. Preloaded popular fonts (Silkscreen, Orbitron, Quantico) in HTML
- June 24, 2025. Added responsive device previews (Desktop, Tablet, Mobile, Watch)
- June 24, 2025. Implemented comprehensive theme system with background/text/stroke combinations
- June 24, 2025. Added focused color palettes (Neutrals, Blues, Greens, etc.)
- June 24, 2025. Created contextual brand previews for real-world usage scenarios
- June 24, 2025. Streamlined theme picker to maintain focus on core icon generation
- June 24, 2025. Added smart text cutoffs with breakpoint-specific text variations
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
Design preferences: Clean, no unnecessary gradients, clear iconography.
Product focus: Keep Kit focused on icon/wordmark generation, avoid feature creep into full design platforms.
```