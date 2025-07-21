import React from "react";

interface EditorButtonProps {
  todoId: number;
  isOpen: boolean;
  onToggleOpen: (id: number) => void;
}

// EditorButton コンポーネント
// アコーディオンの開閉ボタンを表示
// ボタンのクリック時に親側の開閉処理(onToggleOpen)を呼び出す
const EditorButton: React.FC<EditorButtonProps> = ({
  todoId,
  isOpen,
  onToggleOpen,
}) => {
  return (
    <button
      className="edit-btn"
      onClick={() => onToggleOpen(todoId)}
    >
      {isOpen ? "閉じる" : "編集"}
    </button>
  )
}

export default EditorButton;
