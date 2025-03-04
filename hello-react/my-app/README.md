# DevToolsでデバッグ

環境設定

```bash
yarn install
```

DevToolsのnetworkタブやconsoleタブでデバッグしよう。
command + shift + i

のブラウザの開発ツールを開くとfrontデバッグできる。
該当コードも出力される。

## Quick start

```bash
python server.py
```

```bash
yarn start
```

### 備考

```bash
% curl -i http://localhost:8000/api/message
HTTP/1.1 200 OK
Server: Werkzeug/2.2.3 Python/3.11.3
Date: Sat, 15 Feb 2025 12:59:00 GMT
Content-Type: application/json
Content-Length: 41
Access-Control-Allow-Origin: *
Connection: close

{
  "message": "Hello from Flask API!"
}
```

## Test

留意点。

https://qiita.com/Sicut_study/items/bc599345e6a93f13cf98
