# HR Panel (MERN Stack Project)

This project is a Human Resources (HR) panel created with the MERN (MongoDB, Express, React, Node.js) stack. The HR panel allows an admin to log in and perform CRUD (Create, Read, Update, Delete) operations on employee data, including managing employee names, images, and designations.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Features

- **Admin Authentication**: Secure login system for admins.
- **Dashboard**: Overview of employee records.
- **Employee Management**:
  - Add new employees.
  - View a list of employees with details.
  - Update employee information.
  - Delete employee records.
- **Image Uploads**: Employee images are uploaded to Cloudinary.
- **Access Control**: Only logged-in admins can perform CRUD operations.

## Technologies Used

- **Frontend**:
  - React.js
- **Backend**:
  - Node.js
  - Express.js
- **Database**:
  - MongoDB (with separate collections for admins and employees)
- **Other**:
  - Cloudinary (for image storage)

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd HR-Panel
   ```
2. Install dependencies:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```
3.Start the server and client:
  - In one terminal, start the server:
  ```bash
  node server.js
  ```
  - In another terminal, start the client:
  ```bash
  npm start
  ```
4. Access the app at http://localhost:3000 in your browser.

## Usage
1. **Admin Login:** Use the login credentials provided to access the admin dashboard.
2. **Dashboard:** After login, view a list of all employees.
3. **Manage Employees:** Use the options to add, update, or delete employee records.
4. **Logout:** End your admin session by logging out.

## Future Enhancements
- **Admin Role Management:** Assign different roles to admins.
- **Enhanced Analytics:** Add charts for employee data insights.
- **Notifications:** Send notifications to admins for certain actions.
- **Pagination:** Improve performance on the employee list with pagination.

## License
This project is licensed under the MIT License.


