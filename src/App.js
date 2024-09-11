import { useEffect, useState } from "react";
import { Box, Button, Grid, Grid2 } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { addTodos, setTodoList } from "./Reducers/todoSlice";
import Todo from "./Todo";


function App() {
  const [todo, setTodo] = useState([]);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);

  // Maximum Todo Adds Const -created by Karan - 10/09/2024
  const maxTodo = 6;

  // Random Color Function -created by Karan - 10/09/2024
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  

  useEffect(() => {
    if(todos.length) {
      localStorage.setItem('todos',JSON.stringify(todos))
    }
     
    // setTodo(JSON.parse(getData))
   
  },[todos])

  useEffect(() => {
    const getItems = localStorage.getItem('todos');
    console.log(getItems,"getItems")
    if( getItems.length) {
      dispatch(setTodoList({
        newValue: JSON.parse(getItems)
      }));
      setTodo(JSON.parse(getItems))
    }
   
  },[])

  

  // ADD TODO+ Button Function
  function addTodo() {
    if (todo.length < maxTodo) {
      const color = getRandomColor();
      const newTodo = { color };
      const updatedTodos = [...todo, newTodo];
      setTodo(updatedTodos);
      dispatch(addTodos({ name: "task1", list: [], color }));
    } else {
      alert("Cannot add more than " + maxTodo + " todos.");
    }
  }
  
  //remove Todo button function
  function removeTodo(index) {
    const confirmed = window.confirm("Are you sure you want to delete this todo?");
    if (confirmed) {
      const newTodos = todo.filter((_, i) => i !== index); // Remove the Todo item at the specified index
      setTodo(newTodos); // Update local state
      dispatch(setTodoList({ newValue: newTodos })); // Update Redux store
      localStorage.setItem('todos', JSON.stringify(newTodos)); // Update local storage
    }
  }
  
  return (
    <>
    {/* ADD TODO+ Button */}
      <Box textAlign='center'>
        <Button onClick={addTodo} variant="outlined" size="small" textAlign="center" >Add Todo +</Button>
      </Box>
      <Grid
        container
        columns={{ xs: 6, sm: 8, md: 12 }}
        sx={{ flexGrow: 1 }}
      >
        {/* Remove Todo Button */}
        {todo.map((_, index) => (
          <div key={index}>
            <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
              <Todo setTodo={setTodo} todoindex={index} removeTodo={removeTodo}/>
            </Grid>
          </div>
        ))}
      </Grid>
    </>
  );
}

export default App;