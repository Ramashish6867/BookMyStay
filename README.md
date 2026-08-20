🏨 BookMyStay

A full-stack hotel booking platform built with React, Node.js, Express.js, MongoDB, and JWT authentication.

🌐 Live Demo

Frontend: https://book-my-stay-egg0mi4ul-ram-ashish.vercel.app/

Backend API: https://bookmystay-r8s8.onrender.com

The frontend uses the deployed Render API for authentication, hotel listings, bookings, and protected operations.

🚀 Features

JWT-based user authentication

Login, registration, and logout

Hotel search by location and price

Hotel filtering by city, star rating, guest rating, and property type

Hotel sorting by rating, reviews, stars, and price

Pagination for 4,000+ imported hotel records

Detailed hotel information

Hotel facilities and room facilities

Estimated demo pricing for imported hotels

Hotel booking with date validation

Booking overlap prevention

My Bookings with update and cancellation

Host Dashboard

Host listing creation, editing, and deletion

Server-side validation and authorization

CSV-to-MongoDB hotel data import

Responsive user interface

🛠️ Tech Stack

Frontend

React.js

React Router

Axios

CSS

Vite

Backend

Node.js

Express.js

JWT

bcrypt

Mongoose

Database

MongoDB Atlas

Tools

Git

GitHub

Postman

VS Code

Vercel

Render

📁 Project Structure

BookMyStay/
├── client/
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ ├── App.jsx
│ └── App.css
│
├── server/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── scripts/
│ │ ├── hotels.csv
│ │ └── importHotels.js
│ ├── .env.example
│ └── server.js
│
├── postman/
├── .gitignore
└── README.md

🔐 Authentication

BookMyStay uses JWT authentication.

User Login
↓
JWT generated
↓
JWT stored in localStorage
↓
Axios interceptor attaches token
↓
Protected Express routes

Protected operations include:

My Bookings

Booking management

Host Dashboard

Listing creation

Listing updates

Listing deletion

🏨 Hotel Dataset

The application imports hotel information from CSV into MongoDB Atlas.

The imported dataset contains 4,000 hotel records with information such as:

Hotel name

Location and address

Star rating

Guest rating

Review count

Room count and room type

Hotel facilities

Room facilities

Nearby points of interest

Latitude and longitude

The importer is located at:

server/scripts/importHotels.js

📊 Hotel Import

From the server directory:

npm install
npm run import-hotels

The importer:

Reads hotel records from CSV

Validates hotel identifiers

Converts pipe-separated facilities into arrays

Generates clearly labelled estimated demo prices

Inserts new hotels into MongoDB Atlas

Updates existing hotels without creating duplicates

⚙️ Local Setup

1. Clone the repository

git clone https://github.com/Ramashish6867/BookMyStay.git
cd BookMyStay

2. Backend setup

cd server
npm install

Create:

server/.env

Example:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

Start the backend:

npm start

3. Frontend setup

Open another terminal:

cd client
npm install
npm run dev

🔗 API Overview

Authentication

POST /api/auth/register
POST /api/auth/login

Listings

GET /api/listings
GET /api/listings/:id
POST /api/listings
PUT /api/listings/:id
DELETE /api/listings/:id
GET /api/listings/my-listing

Bookings

POST /api/bookings
GET /api/bookings/my-bookings
GET /api/bookings/:id
PUT /api/bookings/:id
DELETE /api/bookings/:id

🔎 Filtering, Sorting & Pagination

The listings API supports:

City

Location

Price range

Minimum hotel stars

Minimum guest rating

Property type

Sorting by rating, reviews, stars, and price

Pagination

Example:

/api/listings?city=Manali&minStars=4&minRating=4&page=1&limit=20

💰 Pricing

Imported hotel records use estimated demo prices generated from hotel attributes. They are not live market rates.

Host-created listings use the price entered by the host.

🛡️ Security

The backend includes:

Password hashing with bcrypt

JWT authentication

Protected API routes

Host ownership verification

Booking ownership verification

Server-side input validation

Booking overlap prevention

Environment variable protection

🚀 Deployment

The production architecture is:

Vercel
React frontend
↓
Render
Node + Express backend
↓
MongoDB Atlas
4,000 hotel records

The production backend is available at:

https://bookmystay-r8s8.onrender.com

📌 Tested Functionality

Registration

Login and logout

Hotel search

Filters and sorting

Pagination

Hotel details

Booking and date validation

Booking conflict prevention

My Bookings

Booking update and cancellation

Host listing CRUD

Protected routes and authorization

Production API connectivity

Production booking flow

🔮 Future Improvements

Real-time hotel pricing

Hotel image integration

Online payment gateway

Maps integration

Email booking confirmation

Hotel availability calendar

Custom domain

Advanced recommendation system

👨‍💻 Author

Ramashish6867

GitHub: https://github.com/Ramashish6867
