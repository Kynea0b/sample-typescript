import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app: any) {
  app.use(
    "/api", // フロントから `http://localhost:3000/api` にリクエスト
    createProxyMiddleware({
      target: "http://localhost:8000", // Flask サーバー
      changeOrigin: true,
      // pathRewrite: {
      //   '^/api': '', // 必要に応じてパスを書き換える
      // },
    }),
  );
};
