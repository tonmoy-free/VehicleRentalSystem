Vehicle Rental System
project name : Vehicle Rental System 

live URL : 

Overview : A complete backend API for managing vehicle rentals, built with Node.js, TypeScript, Express.js, and PostgreSQL — featuring authentication, role-based access, bookings, and vehicle management.

Technology Stack:
Node.js + TypeScript
Express.js (web framework)
PostgreSQL (database)
bcrypt (password hashing)
jsonwebtoken (JWT authentication)

key features : 
1.User Authentication & Role-Based Access
  a.Secure JWT login system
  b.Admin & Customer role separation
  c.Password hashing with bcrypt

2.Vehicle Management System
  a.Add, update, delete vehicles
  b.Availability status tracking
  c.Filter & view all vehicles

3.Smart Booking System (Auto Price Calculation)
 a.Booking date validation
 b.Total price = daily rent × duration
 c.Auto-update vehicle status (available/booked)


npm packages : 
1.jsonwebtoken.
2.postgres
3.bcryptjs
4.typescript
5.neondb

Setup & Usage Instructions:
 1.Clone & Install Dependencies
   a.git clone https://your-repo-url.git
   b.cd project-folder
   c.npm install

2.Configure Environment Variables:
   a.Create a .env file and add:
   b.DATABASE_URL=your_postgresql_connection_string
   c.JWT_SECRET=your_secret_key
   d.PORT=5000

Make sure PostgreSQL is running and tables are created.
Run the Project
npm run dev

Server starts on:
http://localhost:5000