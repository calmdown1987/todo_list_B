import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import { useNavigate } from 'react-router-dom';

type Todo = {
  title: string;
  readonly id: number;
  completed_flg: boolean;
  delete_flg: boolean,
};

type Filter = 'all' | 'completed' | 'unchecked' | 'delete'; 

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const [nextId, setNextId] = useState(1);
  const [filter, setFilter] = useState<Filter>('all');

  const navigate = useNavigate();

  // const updateTodo = <T extends keyof Todo>(todos: Todo[], id: number, key: T, value: Todo[T]): Todo[] => {
  //   return todos.map((todo) => {
  //     if (todo.id === id) {
  //       return { ...todo, [key]: value };
  //     }
  //     return todo;
  //   });
  // };

  const handleSubmit = () => {
    if(!text) return;

    const newTodo: Todo = {
      title: text,
      id: nextId,
      completed_flg: false,
      delete_flg: false
    };

    // スプレッド構文について
    // 新しいタスク（newTodo）を既存のタスクの先頭に追加する
    // (つまり、常に最新のタスクを最初に表示する)ために、
    // prevTodos（以前のタスクの配列）の前に newTodo を置いています。
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
    setNextId(nextId + 1);

    setText('');
  };

  // const handleEdit = (id: number, value: string) => {
  //   setTodos((todos) => updateTodo(todos, id, 'title', value));
  // };
  
  // const handleCheck = (id: number, completed_flg: boolean) => {
  //   setTodos((todos) => updateTodo(todos, id, 'completed_flg', completed_flg));
  // };
  
  // const handleRemove = (id: number, delete_flg: boolean) => {
  //   setTodos((todos) => updateTodo(todos, id, 'delete_flg', delete_flg));
  // };

  const handleFilterChange = (filter: Filter) => {
    setFilter(filter);
  };

  const handleEmpty = () => {
    setTodos((todos) => todos.filter((todo) => !todo.delete_flg));
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 'completed':
        return todos.filter((todo) => todo.completed_flg && !todo.delete_flg);
      case 'unchecked':
        return todos.filter((todo) => !todo.completed_flg && !todo.delete_flg);
      case 'delete':
        return todos.filter((todo) => todo.delete_flg);
      default:
        return todos.filter((todo) => !todo.delete_flg);
    }
  };

  // <> はジェネリック型パラメーターを宣言するための構文。
  // KとVという型パラメーターを宣言している。
  // K extends keyof Todo は型パラメーターがTodoのキーの1つでなければならない、という制約。
  // V extends Todo[K]: V は、渡されたキー K の型に一致（またはそのサブタイプ）する値でなければならない、という制約。
  // extendsは 「～の部分型である」という意味。または、割り当て可能でなければならないという意味。
  // extends は、「〜である必要がある」「〜に属する」「〜のサブタイプである」という意味
  const handleTodo = <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V
  ) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, [key]: value };
        } else {
          return todo;
        }
      });
  
      return newTodos;
    });

    useEffect(() => {
      localforage.getItem('todo-20240622').then((values) => {
        if (values) {
          setTodos(values as Todo[]);
        }
      });
    }, []);

    useEffect(() => {
      localforage.setItem('todo-20240622', todos);
    }, [todos]);
  };

  const isFormDisabled = filter === 'completed' || filter === 'delete';

  return (
    <div className="todo-container">
      <button
        className="back-button"
        onClick={() => navigate('/')}
        title="Topページに戻る"
      >
       ← 戻る
      </button>
      <select
        defaultValue="all"
        onChange={(e) => handleFilterChange(e.target.value as Filter)}
      >
        <option value="all">すべてのタスク</option>
        <option value="completed">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="delete">ごみ箱</option>
      </select>
      {filter === 'delete' ? (
        <button onClick={handleEmpty}>
          ごみ箱を空にする
        </button>
      ) : (
        filter !== 'completed' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button type="submit">追加</button>
          </form>
        )
      )}
      <ul>
        {getFilteredTodos().map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              disabled={todo.delete_flg}
              checked={todo.completed_flg}
              onChange={() => handleTodo(todo.id, 'completed_flg', !todo.completed_flg)}
            />
            <input
              type="text"
              disabled={todo.completed_flg || todo.delete_flg}
              value={todo.title}
              onChange={(e) => handleTodo(todo.id, 'title', e.target.value)}
            />
            <button onClick={() => handleTodo(todo.id, 'delete_flg', !todo.delete_flg)}>
              {todo.delete_flg ? '復元' : '削除'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
