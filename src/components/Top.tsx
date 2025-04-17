import { useNavigate } from 'react-router-dom';

const Top = () => {
  const navigate = useNavigate();

  const goToTodos = () => {
    navigate('/todos');
  };

  return (
    <div>
      <h1>トップページ</h1>
      <button onClick={goToTodos}>
        Todoリストへ
      </button>
    </div>
  );
};

export default Top;
