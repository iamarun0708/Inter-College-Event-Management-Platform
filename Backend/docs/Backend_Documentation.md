# CampusEventHub Backend Documentation

This document provides a detailed overview of the backend file structure, functions, and their outcomes.

## 1. Entry Points & Configuration

### `src/server.js`
- **Description**: The main entry point of the application.
- **Functionality**:
  - Loads environment variables.
  - Connects to the database.
  - Starts the Express server.
- **Outcome**: Server listens on the specified port (default 5000), logs "Server running...".

### `src/app.js`
- **Description**: Configures the Express application.
- **Functionality**:
  - **Middleware Setup**: Applies `helmet` (security), `cors`, `express-rate-limit`, and JSON parsing.
  - **Route Mounting**: Connects `/api/auth`, `/api/events`, `/api/registrations`, and `/api/feedback` to their respective route files.
  - **Error Handling**: Sets up global error handlers.
- **Outcome**: Exports the configured `app` module for use in `server.js`.

### `src/config/db.js`
#### `connectDB()`
- **Description**: Asynchronously connects to the MongoDB database using Mongoose.
- **Outcome**:
  - **Success**: Logs "MongoDB Connected: [host]".
  - **Failure**: Logs the error message and exits the process with code 1.

---

## 2. Controllers (Business Logic)

### `src/controllers/auth.controller.js`
#### `registerUser(req, res)`
- **Description**: Handles user registration.
- **Outcome**:
  - **Success (201)**: Creates a new user, returns user details (id, name, email, role, college) and an auth token.
  - **Failure (400)**: Returns error if validation fails or user already exists.

#### `loginUser(req, res)`
- **Description**: Authenticates a user.
- **Outcome**:
  - **Success (200)**: Returns user details and an auth token if credentials match.
  - **Failure (401)**: Returns "Invalid email or password".

### `src/controllers/event.controller.js`
#### `createEvent(req, res)`
- **Description**: Creates a new event (College Admin only).
- **Outcome**:
  - **Success (201)**: Save event to DB and returns the created event object.
  - **Failure**: Returns 500 server error.

#### `getEvents(req, res)`
- **Description**: Retrieves all events.
- **Outcome**:
  - **Success (200)**: Returns an array of all event objects.

#### `getEventById(req, res)`
- **Description**: Fetches a single event by its ID.
- **Outcome**:
  - **Success (200)**: Returns the requested event.
  - **Failure (404)**: Returns "Event not found".

#### `updateEvent(req, res)`
- **Description**: Updates an existing event (College Admin only).
- **Outcome**:
  - **Success (200)**: Returns the updated event object.
  - **Failure (404)**: Returns "Event not found".

#### `deleteEvent(req, res)`
- **Description**: Deletes an event (College Admin only).
- **Outcome**:
  - **Success (200)**: Returns message "Event removed".
  - **Failure (404)**: Returns "Event not found".

### `src/controllers/registration.controller.js`
#### `registerForEvent(req, res)`
- **Description**: Registers a logged-in student for a specific event.
- **Outcome**:
  - **Success (201)**: Creates registration record and returns it.
  - **Failure (400)**: Returns "Already registered for this event" if duplicate.

#### `getMyRegistrations(req, res)`
- **Description**: Gets all registrations for the currently logged-in user.
- **Outcome**:
  - **Success (200)**: Returns list of registrations with event details populated.

#### `getEventRegistrations(req, res)`
- **Description**: Gets all students registered for a specific event (College Admin only).
- **Outcome**:
  - **Success (200)**: Returns list of registrations with user details populated.

#### `updateRegistrationStatus(req, res)`
- **Description**: Updates status (e.g., approved/rejected) of a registration.
- **Outcome**:
  - **Success (200)**: Returns updated registration object.
  - **Failure (404)**: "Registration not found".

### `src/controllers/feedback.controller.js`
#### `addFeedback(req, res)`
- **Description**: Submits feedback for an event.
- **Outcome**:
  - **Success (201)**: Saves feedback and returns it.
  - **Failure (400)**: "Feedback already submitted for this event".

#### `getEventFeedback(req, res)`
- **Description**: Retrieves all feedback for a specific event.
- **Outcome**:
  - **Success (200)**: Returns list of feedback with user names.

---

## 3. Middlewares

### `src/middlewares/auth.middleware.js`
#### `protect(req, res, next)`
- **Description**: Verifies JWT token in request headers.
- **Outcome**:
  - **Success**: Attaches `req.user` to the request and calls `next()`.
  - **Failure (401)**: Returns "Not authorized" if token is missing or invalid.

### `src/middlewares/role.middleware.js`
#### `authorize(...roles)`
- **Description**: Higher-order function that restricts access based on user roles.
- **Outcome**:
  - **Success**: Calls `next()` if user's role matches one of the allowed roles.
  - **Failure (403)**: Returns "User role ... is not authorized".

### `src/middlewares/error.middleware.js`
#### `notFound(req, res, next)`
- **Description**: Catch-all for undefined routes.
- **Outcome**: Passed error to the global error handler with 404 status.

#### `errorHandler(err, req, res, next)`
- **Description**: Global error handling function.
- **Outcome**: Returns JSON response with error message and stack trace (if not production).

---

## 4. Utilities & Validations

### `src/utils/token.util.js`
#### `generateToken(id)`
- **Description**: Generates a JSON Web Token (JWT) for a user ID.
- **Outcome**: Returns a signed JWT string valid for 7 days.

### `src/validations/auth.validation.js`
- **Description**: Joi schemas for input validation.
  - `signupSchema`: Validates name, email, password, collegeName, role.
  - `loginSchema`: Validates email, password.
