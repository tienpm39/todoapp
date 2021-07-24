import { useState, useCallback, useEffect } from "react";
import TodoList from "./components/TodoList";
import Textfield from '@atlaskit/textfield'
import Button from '@atlaskit/button';
import { v4 } from 'uuid';

const TODO_APP_STORAGE_KEY = 'TODO_APP';

function App() {

  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState('');

  useEffect(() => {
    const storageTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storageTodoList) {
      setTodoList(JSON.parse(storageTodoList))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList])

  const onChange = useCallback((e) => {
    setTextInput(e.target.value)
  }, []);

  const onAdd = useCallback((e) => {
    setTodoList([
      { id: v4(), name: textInput, isCompleted: false },
      ...todoList
    ]);
    setTextInput('');
  }, [textInput, todoList]);

  const onCheck = useCallback((id) => {
    setTodoList(prevState => prevState.map(todo => todo.id === id ? { ...todo, isCompleted: true } : todo))
  })

  return (
    <>
      <h3>Danh sach can lam</h3>
      <Textfield
        name="add-todo"
        placeholder="Add new Todo"
        elemAfterInput={
          <Button isDisabled={!textInput} appearance={"primary"} onClick={onAdd}>
            Add
          </Button>
        }
        css={{ padding: "2px 4px 2px" }}
        value={textInput}
        onChange={onChange}
      ></Textfield>
      <TodoList todoList={todoList} onCheck={onCheck} />
    </>
  );
}

export default App;
