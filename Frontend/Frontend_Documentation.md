# CampusEventHub Frontend Documentation

This document provides an overview of the Frontend architecture, file structure, and current functionality.

## 1. Overview
- **Framework**: React.js (via Vite)
- **Routing**: `react-router-dom`
- **Styling**: Pure CSS (`auth.css`, `App.css`)
- **State Management**: Local state (currently minimal/static)

## 2. File Structure & Key Components

### Entry Points
- **`src/main.jsx`**: The application entry point. Renders the `App` component into the DOM root.
- **`src/App.jsx`**: Handles client-side routing using `BrowserRouter`.
  - `/` -> `Login`
  - `/signup` -> `Register`
  - `/student` -> `StudentDashboard`
  - `/admin` -> `AdminDashboard`

### Pages (`src/pages/`)
#### `Login.jsx`
- **Purpose**: Authenticates users.
- **UI Elements**:
  - Email & Password inputs.
  - "Login" button (currently static).
  - "Login with Google" button (static).
  - Navigation link to Registration page.
- **Current Status**: UI only. No API integration.

#### `Register.jsx`
- **Purpose**: Registers new users.
- **UI Elements**:
  - Inputs: Full Name, College, Email, Password, Re-enter Password.
  - Dropdown: Role selection (Student, College Admin).
  - "Sign Up" button (static).
- **Current Status**: UI only. No API integration.

#### `StudentDashboard.jsx`
- **Purpose**: Dashboard for student users.
- **Current Status**: Placeholder component ("UI working correctly").

#### `AdminDashboard.jsx`
- **Purpose**: Dashboard for admin users.
- **Current Status**: Placeholder component ("UI working correctly").

### Styles (`src/styles/`)
- **`auth.css`**: Contains styles specific to the authentication screens (Login/Register), likely handling layout, input styling, and responsiveness.

## 3. Future Integration Needed
1. **API Connection**: Connect Login and Register forms to the Backend APIs (`/api/auth/login`, `/api/auth/signup`).
2. **State**: Implement state for form inputs.
3. **Protected Routes**: Implement logic to prevent unauthorized access to `/student` and `/admin` routes based on token/role.
