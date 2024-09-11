import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Checkbox, FormControlLabel, Grid2, Input, Table, TableCell, TableRow, TextareaAutosize, TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { addTodos, editTodo, deleteTodo, addIndexTodo } from './Reducers/todoSlice';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

/*karan*/
function Todo({ todoindex, setTodo ,removeTodo  }) {

  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  const [checkedItems, setCheckedItems] = useState({});


  //todo input value Add button function -created by Karan - 10/09/2024
  const handleAdd = () => {
    if (input === '') {
      setError('You must write something!');
    } else {
      if (editingIndex !== null) {
        dispatch(editTodo({
          index: todoindex,
          newValue: { ...todos[todoindex], list: todos[todoindex].list.map((item, i) => i === editingIndex ? input : item) }
        }));
        setEditingIndex(null, 'You must write something!');
      } else {
        dispatch(addIndexTodo({
          index: todoindex,
          newValue: input
        }));
      }
      setInput("");
      setError("");
    }
  };

  //todo item Edit button function -created by Karan - 10/09/2024
  const handleEdit = (index) => {
    setInput(todos[todoindex].list[index]);
    setEditingIndex(index);
  };


  //todo item Delete button function -created by Karan - 10/09/2024
  const handleDelete = (itemIndex) => {
    const confirmed = window.confirm("Are you sure you want to delete this Task?");
    if (confirmed) {
      dispatch(deleteTodo({
        todoIndex: todoindex,
        itemIndex: itemIndex
      }));
    }
    setCheckedItems(prevState => {
      const updatedCheckedItems = { ...prevState };
      delete updatedCheckedItems[todoindex];
      return updatedCheckedItems;
    });
  };


  //todo item Check button function -created by Karan - 10/09/2024
  const handleCheck = (index) => {
    setCheckedItems(prevCheckedItem => (prevCheckedItem === index ? null : index));
  };

  // Style for the lineThrough effect
  const lineThrough = {
    textDecoration: 'line-through',
  };


  //random todo background color
  const cardStyle = {
    backgroundColor: todos[todoindex]?.color || '#fff' // Use the color for the card background
  };




  return (
    <>
      <Card sx={{ maxHeight: '190px', overflow: 'scroll', padding: 5, backgroundColor: 'text.disabled' }} style={{ margin: 12, ...cardStyle }} >
        <Table>
          <CardContent>
            {/* Todo Remove Button */}
            <Button onClick={() => removeTodo(todoindex)} variant="outlined" size="small" textAlign="center" color="error" >
              <CloseIcon />
            </Button>
            {/*Task Name  */}
            Task- {todoindex + 1}
            {todos && todos &&
              todos.map((item, index) => (
                (index == todoindex && item.list.length) ?
                  <>
                    {item.list.map((i, index) => (
                      <div className="App" key={index}>
                        <TableRow>
                          <TableCell sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>
                            {/* Delete Button Start */}
                            <Button
                              onClick={() => handleDelete(index)}
                              color="error"
                              size="small"
                              sx={{ minHeight: 0, minWidth: 0, padding: 0 }}
                            >
                              <DeleteIcon />
                            </Button>
                            {/* End */}
                          </TableCell>
                          <TableCell sx={{ minHeight: 0, minWidth: 0, padding: 1 }}>
                            {/* Edit Button Start */}
                            <Button
                              onClick={() => handleEdit(index)}
                              size="small"
                              // color='warning'
                              sx={{ minHeight: 0, minWidth: 0, padding: 0 }}

                            >
                              <EditIcon />
                            </Button>
                            {/* End */}
                          </TableCell>
                          <TableCell sx={{ minHeight: 0, minWidth: 20, padding: 1 }}>
                            {/*Check Button Start*/}
                            <Button
                              onClick={() => handleCheck(index)}
                              color="error"
                              size="small"
                              sx={{ minHeight: 0, minWidth: 0, padding: 0 }}
                            >
                              <FormControlLabel
                                control={<Checkbox checked={checkedItems === index} />}
                              />
                            </Button>
                            {/* End */}
                          </TableCell>
                          {/* Input List Start */}
                          <TableCell>
                            <p style={checkedItems === index ? lineThrough : {}}>{i}</p>
                          </TableCell>
                          {/* End */}
                        </TableRow>
                      </div>
                    ))}  </> : ''
              ))
            }

            <TableRow>
              <TableCell>
                {/* blank input show message */}
                <p>{error}</p>

                {/* input Field Start */}
                <TextField
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  id="outlined-multiline-static"
                  label={editingIndex !== null ? 'Edit Task' : 'Add Task'}
                  variant="outlined"
                  multiline
                  minRows={1}
                  maxRows={1}
                  sx={{ minWidth: 270 }}
                />
                {/* Input Field End */}

                {/*Task Add Button Start*/}
                <Button
                  onClick={handleAdd}
                  variant="contained"
                  sx={{ minHeight: 0, minWidth: 0, padding: 1, marginTop: '7px', marginLeft: '5px' }}

                >
                  {editingIndex !== null ? <EditIcon /> : <AddIcon />}
                </Button>
                {/* End */}

              </TableCell>
            </TableRow>
          </CardContent>
        </Table>
      </Card>
    </>
  );
}

export default Todo;