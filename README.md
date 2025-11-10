# CodefolioHub

Create your own professional portfolio website based on your resume.

## Features

- **Multiple Professional Themes**: Choose from 5 carefully designed themes (Classic, Modern, Developer, Creative, Executive)
- **Custom Portfolio URLs**: Create memorable URLs with custom slugs (e.g., yoursite.com/john-developer)
- **LinkedIn OAuth Integration**: Sign in with your LinkedIn account
- **AI-Powered Chatbot**: Interactive chatbot to answer questions about your portfolio
- **Contact Form**: Let visitors reach out to you directly
- **Mobile Responsive**: Fully optimized for mobile, tablet, and desktop devices
- **Form Validation**: Comprehensive validation for all input fields

## Tech Stack

**Frontend:**
- React 18
- React Router
- Material-UI
- React Bootstrap
- Axios

**Backend:**
- Flask 2.3.3
- Flask-CORS
- Flask-OAuthlib
- OpenAI GPT-3.5-turbo

**Database:**
- JSON file-based storage

## Setup Instructions

### Prerequisites
- Node.js and npm
- Python 3.x
- LinkedIn Developer Account (for OAuth)
- OpenAI API Key (for chatbot)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Configure environment variables in `.env`:
```
linkedin_client_id=YOUR_LINKEDIN_CLIENT_ID
linkedin_client_secret=YOUR_LINKEDIN_CLIENT_SECRET
FRONTEND_URL=http://localhost:3000
openai_api=YOUR_OPENAI_API_KEY
OPENAI_TEMPERATURE=1
```

4. Start the Flask server:
```bash
python app.py
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install npm dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Development Authentication Bypass

For development and testing without configuring LinkedIn OAuth, use the development login endpoint:

**Usage:**
1. Start the backend server
2. Visit: `http://localhost:5000/dev-login`
3. You'll be automatically logged in with a test user account:
   - Name: Dev User
   - Email: dev@codefoliohub.com
4. You'll be redirected to the dashboard

**Note:** This is for development only and should be disabled in production.

## LinkedIn OAuth Setup

1. Create a LinkedIn App at [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Set the redirect URI to: `http://localhost:5000/linkedin/login/authorized`
3. Request the following OAuth scopes:
   - `openid`
   - `profile`
   - `email`
4. Copy your Client ID and Client Secret to the `.env` file

## Usage

1. **Login**: Use LinkedIn OAuth or development login
2. **Edit Resume**: Fill in your professional details
3. **Choose Theme**: Select from 5 professional themes
4. **Publish URL**: Create a custom slug for your portfolio
5. **Share**: Copy your portfolio URL and share it!

## Project Structure

```
CodefolioHub/
├── backend/
│   ├── app.py              # Main Flask application
│   ├── data_handler.py     # Database operations
│   ├── data_json.py        # Database schema
│   ├── chatbot.py          # OpenAI chatbot integration
│   └── database.json       # JSON database
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MainDashboard/  # Dashboard components
│   │   │   ├── portfolios/     # Portfolio view components
│   │   │   └── chatbot/        # Chatbot component
│   │   └── APIServices/        # API service layer
│   └── public/
└── README.md
```

## Recent Enhancements (Phase 1)

✅ Fixed "Publish URL" functionality with custom slug support
✅ Fixed UserProfile bug showing incorrect URL
✅ Added 5 professional portfolio themes
✅ Implemented functional contact form with validation
✅ Added comprehensive mobile responsiveness
✅ Added form validation across all input fields
✅ Added development authentication bypass

## Known Issues

- LinkedIn OAuth credentials need to be properly configured
- Security vulnerabilities in dependencies (see GitHub Dependabot alerts)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
