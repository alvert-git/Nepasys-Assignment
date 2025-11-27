# NepaSys E-Commerce Catalog

This is a modern, responsive e-commerce product catalog built with React, utilizing the dummyjson.com API for product data. It features infinite scrolling, advanced filtering, and a cart system managed by Redux.

## Live Demo

Experience the application live here:
[https://nepasys.vercel.app/](https://nepasys.vercel.app/)

## Features

*   **Product Filtering:** Search bar to filter products by name.
*   **Category Selection:** Dropdown filter to browse products by category.
*   **Infinite Scrolling:** Efficiently loads more products as the user scrolls down using the Intersection Observer API.
*   **Sorting:** Sort products by price (ascending/descending).
*   **State Management:** Shopping cart functionality implemented using **Redux Toolkit**.
*   **Routing:** Seamless navigation between pages using **React Router DOM**.
*   **Styling:** Clean, modern, and fully responsive design powered by **Tailwind CSS**.
*   **API Integration:** Fetches real-time product data from the [dummyjson.com](https://dummyjson.com/) API.
*   **Loading Experience:** Custom, smooth loading animations for a better user experience.

## Technologies Used

*   **Frontend:** React
*   **Styling:** Tailwind CSS
*   **State Management:** Redux Toolkit
*   **Routing:** React Router DOM
*   **API:** Axios for fetching data from [dummyjson.com](https://dummyjson.com/)

## Installation and Setup

Follow these steps to get the development environment running on your local machine.

### Prerequisites

You need to have **Node.js** and **npm** (or **yarn**) installed on your system.

### 1. Clone the repository

```bash
git clone https://github.com/alvert-git/Nepasys-Assignment/
cd <your-project-folder>
```

### 2. Install dependencies

Use your preferred package manager to install the necessary packages:

```bash
# Using npm
npm install

```

### 3. Environment Variables

This project uses environment variables to store the API base URL.

Create a file named `.env` in the root directory of your project and add the following variable:

```
# .env file
VITE_API_URL="https://dummyjson.com"
```

### 4. Run the application

Start the development server:

```bash
# Using npm
npm run dev

```

The application should now be running locally. Open your browser and navigate to the address shown in the console (usually `http://localhost:5173`).

## Project Structure

A typical structure for a React project of this nature might look like this:

```
├── .git/
├── node_modules/
├── public/
├── src/
│   ├── assets/       # Images, fonts, and other static media
│   ├── components/   # Reusable UI components (e.g., Filter, ProductCard)
│   ├── pages/        # Route-specific components (e.g., ProductCatalog, CartView)
│   ├── redux/        # Redux store setup and slices (e.g., cartSlice)
│   ├── App.css       # Global application styles
│   ├── App.jsx       # Main application component, often containing routing
│   ├── index.css     # Tailwind imports and base styles
│   └── main.jsx      # Entry point (renders App and wraps with Redux Provider)
├── .env              # Environment variables
├── .gitignore        # Files and folders to ignore in Git
├── eslint.config.js
├── index.html        # Main HTML file
├── package-lock.json
├── package.json      # Project dependencies and scripts
├── README.md
├── vercel.json       # Configuration for Vercel deployment
└── vite.config.js    # Vite build configuration
```
# Screenshots

### Home Page
<img width="2690" height="3690" alt="image" src="https://github.com/user-attachments/assets/69f5ab01-9251-4120-bd85-20164280c15a" />

### Products Page with Infinite Scrolling
<img width="1341" height="606" alt="image" src="https://github.com/user-attachments/assets/7cf00db2-5de2-41da-a2c1-a5521139aa89" />

### Product Details
<img width="1199" height="587" alt="image" src="https://github.com/user-attachments/assets/d37e974c-5d4e-4902-83ea-e02750c22a94" />

### Cart
<img width="384" height="607" alt="image" src="https://github.com/user-attachments/assets/9954835f-52f5-4006-b30c-f696d7a10c1d" />






