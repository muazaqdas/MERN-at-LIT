import { useState } from "react";

const Name = ()=>{

    const [name, setName] = useState("");

    const handleNameChange = (e)=>{
        setName(e.target.value)
    }

    return(
        <div>
            <input placeholder="Enter Your Name" onChange={handleNameChange} />
            <p>{name}</p>
        </div>
    )

}

export default Name;