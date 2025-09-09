<div align="center">

# 🔐 Simple Auth Login/Register Form - Complete Authentication System

[![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=20&duration=3000&pause=1000&color=2196F3&center=true&vCenter=true&width=600&lines=Complete+MERN+Authentication;Email+Verification;Password+Reset;Secure+Cookie+Auth)](https://git.io/typing-svg)

**Full-Stack Authentication System** | **MERN Stack** | **Email Verification** | **OTP Security** 🚀

</div>

---

## ✨ Features

**🔐 Complete Authentication Flow**
- User registration with email verification
- Secure login with JWT cookies
- Password reset via email OTP
- Account verification system
- Persistent authentication sessions

**📧 Email Integration**
- Welcome email on registration
- OTP-based email verification
- Password reset via email
- SMTP integration with Brevo

**🛡️ Security Features**
- Password hashing with bcrypt
- JWT token authentication
- HTTP-only secure cookies
- OTP expiration handling
- Protected routes middleware

**🎨 Modern UI/UX**
- Responsive design
- Clean authentication forms
- Loading states and feedback
- Error handling and validation
- Mobile-friendly interface

---

<div align="center">

## 🛠️ Tech Stack

<p>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>

<p>
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
<img src="https://img.shields.io/badge/Nodemailer-339933?style=for-the-badge&logo=nodemailer&logoColor=white" />
<img src="https://img.shields.io/badge/bcrypt-338?style=for-the-badge&logo=letsencrypt&logoColor=white" />
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" />
</p>

<p>
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
<img src="https://img.shields.io/badge/Brevo-0B7EC8?style=for-the-badge&logo=sendinblue&logoColor=white" />
</p>

</div>

---

## 📁 Project Structure

```
authflow/
├── frontend/
│   ├── src/
│   │   ├── Component/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── VerifyAccount.js
│   │   │   ├── ForgotPassword.js
│   │   │   ├── ResetPassword.js
│   │   │   ├── Header.js
│   │   │   └── Footer.js
│   │   ├── App.js
│   │   └── App.css
│   └── public/
└── backend/
    ├── config/
    │   ├── mongodb.js
    │   └── nodemailer.js
    ├── controllers/
    │   ├── authController.js
    │   └── userController.js
    ├── middleware/
    │   └── userAuth.js
    ├── models/
    │   └── userModel.js
    ├── routes/
    │   ├── authRoutes.js
    │   └── userRoutes.js
    └── server.js
```

---

## 🚀 Installation & Setup

### Prerequisites
```bash
Node.js (v14 or higher)
MongoDB (local or MongoDB Atlas)
SMTP Email Service (Brevo/SendinBlue)
npm or yarn package manager
```

### Backend Setup

**1. Clone and setup backend**
```bash
git clone <repository-url>
cd authflow/backend
npm install
```

**2. Required Dependencies**
```bash
npm install express mongoose bcryptjs jsonwebtoken cookie-parser cors dotenv nodemailer
```

**3. Environment Configuration**
Create `.env` file in backend root:
```env
# Database
MONGODB_URI=mongodb://localhost:27017

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Server Port
PORT=4000
NODE_ENV=development

# Email Configuration (Brevo/SendinBlue)
SMTP_USER=your_smtp_login
SMTP_PASS=your_smtp_password
SENDER_EMAIL=your_sender_email@domain.com
```

**4. Start backend server**
```bash
npm start
```
Server runs on `http://localhost:4000`

### Frontend Setup

**1. Navigate and setup frontend**
```bash
cd ../frontend
npm install
```

**2. Required Dependencies**
```bash
npm install react react-dom react-router-dom axios
```

**3. Start development server**
```bash
npm start
```
Application opens on `http://localhost:3000`

---

## 🔌 API Endpoints

### Authentication Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register new user | ❌ |
| `POST` | `/api/auth/login` | Login user | ❌ |
| `POST` | `/api/auth/logout` | Logout user | ❌ |
| `POST` | `/api/auth/is-auth` | Check auth status | ✅ |

### Email Verification
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/send-verify-otp` | Send verification OTP | ✅ |
| `POST` | `/api/auth/verify-account` | Verify account with OTP | ✅ |

### Password Reset
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/send-reset-otp` | Send password reset OTP | ❌ |
| `POST` | `/api/auth/reset-password` | Reset password with OTP | ❌ |

### User Data
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/user/data` | Get user profile data | ✅ |

---

## 📊 Data Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  
  // Email Verification
  verifyOtp: String (default: ''),
  verifyOtpExpireAt: Number (default: 0),
  isAccountVerified: Boolean (default: false),
  
  // Password Reset
  resetOtp: String (default: ''),
  resetOtpExpireAt: Number (default: 0),
  
  timestamps: true
}
```

---

<div align="center">

## 🔒 Security Implementation

<table>
<tr>
<td align="center">🔐</td>
<td><strong>Password Security</strong><br/>bcrypt hashing with salt rounds</td>
</tr>
<tr>
<td align="center">🍪</td>
<td><strong>Secure Cookies</strong><br/>HTTP-only, secure, SameSite cookies</td>
</tr>
<tr>
<td align="center">🎫</td>
<td><strong>JWT Tokens</strong><br/>7-day expiration with secure signing</td>
</tr>
<tr>
<td align="center">📧</td>
<td><strong>Email Verification</strong><br/>OTP-based account verification</td>
</tr>
<tr>
<td align="center">⏰</td>
<td><strong>OTP Expiration</strong><br/>Time-limited OTP validation</td>
</tr>
<tr>
<td align="center">🛡️</td>
<td><strong>Route Protection</strong><br/>Middleware-based authentication</td>
</tr>
</table>

</div>

---

## 🔄 Authentication Flow

**📝 Registration Process**
1. User submits registration form
2. System sends welcome email
3. JWT cookie set for session
4. Redirect to email verification
5. OTP sent to user's email
6. Account verified with OTP

**🔑 Login Process**
1. User enters credentials
2. Password validation with bcrypt
3. JWT token generated
4. Secure cookie set
5. Redirect to dashboard

**🔒 Password Reset Flow**
1. User requests password reset
2. OTP sent to registered email
3. User enters OTP and new password
4. Password updated and hashed
5. Redirect to login

---

## 📱 Frontend Pages

**🏠 Main Pages**
- **Login** - User authentication
- **Register** - New user registration
- **Dashboard** - Protected user area
- **Verify Account** - Email verification with OTP
- **Forgot Password** - Password reset request
- **Reset Password** - New password creation

**🧩 Components**
- **Header** - Navigation with auth status
- **Footer** - Site information
- **Protected Routes** - Authentication guards

---

## 🎯 Key Features

**⚡ Real-time Validation**
- Form validation and error handling
- Loading states for better UX
- Success/error message feedback

**📧 Email Integration**
- Welcome emails on registration
- OTP delivery for verification
- Password reset notifications
- SMTP configuration with Brevo

**🔐 Security Best Practices**
- Environment variable protection
- Secure cookie implementation
- Password strength requirements
- OTP expiration handling

---

## 🌐 Email Service Setup

**Brevo (SendinBlue) Configuration:**
1. Create account at [Brevo](https://www.brevo.com/)
2. Go to SMTP & API settings
3. Generate SMTP credentials
4. Add credentials to `.env` file

**Alternative SMTP Services:**
- Gmail SMTP
- Outlook SMTP
- Amazon SES
- Mailgun

---

## 🔧 Environment Variables

```env
# Database Connection
MONGODB_URI=mongodb://localhost:27017

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_minimum_32_characters

# Server Configuration
PORT=4000
NODE_ENV=development

# Email Service (Brevo)
SMTP_USER=your_brevo_login_email
SMTP_PASS=your_brevo_smtp_key
SENDER_EMAIL=noreply@yourdomain.com
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create Pull Request

---

<div align="center">

## 🔍 Testing the Application

**Registration Flow:**
1. Visit `/register`
2. Fill out the form
3. Check email for welcome message
4. Navigate to `/verify-account`
5. Enter OTP from email
6. Access dashboard

**Password Reset:**
1. Visit `/forgot-password`
2. Enter registered email
3. Check email for OTP
4. Visit `/reset-password`
5. Enter OTP and new password
6. Login with new credentials

---

## ⚠️ Important Notes

- **Security**: Keep JWT secret secure (minimum 32 characters)
- **Email**: Configure SMTP service before testing
- **Database**: Ensure MongoDB is running
- **Environment**: Never commit `.env` file to version control
- **Cookies**: Configure secure settings for production

---

**⭐ If you find this authentication system helpful, please give it a star! ⭐**

</div>
