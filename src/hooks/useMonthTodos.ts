import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import localforage from 'localforage';
import type { Todo } from '../components/Todo';
import type { DatesSetArg, EventInput } from '@fullcalendar/core';
import { DateClickArg } from '@fullcalendar/interaction';

interface UseMonthTodosResult {
  events: EventInput[];
  handleDatesSet: (arg: DatesSetArg) => void;
  handleDateClick: (arg: DateClickArg) => void;
}

function useMonthTodos(): UseMonthTodosResult {
  const navigate = useNavigate();
  const [yearMonth, setYearMonth] = useState<string>('');
  const [events, setEvents] = useState<EventInput[]>([]);
  const lastClickRef = useRef<{ date: string; time: number}>({date: '', time: 0});

  useEffect(() => {
    if(!yearMonth) return;
    (async () => {
     const allKeys = await localforage.keys()
     const monthKeys = allKeys.filter(k => k.startsWith(`todos-${yearMonth}-`))
     const arrays = await Promise.all(
        monthKeys.map(k => localforage.getItem<Todo[]>(k).then(data => data ?? []))
     )
     const monthTodos = arrays.flat();
     setEvents(
      monthTodos.map(todo => ({
        title: todo.title,
        start: todo.date,
        allDay: true,
      }))
    )
    })()
  }, [yearMonth])

  const handleDatesSet = (arg: DatesSetArg) => {
    const firstOfMonth = arg.view.currentStart;
    const y = firstOfMonth.getFullYear();
    const m = String(firstOfMonth.getMonth() + 1).padStart(2, '0');
    setYearMonth(`${y}-${m}`);
  };

  const handleDateClick = (arg: DateClickArg) => {
    const now = Date.now();
    if (
      lastClickRef.current.date === arg.dateStr &&
      now - lastClickRef.current.time < 400
    ) {
      navigate(`/todos/${arg.dateStr}`);
    }
    lastClickRef.current = { date: arg.dateStr, time: now};
  };

  return { events, handleDatesSet, handleDateClick }
}

export default useMonthTodos;
