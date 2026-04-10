# PulsePoint Backend - Getting Started Guide

## Quick Start

### 1. Prerequisites
- Node.js >= v14
- MongoDB Atlas Account
- npm or yarn

### 2. Installation Steps

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file (already exists, but update values)
# See .env.example for reference
```

### 3. Environment Variables Setup

Update `.env` file with your values:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/pulsepoint?retryWrites=true&w=majority

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d

# Frontend
FRONTEND_URL=http://localhost:3000
```

### 4. Get MongoDB Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create/Login to account
3. Create a cluster
4. Click "Connect"
5. Choose "Drivers"
6. Copy connection string
7. Replace `<password>` and `<username>`

### 5. Start Development Server

```bash
npm run dev
```

You should see:
```
╔════════════════════════════════════════════╗
║   PulsePoint Backend Server Started        ║
║   Running on Port: 5000                    ║
║   Environment: development                 ║
║   Database: mongodb+srv://...              ║
╚════════════════════════════════════════════╝
```

### 6. Test the API

Access health check endpoint:
```
http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "PulsePoint Backend is running!",
  "timestamp": "2024-04-10T..."
}
```

## Create Test Data

### Step 1: Register a Patient

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Patient",
    "email": "patient@test.com",
    "password": "Pass123",
    "role": "patient",
    "phone": "1234567890"
  }'
```

Get the token from response and save it.

### Step 2: Register an Admin

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@test.com",
    "password": "Pass123",
    "role": "admin",
    "phone": "1234567891"
  }'
```

### Step 3: Create a Doctor (Using Admin Token)

```bash
curl -X POST http://localhost:5000/api/doctors \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -d '{
    "name": "Dr. Sarah Smith",
    "email": "doctor@test.com",
    "password": "Pass123",
    "specialty": "Cardiology",
    "experience": 10,
    "fee": 500,
    "degree": "MD Cardiology",
    "about": "Specialized in heart diseases"
  }'
```

### Step 4: Get Doctor ID

```bash
curl http://localhost:5000/api/doctors
```

Copy the doctor ID from response.

### Step 5: Book an Appointment

```bash
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer PATIENT_TOKEN" \
  -d '{
    "doctorId": "DOCTOR_ID",
    "date": "2024-04-25T00:00:00Z",
    "timeSlot": "10:00",
    "reason": "Regular checkup"
  }'
```

## Using Postman

1. Import `PulsePoint-API.postman_collection.json`
2. Set `base_url` = `http://localhost:5000`
3. Register a user
4. Copy token to `token` variable
5. Test all endpoints

## Project Structure

```
backend/
├── config/           # Database config
├── controllers/      # Business logic
├── middleware/       # Auth & error handling
├── models/          # Mongoose schemas
├── routes/          # API endpoints
├── utils/           # Helper functions
├── server.js        # Main server file
├── package.json     # Dependencies
├── .env            # Environment variables
└── README.md       # Full documentation
```

## Key Features Implemented

✅ User authentication with JWT
✅ Role-based access control (Patient/Doctor/Admin)
✅ Doctor management CRUD operations
✅ Appointment booking with conflict prevention
✅ Input validation on all routes
✅ Error handling middleware
✅ MongoDB integration
✅ Password hashing with bcryptjs
✅ CORS support
✅ Pagination and filtering

## Available Scripts

```bash
# Development with auto-reload
npm run dev

# Production
npm start

# Test
npm test
```

## Common Issues & Solutions

### Connection refused?
- Check MongoDB URI is correct
- Verify IP is whitelisted in MongoDB Atlas
- Check PORT environment variable

### Token errors?
- Ensure token is in Authorization header as `Bearer TOKEN`
- Check JWT_SECRET in .env matches
- Verify token isn't expired

### Port 5000 already in use?
- Change PORT in .env
- Or kill process: `lsof -i :5000` then `kill -9 PID`

## Next Steps

1. Connect with frontend React application
2. Add email notification features
3. Implement payment gateway
4. Add appointment reminders
5. Implement video consultation
6. Add SMS notifications

## Frontend Integration

The backend is ready to connect with your React frontend at:
- Base URL: `http://localhost:5000`
- API prefix: `/api/`

Example from frontend:
```javascript
const loginUser = async (email, password) => {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  localStorage.setItem('token', data.token);
};
```

## Production Deployment

Before deploying:

1. Change `NODE_ENV=production`
2. Use strong `JWT_SECRET`
3. Setup MongoDB production instance
4. Enable HTTPS
5. Configure CORS for your domain
6. Use environment variables for sensitive data
7. Set up monitoring and logging
8. Test all endpoints

## Support

For issues, refer to:
- Full README.md in backend folder
- MongoDB documentation
- Express.js documentation
- JWT documentation

Happy coding! 🚀
