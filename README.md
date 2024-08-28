# E-Commerce App

This is a full-stack e-commerce application developed following the tutorial by Dynamic Coding (Amit) on YouTube. The application showcases a robust e-commerce platform where users can browse products, add them to their cart, and proceed to checkout.

# Key Features

* **User Authentication:** Secure user registration, login, and session management.
* **Product Management:** View, filter, and search for products with various categories.
* **Shopping Cart:** Add, remove, and update items in the shopping cart.
* **Checkout Process:** Manage the checkout process with payment integration (e.g., Stripe).
* **Order Management:** View order history and manage order details.
* **Responsive Design:** Fully responsive design for a seamless experience across devices.
  
# Technologies Used

* **Frontend:** React.js for dynamic and responsive user interfaces.
* **Backend:** Node.js and Express.js for handling API requests and server-side logic.
* **Database:** MongoDB for storing user data, product details, and order information.
* **Authentication:** JSON Web Tokens (JWT) for user authentication and authorization.
* **Payment Integration:** Stripe (or similar) for secure payment processing.
* **State Management:** Redux for managing global state in the application.
  
# Installation

**1. Clone the Repository:**
* git clone https://github.com/yourusername/e-commerce-app.git
* cd e-commerce-app

**2. Install Dependencies:**  

For the backend:  
* cd backend  
* npm install  

For the frontend:  
* cd frontend   
* npm install  

**3. Environment Variables:**

Create a .env file in both the backend and frontend directories with the required environment variables:   
backend .env: 
* FRONTEND_URL=your_frontend_url  
* MONGODB_URI=your_mongodb_uri  

frontend .env:  
* REACT_APP_ADMIN_EMAIL=your_admin_email  
* REACT_APP_BACKEND_URL=your_backend_url

**4. Start the Development Servers:**

For the backend:  
cd server  
npm run dev  

For the frontend:  
cd client  
npm start  

# Usage
* Open your browser and go to http://localhost:3000 to access the application.
* Register or log in to start using the app.
* Browse products, add them to your cart, and complete the purchase.

# Screenshots

![Screenshot 2024-08-28 230219](https://github.com/user-attachments/assets/0bbe8a2d-c4f5-4e4c-b297-27282a618df6)
![Screenshot 2024-08-28 230305](https://github.com/user-attachments/assets/5c7c7d43-97d0-4803-b860-4888eadb8fbb)
![Screenshot 2024-08-28 230413](https://github.com/user-attachments/assets/d22dc6da-0efe-4608-a843-460cbf94db62)



