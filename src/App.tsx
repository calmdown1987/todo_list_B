import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CalendarPage from './components/CalendarPage';
import Todos from './components/Todo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CalendarPage />} />
        <Route path="/todos/:dateStr" element={<Todos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
