import { useEffect, useState } from "react";
import s from "./SearchInput.module.css";

export default function SearchInput({value, setValue, type}) {
    
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        setInputValue(value);
    }, [value])

    const onChange = (event) => {
        setInputValue(event.target.value);
        setValue(event.target.value);
    }

    return(
        <>
            <input type={type || "text"} value={inputValue} onChange={onChange} className={s["search-input"]}></input>
        </>
    );

}