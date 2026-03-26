
# TalentAI - AI-Powered Recruitment Platform

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen.svg)](https://www.mongodb.com/cloud/atlas)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5-orange.svg)](https://openai.com/)

> **A full-stack AI-powered recruitment platform built as a college/academic project**

TalentAI is a modern, full-stack SaaS application that uses artificial intelligence to help professionals create compelling, recruiter-friendly profiles. This project was developed as an academic assignment to demonstrate full-stack development skills, AI integration, and modern web technologies.



## Project Information

- **Project Type**: Academic Assignment / Personal Project
- **Author**: Rumman Shaikh
- **Course**: Full Stack Development
- **Date**: March 2026



##  Features

###  AI-Powered Features
- **AI Summary Generator** - Creates professional summaries based on experience
- **Smart Project Descriptions** - Enhances project descriptions with achievements and metrics
- **Intelligent Skill Suggestions** - Recommends in-demand skills based on profile
- **Real-time Profile Enhancement** - AI helps optimize content as you build

###  For Candidates
- **Interactive Profile Builder** - Step-by-step guided profile creation
- **Professional Resume Export** - Download as PDF or text format
- **Public Profile Page** - Shareable URL to showcase skills
- **Analytics Dashboard** - Track profile views and resume downloads
- **AI Career Assistant** - Personalized recommendations and insights

###  For Recruiters
- **Candidate Search** - Find talent by skills, experience, and location
- **Smart Matching** - AI-powered match scores for candidates
- **Shortlist Management** - Save and organize top candidates
- **Detailed Profiles** - View complete candidate information

###  Design & UX
- **Premium Modern UI** - Clean, professional interface
- **Responsive Design** - Works on all devices
- **Smooth Animations** - Engaging micro-interactions
- **Blue, Purple & Orange** - Professional color scheme

---

##  Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first styling
- **JavaScript (ES6+)** - Modern JavaScript
- **Lucide Icons** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### AI & APIs
- **OpenAI GPT-3.5 Turbo** - AI text generation
- **Puppeteer** - PDF generation
- **Handlebars** - Resume templating

### Development Tools
- **Nodemon** - Auto-reload during development
- **Git** - Version control

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **MongoDB Atlas Account** (free tier)
- **OpenAI API Key** (get from [platform.openai.com](https://platform.openai.com))

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/rummanshaikh/talentai.git
cd talentai
2. Install Backend Dependencies
bash
cd server
npm install
3. Set Up Environment Variables
Create a .env file in the server directory:

env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
OPENAI_API_KEY=your_openai_api_key
CLIENT_URL=http://localhost:3000
NODE_ENV=development
4. Set Up MongoDB Atlas
Create a free cluster at MongoDB Atlas

Create a database user

Whitelist your IP address

Copy the connection string

Paste it in .env as MONGODB_URI

5. Get OpenAI API Key
Go to OpenAI Platform

Create an API key

Add to .env as OPENAI_API_KEY

6. Start the Backend Server
bash
npm run dev
Server runs at: http://localhost:5000

7. Start the Frontend
Open a new terminal:

bash
cd client
npx serve
Frontend runs at: http://localhost:3000

8. Open the Application
Visit http://localhost:3000 in your browser

📁 Project Structure
text
talentai/
├── client/                      # Frontend files
│   ├── index.html              # Landing page
│   ├── auth.html               # Login/Signup
│   ├── onboarding.html         # Welcome flow
│   ├── profile-builder.html    # Personal info step
│   ├── profile-skills.html     # Skills step
│   ├── profile-projects.html   # Projects step
│   ├── profile-review.html     # Review step
│   ├── confirmation.html       # Success page
│   ├── dashboard.html          # User dashboard
│   ├── public-profile.html     # Public profile view
│   ├── recruiter-dashboard.html # Recruiter portal
│   ├── recruiter-candidate.html # Candidate view
│   ├── css/
│   │   └── styles.css          # Global styles
│   └── js/
│       ├── api.js              # API service
│       ├── auth.js             # Auth service
│       ├── profile.js          # Profile management
│       ├── resume.js           # Resume generation
│       └── utils.js            # Utilities
│
├── server/                      # Backend files
│   ├── index.js                # Server entry point
│   ├── package.json            # Dependencies
│   ├── .env                    # Environment variables
│   ├── models/
│   │   ├── User.js             # User model
│   │   └── Profile.js          # Profile model
│   ├── routes/
│   │   ├── auth.js             # Auth routes
│   │   ├── profile.js          # Profile routes
│   │   ├── resume.js           # Resume routes
│   │   └── analytics.js        # Analytics routes
│   ├── middleware/
│   │   ├── auth.js             # JWT middleware
│   │   └── validation.js       # Input validation
│   ├── services/
│   │   ├── aiService.js        # AI integration
│   │   └── pdfService.js       # PDF generation
│   ├── config/
│   │   └── database.js         # DB connection
│   └── templates/
│       └── resume-template.html # PDF template
│
├── vercel.json                  # Deployment config
└── README.md                    # This file
🎯 API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/signup	Create new account
POST	/api/auth/login	Login to account
GET	/api/auth/me	Get current user
Profile
Method	Endpoint	Description
GET	/api/profile	Get user profile
PUT	/api/profile	Update profile
POST	/api/profile/generate-summary	Generate AI summary
POST	/api/profile/generate-project	Generate project description
POST	/api/profile/suggest-skills	Get AI skill suggestions
POST	/api/profile/enhance-description	Enhance text with AI
GET	/api/profile/public/:id	Get public profile
Resume
Method	Endpoint	Description
GET	/api/resume/download	Download PDF resume
POST	/api/resume/generate-text	Generate text resume
Analytics
Method	Endpoint	Description
GET	/api/analytics	Get user analytics
POST	/api/analytics/view/:id	Track profile view
POST	/api/analytics/download/:id	Track download
💡 How It Works
For Candidates:
Sign Up - Create your free account

Build Profile - Complete 4 steps:

Personal Information

Skills & Experience

Projects

Review

AI Enhancement - Click "Generate" for AI-powered summaries

Publish - Make your profile public

Share - Get your unique profile URL

Track - Monitor views and downloads

For Recruiters:
Sign Up - Create recruiter account

Browse - Search candidates by skills/experience

Match - View AI-generated match scores

Shortlist - Save promising candidates

Contact - Schedule interviews

🧪 Testing
Test Backend API
bash
# Health check
curl http://localhost:5000/health

# Test AI endpoints (requires auth token)
curl -X POST http://localhost:5000/api/profile/generate-summary \
  -H "Authorization: Bearer YOUR_TOKEN"
Test Frontend
Open http://localhost:3000

Navigate through all pages

Test signup/login flow

Create complete profile

Generate AI summaries

Download resume

🚢 Deployment
Deploy Backend to Railway
Create account at railway.app

Connect GitHub repository

Add environment variables

Deploy automatically

Deploy Frontend to Vercel
Create account at vercel.com

Import repository

Set build command: echo "Static site"

Output directory: client

Deploy

Environment Variables for Production
env
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_strong_jwt_secret
OPENAI_API_KEY=your_openai_key
CLIENT_URL=https://yourdomain.com
NODE_ENV=production
🐛 Troubleshooting
Common Issues & Solutions
Issue	Solution
MongoDB connection error	Check IP whitelist in Atlas
OpenAI API error	Verify API key and billing
CORS errors	Update CLIENT_URL in .env
Port already in use	Change PORT in .env
PDF generation fails	Install Chromium dependencies
Authentication fails	Check JWT_SECRET in .env
Development Tips
Use npm run dev for auto-reload

Check browser console for frontend errors

Check terminal for backend logs

Use MongoDB Compass to view database

🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository

Create a feature branch (git checkout -b feature/AmazingFeature)

Commit changes (git commit -m 'Add AmazingFeature')

Push to branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
OpenAI - For providing powerful AI capabilities

MongoDB - For the excellent cloud database

Tailwind CSS - For the amazing utility-first CSS framework

Lucide - For the beautiful icon set

All Contributors - Who made this project possible

📞 Contact
Author: Rumman Shaikh

GitHub: https://github.com/rummanshaikhgit-source

Email: rummanshaikhgit@gmail.com

🌟 Show Your Support
If you found this project helpful, please give it a ⭐️ on GitHub!

📊 Project Stats
Total Pages: 12 HTML pages

JavaScript Services: 5 core services

API Endpoints: 15+ endpoints

AI Features: 4 main AI functions

Database Models: 2 primary models

Lines of Code: 5000+ LOC

🎯 Roadmap
Phase 1 (MVP) ✅
User authentication

Profile builder

AI summary generation

Resume export

Public profiles

Phase 2 (Current) 🚀
Recruiter dashboard

Candidate search

Skill suggestions

Analytics tracking

Phase 3 (Future) 🔮
Job matching algorithm

Interview scheduling

Email notifications

Social media integration

Mobile app

API marketplace

🏆 Built With
Node.js - JavaScript runtime

Express - Web framework

MongoDB - Database

OpenAI - AI capabilities

Tailwind CSS - Styling

Puppeteer - PDF generation

Made with ❤️ by Rumman Shaikh

Empowering professionals through AI-powered storytelling.
