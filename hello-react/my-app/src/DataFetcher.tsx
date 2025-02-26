import React, { useState, useEffect } from 'react';

interface Data {
  id: number;
  name: string;
}

function DataFetcher({ id }: { id: number }) {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // useEffectは画面の副作用を記述する
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log("api is called");
        console.log(`id: ${id}`);
        
        const response = await fetch(`/api/example/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result: Data = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // idが変更された場合にのみ実行

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>Data not found</p>;
  }

  return (
    <div>
      
      <p>Name: {data.name}</p>
    </div>
  );
}

export default DataFetcher;