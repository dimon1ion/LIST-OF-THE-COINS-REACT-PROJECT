import s from "./Search.module.css";
import arrowDown from "../../assets/images/Arrow-down.svg";
import arrowUp from "../../assets/images/Arrow-up.svg";
import SearchInput from "../../UI/SearchInput/SearchInput";
import { useContext, useEffect, useState } from "react";
import AdvancedFilter from "./AdvancedFilter";
import SearchValueContext from "../../contexts/SearchValue.context";
import SearchAdvanceContext from "../../contexts/SearchAdvance.context";
import SearchGlobalContext from "../../contexts/SearchGlobal.context";
import { useNavigate } from "react-router-dom";

export default function Search() {
    const [isOpen, setIsOpen] = useState(false);
    const [mainValue, setMainValue] = useState("");
    const [country, setCountry] = useState("");
    const [composition, setComposition] = useState("");
    const [quality, setQuality] = useState("");
    const [priceFrom, setPriceFrom] = useState("");
    const [priceTo, setPriceTo] = useState("");
    const [yearFrom, setYearFrom] = useState("");
    const [yearTo, setYearTo] = useState("");

    const searchValue = useContext(SearchValueContext);
    const {globalSearch, setGlobalSearch} = useContext(SearchGlobalContext);
    const navigate = useNavigate();

    const toggleIsOpen = () => {
        setIsOpen(state => !state);
    }

    useEffect(() => {
        if (searchValue) {
            searchValue.setSearchValue(mainValue);
        }
    }, [mainValue]);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (globalSearch === undefined) {
            return;
        }
        setGlobalSearch({mainValue, country, composition, quality, priceFrom, priceTo, yearFrom, yearTo});
        setMainValue("");
        navigate("/coins/search");
    }

    return (
        <SearchAdvanceContext.Provider value={{country, setCountry, 
            composition, setComposition, quality, setQuality, priceFrom,
            setPriceFrom, priceTo, setPriceTo, yearFrom, setYearFrom, yearTo, setYearTo
        }}>
            <div className="container-fluid">
                <form onSubmit={onSubmitHandler} className={"row " + s["form"]}>
                    <p className={"row " + s["label"]}>Input field</p>
                    <div className="col-6 col-md-4">
                        <SearchInput value={mainValue} setValue={setMainValue} />
                    </div>
                    <div className="col-4 col-md-2">
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
        </SearchAdvanceContext.Provider>
    );
}
