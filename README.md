# 🤫 Secrets App

A full-stack web application built with Node.js, Express, and PostgreSQL that allows users to register, log in, and securely store a personal secret. The application supports both traditional email/password authentication (with bcrypt hashing) and Google OAuth2 Single Sign-On (SSO).

## ✨ Features

- **User Authentication**: Secure signup and login functionality.
- **Google OAuth2**: Seamless integration for users to log in using their Google accounts.
- **Session Management**: Persistent user sessions securely stored and maintained.
- **Protected Routes**: Restricts access to sensitive pages (like viewing and submitting secrets) to authenticated users only.
- **Password Hashing**: Securely hashes user passwords using `bcrypt` before storing them in the database.
- **MVC-Inspired Architecture**: Clean separation of concerns with dedicated folders for routes, dynamic views (EJS), and static files.

## 🛠️ Tech Stack

- **Backend Framework**: Node.js with [Express.js](https://expressjs.com/)
- **Database**: PostgreSQL (via `pg` node-postgres)
- **Authentication**: [Passport.js](https://www.passportjs.org/) (`passport-local`, `passport-google-oauth2`)
- **Template Engine**: EJS (Embedded JavaScript templating)
- **Styling**: Custom CSS
- **Other Utilities**: 
  - `bcrypt` for password hashing
  - `express-session` for session handling
  - `dotenv` for environment variable management
  - `morgan` for HTTP request logging

## 📋 Prerequisites

Before running the project locally, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [PostgreSQL](https://www.postgresql.org/) database server running locally or remotely
- A Google Cloud Console project with OAuth2 credentials (Client ID and Client Secret)

## 🚀 Installation & Setup

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd "demo folder"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the PostgreSQL Database**:
   Create a new database in PostgreSQL and run the following SQL command to create the necessary `users` table:
   ```sql
   CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       email VARCHAR(255) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       secret TEXT
   );
   ```

4. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add the following keys. Replace the placeholder values with your actual database and Google OAuth credentials.
   ```env
   # Database Configuration
   USER=postgres
   PASSWORD=your_db_password
   HOST=localhost
   PORT=5432
   DATABASE=your_db_name

   # Google OAuth Configuration
   CLIENT_ID=your_google_client_id
   CLIENT_SECRET=your_google_client_secret
   CALLBACK_URL=http://localhost:3000/auth/google/secrets
   ```

5. **Run the Application**:
   Start the development server using nodemon:
   ```bash
   npm start
   ```
   The application will be running on `http://localhost:3000`.

## 📂 Project Structure

```text
├── .env                 # Environment variables (create this)
├── package.json         # Project metadata and dependencies
├── server.js            # Main entry point and Passport config
├── routes/              # Express route handlers
│   ├── initials.js      # Base configs and DB initialization
│   ├── login.js         # Authentication routes (local & OAuth)
│   └── secret.js        # Protected routes for handling secrets
├── dynamicFiles/        # EJS View templates
│   ├── index.ejs        # Landing page
│   ├── login.ejs        # Login page
│   ├── signup.ejs       # Signup page
│   ├── secrets.ejs      # Dashboard showing the user's secret
│   ├── submit.ejs       # Form to submit a new secret
│   └── partials/        # Reusable view components (header, footer)
└── staticFiles/         # Static assets (CSS, images)
    └── style.css        # Main stylesheet
```

## 🔐 Security Considerations

- Passwords are never stored in plain text. They are hashed using a salt round of 10.
- Session secrets should be updated to a robust, random string in production (currently using the DB password as a placeholder in `initials.js`).
- Google OAuth restricts duplicate account creations for the same email.

## 📄 License

This project is licensed under the ISC License.
