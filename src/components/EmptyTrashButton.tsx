import React from "react";

interface EmptyTrashButtonProps {
  onClickEmpty: () => void;
}

// EmptyTrashButton コンポーネント
// 削除済みタスクを物理削除するボタンを表示
// ボタンのクリック時に親側の削除処理(onClickEmpty)を呼び出す
const EmptyTrashButton: React.FC<EmptyTrashButtonProps> = ({ 
  onClickEmpty,
}) => {
  return (
    <button 
      className="physical-destroy-btn" 
      onClick={onClickEmpty}
    >
      ごみ箱を空にする
    </button>
  );
}

export default EmptyTrashButton;
