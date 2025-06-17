import React from "react";

interface EmptyTrashButtonProps {
  onEmptyButton: () => void;
}

const EmptyTrashButton: React.FC<EmptyTrashButtonProps> = ({onEmptyButton}) => {
  return (
    <button className="physical-destroy-btn" onClick={onEmptyButton}>ごみ箱を空にする</button>
  );
}

export default EmptyTrashButton;
