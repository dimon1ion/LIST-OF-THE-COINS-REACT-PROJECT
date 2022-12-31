import { useState } from "react";
import s from "./SearchSelect.module.css";

export default function SearchSelect({ data }) {
  const [isArrowDown, setIsArrowDown] = useState(true);
  const [isChanged, setIsChanged] = useState(false);

  const changeToDownArrow = () => {
    setIsArrowDown(true);
  };

  const onChangeSelect = () => {
    changeToDownArrow();
    setIsChanged(true);
  }

  const toggleArrow = () =>{
    if(isChanged){
        setIsChanged(false);
        return;
    }
    setIsArrowDown(state => !state);
  }

  return (
    <select
      className={
        s["search-select"] +
        " " +
        (isArrowDown ? s["arrow-down"] : s["arrow-up"])
      }
      onBlur={changeToDownArrow}
      onChange={onChangeSelect}
      onClick={toggleArrow}
    >
        <option value={""} defaultValue className={`${s["search-option"]} ${s["default"]}`}>
            Select value
        </option>
      {data.map((item, index) => (
        <option key={index} value={item.value} className={s["search-option"]}>
          {item.value}
        </option>
      ))}
    </select>
  );
}
