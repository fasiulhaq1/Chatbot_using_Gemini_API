import os
import google.generativeai as genai
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)
genai.configure(api_key="AIzaSyCgVNswNJr2vIZb9kiwdRgzb5ev33B2Uus")

# Create the model
generation_config = {
  "temperature": 0.85,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
  # safety_settings = Adjust safety settings
  # See https://ai.google.dev/gemini-api/docs/safety-settings
)

chat_session = model.start_chat(
  history=[
  ]
)

def Gemini(user_message):
   response = chat_session.send_message(user_message)
   return response

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/chatbot', methods=['POST'])
def chatbot():
    
  user_message = request.form.get('userMessage')
  response = Gemini(user_message)
  response = response.text

  return render_template('index.html', response=response)

if __name__ == '__main__':
  app.run(debug=True)
