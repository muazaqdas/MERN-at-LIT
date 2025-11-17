import React, { useEffect, useState } from 'react'

const useDebounce = (value, delay)=> {
    const [debValue, setDebValue] = useState(value);

    useEffect(()=>{

        const handleDebounce = setTimeout(()=>{ setDebValue(value) }, delay);

        return clearTimeout(handleDebounce);
    }, [value, delay])

    return debValue;
}
