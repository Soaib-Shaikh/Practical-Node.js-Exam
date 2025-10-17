# Node.js Practical — Recipes Book

This is a small role-based Recipe Book application built with Node.js, Express, MongoDB and EJS templates. It includes user registration/login, recipe creation, and admin management pages for users and recipes.

## Demo / Deployment

Live deploy: https://node-js-practical.onrender.com

## Admin Credentials

Use the following admin account to sign in to the app (for testing/demo):

- Email: admin@gmail.com
- Password: 1234

## Quick setup (local)

1. Clone the repository and install dependencies:

```powershell
git clone <repo-url>
cd "Node.js Practical"
npm install
```

2. Create a `.env` file with at minimum:

```
PORT=3000
SESSION_SECRET=your_secret_here
MONGO_URI=mongodb://localhost:27017/your-db-name
```

3. Start the app:

```powershell
npm start
```

4. Open http://localhost:3000 in your browser.

## Notes

- The app uses JWT stored in cookies for session handling. The admin-only pages require the user to have role `admin`.
- If you need to create the admin user manually, insert a user with role `admin` into the `users` collection (passwords are hashed using bcrypt by the user schema pre-save hook).

If you want, I can add instructions to seed an admin user or provide a small seed script.