import React, { useState } from "react";

interface TodoFormProps {
  onAdd: (title: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        placeholder="タスクを入力"
        value={text}
        onChange={e => setText(e.target.value)}
        />
        <button className="submit-btn" type="submit">
          追加
        </button>
    </form>
  )
}

export default TodoForm;
