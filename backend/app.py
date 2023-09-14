import data_handler
import data_json
from flask_cors import CORS
import chatbot
from flask import Flask, request, redirect, jsonify

# Create a Flask app
app = Flask(__name__)
CORS(app)


# encryption_key = b'C0d3f0l!0H0b'


@app.route('/error')
def error_details():
    return jsonify({"error": "request again with ID in the path."})


@app.route('/get/<key>/', methods=['GET'])
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
