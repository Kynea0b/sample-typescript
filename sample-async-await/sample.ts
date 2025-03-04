async function fetchData1() {
  console.log("fetchData1 開始");
  // 3秒間の遅延処理
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log("fetchData1 終了");
  return "Data 1";
}

async function fetchData2() {
  console.log("fetchData2 開始");
  // 2秒間の遅延処理
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("fetchData2 終了");
  return "Data 2";
}

async function fetchData3() {
  console.log("fetchData3 開始");
  // 1秒間の遅延処理
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("fetchData3 終了");
  return "Data 3";
}

// Promiseを使用して、配列の中状態遷移を待ちにできる。
// これによってfetchData1とfetchData2の両方が終了したらそれを使用するみたいなことができる
async function fetchAllData() {
  const [data1, data2] = await Promise.all([fetchData1(), fetchData2()]);
  console.log("fetchData1とfetchData2完了");
  return [data1, data2];
}

async function displayData1And2() {
  const data = await fetchAllData();
  console.log("fetchData1とfetchData2のデータ:", data);
}

async function displayData3() {
  const data3 = await fetchData3();
  console.log("fetchData3のデータ:", data3);
}

// 2つの処理を並行して実行
displayData1And2();
displayData3();
