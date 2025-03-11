Employee Management System (Frontend)
This project is the frontend for the Employee Management System, built using React, Material-UI, and Redux Toolkit. It allows users to manage employees by performing CRUD (Create, Read, Update, Delete) operations.

Features
Add Employee: A modal form lets users input employee details (name, email, job title, salary, etc.) and create new employees.

Edit Employee: Users can update existing employee details via a modal.

Delete Employee: Soft deletion functionality for removing employees.

Real-Time Updates: Automatically refresh the employee list after any operation.

Input Validation: Ensures data integrity by validating input fields.

Technologies Used
React: For building the user interface.

Material-UI (MUI): For modern and responsive design.

Redux Toolkit: For state management and API integration.

Axios: For handling API requests to the backend.

Folder Structure
src/
├── components/
│ ├── EmployeeList.js # Displays employee list and handles actions
│ ├── EmployeeModal.js # Modal for adding/editing employees
├── redux/
│ ├── store.js # Redux store setup
│ ├── employeeSlice.js # Reducer and thunks for employee state
├── App.js # Main app component
├── index.js # Entry point for React application
API Endpoints
The following backend API endpoints are consumed by this frontend:

Endpoint Method Description
/api/employees GET Fetch all employees
/api/employees POST Add a new employee
/api/employees/:id PUT Update employee details
/api/employees/:id DELETE Soft delete an employee
Getting Started
Prerequisites
Node.js installed

npm or yarn for package management

Installation
Clone the Repository:

bash
git clone https://github.com/Navaneeth-Developer/employee_management_system_client.git
cd employee-frontend
Install Dependencies:

bash
npm install --legacy-peer-deps
Set Up Environment Variables:

Create a .env file in the project root with the following content:

REACT_APP_API_URL=http://localhost:5000/api/employees
This sets the base URL for your backend API.

Run the Development Server:

bash
npm start
Access the Application:

Open your browser and navigate to http://localhost:5173/
