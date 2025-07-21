import React from "react";

interface DeleteButtonProps {
  onToggleDeleted: () => void;
  isDeleted: boolean;
}

// DeleteButton コンポーネント
// 削除フラグの状態を参照して、削除もしくは復元ボタンを表示
// ボタンのクリック時に親側のフラグ切り替え処理(onToggleDeleted)を呼び出す
const DeleteButton: React.FC<DeleteButtonProps> = ({
  onToggleDeleted,
  isDeleted,
}) => {
  return (
    <button
      className="destroy-btn"
      onClick={onToggleDeleted}
    >
      {isDeleted ? "復元" : "削除"}
    </button>
  );
};

export default DeleteButton;
