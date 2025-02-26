from flask import Flask, request, jsonify
from flask_cors import CORS 
import datetime
app = Flask(__name__) 
CORS(app) # CORS 設定（実際には http-proxy-middleware で回避） 
# CORS(app, origins=["http://127.0.0.1:3000", "null"])


@app.route('/api/greet', methods=['GET', 'POST'])
def greet():
    if request.method == 'POST':
        name = request.get_json().get('name')  # POSTリクエストからnameを取得
        message = f"Hello, {name}!"
        return jsonify({"message": message})
    else:  # GETリクエストの場合
        name = request.args.get('name')  # GETリクエストからnameを取得
        if name:
            message = f"Hello, {name}!"
            return jsonify({"message": message})
        else:
            return jsonify({"message": "Hello, world!"})  # nameパラメータがない場合のデフォルトメッセージ


@app.route("/api/message", methods=["GET"]) 
def get_message():
  # date = datetime.now() 
  return jsonify({"message": "Fooooooo"}) 


@app.route("/api/message2", methods=["GET"]) 
def get_message2(): 
  return jsonify({"message2": "Barrrrrrr"}) 

@app.route("/api/users", methods=["GET"]) 
def get_users():
  users = [
    {
      "id": 1,
      "name": "John Doe",
      "age": 30,
      "email": "john.doe@example.com"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "age": 25,
      "email": "jane.smith@example.com"
    }
  ]
  return jsonify(users) 

if __name__ == "__main__": 
  app.run(host="0.0.0.0", port=8000, debug=True) 
