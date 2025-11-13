import { useState } from "react";
import Navbar from "./Navbar";

const TodoList = ()=>{

    const [todolist, setTodolist] = useState(["Muaz", "Nilesh", "Durgesh"]);
    const [inputTask, setInputTask] = useState("");
    const [isEdit, setIsEdit] = useState(false);


    // Home Work

    const handleEdit = (index, item)=>{

        // Step - 1: click edit button of a task

        // console.log("handle edit task index:", index, item, taskToBeEdited);
        
        // Step - 2: copy the task info in a variable

        // since now we have a variable with the task info, we don't need to create a new variable, just use "item"

        // Step - 3: delete the task
        handleDelete(index)
        console.log("item:", item);

        // Step - 4: show the task in the input box to be edited
        setInputTask(item);
        setIsEdit(true);
        
        // Step - 5: conditionally render Add button on input box based on whether editing or adding new task

        // done

        // Step - 6: save the edited task

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
        setInputTask("");
        setIsEdit(false);
    }

    return(
        <>
            <div style={{display:'flex', flexDirection:'column', gap:"12px", width:"80vw"}}>
                {/* Add Todos/Tasks */}
                <div style={{display:"flex",  gap:"12px", justifyContent:'space-between', alignItems:'center', width:'100%'}}>
                    <input 
                        placeholder="Whats the task today!"
                        onChange={handleInput}
                        value={inputTask}
                        style={{width:"100%",background:'#fff', borderRadius:"12px", border:"2px solid #ddd", fontSize:"32px", padding:"6px 12px"}}
                    />
                    <button style={{fontSize:"22px"}} onClick={handleAdd}>
                        { isEdit ? "Edit Done" : "ADD" }
                    </button>
                    
                </div>
                {/* Display List of tasks */}
                <div style={{gap:"12px", display:'flex', flexDirection:'column'}}>
                    {todolist.map(
                        (item, index)=>{
                            return(
                                <div style={{ display:"flex",gap:"6px", border:"2px solid red", borderRadius:"22px", justifyContent:'space-between', alignItems:'center' , padding:"12px 20px" }} className="taskContainer" key={index}>
                                    <h2>{item}</h2>
                                    <div>
                                        <button onClick={()=> handleEdit(index, item)}>Edit</button>
                                        <button onClick={()=> handleDelete(index)}>Delete</button>
                                    </div>
                                </div>
                            )
                        }
                    )}
                </div>
            </div>
        </>
    )
}

export default TodoList;
