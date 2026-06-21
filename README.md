# Event Management System

A role-based Event Management System designed to streamline event creation, registration, participant management, and administrative operations within colleges, organizations, and communities.

The platform enables students to discover and register for events, coordinators to manage event participation, and administrators to oversee the entire ecosystem through secure dashboards and analytics.

---

## Overview

Managing events manually often leads to registration conflicts, participant tracking issues, and poor visibility into event performance.

This system solves these challenges by providing:

- Secure user authentication
- Role-based access control
- Event registration workflows
- Team-based event participation
- Registration deadline enforcement
- Email notifications
- Coordinator and Admin dashboards
- Event analytics and statistics

The application follows a scalable MVC architecture and exposes a RESTful API that can be integrated with any frontend application.

---

## Key Features

### User Authentication & Authorization

- User Registration and Login
- Secure Password Hashing
- JWT-based Authentication
- Protected API Routes
- Role-Based Access Control (RBAC)
- Secure Logout Functionality
- Current User Profile Access

### Event Management

- Create and Manage Events
- Event Categories and Types
- Event Capacity Management
- Registration Deadline Validation
- Event Participant Tracking
- Event Status Monitoring

### Event Registration System

- Register for Events
- Cancel Event Registrations
- Prevent Duplicate Registrations
- Capacity Validation
- Registration Deadline Enforcement
- Automatic Participant Updates
- Team Registration Support

### Team-Based Events

For large-scale competitions and hackathons:

- Team Creation
- Team Name Validation
- Team Member Management
- Team Member Eligibility Checks
- Duplicate Registration Prevention

### Dashboard Module

#### User Dashboard

- View Registered Events
- Track Participation History
- Personal Event Overview

#### Coordinator Dashboard

- Manage Assigned Events
- Monitor Registrations
- View Event Statistics
- Track Participant Data

#### Admin Dashboard

- System Statistics
- User Management
- Platform Monitoring
- Administrative Controls

### User Management

- View All Users
- Delete Users
- Role-Based Permissions
- Account Monitoring

### Email Notifications

Automated email notifications for:

- Welcome Emails
- Registration Confirmation Emails
- Event Participation Updates

### Security Features

- JWT Access Tokens
- Authorization Middleware
- Route Protection
- Input Validation
- Secure Password Storage
- Permission-Based Access

---

## System Roles

### Student

Students can:

- Create accounts
- Log in securely
- Register for events
- Cancel registrations
- View their event history
- Access their dashboard

### Coordinator

Coordinators can:

- View event registrations
- Manage event participants
- Access coordinator dashboards
- Monitor event performance

### Admin

Administrators have full access to:

- User management
- Platform statistics
- Dashboard analytics
- Administrative operations

---

## API Modules

### Authentication Module

- Register User
- Login User
- Logout User
- Get Current User

### Event Module

- Create Event
- View Events
- Manage Event Information
- Track Event Participants

### Registration Module

- Register for Event
- Cancel Registration
- View Personal Registrations
- View Event Registrations

### Dashboard Module

- User Dashboard
- Coordinator Dashboard

### Admin Module

- Get All Users
- Delete User
- View System Statistics

---

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication & Security

- JSON Web Tokens (JWT)
- bcrypt

### Email Services

- Nodemailer
- Mailtrap

### Database

- MongoDB Atlas

### Development Tools

- Postman
- Git
- GitHub
- VS Code

---

## Project Architecture

The project follows the MVC (Model–View–Controller) pattern.

```text
src
│
├── controllers
├── models
├── routes
├── middlewares
├── utils
├── db
│
├── app.js
└── index.js
```

This architecture improves:

- Scalability
- Maintainability
- Code Reusability
- Separation of Concerns

---

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=8000

MONGODB_URI=your_mongodb_uri

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d

MAILTRAP_HOST=your_mailtrap_host
MAILTRAP_PORT=your_mailtrap_port
MAILTRAP_USER=your_mailtrap_user
MAILTRAP_PASS=your_mailtrap_password

CORS_ORIGIN=http://localhost:5173
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project:

```bash
cd event-management-system
```

Install dependencies:

```bash
npm install
```

Create environment variables:

```bash
cp .env.example .env
```

Start the development server:

```bash
npm run dev
```

Server runs on:

```text
http://localhost:8000
```

---

## Business Rules Implemented

- Users cannot register for the same event twice.
- Event registrations close after the registration deadline.
- Event capacity cannot be exceeded.
- Team events require a team name.
- Team members must be valid users.
- Users cannot cancel registrations after an event has started.
- Only authorized roles can access protected resources.
- Only administrators can access admin routes.

---

## Future Enhancements

- Event Search & Filtering
- Event Images and Media Uploads
- QR-Based Event Check-In
- Real-Time Notifications
- Attendance Management
- Event Feedback System
- Certificate Generation
- Payment Gateway Integration
- Analytics Dashboard Enhancements

---

## Learning Outcomes

This project helped strengthen practical knowledge of:

- REST API Development
- Authentication & Authorization
- MongoDB Data Modeling
- Middleware Design
- Role-Based Access Control
- Email Service Integration
- Error Handling
- Backend Architecture
- Secure Application Development

---

## Author

**Amruta Patil**

B.Tech Computer Engineering Student

Passionate about Backend Development, Full Stack Engineering, and Building Scalable Web Applications.
