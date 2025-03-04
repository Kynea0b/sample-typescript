import axios from "axios";
import useSWR from "swr";
import { User } from "./types";

// 取得用関数
export const fetcher = async (url: string): Promise<User> => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    throw error;
  }
  return res.json();
};

export const fetchMessage = async () => {
  try {
    const response = await axios.get("/api/message");
    return response.data;
  } catch (error: any) {
    console.error("Funnngaa");
    console.error(axios.get);

    console.error("Axios エラー詳細:", {
      message: error.message,
      code: error.code,
      response: error.response
        ? {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers,
          }
        : "No response",
    });
    throw error;
  }
};

export const fetchMessage2 = async () => {
  try {
    const response = await fetch("/api/message2");
    console.log(response);

    if (!response.ok) {
      const errorData = await response.json(); // サーバーがJSON形式でエラーを返す場合を考慮
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorData.message || response.statusText}`,
      ); // より詳細なエラーメッセージ
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Funnngaa");

    // Fetch APIのエラー情報をより詳細に表示
    console.error("Fetch エラー詳細:", {
      message: error.message,
      response: {
        status: error.response?.status, // オプショナルチェーン
        statusText: error.response?.statusText, // オプショナルチェーン
        // 必要であれば、response.bodyを読み取ることも可能ですが、
        // 上記の!response.okのブロックで既に読み取っている可能性があるため、注意が必要です。
      },
    });

    throw error; // エラーを再throwして、呼び出し元で処理できるようにする
  }
};

export const goodbye = async (name: string) => {
  const response = await fetch("/api/goodbye", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || response.statusText);
  }

  const data = await response.json();
  return data.message;
};

interface Form {
  workspace_id: number;
  form_id: string;
}

export const form = async (workspaceId: number, formId: string) => {
  const response = await fetch(
    `/api/workspaces/${workspaceId}/forms/${formId}`,
  );
  console.log("form api is called");
  console.log(`workspaceId: ${workspaceId}`);
  console.log(`formId: ${workspaceId}`);
  console.log(response.json);

  const data: Form = await response.json();
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || response.statusText);
  }

  return data;
};
