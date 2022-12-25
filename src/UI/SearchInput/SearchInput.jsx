import { useState } from "react";
import s from "./SearchInput.module.css";

export default function SearchInput() {
    
    const [value, setValue] = useState("");

    const onChange = (event) => {
        setValue(event.target.value);
    }

    return(
        <>
            <input value={value} onChange={onChange} className={s["search-input"]}></input>
        </>
    );

}