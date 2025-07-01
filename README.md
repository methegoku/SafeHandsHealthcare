# SafeHands Healthcare Platform

A comprehensive healthcare booking platform built with React frontend and Node.js Express backend with PostgreSQL database.

## Features

### For Users
- User registration and authentication
- Browse healthcare services by category
- Search and filter providers by location and service
- Book appointments with verified providers
- Real-time booking status tracking
- Payment processing
- Review and rating system
- Profile management

### For Service Providers
- Provider registration and profile creation
- Service offering management
- Booking management and scheduling
- Earnings tracking
- Profile verification system
- Availability management

### For Administrators
- User and provider management
- Service category management
- Booking oversight
- Analytics dashboard
- Verification system

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Query for state management
- React Hook Form for form handling
- Wouter for routing
- Lucide React for icons

### Backend
- Node.js with Express
- Sequelize ORM with PostgreSQL
- JWT for authentication
- bcryptjs for password hashing
- Express Validator for input validation
- Multer for file uploads
- Helmet for security
- CORS for cross-origin requests

### Database
- PostgreSQL
- UUID primary keys
- JSON fields for flexible data storage
- Proper indexing for performance

## Prerequisites

- Node.js 18+ 
- PostgreSQL 12+
- npm or yarn

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd SafeHandsHealthcare
```

### 2. Install dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd client && npm install

# Install backend dependencies
cd ../server && npm install
```

### 3. Database Setup

#### Create PostgreSQL database
```sql
CREATE DATABASE safehands_db;
CREATE USER safehands_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE safehands_db TO safehands_user;
```

#### Configure environment variables
Copy the example environment files and configure them:

```bash
# Backend environment
cp server/.env.example server/.env

# Frontend environment (if needed)
cp client/.env.example client/.env
```

Update the server `.env` file with your database credentials:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=safehands_db
DB_USER=safehands_user
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### 4. Database Migration and Seeding

```bash
# Navigate to server directory
cd server

# Run migrations
npm run db:migrate

# Seed the database with demo data
npm run db:seed
```

### 5. Start the application

#### Development mode (both frontend and backend)
```bash
# From root directory
npm run dev
```

#### Or start separately:

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `POST /api/auth/logout` - User logout

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Service Endpoints
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `GET /api/services/categories/list` - Get service categories

### Provider Endpoints
- `GET /api/providers` - Get all providers
- `GET /api/providers/:id` - Get provider by ID
- `GET /api/providers/featured/list` - Get featured providers
- `POST /api/providers` - Create provider profile
- `PUT /api/providers/:id` - Update provider profile

### Booking Endpoints
- `GET /api/bookings/my-bookings` - Get user's bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings/:id/cancel` - Cancel booking

### City Endpoints
- `GET /api/cities` - Get all cities
- `GET /api/cities/:id` - Get city by ID
- `GET /api/cities/states/list` - Get all states

### Review Endpoints
- `GET /api/reviews/provider/:providerId` - Get provider reviews
- `POST /api/reviews` - Create review

### Payment Endpoints
- `GET /api/payments/booking/:bookingId` - Get payment by booking
- `POST /api/payments` - Create payment

### Admin Endpoints
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/users` - Get all users
- `GET /api/admin/providers` - Get all providers
- `GET /api/admin/bookings` - Get all bookings

## Demo Data

The application comes with pre-seeded demo data including:

### Users
- **Admin User**: admin@safehands.com / password123
- **Regular User**: aryansakaria01@gmail.com / password123

### Featured Providers
- **Rajesh Patel** (Mumbai) - Home Care Specialist
- **Priya Sharma** (Delhi) - Medical Services
- **Anita Reddy** (Bangalore) - Child Care Specialist

### Services
- Home Care Services (Personal Care, Nursing, Companionship)
- Medical Services (Doctor Visits, Physiotherapy, Health Monitoring)
- Child Care Services (Babysitting, Child Development)
- Elderly Care Services
- Post-Surgery Care

### Cities
- Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad

## Development

### Project Structure
```
SafeHandsHealthcare/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/           # Utility functions
│   │   └── contexts/      # React contexts
│   └── public/            # Static assets
├── server/                # Node.js backend
│   ├── models/            # Sequelize models
│   ├── routes/            # API routes
│   ├── middleware/        # Express middleware
│   ├── utils/             # Utility functions
│   ├── migrations/        # Database migrations
│   ├── seeders/           # Database seeders
│   └── config/            # Configuration files
└── README.md
```

### Available Scripts

#### Root Level
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build the frontend
- `npm run start` - Start the backend in production mode
- `npm run install:all` - Install dependencies for all packages

#### Backend (server/)
- `npm run dev` - Start development server with nodemon
- `npm run start` - Start production server
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with demo data
- `npm run db:reset` - Reset database (drop, create, migrate, seed)

#### Frontend (client/)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Environment Variables

### Backend (.env)
```env
# Server
NODE_ENV=development
PORT=5000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=safehands_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Email (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# SMS (optional)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number

# CORS
CORS_ORIGIN=http://localhost:3000
```

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation with express-validator
- CORS protection
- Helmet security headers
- Rate limiting
- SQL injection protection via Sequelize
- XSS protection

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@safehands.com or create an issue in the repository.

## Acknowledgments

- React team for the amazing frontend framework
- Express.js team for the backend framework
- Sequelize team for the ORM
- Tailwind CSS for the styling framework 