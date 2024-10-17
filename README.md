
# Sports Booking System - Games-Theory-Assingment

**College ID**: IIT2021193

## Overview
This project is a **Sports Booking System** where users can book courts for different sports at various centers. It features a backend service that handles user registration, court availability checks, and booking creation. The main objectives of the system are to allow users to book courts for specific time slots and to prevent overlapping bookings.

## Prerequisites
Before setting up this project, ensure you have the following software installed:
- **Node.js** (v21+)
- **MongoDB** (v7.0+)
- **npm** (Node Package Manager v10.8.0)

## Setup Instructions

### 1. Clone the Repository
To get started, clone the project repository:
```shell
git clone https://github.com/anuragsingh7746/game-theory-assignment.git
cd games-theory-assignment
```

### 2. Install Dependencies
Navigate to the project folder and install the required Node.js dependencies:
```bash
cd backend
npm install
cd ../frontend
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory of the project and add the following environment variables:
```bash
MONGO_URI=mongodb://localhost:27017/sports-booking-system // add your respective database name
PORT=5000
```

### 4. Start MongoDB
Ensure MongoDB is running locally. You can start MongoDB with:
```bash
mongod
```

### 5. Start the Server
To start the backend server, use the following command:
```bash
npm run start
```


### 6. Test the API Endpoints
Use Postman or another API testing tool to test the API. The available routes are defined in the \`routes/bookingRoutes.js\` file.

### 7. Frontend Application (Optional)
If a frontend application is available, make sure it is deployed or running locally. The frontend would typically be accessible at \`http://localhost:3000\`.

## API Endpoints
Here are some key API endpoints you can use:

- **Create a Booking**: \`POST /api/bookings\`
  - Required fields: \`customerName\`, \`court\`, \`date\`, \`startTime\`, \`endTime\`, \`sportId\`, \`centerId\`.

- **Get All Bookings**: \`GET /api/bookings\`
  - Fetch all the current bookings.

- **Check Court Availability**: The booking creation endpoint automatically checks for court availability before creating a booking.

## Deployment

### Backend Deployment:
To deploy the backend, you can use services like **Heroku** or **AWS**:
1. Push your code to a GitHub repository.
2. Use the deployment platform (Heroku/AWS) to link the repository and deploy the server.
3. Ensure your MongoDB is hosted on **MongoDB Atlas** or another cloud provider.

### Frontend Deployment (if applicable):
For frontend deployment, use services like **Netlify** or **Vercel**. Once deployed, link the backend API for full functionality.

## Assumptions & Limitations
- **Assumptions**: 
  - Users will provide valid booking times (in the correct date/time format).
  - No manual interventions are expected in database bookings once they are created.
- **Limitations**: 
  - The system currently allows only bookings for one-hour time slots.
  - The conflict resolution mechanism is basic and may not handle partial overlaps that are less than 60 minutes.

## Special Instructions
Ensure that the MongoDB connection string is correctly set in the \`.env\` file, and that MongoDB is running before starting the server.

## Future Improvements
- Adding user notifications when a booking is confirmed or canceled.
- Introducing flexibility in time-slot duration for bookings.
- Implementing additional features like court usage statistics and advanced reporting.

## Links
- **Backend URL**: [Deployed Backend Link](https://game-theory-assignment-backend.onrender.com/)  -- IT DOES NOT SHOW ANYTHING IT IS ENTRY POINT TO THE FRONTEND
- **Frontend URL**: [Deployed Frontend Link](https://game-theory-assignment-frontend-9ku3.onrender.com)

## Contact
For any queries, please reach out at [iit2021193@iiita.ac.in].
