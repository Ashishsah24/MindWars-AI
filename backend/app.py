from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import bcrypt
import jwt
import datetime
from apscheduler.schedulers.background import BackgroundScheduler
import atexit
from bson import ObjectId
import uuid
from threading import Timer
from flask_socketio import SocketIO, emit, join_room


app = Flask(__name__)
CORS(app)

socketio = SocketIO(app, cors_allowed_origins="*")


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
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2)  
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

@app.route('/api/create_battle', methods=['POST'])
def create_battle():
    # Get the data from the request
    print("Battle function called!")
    battle_data = request.json

    # Extract individual fields from the request data
    battle_name = battle_data.get('battleName')
    battle_description = battle_data.get('battleDescription')
    num_questions = battle_data.get('numQuestions')
    time_limit = battle_data.get('timeLimit')
    difficulty = battle_data.get('difficulty')
    creator_username = battle_data.get('creatorUsername')  # Get the creator's username
    # Validate the received data
    if not battle_name or not battle_description or not num_questions or not time_limit:
        return jsonify({"message": "Missing required fields"}), 400
    
    battle_id = str(uuid.uuid4())  # Create a unique random ID
    # Create a battle object to be stored in the MongoDB
    battle = {
        'battleid': battle_id,
        'battleName': battle_name,
        'battleDescription': battle_description,
        'numQuestions': num_questions,
        'timeLimit': time_limit,
        'difficulty': difficulty,
        'created_at': datetime.datetime.utcnow(),
        'creator_username' : creator_username,
        'status': 'waiting_for_opponent',  # Initial status of the battle
        'opponent_id': None  # No opponent yet
    }
    # Insert the battle object into the 'battles' collection
    try:
        # if mongo.db.battles.find_one({'battleid': battle_id}):
            # return jsonify({"message": "Battle ID already exists"}), 400
        
        mongo.db.battles.insert_one(battle)
        print(f"Inserted Battle: {battle}")  # Log the inserted battle
         
        # 30 for 30 seconds, 300 for 5 minutes
        #  
        Timer(300, discard_battle, [battle_id]).start()  # Discard the battle after 5 minutes
    except Exception as e:
        print("Insert failed:", e)
        return jsonify({"message": "Failed to create battle"}), 500
    # Return the battle ID in the response
    return jsonify({
        "message": "Battle created successfully",
        "battle_id": battle_id
    }), 201

def discard_battle(battle_id):
    result = mongo.db.battles.delete_one({'battleid': battle_id})
    if result.deleted_count > 0:
        print(f"Battle {battle_id} discarded due to timeout.")
    else:
        print(f"Battle {battle_id} not found or already discarded.")

@app.route('/api/check_battle_status/<battle_id>', methods=['GET'])
def check_battle_status(battle_id):
    battle = mongo.db.battles.find_one({'battleid': battle_id})
    
    if not battle:
        return jsonify({"message": "Battle not found", "status": "discarded"}), 404
    
    return jsonify({
        "message": "Battle found",
        "status": battle['status']
    }), 200


@app.route('/api/battles', methods=['GET'])
def get_battles():
    battles = mongo.db.battles.find()
    battle_list = []
    for battle in battles:
        print(battle)
        battle_list.append({
            'battleid':battle.get('battleid'),
            'username': battle.get('creator_username'),
            'title': battle.get('battleName'),
            'description': battle.get('battleDescription'),
            'num_questions': battle.get('numQuestions'),
            'time': battle.get('timeLimit') 
        })

    print(battle_list)
    return jsonify(battle_list), 200


@app.route('/api/join_battle/<battle_id>', methods=['POST'])
def join_battle(battle_id):
    print(battle_id)
    # Check if the battle exists
    battle = mongo.db.battles.find_one({'battleid': battle_id})
    if not battle:
        return jsonify({"message": "Battle not found"}), 404
    
    # Mark the opponent in the battle
    mongo.db.battles.update_one({'battleid': battle_id}, {'$set': {'opponent_id': request.json['username'], 'status': 'ready'}})

    return jsonify({"message": "Joined battle successfully"}), 200



battles_in_progress = {}
@socketio.on('join_waiting_room')
def join_waiting_room(data):

    print("*******LISTENING IN WAITING ROOM******")
    battle_id = data['battle_id']
    username = data['username']

    # # Join the SocketIO room
    join_room(battle_id)

    # Initialize the battle entry if it doesn't exist
    if battle_id not in battles_in_progress:
        battles_in_progress[battle_id] = {'count': 0, 'users': []}

    # Increment the count of users joining the battle
    battles_in_progress[battle_id]['count'] += 1
    battles_in_progress[battle_id]['users'].append(username)

    print(f"User {username} joined battle {battle_id}")
    print("Current battles in progress: ", battles_in_progress)

    # Notify that a user has joined
    socketio.emit('user_joined', {'battle_id': battle_id, 'username': username}, room=battle_id)

    # Check if both opponents have joined
    print('hello we reach if block')
    if battles_in_progress[battle_id]['count'] == 2:
        battle =  mongo.db.battles.find_one({'battleid': battle_id})
        print("battles:", battle)
        if battle:
            print("*****YES WE ARE EMITTING STARTCOUNDOWN & MATMAKING STARTED")
            # opponent_username = battle['opponent_id']  # Use the opponent_id to fetch username
            # # Send opponent info to each user
            # print("Emitting opponent info:", opponent_username)
            # socketio.emit('opponent_info', {'opponent_username': opponent_username}, room=battle_id)

            # Emit an event to both users to start the countdown
            print("Emitting start_countdown:", {'battle_id': battle_id, 'countdown': 115})
            socketio.emit('start_countdown', {'battle_id': battle_id, 'countdown': 115}, room=battle_id)
            print("Emitting matchmaking_started:", {'battle_id': battle_id})
            socketio.emit('matchmaking_started', {'battle_id': battle_id}, room=battle_id)

            
@socketio.on('get_opponent_info')
def get_opponent_info(data):
    battle_id = data['battle_id']

    # Check if both users have joined
    if battle_id in battles_in_progress and battles_in_progress[battle_id]['count'] == 2:
        battle = mongo.db.battles.find_one({'battleid': battle_id})
        if battle:
            opponent_username = battle['opponent_id']  # Use opponent_id to fetch username
            print("Sending opponent info:", opponent_username)
            socketio.emit('opponent_info', {'opponent_username': opponent_username}, room=battle_id)
            
# @socketio.on('start_matchmaking')
# def start_matchmaking(data):
#     battle_id = data['battle_id']
#     # Emit to both users that matchmaking has started
#     socketio.emit('matchmaking_started', {'battle_id': battle_id}, room=battle_id)


if __name__ == '__main__':
    socketio.run(app, debug=True)

