import React from "react";

interface AccordionPanelProps {
  isOpen: boolean;
}

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
