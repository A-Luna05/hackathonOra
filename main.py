from openai import OpenAI
import openai
from flask import Flask, jsonify, request
from openai import OpenAI
from flask_cors import CORS



app = Flask(__name__)
CORS(app)

openai.api_key = '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'


@app.route('/')
def index():
    message = "Hello, Home!"
    return jsonify(message)

@app.route('/test', methods=['GET'])
def test():
    message = "Hello, World!"
    return jsonify(message)

@app.route('/gen', methods=['POST'])
def home():
    data = request.get_json()
    userPrompt = data['prompt']
    response = openai.images.generate(
    model="dall-e-2",
    prompt = userPrompt,
    size="1024x1024",
    quality="standard",
    n=1,
    )
    
    image_url = response.data[0].url
    return jsonify(image_url)

if __name__ == '__main__':
    app.run()