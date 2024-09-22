from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import bcrypt
import jwt
import datetime

app = Flask(__name__)
CORS(app)

# Your MongoDB URI
app.config["MONGO_URI"] = "mongodb+srv://ashishsah11110112:CpbkElbRuE4efSNh@userauthcluster.fvhu1.mongodb.net/MindWarsAI"
mongo = PyMongo(app)

# Secret key for JWT encoding/decoding
SECRET_KEY = 'THEREISAKINGINSIDE'  # Replace with a strong secret key

@app.route('/signup', methods=['POST'])
def signup():
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']
    
    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    # Insert the new user into the database
    mongo.db.users.insert_one({
        'username': username,
        'email': email,
        'password': hashed_password.decode('utf-8')
    })
    return jsonify({"message": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    identifier = request.json['identifier']  # Can be username or email
    password = request.json['password']
    
    # Find user by username or email
    user = mongo.db.users.find_one({'$or': [{'username': identifier}, {'email': identifier}]})
    
    if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        # Create a JWT token
        token = jwt.encode({
            'user_id': str(user['_id']),
            'username': user['username'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2)  # Token expires in 1 hour
        }, SECRET_KEY, algorithm='HS256')

        return jsonify({"message": "Login successful", "token": token, "username": user['username']}), 200
    
    return jsonify({"message": "Invalid credentials"}), 401

# Optional: Middleware to protect certain routes
@app.route('/protected', methods=['GET'])
def protected():
    token = request.headers.get('Authorization')  # Expecting token in Authorization header
    if not token:
        return jsonify({"message": "Token is missing!"}), 401

    try:
        data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return jsonify({"message": "Protected content", "user_id": data['user_id'], "username": data['username']})
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token has expired!"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token!"}), 401

if __name__ == '__main__':
    app.run(debug=True)
