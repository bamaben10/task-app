import React, {useState} from 'react';
import ListDisplay from './ListDisplay';
import { useFormik } from 'formik';

const AddTask = () => {
    const [input, setInput] = useState("")
    const [list, setList] = useState([]);
    const [category, setCategory] = useState("");

    const handleClick = () => {
        setList([...list, {task: input, category: category}]);
        setInput("");
    };

    const deleteTask = (index) => {
        const newState = list
        newState.splice(index, 1)
        setList([...newState])
    }

    const formik = useFormik({
        initialValues: {
            task: '',
            category: null,
        },

        onSubmit: (values) => {
            // if(values.category !== null && values.task !== "") {
            // // console.log(values);
            // setList([...list, values]);
            // formik.handleReset()
            // } else {
            //     return
            // }

            if(values.category === null || values.task === "") return
            setList([...list, values]);
            formik.handleReset()
        }
    })
    
    return (
        <div>
            <h1>Add Task</h1>
            <form className="task-form" onSubmit={formik.handleSubmit}>
            <input type="text" 
            value={formik.values.task} 
            name="task"
            onChange={formik.handleChange}
            />
            <select value={formik.values.category} name='category' onChange={formik.handleChange}>
                <option selected disabled defaultValue>Category</option>
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Errands">Errands</option>
            </select>
            <button type="submit">Add Task</button>
            </form>
            <ListDisplay list={list} deleteTask={deleteTask} />
        </div>
    )
}

export default AddTask 
