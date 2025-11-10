from functools import wraps
import os
import ssl
import dotenv
from flask import Flask, request, redirect, jsonify, url_for, session
from flask_cors import CORS
from flask_oauthlib.client import OAuth
import data_handler
import data_json
import chatbot

# Load environment variables from a .env file
dotenv.load_dotenv()

# Create a Flask app
app = Flask(__name__)

# Set a secret key for session management
app.secret_key = os.urandom(24)

# The frontend origin allowed for CORS and redirects
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
CORS(app, origins=[frontend_url])

# Configure SSL settings (for development)
ssl._create_default_https_context = ssl._create_unverified_context

# OAuth Configuration
linkedin_clientID = os.getenv("linkedin_client_id")
linkedin_clientSecret = os.getenv("linkedin_client_secret")

oauth = OAuth(app)

linkedin = oauth.remote_app(
    'linkedin',
    consumer_key=linkedin_clientID,
    consumer_secret=linkedin_clientSecret,
    request_token_params={
        'scope': 'openid profile email',  # LinkedIn's permissions you need
    },
    base_url='https://api.linkedin.com/v2/',
    request_token_url=None,
    access_token_method='POST',
    access_token_url='https://www.linkedin.com/oauth/v2/accessToken',
    authorize_url='https://www.linkedin.com/oauth/v2/authorization',
)


@linkedin.tokengetter
def get_linkedin_oauth_token():
    return session.get('linkedin_token')


# Helper functions

def is_authenticated():
    return 'linkedin_token' in session or 'dev_user' in session


def login_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if not is_authenticated():
            return jsonify({"message": "Authentication required"}), 401
        return func(*args, **kwargs)

    return wrapper


user_info = dict()


# Routes

@app.route('/linkedin_login')
def login():
    return linkedin.authorize(callback=url_for('authorized', _external=True))


@app.route('/logout')
def logout():
    global user_info
    session.pop('linkedin_token', None)
    session.pop('dev_user', None)
    user_info = dict()
    session.clear()
    return redirect(frontend_url)


@app.route('/dev-login')
def dev_login():
    """Development-only login bypass - creates a mock user session"""
    global user_info

    # Create a mock user (similar to LinkedIn OAuth response)
    mock_user = {
        "sub": "dev_user_123",
        "email_verified": True,
        "name": "Dev User",
        "locale": {
            "country": "US",
            "language": "en"
        },
        "given_name": "Dev",
        "family_name": "User",
        "email": "dev@codefoliohub.com",
        "picture": "https://via.placeholder.com/100"
    }

    # Set session
    session['dev_user'] = True
    user_info = mock_user

    # Add user to database
    data_handler.add_users(mock_user)

    # Redirect to dashboard
    return redirect(frontend_url + '/dashboard/navbar/')


@app.route('/linkedin/login/authorized')
def authorized():
    global user_info
    response = linkedin.authorized_response()
    if response is None or response.get('access_token') is None:
        error_reason = request.args.get('error', 'Unknown error')
        error_description = request.args.get('error_description', 'No description')
        return f'Access denied: reason={error_reason} error={error_description}'
    session['linkedin_token'] = response['access_token']
    user_info = linkedin.get('userinfo').data
    # session['user_info'] = user_info
    data_handler.add_users(user_info)
    return redirect(frontend_url + '/dashboard/navbar/')


@app.route('/user/login/details')
def user_details():
    global user_info
    # user_info = session.get('user_info')
    if user_info:
        return jsonify(user_info)
    else:
        return redirect('/linkedin_login')


@app.route('/error')
def error_details():
    return jsonify({"error": "request again with ID in the path."})


@app.route('/get/<key>/', methods=['GET'])
def get_articles_by_id(key):
    # First try to get by email key
    if data_handler.is_key_valid(key):
        return jsonify(data_handler.read_json_with_id(key))

    # If not found, try to get by custom slug
    resume_by_slug = data_handler.get_resume_by_slug(key)
    if resume_by_slug:
        return jsonify(resume_by_slug)

    # If still not found, return empty template
    return jsonify(data_json.resume_format)


@app.route('/add', methods=['POST'])
def add_articles():
    body = request.json['resume_frontend']
    # print(body)
    return jsonify(data_handler.write_new_record_to_json(body=body))


@app.route('/update/<key>/', methods=['PUT'])
def update_articles(key):
    body = request.json['resume_frontend']
    return jsonify(data_handler.update_new_record_to_json(key=key, body=body))


@app.route('/delete/<key>/', methods=['DELETE'])
def delete_articles(key):
    return jsonify(data_handler.delete_record_from_json(key))


@app.route('/chat/<key>/', methods=['POST'])
def chat_by_id(key):
    if not request.is_json or 'user' not in request.json:
        return jsonify({"error": "Missing user in request body"}), 400
    body = request.json['user']
    return jsonify(chatbot.recursive(a=body, key=key))


@app.route('/check-slug/<slug>', methods=['GET'])
def check_slug_availability(slug):
    """Check if a custom slug is available"""
    # Check if slug exists in resume data (as a key or as a customSlug field)
    is_available = data_handler.is_slug_available(slug)
    return jsonify({"available": is_available, "slug": slug})


@app.route('/update-slug', methods=['POST'])
def update_slug():
    """Update user's custom slug"""
    if not request.is_json:
        return jsonify({"success": False, "message": "Invalid request"}), 400

    email = request.json.get('email')
    slug = request.json.get('slug')

    if not email or not slug:
        return jsonify({"success": False, "message": "Email and slug are required"}), 400

    # Validate slug format
    import re
    if not re.match(r'^[a-z0-9-]+$', slug):
        return jsonify({"success": False, "message": "Invalid slug format"}), 400

    # Update the slug
    result = data_handler.update_custom_slug(email, slug)

    if result.get("success"):
        return jsonify(result)
    else:
        return jsonify(result), 400


@app.route('/update-theme', methods=['POST'])
def update_theme():
    """Update user's portfolio theme and chatbot settings"""
    if not request.is_json:
        return jsonify({"success": False, "message": "Invalid request"}), 400

    email = request.json.get('email')
    theme = request.json.get('theme')
    enable_chatbot = request.json.get('enableChatbot', True)

    if not email or not theme:
        return jsonify({"success": False, "message": "Email and theme are required"}), 400

    # Update the theme
    result = data_handler.update_theme_settings(email, theme, enable_chatbot)

    if result.get("success"):
        return jsonify(result)
    else:
        return jsonify(result), 400


@app.route('/contact/<portfolio_owner_email>', methods=['POST'])
def handle_contact(portfolio_owner_email):
    """Handle contact form submissions for portfolio owners"""
    if not request.is_json:
        return jsonify({"success": False, "message": "Invalid request"}), 400

    name = request.json.get('name')
    email = request.json.get('email')
    message = request.json.get('message')

    if not name or not email or not message:
        return jsonify({"success": False, "message": "All fields are required"}), 400

    # Validate email format
    import re
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(email_pattern, email):
        return jsonify({"success": False, "message": "Invalid email format"}), 400

    # Store the contact message
    result = data_handler.save_contact_message(portfolio_owner_email, {
        "name": name,
        "email": email,
        "message": message
    })

    if result.get("success"):
        return jsonify(result)
    else:
        return jsonify(result), 400


if __name__ == "__main__":
    app.run(debug=True)
