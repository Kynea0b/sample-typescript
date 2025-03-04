import React, { useState, useEffect } from "react";

// useEffectが便利な例
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`カウント: ${count}`); // count が変更されるたびにログを出力
  }, [count]); // count が依存配列に含まれている

  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>カウントアップ</button>
    </div>
  );
}

export default Counter;
