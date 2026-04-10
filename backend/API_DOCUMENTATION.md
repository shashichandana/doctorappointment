# PulsePoint API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### Register User
**POST** `/auth/register`

**Public** - No authentication required

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "role": "patient",  // optional: 'patient' | 'doctor' | 'admin'
  "phone": "1234567890"  // optional
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient"
  }
}
```

---

### Login User
**POST** `/auth/login`

**Public** - No authentication required

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient"
  }
}
```

---

### Get Current User
**GET** `/auth/me`

**Protected** - Requires authentication

**Response (200 OK):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient",
    "phone": "1234567890",
    "avatar": null,
    "createdAt": "2024-04-10T10:00:00Z",
    "updatedAt": "2024-04-10T10:00:00Z"
  }
}
```

---

### Update Profile
**PUT** `/auth/update-profile`

**Protected** - Requires authentication

**Request Body:**
```json
{
  "name": "John Updated",
  "phone": "9876543210",
  "avatar": "https://..."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { /* updated user object */ }
}
```

---

## 👨‍⚕️ Doctor Endpoints

### Get All Doctors
**GET** `/doctors`

**Public** - No authentication required

**Query Parameters:**
```
?page=1              // Page number (default: 1)
&limit=10            // Results per page (default: 10)
&specialty=Cardiology
&available=true
&search=Dr.Smith
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 5,
  "total": 25,
  "pages": 3,
  "currentPage": 1,
  "doctors": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "user": {
        "_id": "507f1f77bcf86cd799439001",
        "name": "Dr. Sarah Smith",
        "email": "sarah@example.com",
        "phone": "1234567890"
      },
      "specialty": "Cardiology",
      "experience": 10,
      "fee": 500,
      "rating": 4.5,
      "available": true,
      "about": "Specialized in heart diseases",
      "degree": "MD Cardiology",
      "reviews": [
        {
          "_id": "507f1f77bcf86cd799439020",
          "userId": "507f1f77bcf86cd799439002",
          "userName": "Jane Patient",
          "rating": 5,
          "comment": "Excellent service",
          "createdAt": "2024-04-10T09:00:00Z"
        }
      ]
    }
  ]
}
```

---

### Get Doctor by ID
**GET** `/doctors/:id`

**Public** - No authentication required

**URL Parameters:**
- `id` - Doctor ID (MongoDB ObjectId)

**Response (200 OK):**
```json
{
  "success": true,
  "doctor": { /* doctor object with full details */ }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Doctor not found"
}
```

---

### Create Doctor (Admin Only)
**POST** `/doctors`

**Protected** - Requires authentication & Admin role

**Request Body:**
```json
{
  "name": "Dr. Michael Johnson",
  "email": "michael@example.com",
  "password": "SecurePass123",
  "specialty": "Neurology",
  "experience": 15,
  "fee": 600,
  "degree": "MD Neurology",
  "about": "Expert in neurological disorders",
  "image": "https://...",
  "timeslots": [
    {
      "day": "Monday",
      "startTime": "09:00",
      "endTime": "17:00",
      "interval": 30
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Doctor created successfully",
  "doctor": { /* created doctor object */ }
}
```

---

### Update Doctor (Doctor or Admin)
**PUT** `/doctors/:id`

**Protected** - Requires authentication

**Request Body:**
```json
{
  "fee": 700,
  "available": false,
  "timeslots": [ /* updated timeslots */ ]
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Doctor updated successfully",
  "doctor": { /* updated doctor object */ }
}
```

---

### Delete Doctor (Admin Only)
**DELETE** `/doctors/:id`

**Protected** - Requires authentication & Admin role

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Doctor deleted successfully"
}
```

---

### Add Review to Doctor
**POST** `/doctors/:id/reviews`

**Protected** - Requires authentication

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Excellent doctor, very professional"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Review added successfully",
  "doctor": { /* updated doctor object with new review */ }
}
```

---

### Get Doctor Stats
**GET** `/doctors/stats/dashboard`

**Protected** - Requires authentication & Doctor role

**Response (200 OK):**
```json
{
  "success": true,
  "stats": {
    "totalReviews": 15,
    "averageRating": 4.7,
    "totalPatients": 23,
    "isAvailable": true
  },
  "doctor": { /* full doctor object */ }
}
```

---

## 📅 Appointment Endpoints

### Book Appointment
**POST** `/appointments`

**Protected** - Requires authentication & Patient role

**Request Body:**
```json
{
  "doctorId": "507f1f77bcf86cd799439012",
  "date": "2024-04-25T00:00:00Z",
  "timeSlot": "10:00",
  "reason": "Regular checkup"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Appointment booked successfully",
  "appointment": {
    "_id": "607f1f77bcf86cd799439030",
    "userId": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890"
    },
    "doctorId": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Dr. Sarah Smith",
      "specialty": "Cardiology",
      "fee": 500
    },
    "date": "2024-04-25T00:00:00Z",
    "timeSlot": "10:00",
    "status": "booked",
    "reason": "Regular checkup",
    "createdAt": "2024-04-10T10:00:00Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "This time slot is already booked. Please choose another slot."
}
```

---

### Get User's Appointments
**GET** `/appointments/user`

**Protected** - Requires authentication & Patient role

**Query Parameters:**
```
?page=1              // Page number (default: 1)
&limit=10            // Results per page (default: 10)
&status=booked       // Filter by status: pending|booked|cancelled|completed
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 3,
  "total": 5,
  "pages": 1,
  "currentPage": 1,
  "appointments": [ /* array of appointments */ ]
}
```

---

### Get Doctor's Appointments
**GET** `/appointments/doctor`

**Protected** - Requires authentication & Doctor role

**Query Parameters:**
```
?page=1
&limit=10
&status=booked
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 8,
  "total": 12,
  "pages": 2,
  "currentPage": 1,
  "appointments": [ /* array of doctor's appointments */ ]
}
```

---

### Update Appointment Status
**PUT** `/appointments/:id`

**Protected** - Requires authentication & Doctor/Admin role

**Request Body:**
```json
{
  "status": "completed",
  "notes": "Patient is healthy",
  "prescription": "Take medication twice daily"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Appointment updated successfully",
  "appointment": { /* updated appointment object */ }
}
```

---

### Cancel Appointment
**PUT** `/appointments/:id/cancel`

**Protected** - Requires authentication

**Request Body:**
```json
{
  "cancellationReason": "Unable to attend due to emergency"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Appointment cancelled successfully",
  "appointment": {
    /* appointment with status: 'cancelled',
       cancelledBy: 'patient',
       cancellationReason: '...' */
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Cannot cancel an appointment that is completed"
}
```

---

### Get Appointment Statistics
**GET** `/appointments/stats/dashboard`

**Protected** - Requires authentication

**Response (200 OK):**
```json
{
  "success": true,
  "stats": {
    "totalAppointments": 10,
    "bookedAppointments": 5,
    "completedAppointments": 3,
    "cancelledAppointments": 2
  }
}
```

---

## Error Handling

### Common Error Responses

**400 Bad Request** - Validation error:
```json
{
  "success": false,
  "message": "Validation Error",
  "details": "Email is required, Password must be at least 6 characters"
}
```

**401 Unauthorized** - Missing or invalid token:
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

**403 Forbidden** - Insufficient permissions:
```json
{
  "success": false,
  "message": "Access denied. Only admin can access this route."
}
```

**404 Not Found**:
```json
{
  "success": false,
  "message": "Doctor not found"
}
```

**409 Conflict** - Duplicate entry:
```json
{
  "success": false,
  "message": "email already exists"
}
```

**500 Internal Server Error**:
```json
{
  "success": false,
  "message": "Server Error"
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing/invalid token |
| 403 | Forbidden - No permission |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Duplicate entry |
| 500 | Internal Server Error |

---

## Data Types & Validations

### Email Format
```
Must be valid email: example@domain.com
```

### Phone Number
```
Must be exactly 10 digits: 1234567890
```

### Time Slot
```
Must be HH:MM format: 10:00, 14:30, etc.
```

### Date Format
```
Must be ISO8601: 2024-04-25T00:00:00Z
```

### Rating
```
Must be integer between 1-5
```

### Appointment Status
```
'pending' | 'booked' | 'cancelled' | 'completed'
```

### Doctor Specialty
```
'Cardiology' | 'Neurology' | 'Orthopedics' | 'Pediatrics' | 
'Dermatology' | 'ENT' | 'General Practice' | 'Psychiatry' | 'Ophthalmology'
```

---

## Rate Limiting

No rate limiting is currently implemented. Consider adding rate limiting for production:
- NPM package: `express-rate-limit`
- Recommended: 100 requests per 15 minutes per IP

---

## CORS Configuration

Currently configured for:
```
http://localhost:3000
```

Update `FRONTEND_URL` in `.env` for production domains.

---

## Pagination Example

**Request:**
```
GET /api/doctors?page=2&limit=5
```

**Response includes:**
```json
{
  "count": 5,          // Results in current page
  "total": 52,         // Total records
  "pages": 11,         // Total pages
  "currentPage": 2     // Current page number
}
```

---

## Filtering & Search

**Doctors Filtering:**
```
GET /api/doctors?specialty=Cardiology&available=true&search=Dr.
```

**Appointment Status Filter:**
```
GET /api/appointments/user?status=booked&page=1
```

---

## Usage Examples

### Register and Login
```javascript
// Register
const registerResponse = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John',
    email: 'john@example.com',
    password: 'Pass123'
  })
});
const { token } = await registerResponse.json();

// Use token for subsequent requests
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};
```

### Book Appointment
```javascript
const bookResponse = await fetch('/api/appointments', {
  method: 'POST',
  headers,
  body: JSON.stringify({
    doctorId: '507f1f77bcf86cd799439012',
    date: '2024-04-25T00:00:00Z',
    timeSlot: '10:00',
    reason: 'Checkup'
  })
});
```

---

## Support & Troubleshooting

For detailed information, see:
- `README.md` - Full backend documentation
- `SETUP.md` - Setup and quick start guide
- `.env` - Configuration template

---

**Last Updated:** April 2024
