# DevToolsでデバッグ

DevToolsのnetworkタブやconsoleタブでデバッグしよう。
command + shift + i

のブラウザの開発ツールを開くとfrontデバッグできる。
該当コードも出力される。

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
