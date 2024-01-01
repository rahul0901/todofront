import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import axios from 'axios';
import './Todo.css';
import './MediaTodo.css'

function Todo() {

    const [todo, setTodo] = useState({ getTodo: '' });

    console.log(todo, 'todo')

    const [newTodo, setNewTodo] = useState([]);

    // const [isEmpty, setIsEmpty] = useState(false);
    const [submissionAttempted, setSubmissionAttempted] = useState(false);

    const [key, setKey] = useState(0);

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setNewTodo(storedTodos);
    }, []);

    const saveToLocalStorage = (updatedTodos) => {
        localStorage.setItem('todos', JSON.stringify(updatedTodos))
    }

    // useEffect(() => {
    //     localStorage.setItem('todos', JSON.stringify(newTodo));
    // }, [newTodo]);

    const handleOnChange = (event) => {
        setTodo({ ...todo, [event.target.name]: event.target.value })

        setSubmissionAttempted(false);

        if (event.target.value.trim() === '') {
            setSubmissionAttempted(true);
        }
        // setIsEmpty(false);
        // if (event.target.value === '') {
        //     setIsEmpty(true);
        // }
        // setIsEmpty(event.target.value.trim() === '');
    }

    // const shakeOnEmptySubmit = shake?: ''

    const getData = async (event) => {
        event.preventDefault();
        if (todo.getTodo) {
            // ek naya obj bnayega idhr pe usme phele usestate se saab detail 
            try {

                const response = await axios.post('http://localhost:8000/api/v1/todo/getTodo', { finalGetTodo: todo })

                console.log(response.data, 'respodata')

                if (response.data.success) {
                    const updatedTodos = [...newTodo, response.data.todo];

                    setNewTodo(updatedTodos);

                    // setNewTodo([...newTodo, response.data.todo]);
                    // console.log(newTodo, 'newtodo')

                    setTodo({ getTodo: '' })

                    // localStorage.setItem('todos', JSON.stringify(updatedTodos));

                    saveToLocalStorage(updatedTodos)

                    toast.success('Todo added!')
                }
                else {
                    toast.error(response.data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
        else {
            setSubmissionAttempted(true);
            toast.error('Please add todo to submit.')
            // toast.error(error.response.data.message)

            setKey((prevKey) => prevKey + 1);
        }
    }

    // const handleDelete = async (id) => {
    //     // try {
    //     //     // Add logic here to delete todo using axios
    //     //   } catch (error) {
    //     //     toast.error(error.message);
    //     //   }
    //     const updatedToDo = [...newTodo];
    //     updatedToDo.splice(index, 1);
    //     setNewTodo(updatedToDo)
    // }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/v1/todo/${id}`);

            if (response.data.success) {
                const updatedTodos = newTodo.filter((item) => item._id !== id);
                setNewTodo(updatedTodos);

                saveToLocalStorage(updatedTodos)

                toast.success('Todo deleted!');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }

        setSubmissionAttempted(false);
    };

    const getRandomColor = () => {
        // '#FAD02E', '#66BB6A', '#2196F3', '#FF9800', '#E91E63',
        const colors = ['#F2E8CF', '#7ECEA1', '#ffc514', '#CD8576', '#FF9696', '#DDA6C3'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    return (
        <>
            <div key={key} className="screen">
                <h1>Quick Draft By RS</h1>
                <form onSubmit={getData} >
                    <label htmlFor="todo" >Add Note: </label>
                    <label htmlFor="todo" ><i class="fa-solid fa-pen-nib fa-lg"></i></label>
                    <input
                        type="text"
                        name="getTodo"
                        id="todo"
                        placeholder="Add note"
                        onChange={handleOnChange}
                        value={todo.getTodo}
                        className={submissionAttempted && todo.getTodo.trim() === '' ? "shakeOnEmptySubmit" : ""}
                    />
                    <input type="submit" value="Add Note" />
                </form>

                <div className="main-todo">{newTodo.map((item, index) => (
                    <div key={index} className="single-todos" style={{ backgroundColor: getRandomColor() }}>
                        <p>{item.content}</p>
                        <button onClick={() => handleDelete(item._id)}><i class="fa-solid fa-trash-can fa-xl"></i></button>
                    </div>
                ))}</div>

                <div>
                    <h4>&copy;2024 Rahul Shinde</h4>
                </div>
            </div>
        </>
    )
}

export default Todo;