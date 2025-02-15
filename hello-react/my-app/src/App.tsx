import React, { useState } from "react"; 
import { fetchMessage } from "./api"; 
const App: React.FC = () => { 
  const [message, setMessage] = useState(""); 
  const handleClick = async () => { 
    try { 
      const data = await fetchMessage(); 
      setMessage(data.message); 
    } catch (error) { 
      console.error("API エラー:", error); 
      setMessage("エラーが発生しました"); 
    } 
  }; 
  return ( 
  <div> 
    <h1>Flask API からメッセージを取得</h1> 
    <button onClick={handleClick}>メッセージを取得</button> 
    <p>{message}</p> 
  </div> 
 ); 
}; 

export default App;