# NITP WebDC - Student Portfolio & Project Management Platform

A comprehensive full-stack web application designed for students to showcase their portfolios, manage projects, and connect with peers. Built with modern web technologies and featuring a responsive design.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure signup/login with email verification via OTP
- **Portfolio Management**: Complete student profile with skills, experiences, and achievements
- **Project Showcase**: Upload and display projects with images, descriptions, and live demos
- **Social Features**: Like and comment on projects, view other students' portfolios
- **Responsive Design**: Mobile-first approach with beautiful UI/UX

### Key Highlights
- Real-time image compression and upload
- Interactive particle background effects
- Toast notifications for better user experience
- Professional dashboard interface
- Secure file upload with Multer and GridFS
- Email notifications via Nodemailer

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.9
- **Styling**: Tailwind CSS 3.4.14
- **Routing**: React Router DOM 6.27.0
- **UI Components**: MDB React UI Kit 9.0.0
- **Icons**: React Icons 5.3.0, FontAwesome 6.6.0
- **Notifications**: React Toastify 10.0.6
- **Animations**: TSParticles 3.5.0
- **Image Processing**: Browser Image Compression 2.0.2

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 4.21.1
- **Database**: MongoDB with Mongoose 8.7.3
- **Authentication**: bcrypt 5.1.1
- **File Upload**: Multer 1.4.5 with GridFS
- **Email Service**: Nodemailer 6.9.16
- **Security**: CORS 2.8.5
- **File System**: GridFS Stream 1.1.1

### Development Tools
- **Linting**: ESLint 9.13.0
- **Type Checking**: TypeScript support
- **Code Quality**: React ESLint plugins
- **Hot Reload**: Vite HMR

## 📁 Project Structure

```
NITP_WebDC/
├── Backend/                 # Express.js server
│   ├── models/             # MongoDB schemas
│   │   ├── User.js         # User model
│   │   ├── Project.js      # Project model
│   │   └── counter.js      # Auto-increment IDs
│   ├── uploads/            # Static file storage
│   ├── Server.js           # Main server file
│   └── package.json        # Backend dependencies
├── nitp/                   # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── Context/        # Context providers
│   │   ├── assets/         # Static assets
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── public/             # Public assets
│   ├── package.json        # Frontend dependencies
│   ├── tailwind.config.js  # Tailwind configuration
│   └── vite.config.js      # Vite configuration
└── test/                   # Test files
```

## 🔗 API Endpoints

### Authentication
- `POST /signup` - User registration
- `POST /login` - User login
- `POST /request-otp` - Request OTP for verification
- `POST /verify-otp` - Verify OTP

### User Management
- `POST /addskill` - Add user skills
- `GET /getskill` - Retrieve user skills
- `POST /addexperience` - Add work experience
- `GET /experiences` - Get user experiences
- `POST /addachievement` - Add achievements
- `GET /achievements` - Get user achievements
- `GET /getdata` - Get user profile data
- `GET /viewdashboard` - View complete dashboard

### Project Management
- `POST /addproject` - Upload new project (with images)
- `GET /myproject` - Get user's projects
- `GET /allproject` - Get all projects (public feed)
- `POST /addlike` - Like/unlike a project
- `POST /addcomment` - Comment on a project

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Nitp_webdc
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd nitp
   npm install
   ```

4. **Environment Configuration**
   
   Create environment variables for:
   - MongoDB connection string
   - Email service credentials
   - JWT secrets (if implemented)

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd Backend
   npm start
   ```
   Server runs on: `http://localhost:3000` (or configured port)

2. **Start the Frontend Development Server**
   ```bash
   cd nitp
   npm run dev
   ```
   Frontend runs on: `http://localhost:5173`

3. **Build for Production**
   ```bash
   cd nitp
   npm run build
   ```

## 📱 Key Components

### Frontend Components
- **Authentication**: `Login.jsx`, `Signup.jsx`, `OtpVerification.jsx`
- **Dashboard**: `Dashboard.jsx`, `ViewDashboard.jsx`
- **Projects**: `Projects.jsx`, `ProjectForm.jsx`, `ProjectReel.jsx`
- **Profile**: `AddSkill.jsx`, `ExperienceForm.jsx`, `Achievement.jsx`
- **Navigation**: `Navbar.jsx`, `Footer.jsx`
- **UI Elements**: `Particle.jsx` (background effects)

### Context Providers
- **SkillsContext**: Manages user skills state
- **ExperienceContext**: Handles experience data
- **AchievementContext**: Manages achievements

### Database Models
- **User Model**: Complete user profile with nested schemas
- **Project Model**: Project details with social features
- **Counter Model**: Auto-incrementing IDs for entities

## 🔧 Configuration Files

### Frontend Configuration
- **Vite Config**: Modern build tool configuration
- **Tailwind Config**: Utility-first CSS framework setup
- **ESLint Config**: Code quality and consistency rules

### Backend Configuration
- **Express Middleware**: CORS, body parsing, file uploads
- **Mongoose Connection**: MongoDB database connection
- **Multer Storage**: File upload handling with GridFS

## 🌟 Features in Detail

### User Authentication & Security
- Bcrypt password hashing
- Email-based OTP verification
- Secure session management
- Input validation and sanitization

### File Upload System
- Image compression before upload
- GridFS for large file storage
- Multiple file upload support
- Static file serving

### Social Features
- Project likes and comments system
- Public project feed
- User portfolio viewing
- Interactive engagement

### Responsive Design
- Mobile-first approach
- Tailwind CSS utilities
- Material Design components
- Smooth animations and transitions

## 🚀 Deployment

### Frontend Deployment
- Build optimized bundle with Vite
- Deploy to Vercel, Netlify, or similar platforms
- Configure environment variables

### Backend Deployment
- Deploy to Heroku, AWS, or similar platforms
- Set up MongoDB Atlas for database
- Configure email service credentials
- Set up file storage (AWS S3 or similar)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Developed by me


## 🆘 Support

For support, email hellocollege143@gmail.com or create an issue in the repository.

---

**Note**: This project is designed for educational purposes and student portfolio management. Please ensure proper security measures are implemented before production deployment.
