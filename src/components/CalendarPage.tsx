import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import type { DatesSetArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import { EventInput } from '@fullcalendar/core';
import { useNavigate } from 'react-router-dom';
import localforage from 'localforage';
import type { Todo } from "./Todo";

const CalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventInput[]>([]);
  const [yearMonth, setYearMonth] = useState<string>('');

  const lastClickRef = useRef<{ date: string; time: number }>({ date: '', time: 0 });

  const handleDatesSet = (arg: DatesSetArg) => {
    const firstOfMonth: Date = arg.view.currentStart;
    const y = firstOfMonth.getFullYear();
    const m = String(firstOfMonth.getMonth() + 1).padStart(2, '0');
    setYearMonth(`${y}-${m}`);
  };
  
  useEffect(() => {
    if(!yearMonth) return;

    async function fetchMonthTodos() {
      const allKeys = await localforage.keys();
      const monthKeys = allKeys.filter(k => k.startsWith(`todos-${yearMonth}-`));
      const arrays = await Promise.all(
        monthKeys.map(k =>
          localforage.getItem<Todo[]>(k).then(data => data ?? [])
        )
      );
      const monthTodos = arrays.flat();
      console.log('[fetchMonthTodos] monthTodos:', monthTodos);
      
        setEvents(monthTodos.map((todo) => ({
          title: todo ? todo.title : "not find",
          start: todo ? todo.date : "not find",
          allDay: true
        })));
        console.log("yearMonth:", yearMonth);
        console.log("monthKeys:", monthKeys);
        console.log("monthTodos:", monthTodos);
    }
    fetchMonthTodos();
  },[yearMonth]);

  const handleDateDoubleClick = (dateStr: string) => {
    navigate(`/todos/${dateStr}`);
  };

  const handleDateClick = (arg: DateClickArg) => {
    const now = Date.now();
    if (
      lastClickRef.current.date === arg.dateStr &&
      now - lastClickRef.current.time < 400
    ) {
      handleDateDoubleClick(arg.dateStr);
    }
    lastClickRef.current = { date: arg.dateStr, time: now };
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      datesSet={handleDatesSet}
      locale={jaLocale}
      headerToolbar={{
        left: 'title',
        center: '',
        right: 'today,prev,next',
      }}
      events={events}
      dateClick={handleDateClick}
      height="1200px"
    />
  );
};

export default CalendarPage;
