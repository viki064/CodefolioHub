from functools import wraps

import data_handler
import data_json
from flask_cors import CORS
import chatbot
from flask import Flask, request, redirect, jsonify, url_for, session, request
from flask_oauthlib.client import OAuth
import os
import ssl
import dotenv

ssl._create_default_https_context = ssl._create_unverified_context
# Create a Flask app
app = Flask(__name__)

# encryption_key = b'C0d3f0l!0H0b'
# from flask import Flask, redirect,
# from flask_oauthlib.client import OAuth
# import os
# import ssl
# ssl._create_default_https_context = ssl._create_unverified_context

app.secret_key = os.urandom(24)

dotenv.load_dotenv()

oauth = OAuth(app)

backend_url=os.getenv("BACKEND_URL")

CORS(app, origins=backend_url + "/*")

linkedin_clientID=os.getenv("linkedin_client_id")
linkedin_clientSecret=os.getenv("linkedin_client_secret")

user_info=dict()

linkedin = oauth.remote_app(
    'linkedin',
    consumer_key=linkedin_clientID,
    consumer_secret=linkedin_clientSecret,
    request_token_params={
        'scope': 'openid profile email',  # LinkedIn permissions you need
    },
    base_url='https://api.linkedin.com/v2/',
    request_token_url=None,
    access_token_method='POST',
    access_token_url='https://www.linkedin.com/oauth/v2/accessToken',
    authorize_url='https://www.linkedin.com/oauth/v2/authorization',
)


def is_authenticated():
    user_authenticated = False
    if 'linkedin_token' in session:
        user_authenticated = True

    return user_authenticated


def login_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if not is_authenticated():
            # If the user is not authenticated, return a 401 Unauthorized response
            return jsonify({"message": "Authentication required"}), 401
        return func(*args, **kwargs)

    return wrapper


# @app.route('/')
# def index():
#     if 'linkedin_token' in session:
#         return 'Logged in as LinkedIn user!'
#     return 'Not logged in with LinkedIn.'


@app.route('/linkedin_login')
def login():
    return linkedin.authorize(callback=url_for('authorized', _external=True))


@app.route('/logout')
def logout():
    global user_info
    session.pop('linkedin_token', None)
    session.clear()
    user_info = dict()
    return redirect(backend_url)


@app.route('/linkedin/login/authorized')
def authorized():
    global user_info
    response = linkedin.authorized_response()
    # print(response)
    if response is None or response.get('access_token') is None:
        error_reason = request.args.get('error', 'Unknown error')
        error_description = request.args.get('error_description', 'No description')
        return f'Access denied: reason={error_reason} error={error_description}'
    # print(response.get('access_token'))
    # session['linkedin_token'] = (response['access_token'], '')
    session['linkedin_token'] = response['access_token']
    user_info = linkedin.get('userinfo')
    # user_info['picture'] = None
    session['user_info'] = user_info.data
    user_info = session['user_info']
    data_handler.add_users(user_info)
    # User Info: {'sub': 'rluDvU7muc', 'email_verified': True, 'name': 'Vikram Modiyam',
    # 'locale': {'country': 'US', 'language': 'en'}, 'given_name': 'Vikram', 'family_name': 'Modiyam',
    # 'email': 'modiyam.vikram@gmail.com',
    # 'picture': 'https://media.licdn.com/dms/image/D5603AQGwqXbkqNl9wg/profile-displayphoto-shrink_100_100/0/1694464742580?e=1700092800&v=beta&t=2tjlLgC40Nh3U6Dgm46Zj4giy8OFloVKJTqUkCFttgg'}
    return redirect(backend_url+'/dashboard')


@linkedin.tokengetter
def get_linkedin_oauth_token():
    return session.get('linkedin_token')


@app.route('/user/login/details')
def user_details():
    global user_info
    if user_info:
        return jsonify(user_info)
    else:
        return jsonify({'error': 'User info not found'})


@app.route('/error')
def error_details():
    return jsonify({"error": "request again with ID in the path."})


@app.route('/get/<key>/', methods=['GET'])
# @login_required
def get_articles_by_id(key):
    # print(data_handler.is_key_valid(key))
    if data_handler.is_key_valid(key):
        return jsonify(data_handler.read_json_with_id(key))
    else:
        return jsonify(data_json.resume_format)


@app.route('/add', methods=['POST'])
def add_articles():
    body = request.json['resume_frontend']
    return jsonify(data_handler.write_new_record_to_json(body=body))


@app.route('/update/<key>/', methods=['PUT'])
def update_articles(key):
    body = request.json['resume_frontend']
    return jsonify(data_handler.update_new_record_to_json(key=key, body=body))


@app.route('/update', methods=['PUT'])
def update_details():
    return redirect('/error')


@app.route('/update/', methods=['PUT'])
def update_details_1():
    return redirect('/error')


@app.route('/delete/<key>/', methods=['DELETE'])
def delete_articles(key):
    return jsonify(data_handler.delete_record_from_json(key))


@app.route('/delete', methods=['DELETE'])
def delete_details():
    return redirect('/error')


@app.route('/delete/', methods=['DELETE'])
def delete_details_1():
    return redirect('/error')


@app.route('/chat/<key>/', methods=['GET', 'POST'])
def chat_by_id(key):
    body = request.json['user']
    return jsonify(chatbot.recursive(a=body, key=key))


if __name__ == "__main__":
    app.run(debug=True)
