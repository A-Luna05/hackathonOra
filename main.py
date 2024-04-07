from openai import OpenAI
import openai
from flask import Flask, jsonify, request
from openai import OpenAI
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore, auth, storage
from datetime import datetime
import requests
from google.cloud.firestore import Query



cred = credentials.Certificate('./serviceKey.json')
firebase_admin.initialize_app(cred)

db = firestore.client()


app = Flask(__name__)
CORS(app)

openai.api_key = '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'
bucket = storage.bucket('envision-db762.appspot.com')

@app.route('/')
def index():
    message = "Hello, Home!"
    return jsonify(message)

@app.route('/test', methods=['GET'])
def test():
    message = "Hello, World!"
    return jsonify(message)

@app.route('/posts', methods=['GET'])
def posts():
    posts_ref = db.collection('posts').order_by('timestamp', direction=Query.DESCENDING)

    docs = posts_ref.get()

    posts = []
    for doc in docs:
        posts.append(doc.to_dict())
    print(posts)
    return jsonify(posts)

@app.route('/create-account', methods=['POST'])
def create_account():
    data = request.get_json()
    email = data['email']
    password = data['password']
    user = auth.create_user(
        email=email,
        password=password
    )
    return jsonify({'uid': user.uid}), 201

@app.route('/gen', methods=['POST'])
def gen():
    data = request.get_json()
    userPrompt = data['prompt']
    userName = data['user'].get('email')
    print(userPrompt)
    print(userName)
    response = openai.images.generate(
    model="dall-e-2",
    prompt = userPrompt + " drawn in a cartoon, family friendly style for a demograhpic of 8-13 year olds.",
    size="1024x1024",
    quality="standard",
    n=1,
    )
    now = datetime.now()
    image_url = response.data[0].url


    # Upload the image to Firebase Storage
    blob = bucket.blob(f'images/{image_url.split("/")[-1]}')
    blob.upload_from_string(requests.get(image_url).content)
    blob.make_public()
    new_image_url = blob.public_url

    # Create a new document in the 'posts' collection with the current date and time
    doc_ref = db.collection('posts').document()
    doc_ref.set({
        'prompt': userPrompt,
        'image_url': image_url,
        'user': userName,
        'timestamp': now
    })

    
    return jsonify(new_image_url)

if __name__ == '__main__':
    app.run(debug=True)   
