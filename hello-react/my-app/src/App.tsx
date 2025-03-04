import React, { useState } from "react";
import { fetchMessage, fetchMessage2 } from "./api";
import UserList from "./UserList"; // UserList.tsx をインポート
import { Hoge } from "./MyComponent"; // 正しいインポート方法
import SumCalculator from "./SumCaluculator";
import Goodbye from "./Goodbye";
import Form from "./Form";
import Counter from "./Counter";
import DataFetcher from "./DataFetcher";
import { UserComponent, UserIdComponent } from "./User";

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
      console.log(data);
      const str = `取得したメッセージだよ。${data.message2} without axios!!`;
      incrementCount();

      setMessage2(str);
    } catch (error) {
      console.error("API エラー:", error);
      setMessage2("エラーが発生しました");
    }
  };

  // **** get/post

  const [greeting, setGreeting] = useState<string>(""); // message を greeting に変更
  const [name, setName] = useState<string>("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleGreetGet = async () => {
    try {
      const response = await axios.get<Message>("/api/greet", {
        params: { name },
      });
      setGreeting(response.data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleGreetPost = async () => {
    try {
      const response = await axios.post<Message>("/api/greet", { name });
      setGreeting(response.data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [dataId, setDataId] = useState<number>(444);

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataId(Number(e.target.value));
  };

  // ------User Info-----
  // id
  const [userId, setUserId] = useState<string | null>(null);
  const [inputUserId, setInputUserId] = useState("");
  // name
  const [userName, setUserName] = useState<string | null>(null);
  const [inputUserName, setInputUserName] = useState("");
  // address
  const [userMail, setUserMail] = useState<string | null>(null);
  const [inputUserMail, setInputUserMail] = useState("");

  // *** id ***
  // イベント時の値の更新
  // input属性の値が変更されたら変更された値を状態設定する
  const handleInputUseIdChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputUserId(event.target.value);
  };
  // 状態変数の更新
  // 変更された値がinput属性に設定されたらその値を状態変数に格納する
  // クリックすれば、状態変数がnullでなければ、api処理を実行する
  const handleSearch = () => {
    setUserId(inputUserId);
  };

  // *** name ***
  const handleInputUserNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputUserName(event.target.value);
  };

  // *** mail ***
  const handleInputUserMailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputUserMail(event.target.value);
  };

  const handleNameAndMail = () => {
    setUserName(inputUserName);
    setUserMail(inputUserMail);
  };

  // ******
  return (
    <div>
      <h1>Flask API からメッセージを取得</h1>
      <button onClick={handleClick}>メッセージを取得</button>
      <p>{message}</p>
      <button type="submit" onClick={handleClick2}>
        メッセージを取得(using fetch)
      </button>
      <p>
        {message2}
        {count}
      </p>
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
      <label htmlFor="dataIdInput">ID:</label>
      <input
        type="number"
        id="dataIdInput"
        value={String(dataId)}
        onChange={handleIdChange}
      />
      <DataFetcher id={dataId} />
      <h1>User Infomation</h1>
      <label htmlFor="userName">Name:</label> {/* htmlFor属性を使用 */}
      <input
        type="text"
        placeholder="Alice"
        value={inputUserName}
        onChange={handleInputUserNameChange}
      />
      <label htmlFor="userMail">Mail:</label> {/* htmlFor属性を使用 */}
      <input
        type="text"
        placeholder="alice@example.com"
        value={inputUserMail}
        onChange={handleInputUserMailChange}
      />
      <button onClick={handleNameAndMail}>Get ID</button>
      {userName !== null && userMail !== null && (
        <UserIdComponent userName={userName} userMail={userMail} />
      )}
      <label htmlFor="userId">ID:</label> {/* htmlFor属性を使用 */}
      <input
        type="text"
        placeholder="Enter User ID"
        value={inputUserId}
        onChange={handleInputUseIdChange}
      />
      <button onClick={handleSearch}>Search</button>
      {userId !== null && <UserComponent userId={userId} />}
    </div>
  );
};

export default App;
