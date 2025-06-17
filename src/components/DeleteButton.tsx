import React from "react";

interface DeleteButtonProps {
  onToggleDeleted: () => void;
  isDeleted: boolean;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  onToggleDeleted,
  isDeleted
}) => {
  return (
    <button
      className="destroy-btn"
      onClick={onToggleDeleted}
    >
      {isDeleted ? "復元" : "削除"}
    </button>
  )
}

export default DeleteButton;
