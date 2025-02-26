import React, { useState } from "react"; 
import { fetchMessage, fetchMessage2 } from "./api"; 
import UserList from './UserList'; // UserList.tsx をインポート
import { Hoge } from './MyComponent'; // 正しいインポート方法
import SumCalculator from "./SumCaluculator";
import Goodbye from "./Goodbye";
import Form from "./Form";
import Counter from "./Counter";

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

  

  const [message2, setMessage2] = useState("");
  const [count, setCount] = useState(0); // countというstate変数を0で初期化

  const incrementCount = () => {
    setCount(count + 1); // countを1増やす
  };

  const handleClick2 = async () => { 
    try { 
      const data = await fetchMessage2();
      console.log(data)
      const str = `取得したメッセージだよ。${data.message2} without axios!!`;
      incrementCount()

      setMessage2(str); 
    } catch (error) { 
      console.error("API エラー:", error); 
      setMessage2("エラーが発生しました"); 
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
    <button type="submit" onClick={handleClick2}>メッセージを取得(using fetch)</button> 
    <p>{message2}{count}</p>
    <h1>nyannnn</h1> 
    <input type="text" value={name} onChange={handleNameChange} />
    <button onClick={handleGreetGet}>Greet (GET)</button>
    <button onClick={handleGreetPost}>Greet (POST)</button>
    <p>{greeting}</p>
    <UserList /> {/* UserList コンポーネントを表示 */}
    <Hoge name="Hoge" age={30} /> {/* UserList コンポーネントを表示 */}
    <SumCalculator /> {/* UserList コンポーネントを表示 */}
    <Goodbye />
    <Form />
    <Counter />

  </div> 
 ); 
}; 

export default App;