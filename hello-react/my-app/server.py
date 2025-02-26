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
def post_message2(): 
  return jsonify({"message2": "Barrrrrrr"}) 

@app.route("/api/goodbye", methods=["POST"]) 
def goodbye():
  name = request.get_json().get('name')  # POSTリクエストからnameを取得
  message = f"Goodbye, {name}!"
  return jsonify({"message": message})

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

import hashlib

def pad_with_zeros(number):
  """
  数値を6桁の0埋め文字列に変換します。

  Args:
    number: 整数値

  Returns:
    6桁の0埋め文字列
  """
  return str(number).zfill(6)

@app.route("/api/workspaces/<int:workspace_id>/forms/<string:form_id>", methods=["GET"])
def get_form(workspace_id, form_id):
    # workspace_id と form_id を使って処理を行う
    form_md5_hash = hashlib.md5(form_id.encode()).hexdigest()
    workspace_id = pad_with_zeros(workspace_id)
    data = {
        "workspace_id": workspace_id,
        "form_id": form_md5_hash,
    }
    return jsonify(data)

@app.route("/api/example/<string:id>", methods=["GET"])
def get_data(id):
    # workspace_id と form_id を使って処理を行う
    id_md5_hash = hashlib.md5(id.encode()).hexdigest()
    
    data = {
        "name": "fooooooooo",
        "form_id": id_md5_hash,
    }
    return jsonify(data)

if __name__ == "__main__": 
  app.run(host="0.0.0.0", port=8000, debug=True) 
