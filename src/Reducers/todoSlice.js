import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    todos: []
};

const todoSlice = createSlice({
    name: 'todo',
    initialState: initialState,
    reducers: {
        /* Created By Karan, 04-09-2024, Add Button Click To Add Index Start*/
        addTodos: (state, action) => {
            state.todos.push(action.payload);
        },
        addIndexTodo:(state,action) => {
            const { index, newValue } = action.payload;
            state.todos[index].list.push(newValue)
        },
        /* End */

        /* Delete Button Click To Delete Index Start*/
        deleteTodo: (state, action) => {
            const { todoIndex, itemIndex } = action.payload;
            state.todos[todoIndex].list = state.todos[todoIndex].list.filter((_, index) => index !== itemIndex);
        },
        /* End */

        /* Edit Button Click To Edit Index Start*/
        editTodo: (state, action) => {
            const { index, newValue } = action.payload;
            state.todos[index] = newValue;
        },
        /*localstorage data store use*/
        setTodoList: (state, action) => {

            const {  newValue } = action.payload;
            console.log(newValue,"newww")
            state.todos = newValue;
        },
        /* End */

    },
});

export const { addTodos, deleteTodo, editTodo,addIndexTodo,setTodoList } = todoSlice.actions;
export default todoSlice.reducer;


