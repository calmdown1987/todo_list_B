import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import useMonthTodos from '../hooks/useMonthTodos';

const CalendarPage: React.FC = () => {

  const {
    events,
    handleDatesSet,
    handleDateClick,
  } = useMonthTodos()

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      locale={jaLocale}
      headerToolbar={{
        left: 'title',
        center: '',
        right: 'today,prev,next',
      }}
      events={events}
      datesSet={handleDatesSet}
      dateClick={handleDateClick}
      height="1200px"
    />
  );
}

export default CalendarPage;
