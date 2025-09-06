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

# Configure CORS to allow requests from your frontend
backend_url = os.getenv("BACKEND_URL")
CORS(app, origins=[backend_url])

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
    return 'linkedin_token' in session


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
    user_info = dict()
    session.clear()
    return redirect(backend_url)


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
    return redirect(backend_url + '/dashboard/navbar/')


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
    if data_handler.is_key_valid(key):
        return jsonify(data_handler.read_json_with_id(key))
    else:
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


if __name__ == "__main__":
    app.run(debug=True)
