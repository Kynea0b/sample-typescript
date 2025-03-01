# user_manager.py
import hashlib

class UserManager:
    users = {}  # クラス変数としてユーザー情報を格納

    @classmethod
    def generate_user_id(cls, name, email):
        """nameとemailを結合した文字列のハッシュ値を生成"""
        combined_string = f"{name}{email}".encode('utf-8')
        return hashlib.sha256(combined_string).hexdigest()

    @classmethod
    def initialize_users(cls):
        """サーバー起動時にユーザー情報を登録"""
        user1 = {"name": "Alice", "email": "alice@example.com"}
        user2 = {"name": "Bob", "email": "bob@example.com"}

        id1 = cls.generate_user_id(user1["name"], user1["email"])
        id2 = cls.generate_user_id(user2["name"], user2["email"])

        cls.users[id1] = user1
        cls.users[id2] = user2

    @classmethod
    def get_user(cls, user_id):
        """指定されたIDのユーザー情報を取得"""
        return cls.users.get(user_id)