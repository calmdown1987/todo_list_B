import React from "react";

interface DeleteButtonProps {
  onToggleDeleted: () => void;
  isDeleted: boolean;
  isCompleted: boolean;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  onToggleDeleted,
  isDeleted,
  isCompleted
}) => {
  return (
    <button
      className="destroy-btn"
      onClick={onToggleDeleted}
    >
      {isDeleted && isCompleted ? "復元" : "削除"}
    </button>
  )
}

export default DeleteButton;
