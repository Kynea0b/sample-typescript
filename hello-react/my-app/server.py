from flask import Flask, jsonify 
from flask_cors import CORS 

app = Flask(__name__) 
CORS(app) # CORS 設定（実際には http-proxy-middleware で回避） 
# CORS(app, origins=["http://127.0.0.1:3000", "null"])

@app.route("/api/message", methods=["GET"]) 
def get_message(): 
  return jsonify({"message": "Hello from Flask API!"}) 

if __name__ == "__main__": 
  app.run(host="0.0.0.0", port=8000, debug=True) 
