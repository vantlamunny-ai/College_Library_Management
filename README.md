# College Library Management System

A full-stack web application designed to manage the operations of a college library. The system helps students and librarians manage books, book issues, returns, reservations, fines, and other library activities efficiently.

## 📌 Project Overview

The College Library Management System provides a centralized platform for managing library resources and student transactions.

The system includes role-based access for:

- Admin
- Librarian
- Student

## 🛠️ Technologies Used

### Frontend
- React.js
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MySQL
- JWT Authentication
- bcryptjs

### Database
- MySQL

## 👥 User Roles

### Admin
- Manage users
- Manage librarians
- Manage books
- Manage categories
- View reports
- Monitor library activities

### Librarian
- Add and manage books
- Manage book copies
- Issue books
- Return books
- Manage reservations
- Manage fines
- View library reports

### Student
- Login securely
- Search and view books
- Check book availability
- Reserve books
- View issued books
- View due dates
- View fines
- Submit book reviews
- Receive notifications

## 📚 Main Features

- User Registration and Login
- JWT-based Authentication
- Role-based Authorization
- Book Management
- Category Management
- Author Management
- Publisher Management
- Book Copy Management
- Book Issue Management
- Book Return Management
- Book Reservations
- Fine Management
- Notifications
- Book Reviews
- Library Reports
- Search and Book Availability

## 🗄️ Database Structure

The project uses MySQL.

Main tables:

```text
users
students
librarians
categories
authors
publishers
books
book_authors
book_copies
book_issues
book_returns
reservations
fines
notifications
reviews
