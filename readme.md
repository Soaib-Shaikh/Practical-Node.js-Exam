# Practical-Node.js-Exam

A small recipe management app built with Node.js and Express. This README gives a quick overview of features, technologies, folder structure, and a default admin login for testing.

## Deploy Link

Link:- https://practical-node-js-exam.onrender.com

## Features

- User signup / login (JWT in cookie)
- Create, view, edit, delete recipes
- Upload images for recipes and user profiles (Cloudinary)
- User profile with editable fields (username, email, age, mobile number, address, gender, profile image)
- Admin area to manage users and recipes (restricted by user role)
- Simple EJS templates for server-side rendering


If admin user does not exist, create a user directly in the database with role set to `admin` or sign up and manually update the role in the DB.

## Technologies

- Node.js
- Express
- EJS (server-side templates)
- MongoDB / Mongoose
- Cloudinary (image uploads)
- Multer + multer-storage-cloudinary
- bcrypt (password hashing)
- jsonwebtoken (JWT)

## Quick setup

1. Copy `.env.example` to `.env` and provide the required credentials (MongoDB URI, Cloudinary keys, secrets):

```
MONGODB_URL=your_mongodb_connection_string
PORT=8081
PRIVATE_KEY=your_private_key
SECRET_KEY=your_jwt_secret
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
```

2. Install dependencies

```bash
npm install
```

3. Start the app

```bash
node index.js
```

4. Visit `http://localhost:3000` (or the PORT in your .env)

## Folder structure

```
.
├── configs/
│   ├── cloudinary.js        # Cloudinary configuration
│   └── db.js                # Mongoose connection
├── controllers/
│   ├── authController.js
│   ├── profileController.js
│   ├── recipeController.js
│   └── ...
├── middlewares/
│   ├── auth.js
│   └── upload.js            # multer + cloudinary storage
├── models/
│   ├── recipeSchema.js
│   └── userSchema.js
├── public/                  # static assets (css, images, vendors)
├── routers/
│   └── authRouter.js
├── views/
│   ├── index.ejs
│   ├── partials/
│   └── pages/
│       ├── auth/
│       └── recipes/
└── index.js
```

## Notes & next steps

- For production, ensure `SECRET_KEY` and other secrets are stored securely and not checked into source control.
- Consider adding validation on the server for profile fields and image size limits.
- Add tests for controllers and critical routes.

---

If you'd like, I can:
- Add `.env.example` file to the repo
- Create the admin user script to seed the database
- Push these changes to your GitHub repo (if you provide remote URL or allow me to run git commands)
