import React, { useState, useEffect } from 'react';
import { form } from './api'; // form 関数をインポート

interface Form {
  workspace_id: number;
  form_id: string;
  [key: string]: any; // インデックスシグネチャを追加
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const workspaceId = 123; // 例: workspaceId を定義
  const formId = 'abc'; // 例: formId を定義

  useEffect(() => {
    const fetchFormData = async () => {
      setLoading(true);
      setError(null);

      try {
        // api.tsから呼び出し
        const data = await form(workspaceId, formId);
        setFormData(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, [workspaceId, formId]); // workspaceId または formId が変更されたら再取得

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!formData) {
    return <div>No data available.</div>;
  }

  return (
    <div>
      {/* 取得したデータを表示 */}
      <p>Workspace ID（取得した）: {formData.workspace_id}</p>
      <p>Form ID（取得した）: {formData.form_id}</p>
      {/* 他のプロパティも表示 */}
      {Object.keys(formData).map((key) => (
        <div key={key}>
          <p>
            {key}: {formData[key]}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Form;