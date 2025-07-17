import React from "react";

interface DeleteButtonProps {
  onToggleDeleted: () => void;
  isDeleted: boolean;
}

// DeleteButttonコンポーネント
// 復元もしくは削除ボタンを表示、ボタンが押下された場合に親側へ
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
