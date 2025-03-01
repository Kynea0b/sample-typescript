from flask import Flask, request, jsonify
from flask_cors import CORS 
import datetime
from user_manager import UserManager  # UserManager クラスをインポート




app = Flask(__name__) 
CORS(app) # CORS 設定（実際には http-proxy-middleware で回避） 
# CORS(app, origins=["http://127.0.0.1:3000", "null"])


users = {}  # ハッシュ値をキーとするユーザー情報辞書
def generate_user_id(name, email):
    """nameとemailを結合した文字列のハッシュ値を生成"""
    combined_string = f"{name}{email}".encode('utf-8')
    return hashlib.sha256(combined_string).hexdigest()


@app.before_request
def initialize_users():
    """サーバー起動時にユーザー情報を登録"""
    UserManager.initialize_users()  # UserManager のクラスメソッドを使用

@app.before_request
def initialize_users():
    """サーバー起動時にユーザー情報を登録"""
    user1 = {"name": "Alice", "email": "alice@example.com"}
    user2 = {"name": "Bob", "email": "bob@example.com"}

    id1 = generate_user_id(user1["name"], user1["email"])
    id2 = generate_user_id(user2["name"], user2["email"])

    users[id1] = user1
    users[id2] = user2


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


@app.route('/api/users/<user_id>', methods=['GET'])
def get_user(user_id):
    """指定されたIDのユーザー情報を取得"""
    user = UserManager.get_user(user_id)  # UserManager のクラスメソッドを使用    
    if user:
        return jsonify(user)
    else:
        return jsonify({"message": "User not found"}), 404

@app.route("/api/user/<string:name>/email/<string:email>", methods=["GET"]) 
def get_user_id(name, email): 
  id = {
    "id": generate_user_id(name, email)
  }
  return jsonify(id) 


# @app.route("/api/workspaces/<int:workspace_id>/forms/<string:form_id>", methods=["GET"])
# /api/users/${userId}:profile
@app.route("/api/user/<string:user_id>:profile", methods=["GET"]) 
def get_user_by_id(user_id):
  users = {
    "id": user_id,
    "name": "John Doe",
    "age": 30,
    "email": "john.doe@example.com"
  }
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
