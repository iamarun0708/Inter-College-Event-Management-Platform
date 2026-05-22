# CampusEventHub

CampusEventHub is a centralized college event hosting and management platform. It allows college administrators and event coordinators to publish and manage fests, hackathons, sports events, and workshops, while allowing students to browse, RSVP, register, and submit feedback seamlessly.

---

## 🏗️ Architecture & Tech Stack

The application is built using a decoupled client-server architecture:

### Frontend
- **Framework**: React 19 (using [Vite](https://vite.dev/))
- **Routing**: React Router DOM (v7)
- **API Client**: Axios
- **Animations & Charts**: Framer Motion, Recharts
- **Icon Pack**: Lucide React, React Icons

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (using Mongoose ODM)
- **Security**: CORS, Helmet, express-rate-limit, BcryptJS (password hashing)
- **Authentication**: JSON Web Tokens (JWT)
- **Mailing**: Nodemailer (for event notifications)

---

## 🛠️ Prerequisites

Before setting up the project locally, ensure you have the following installed:
1. [Node.js](https://nodejs.org/) (v16.0.0 or higher recommended)
2. [MongoDB](https://www.mongodb.com/try/download/community) (Local community server running, or a MongoDB Atlas URI)

---

## 🚀 Setup & Installation

Follow these steps to set up and run the backend and frontend components.

### 1. Backend Configuration

1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your Environment Variables:
   Create a `.env` file in the root of the `Backend` folder (or verify/configure the existing one) with the following parameters:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/campuseventhub
   JWT_SECRET=your_super_secret_jwt_key
   NODE_ENV=development
   
   # Optional: Nodemailer SMTP Settings for emails
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-specific-password
   ```

4. Start the backend server:
   - **Development mode (using Nodemon auto-reload)**:
     ```bash
     npm run dev
     ```
   - **Production mode**:
     ```bash
     npm start
     ```
   The backend server will run on `http://localhost:5000`.

---

### 2. Frontend Configuration

1. Open a new terminal tab/window and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend application will boot up at `http://localhost:5173` (or the port specified by Vite in the console).

---

## 📝 Key Features

- **Centralized Event Dashboard**: Browse fests, workshops, hackathons, and sports events.
- **Admin Control Panel**: Approve or reject registrations, track waitlists, and view attendance.
- **Event Registrations**: Register for events and receive confirmation emails.
- **Attendance Tracker**: Check-in participants and manage real-time attendance stats.
- **Feedback & Analytics**: Event feedback submission with interactive data visualizations (charts) for event organizers.