import React from "react";

interface AccordionPanelProps {
  isOpen: boolean;
}

// AccordionPanel コンポーネント
// タスクの詳細を入力するテキストエリアを表示
const AccordionPanel: React.FC<AccordionPanelProps> = ({
  isOpen,
}) => {
  if (!isOpen) return null;
  return (
    <li className="todo-detail-wrapper">
      <textarea
        className="todo-detail"
        placeholder="## 進捗状況&#10;## 内容&#10;## 背景&#10;## 改善内容"
      />
    </li> 
  );
};

export default AccordionPanel;
