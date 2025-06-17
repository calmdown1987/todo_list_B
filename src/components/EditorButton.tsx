import React from "react";

interface EditorButtonProps {
  todoId: number;
  isOpen: boolean;
  onToggleOpen: (id :number) => void;
}

const EditorButton :React.FC<EditorButtonProps> = ({
  todoId,
  isOpen,
  onToggleOpen
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
