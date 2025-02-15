import axios from "axios";

export const fetchMessage = async() => {
  try {
    const response = await axios.get("/api/message");
    return response.data;

  } catch (error: any){
    console.error("Funnngaa");
    console.error(axios.get)

    console.error("Axios エラー詳細:", {
      message: error.message,
      code: error.code,
      response: error.response ? {
        status:error.response.status,
        data: error.response.data,
        headers: error.response.headers
      }: "No response",
    });
    throw error;
  }
  
};