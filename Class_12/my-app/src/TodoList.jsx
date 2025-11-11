import { useState } from "react";

const TodoList = ()=>{

    const [todolist, setTodolist] = useState(["Muaz", "Nilesh", "Durgesh"]);
    const [inputTask, setInputTask] = useState("");


    // Home Work

    const handleEdit = ()=>{

    }
    const handleDelete = (index)=>{
        // filter
        setTodolist(
            (currValue)=> currValue.filter((item, i)=> i!=index )
        )
    }
    
    const handleInput = (e)=>{
        setInputTask(e.target.value);
    }
    const handleAdd = ()=>{
        setTodolist((currValue)=> [...currValue, inputTask ])
    }
    return(
        <>
        {/* Add Todos/Tasks */}
        <div style={{display:"flex",  gap:"12px", justifyContent:'space-between', alignItems:'center'}}>
            <input 
                placeholder="Whats the task today!"
                onChange={handleInput}
            />
            <button onClick={handleAdd}>ADD</button>
        </div>

        {/* Display List of tasks */}
        <div style={{gap:"12px", display:'flex', flexDirection:'column'}}>
            {todolist.map(
                (item, index)=>{
                    return(
                        <div style={{ display:"flex",gap:"6px", border:"2px solid red", borderRadius:"22px", justifyContent:'space-between', alignItems:'center' , padding:"12px 20px" }} className="taskContainer" key={index}>
                            <h2>{item}</h2>
                            <div>
                                <button onClick={()=> handleEdit(index)}>Edit</button>
                                <button onClick={()=> handleDelete(index)}>Delete</button>
                            </div>
                        </div>
                    )
                }
            )}
        </div>

        </>
    )
}

export default TodoList;
