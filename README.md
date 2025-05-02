# Pay&Pray - Online Marketplace

An online marketplace platform for buying and selling used items. Users can list products, browse listings, apply filters, and contact sellers.

**Live Demo**: [https://pay-and-pray.vercel.app/home/](https://pay-and-pray.vercel.app/home/)

## 🚀 Features

- **User Authentication**: Register, login, and logout functionality
- **Product Management**: Create, view, update, and delete product listings
- **Search & Filters**: Search products by name and filter by category and price range
- **Responsive Design**: Mobile-friendly interface with dark/light theme toggle
- **AI-Powered Description**: AI-assisted product description rewriting

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js**
- **Supabase** for database
- **JWT** for authentication
- **EJS** for server-side rendering
- **Google GenAI** for AI-powered features

### Frontend
- **HTML/CSS/JavaScript**
- Responsive design with custom CSS
- Font Awesome icons

## 📋 Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- Supabase account for database

## 🔧 Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Abbas49/Web-Project.git
   cd Web-Project
   ```

2. Install dependencies
   ```bash
   cd backend
   npm install
   ```

3. Create a `.env` file in the backend folder with the following variables:
   ```
   PORT=3000
   JWT_SECRET=your_jwt_secret
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   GEMINI_KEY=your_google_api_key (if using AI features)
   ```

4. Set up the database
   - Run the SQL scripts from `docs/database/createTables.sql` in your Supabase SQL editor

5. Start the development server
   ```bash
   npm run dev
   ```

## 🗂️ Project Structure

```
/backend
  /config          - Database configuration
  /controllers     - Request handlers
  /middlewares     - Authentication and error handling
  /public          - Static assets and frontend files
    /css           - Stylesheets
    /home          - Homepage
    /product       - Product pages
    /login         - Login page
    /register      - Registration page
    /sell-item     - Product creation page
  /routes          - API routes
  /utils           - Utility functions
  /views           - EJS templates
/docs
  /database        - SQL scripts
```

## 🔒 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login a user
- `POST /api/v1/auth/logout` - Logout a user
- `GET /api/v1/username` - Get current user's username (requires auth)

### Products
- `GET /api/v1/products` - Get all products
- `GET /api/v1/products/:id` - Get a single product
- `POST /api/v1/products` - Create a new product (requires auth)
- `PUT /api/v1/products/:id` - Update a product (requires auth)
- `DELETE /api/v1/products/:id` - Delete a product (requires auth)

### Categories
- `GET /api/v1/categories` - Get all categories

### AI Features
- `POST /api/v1/ai/rewrite` - Rewrite product description using AI

## 📱 Pages

- `/home` - Homepage with product listings and search/filter options
- `/login` - User login
- `/register` - User registration
- `/sell-item` - Create a new product listing
- `/products/:id` - View a single product

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

