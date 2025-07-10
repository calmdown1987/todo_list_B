import React from 'react';
import { useNavigate } from 'react-router-dom';

interface DateHeaderProps {
  title: string;
  currentDateStr: string;
}

const DateHeader: React.FC<DateHeaderProps> = ({ title, currentDateStr }) => {
  const navigate = useNavigate();

  const formatDate = (date: Date): string => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  const goPrevDate = () => {
    const prev = new Date(currentDateStr);
    prev.setDate(prev.getDate() - 1);
    navigate(`/todos/${formatDate(prev)}`);
  }

  const goNextDate = () => {
    const next = new Date(currentDateStr);
    next.setDate(next.getDate() + 1);
    navigate(`/todos/${formatDate(next)}`);
  }

  const goBack = () => {
    navigate('/');
  }

  return (
    <div>
      <h1 className='heading-date'>{title}</h1>
      <div className="header-btn">
        <button onClick={goPrevDate}>前の日</button>
        <button onClick={goBack} className='back-btn'>カレンダーに戻る</button>
        <button onClick={goNextDate}>次の日</button>
      </div>
    </div>
  )
}

export default DateHeader;
