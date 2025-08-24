# 🌱 Urvann Plant Store

A modern, full-stack plant e-commerce application built with React, Node.js, Express, and MongoDB. This application allows users to browse, search, and filter through a comprehensive catalog of plants while providing admin functionality to manage inventory.

## 🚀 Features

### 🏪 Plant Catalog
- **Grid/List View**: Browse plants in an attractive, responsive layout
- **Plant Details**: View comprehensive information including:
  - Plant name and description
  - Pricing information
  - Multiple categories per plant
  - Stock availability status
  - Plant images and additional details

### 🔍 Search & Filter
- **Smart Search**: Case-insensitive plant search by name
- **Category Search**: Find plants by category keywords (e.g., "home decor" finds Money Plant)
- **Advanced Filtering**: Filter plants by categories (Indoor, Outdoor, Succulent, Air Purifying, etc.)
- **Real-time Results**: Instant search results as you type

### 👨‍💼 Admin Features
- **Add New Plants**: Comprehensive form with validation for:
  - Plant name and description
  - Price setting
  - Multiple category assignment
  - Stock availability management
  - Image upload functionality
- **Input Validation**: Robust client and server-side validation
- **Admin Authentication**: Secure admin access controls

### 📱 Responsive Design
- **Mobile-First**: Optimized for all device sizes
- **Modern UI**: Clean, intuitive user interface
- **Reusable Components**: Modular React component architecture
- **Loading States**: Smooth loading animations and error handling

## 🛠️ Tech Stack

### Frontend
- **React 18**: Modern functional components with hooks
- **React Router**: Client-side routing
- **Axios**: HTTP client for API requests
- **CSS3**: Responsive styling with modern layouts
- **Component Architecture**: Reusable and maintainable components

### Backend
- **Node.js**: Server-side runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for plant data
- **Mongoose**: MongoDB object modeling
- **CORS**: Cross-origin resource sharing
- **Express Validator**: Input validation middleware

### Additional Tools
- **RESTful API**: Clean API architecture
- **Error Handling**: Comprehensive error management
- **Environment Configuration**: Secure config management

## 📂 Project Structure

```
URVANN-PLANT/
├── apps/
│   ├── api/                    # Backend application
│   │   ├── config/            # Database and app configuration
│   │   ├── controllers/       # Route controllers
│   │   ├── middleware/        # Custom middleware
│   │   ├── models/           # MongoDB schemas
│   │   ├── routes/           # API routes
│   │   └── utils/            # Utility functions
│   └── web/                   # Frontend application
│       ├── public/           # Static assets
│       └── src/
│           ├── components/   # Reusable React components
│           ├── pages/       # Page components
│           ├── services/    # API service functions
│           ├── styles/      # CSS styling
│           └── utils/       # Frontend utilities
├── libs/                     # Shared libraries
├── packages/                 # Package configurations
└── tools/                   # Development tools
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <https://github.com/royanish0410/urvann-plant-store-assignment>
cd urvann-plant-strore-assignment
```

2. **Install dependencies**
```bash
# Install backend dependencies
cd apps/api
npm install

# Install frontend dependencies
cd ../web
npm install
```

3. **Environment Configuration**

Create `.env` files in both `apps/api` and `apps/web`:

**Backend (`apps/api/.env`)**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/urvann-plants
NODE_ENV=development
JWT_SECRET=your-secret-key
```

**Frontend (`apps/web/.env`)**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. **Database Setup**
```bash
# Start MongoDB service (if running locally)
mongod

# The application will automatically create the database and collections
```

5. **Start the Application**

**Backend Server**
```bash
cd apps/api
npm start
# Server runs on http://localhost:5000
```

**Frontend Application**
```bash
cd apps/web
npm start
# Application runs on http://localhost:3000
```

## 📊 Database

The application includes a comprehensive database of **50+ plants** with realistic:
- Plant names and descriptions
- Pricing information
- Categories (Indoor, Outdoor, Succulent, Air Purifying, Home Decor, etc.)
- Stock availability
- Plant care information

### Sample Plant Categories
- 🏠 Indoor Plants
- 🌞 Outdoor Plants
- 🌵 Succulents
- 🌿 Air Purifying
- 🎨 Home Decor
- 💚 Low Maintenance
- 🌸 Flowering Plants

## 🔌 API Endpoints

### Plants
- `GET /api/plants` - Get all plants with pagination
- `GET /api/plants/search?q={query}` - Search plants by name or category
- `GET /api/plants/filter?category={category}` - Filter by category
- `GET /api/plants/:id` - Get single plant details
- `POST /api/plants` - Add new plant (Admin)
- `PUT /api/plants/:id` - Update plant (Admin)
- `DELETE /api/plants/:id` - Delete plant (Admin)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Add new category (Admin)

### Admin
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/dashboard` - Admin dashboard data

## 🎨 Key Features Implemented

### Frontend Excellence
- ⚡ Fast, responsive React application
- 🎯 Intuitive user experience
- 📱 Mobile-first responsive design
- 🔄 Real-time search and filtering
- ⏳ Loading states and error handling
- 🧩 Modular component architecture

### Backend Performance
- 🚀 Optimized MongoDB queries
- 📈 Scalable API architecture
- 🔒 Input validation and sanitization
- 🛡️ Error handling middleware
- 📊 Efficient data modeling

### Extra Mile Features
- 🌟 Advanced search functionality
- 🎭 Admin panel with authentication
- 📸 Image upload capabilities
- 🏷️ Dynamic category management
- 💾 Local storage for user preferences
- 🔍 Auto-complete search suggestions

## 🚀 Performance Optimizations

- **Database Indexing**: Optimized MongoDB indexes for fast queries
- **API Pagination**: Efficient data loading with pagination
- **Component Memoization**: React performance optimizations
- **Lazy Loading**: On-demand component loading
- **Caching Strategy**: Intelligent data caching

## 🧪 Testing

```bash
# Run backend tests
cd apps/api
npm test

# Run frontend tests
cd apps/web
npm test
```

## 🌐 Deployment

The application is ready for deployment on platforms like:
- **Frontend**: Vercel, Netlify, or AWS S3
- **Backend**: Heroku, AWS EC2, or DigitalOcean
- **Database**: MongoDB Atlas

### Deployment Commands
```bash
# Build frontend for production
cd apps/web
npm run build

# Start production server
cd apps/api
npm run start:prod
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👨‍💻 Author

Built with ❤️ for the Urvann Plant Store assignment.

---

### 🌟 Project Highlights

- **50+ Plant Database**: Comprehensive plant catalog with realistic data
- **Advanced Search**: Multi-criteria search and filtering
- **Admin Panel**: Full CRUD operations for plant management
- **Responsive Design**: Beautiful UI across all devices
- **Performance Optimized**: Fast loading and efficient queries
- **Production Ready**: Scalable architecture and deployment ready

*Happy Planting! 🌱*