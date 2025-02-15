import React, { useState } from "react"; 
import { fetchMessage } from "./api"; 

// **** 追加機能
import axios from "axios";
interface Message {
  message: string;
}
// ****

const App: React.FC = () => { 
  const [message, setMessage] = useState(""); 
  // const [message, setMessage] = useState<string>('');
  const handleClick = async () => { 
    try { 
      const data = await fetchMessage(); 
      setMessage(data.message); 
    } catch (error) { 
      console.error("API エラー:", error); 
      setMessage("エラーが発生しました"); 
    } 
  };

  // **** get/post

  const [greeting, setGreeting] = useState<string>(''); // message を greeting に変更
  const [name, setName] = useState<string>('');
  
  
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleGreetGet = async () => {
    try {
      const response = await axios.get<Message>('/api/greet', { params: { name } });
      setGreeting(response.data.message);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleGreetPost = async () => {
    try {
      const response = await axios.post<Message>('/api/greet', { name });
      setGreeting(response.data.message);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // ******
  return ( 
  <div> 
    <h1>Flask API からメッセージを取得</h1> 
    <button onClick={handleClick}>メッセージを取得</button> 
    <p>{message}</p>
    <h1>nyannnn</h1> 
    <input type="text" value={name} onChange={handleNameChange} />
    <button onClick={handleGreetGet}>Greet (GET)</button>
    <button onClick={handleGreetPost}>Greet (POST)</button>
    <p>{greeting}</p>

  </div> 
 ); 
}; 

export default App;