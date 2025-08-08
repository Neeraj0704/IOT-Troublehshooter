# FixMyIoT - IoT Troubleshooting Assistant

## Overview

FixMyIoT is an intelligent web application that helps IoT developers, hobbyists, students, and makers solve problems in their IoT projects by offering AI-powered troubleshooting support. The platform allows users to upload images of their IoT setups, describe their issues, and receive AI-generated diagnosis with step-by-step solutions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Library**: Radix UI primitives with custom shadcn/ui components
- **Styling**: Tailwind CSS with CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **Authentication**: Replit Auth with OpenID Connect
- **Session Management**: Express sessions with PostgreSQL storage
- **File Upload**: Multer for handling multipart form data
- **AI Integration**: OpenAI API for troubleshooting analysis

### Database Architecture
- **Database**: PostgreSQL (via Neon serverless)
- **ORM**: Drizzle ORM with schema-first approach
- **Migration**: Drizzle Kit for database migrations
- **Connection**: Connection pooling with @neondatabase/serverless

## Key Components

### Authentication System
- **Provider**: Replit Auth integration
- **Session Storage**: PostgreSQL-backed sessions table
- **User Management**: Automatic user creation and profile management
- **Authorization**: Route-level protection with middleware

### Troubleshooting Engine
- **AI Analysis**: OpenAI GPT-4o for problem diagnosis
- **Image Processing**: Base64 image upload and analysis
- **Structured Output**: JSON-formatted responses with diagnosis and step-by-step solutions
- **Query Management**: Persistent storage of troubleshooting requests and results

### User Interface
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: Consistent UI components using Radix UI
- **Navigation**: Context-aware navigation with authentication states
- **File Upload**: Drag-and-drop interface for image uploads
- **Results Display**: Formatted troubleshooting results with code snippets

## Data Flow

1. **User Authentication**: Users authenticate via Replit Auth
2. **Problem Submission**: Users fill out troubleshooting form with:
   - Microcontroller selection
   - Project type
   - Component list
   - Problem description
   - Optional images
3. **AI Processing**: Backend sends structured prompt to OpenAI API
4. **Result Storage**: Analysis results stored in PostgreSQL
5. **Response Display**: Formatted results shown to user
6. **Query History**: Past queries accessible through dedicated interface

## Database Schema

### Core Tables
- **users**: User profiles and authentication data
- **troubleshooting_queries**: Problem submissions and AI responses
- **sessions**: Authentication session storage

### Data Types
- **Problem Data**: Microcontroller, project type, components, description
- **AI Response**: Diagnosis, structured solutions, resources
- **Metadata**: Status tracking, timestamps, user associations

## External Dependencies

### AI Services
- **OpenAI API**: GPT-4o model for troubleshooting analysis
- **Image Analysis**: Base64 image processing for hardware inspection

### Authentication
- **Replit Auth**: OpenID Connect integration
- **Session Management**: PostgreSQL-backed session storage

### Database
- **Neon**: Serverless PostgreSQL hosting
- **Connection Pooling**: WebSocket-based database connections

### Development Tools
- **Vite**: Development server and build tooling
- **Replit Integration**: Development environment optimizations

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: esbuild bundles Express server to `dist/index.js`
3. **Database Setup**: Drizzle migrations ensure schema consistency

### Environment Configuration
- **Database**: `DATABASE_URL` for PostgreSQL connection
- **Authentication**: Replit Auth environment variables
- **AI Services**: OpenAI API key configuration
- **Sessions**: Session secret for security

### Production Considerations
- **Static Assets**: Frontend served from `dist/public`
- **API Routes**: Express server handles `/api/*` routes
- **Error Handling**: Comprehensive error boundaries and logging
- **Security**: HTTPS enforcement, secure session cookies

## Technical Decisions

### Framework Choices
- **React + TypeScript**: Type safety and modern development experience
- **Drizzle ORM**: Schema-first approach with excellent TypeScript support
- **Vite**: Fast development server and optimized production builds
- **Tailwind CSS**: Utility-first styling with design system consistency

### Authentication Strategy
- **Replit Auth**: Simplified authentication for Replit ecosystem
- **Session-based**: Server-side session management for security
- **Database Sessions**: Persistent session storage for reliability

### AI Integration
- **OpenAI GPT-4o**: Latest model for best troubleshooting capabilities
- **Structured Prompts**: Consistent JSON output format
- **Image Analysis**: Base64 encoding for hardware inspection

### Database Design
- **Relational Model**: Clear relationships between users and queries
- **JSON Storage**: Flexible solution storage for varied response formats
- **Array Types**: PostgreSQL arrays for components and image URLs