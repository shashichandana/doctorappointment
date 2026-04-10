# PulsePoint - Doctor Appointment Booking Backend

A production-ready Node.js/Express backend for a doctor appointment booking application with authentication, role-based access control, and comprehensive appointment management.

## 🚀 Features

- **User Authentication**: JWT-based authentication with registration and login
- **Role-Based Access Control**: Support for Patient, Doctor, and Admin roles
- **Doctor Management**: Create, update, and manage doctor profiles with specialties
- **Appointment Booking**: Book, update, and cancel appointments with conflict prevention
- **Reviews & Ratings**: Patients can review and rate doctors
- **Dashboard Statistics**: Personalized dashboards for doctors and patients
- **Input Validation**: Express-validator for all API endpoints
- **Error Handling**: Comprehensive error handling middleware
- **CORS Support**: Cross-origin requests for frontend integration
- **MongoDB Integration**: Mongoose ODM for database operations

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Create/update `.env` file:
   ```
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pulsepoint
   JWT_SECRET=your-secret-key-here
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start the server**

   **Development** (with auto-reload):
   ```bash
   npm run dev
   ```

   **Production**:
   ```bash
   npm start
   ```

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── doctorController.js   # Doctor management
│   └── appointmentController.js # Appointment management
├── middleware/
│   ├── authMiddleware.js     # JWT verification
│   ├── roleMiddleware.js     # Role-based access
│   └── errorHandler.js       # Error handling
├── models/
│   ├── User.js              # User schema
│   ├── Doctor.js            # Doctor schema
│   └── Appointment.js       # Appointment schema
├── routes/
│   ├── authRoutes.js        # Authentication endpoints
│   ├── doctorRoutes.js      # Doctor endpoints
│   └── appointmentRoutes.js # Appointment endpoints
├── .env                     # Environment variables
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies
└── server.js               # Main application file
```

## 🔌 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Register new user | No |
| POST | `/login` | Login user | No |
| GET | `/me` | Get current user | Yes |
| PUT | `/update-profile` | Update profile | Yes |

**Register Request**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "patient",
  "phone": "1234567890"
}
```

**Login Request**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Doctors (`/api/doctors`)

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/` | Get all doctors | No | - |
| GET | `/:id` | Get doctor by ID | No | - |
| POST | `/` | Create doctor | Yes | Admin |
| PUT | `/:id` | Update doctor | Yes | Doctor/Admin |
| DELETE | `/:id` | Delete doctor | Yes | Admin |
| POST | `/:id/reviews` | Add review | Yes | Patient |
| GET | `/stats/dashboard` | Doctor stats | Yes | Doctor |

**Query Parameters for GET /doctors**:
```
?specialty=Cardiology
?available=true
?page=1&limit=10
?search=Dr.Smith
```

### Appointments (`/api/appointments`)

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| POST | `/` | Book appointment | Yes | Patient |
| GET | `/user` | Get user appointments | Yes | Patient |
| GET | `/doctor` | Get doctor appointments | Yes | Doctor |
| PUT | `/:id` | Update appointment | Yes | Doctor/Admin |
| PUT | `/:id/cancel` | Cancel appointment | Yes | Patient/Doctor/Admin |
| GET | `/stats/dashboard` | Appointment stats | Yes | Patient/Doctor |

**Book Appointment Request**:
```json
{
  "doctorId": "507f1f77bcf86cd799439011",
  "date": "2024-04-20T00:00:00Z",
  "timeSlot": "10:00",
  "reason": "Regular checkup"
}
```

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

The token is returned during login and registration. It expires based on the `JWT_EXPIRE` variable (default: 7 days).

## 👥 User Roles

1. **Patient**: Can book appointments, view their appointments, review doctors
2. **Doctor**: Can view their appointments, update appointment status, manage availability
3. **Admin**: Full access to all resources, can create/delete doctors

## 🛡️ Security Features

- **Password Hashing**: Bcryptjs for secure password storage
- **JWT Tokens**: Secure token-based authentication
- **Input Validation**: Express-validator on all endpoints
- **Role-Based Access**: Middleware for route protection
- **Environment Variables**: Sensitive data in .env file
- **CORS**: Configured for frontend domain only
- **Error Handling**: No sensitive data in error messages

## 📦 Models

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (patient|doctor|admin),
  phone: String,
  avatar: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Doctor Schema
```javascript
{
  user: ObjectId (ref: User),
  name: String,
  specialty: String,
  experience: Number,
  fee: Number,
  rating: Number (0-5),
  reviews: Array,
  available: Boolean,
  image: String,
  about: String,
  degree: String,
  timeslots: Array,
  createdAt: Date,
  updatedAt: Date
}
```

### Appointment Schema
```javascript
{
  userId: ObjectId (ref: User),
  doctorId: ObjectId (ref: Doctor),
  date: Date,
  timeSlot: String (HH:MM format),
  status: String (pending|booked|cancelled|completed),
  reason: String,
  notes: String,
  cancelledBy: String,
  cancellationReason: String,
  prescription: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚦 Error Handling

The API returns standardized error responses:

```json
{
  "success": false,
  "message": "Error description",
  "details": "Additional details if applicable"
}
```

## 📝 Best Practices

1. **Validation**: All inputs are validated using express-validator
2. **Population**: Related documents are populated for data consistency
3. **Pagination**: List endpoints support pagination with page and limit
4. **Filtering**: Support for advanced filtering (search, status, specialty)
5. **Timestamps**: All models include createdAt and updatedAt
6. **Error Messages**: User-friendly error messages
7. **Status Codes**: Proper HTTP status codes for all responses

## 🧪 Testing API Endpoints

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"pass123"}'

# Get doctors
curl http://localhost:5000/api/doctors

# Book appointment
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"doctorId":"...","date":"2024-04-20T10:00:00Z","timeSlot":"10:00"}'
```

### Using Postman

1. Import the API endpoints
2. Create collection variables for `base_url` and `token`
3. Use pre-request scripts to set authorization headers
4. Test all endpoints with sample data

## 🔄 MongoDB Atlas Setup

1. Create a MongoDB Atlas account
2. Create a cluster
3. Create a database user
4. Whitelist your IP address
5. Get connection string
6. Update `MONGODB_URI` in `.env`

Example connection string:
```
mongodb+srv://username:password@cluster0.mongodb.net/pulsepoint?retryWrites=true&w=majority
```

## 📚 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **dotenv**: Environment variable management
- **cors**: Cross-origin resource sharing
- **express-validator**: Input validation
- **nodemon**: Development auto-reload

## 🚀 Deployment

### Using Heroku

1. Install Heroku CLI
2. Create Heroku app: `heroku create app-name`
3. Set environment variables: `heroku config:set KEY=value`
4. Deploy: `git push heroku main`

### Using Railway/Render

1. Connect your GitHub repository
2. Add environment variables in dashboard
3. Deploy automatically on push

## 📞 Support & Troubleshooting

### Common Issues

**Port already in use**:
```bash
# Change PORT in .env or use different port
lsof -i :5000  # Check what's using port 5000
```

**MongoDB connection error**:
- Verify MongoDB URI in .env
- Check IP whitelist in MongoDB Atlas
- Ensure network connection

**JWT token errors**:
- Verify JWT_SECRET is set
- Check token format in Authorization header
- Ensure token hasn't expired

## 📜 License

This project is licensed under the ISC License.

## 👤 Author

PulsePoint Team

---

For more information or support, contact the development team.
