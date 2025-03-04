import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Form from "./Form";
import { form } from "./api"; // api.ts から form 関数をインポート

// api.ts の form 関数をモック化
jest.mock("./api", () => ({
  form: jest.fn(),
}));

describe("Formコンポーネント", () => {
  beforeEach(() => {
    (form as jest.Mock).mockClear(); // 各テスト前にモック関数をクリア
  });

  it("ワークスペースIDとフォームIDを入力してデータを取得できる", async () => {
    (form as jest.Mock).mockResolvedValue({
      workspace_id: 123,
      form_id: "test-form",
      name: "Test Form",
    });

    render(<Form />);

    fireEvent.change(screen.getByLabelText("Workspace ID:"), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByLabelText("Form ID:"), {
      target: { value: "test-form" },
    });
    fireEvent.click(screen.getByText("Get Form Data"));

    await waitFor(() => {
      expect(screen.getByText("Workspace ID: 123")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Form ID: test-form")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("name: Test Form")).toBeInTheDocument();
    });
  });

  it("APIエラーが発生した場合、エラーメッセージが表示される", async () => {
    (form as jest.Mock).mockRejectedValue(new Error("APIエラー"));

    render(<Form />);

    fireEvent.change(screen.getByLabelText("Workspace ID:"), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByLabelText("Form ID:"), {
      target: { value: "test-form" },
    });
    fireEvent.click(screen.getByText("Get Form Data"));

    await waitFor(() => {
      expect(screen.getByText("Error: APIエラー")).toBeInTheDocument();
    });
  });

  it("ワークスペースIDまたはフォームIDが未入力の場合、APIが呼び出されない", async () => {
    render(<Form />);

    fireEvent.click(screen.getByText("Get Form Data"));

    expect(form).not.toHaveBeenCalled();
  });
});
