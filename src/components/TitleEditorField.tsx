import React, { useState, useEffect } from "react";

interface TitleEditorFieldProps {
  title: string;
  progress: number | "";
  onEditTitle: (newTitle: string) => void;
}

const TitleEditorField: React.FC<TitleEditorFieldProps> = ({
  title,
  progress,
  onEditTitle,
}) => {
  const [inputValue, setInputValue] = useState(title);

  useEffect(() => {
    setInputValue(title);
  }, [title]);

  const handleBlur = () => {
    const trimmed = inputValue.trim();
    if (trimmed && trimmed !== title) {
      onEditTitle(trimmed);
    } else {
      setInputValue(title);
    }
  };

  return (
    <input
      type="text"
      disabled={progress === 100}
      className={progress === 100 ? "disabled-form" : ""}
      value={inputValue}
      onChange={(e) => {
        setInputValue(e.target.value);
      }}
      onBlur={handleBlur}
    />
  );
};

export default TitleEditorField;
