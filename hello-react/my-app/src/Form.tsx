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
  //   **** 変更点 ここから　*****
  //   const workspaceId = 123; // 例: workspaceId を定義
  //   const formId = 'abc'; // 例: formId を定義
  // 入力値を使用する変更
  const [workspaceId, setWorkspaceId] = useState<number | null>(null); // workspaceId を state で管理
  const [formId, setFormId] = useState<string | null>(null); // formId を state で管理
//   const [workspaceId, setWorkspaceId] = useState<number>(0) // 例: 初期値を設定
//   const [formId, setFormId] = useState(''); // 例: 初期値を設定

  const handleWorkspaceIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setWorkspaceId(isNaN(value) ? null : value);
  };

  const handleFormIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormId(event.target.value);
  };

  const handleFetchData = async () => {
    if (workspaceId === null || formId === null || isNaN(workspaceId)) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await form(workspaceId!, formId!);
      setFormData(data);
    } catch (error: any) {
      setError(error.message);
      console.error("API Error Details:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    
    <div>
      <h1>FormInfo</h1>
      {/* 入力フォーム (常に表示) */}
      <div>
        <label htmlFor="workspaceId">Workspace ID:</label>
        <input
          type="number"
          id="workspaceId"
          value={workspaceId === null ? '' : workspaceId}
          onChange={handleWorkspaceIdChange}
        />
      </div>
      <div>
        <label htmlFor="formId">Form ID:</label>
        <input type="text" id="formId" value={formId || ''} onChange={handleFormIdChange} />
      </div>

      {/* API呼び出しボタン */}
      <button onClick={handleFetchData}>Get Form Data</button>

      {/* ローディング表示 */}
      {loading && <div>Loading...</div>}

      {/* エラー表示 */}
      {error && <div>Error: {error}</div>}

      {/* 取得したデータを表示 */}
      {formData && (
        <div>
          <p>Workspace ID: {formData.workspace_id}</p>
          <p>Form ID: {formData.form_id}</p>
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <p>
                {key}: {formData[key]}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
};

export default Form;