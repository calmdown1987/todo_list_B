import React from "react";

interface EmptyTrashButtonProps {
  onClickEmpty: () => void;
}

const EmptyTrashButton: React.FC<EmptyTrashButtonProps> = ({onClickEmpty}) => {
  return (
    <button className="physical-destroy-btn" onClick={onClickEmpty}>ごみ箱を空にする</button>
  );
}

export default EmptyTrashButton;
