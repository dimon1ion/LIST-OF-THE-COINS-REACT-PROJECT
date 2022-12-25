import s from "./Search.module.css";
import arrowDown from "../../assets/images/Arrow-down.svg";
import arrowUp from "../../assets/images/Arrow-up.svg";
import SearchInput from "../../UI/SearchInput/SearchInput";
import { useState } from "react";
import AdvancedFilter from "./AdvancedFilter";

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(state => !state);
  }
  
  return (
    <div className="container-fluid">
      <form className={"row " + s["form"]}>
        <p className={"row " + s["label"]}>Input field</p>
        <div className="col-4">
          <SearchInput />
        </div>
        <div className="col-2">
          <button className={s["search-button"]}>Search</button>
        </div>
      </form>
      <button className={s["advanced-search"]} onClick={toggleIsOpen}>
        Advanced filter{" "}
        <img className={s["arrow"]} src={isOpen ? arrowUp : arrowDown} />
      </button>
      {isOpen && 
      (
        <AdvancedFilter />
      )}
    </div>
  );
}
