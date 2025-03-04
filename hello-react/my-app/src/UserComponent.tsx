// 'swr'を使用する例
import useSWR from 'swr';
import { useState } from 'react';

// ユーザー情報の型定義
interface User {
  id: number;
  name: string;
  email: string;
}

// データを取得するfetcher関数（型定義付き）
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('データの取得に失敗しました。');
    (error as any).status = res.status;
    throw error;
  }
  return res.json();
};

function UserComponent() {
  const [showUser, setShowUser] = useState(false); // ボタンの状態を管理
  const { data, error, isLoading } = useSWR<User>(showUser ? '/api/user' : null, fetcher);

  const handleClick = () => {
    setShowUser(true); // ボタンがクリックされたら状態をtrueにする
  };

  if (!showUser) {
    return <button onClick={handleClick}>ユーザー情報を表示</button>;
  }

  if (error) {
    const status = (error as any).status;
    return <div>ユーザー情報の取得に失敗しました。ステータスコード: {status}</div>;
  }
  if (isLoading) return <div>読み込み中...</div>;
  if (!data) return null;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
    </div>
  );
}

export default UserComponent;