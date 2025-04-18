import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Top from './components/Top';
import Todos from './components/todo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
