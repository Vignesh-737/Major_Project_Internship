# PharmaStock

PharmaStock is a full-stack Pharmacy Inventory Management System developed using the MERN Stack to streamline pharmacy operations. It provides secure authentication, inventory management, barcode generation and scanning, billing, PDF invoice generation, dashboard analytics, and role-based access control through a modern and responsive interface. The application is designed to improve stock tracking, reduce manual effort, and provide an efficient solution for managing day-to-day pharmacy activities.

## Features

- JWT Authentication
- Email OTP Verification
- Google reCAPTCHA Integration
- Role-Based Access Control (Super Admin, Admin, User)
- Medicine Inventory Management
- Barcode Generation
- Barcode Scanner
- Stock Management
- Billing & Sales Module
- PDF Invoice Generation
- Dashboard Analytics
- Low Stock Alerts
- Expiry & Expired Medicine Tracking
- Activity Logs
- Profile Management
- Excel Export
- Search & Filter Medicines
- Responsive Design
- Protected Routes
- RESTful API Architecture

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router
- React Hot Toast
- Framer Motion
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Nodemailer
- Multer

### Other Tools
- Render
- Vercel
- Git & GitHub
- Postman

## Project Structure

```
PharmaStock/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   └── package.json
│
└── README.md
```

## Installation

### Clone Repository

```bash
git clone https://github.com/Vignesh-737/PharmaStock_Inventory_Management
cd pharmastock
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside the backend folder.

```env
MONGO_URI=

JWT_SECRET=

EMAIL_USER=
EMAIL_PASSWORD=

RECAPTCHA_SECRET_KEY=
```

Create a `.env` file inside the frontend folder.

```env
VITE_API_URL=
VITE_RECAPTCHA_SITE_KEY=
```

## Future Enhancements

- SMS Notifications
- Payment Gateway Integration
- Cloud Image Storage
- Multi-Branch Pharmacy Support
- Purchase & Supplier Module
- Advanced Analytics
- Docker Deployment
- CI/CD Pipeline
- AWS Deployment

## Author

**Vignesh R**

GitHub: https://github.com/Vignesh-737

---

⭐ If you found this project useful, consider giving it a star.
