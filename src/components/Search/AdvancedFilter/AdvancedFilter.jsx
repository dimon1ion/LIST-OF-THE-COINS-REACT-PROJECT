import { useContext, useEffect, useState } from "react";
import SearchAdvanceContext from "../../../contexts/SearchAdvance.context";
import sendGetRequest from "../../../requests/sendGetRequest";
import SearchInput from "../../../UI/SearchInput/SearchInput";
import SearchSelect from "../../../UI/SearchSelect";
import searchStyles from "../Search.module.css";
import s from "./AdvancedFilter.module.css";

export default function AdvancedFilter() {
    
    const {country, setCountry,
        composition, setComposition, quality, setQuality, priceFrom,
        setPriceFrom, priceTo, setPriceTo, yearFrom, setYearFrom, yearTo, setYearTo
    } = useContext(SearchAdvanceContext);

    const [countries, setCountries] = useState([]);
    const [compositions, setCompositions] = useState([]);
    const [qualities, setQualities] = useState([]);

    useEffect(() => {
        const defaultPath = "http://localhost:3001/coins/";
        sendGetRequestSelectInput(setCountries, defaultPath + "countries");
        sendGetRequestSelectInput(setCompositions, defaultPath + "compositions");
        sendGetRequestSelectInput(setQualities, defaultPath + "qualities");
    }, []);

    const sendGetRequestSelectInput = async (setValue, path) => {
        try {
            const data = await sendGetRequest(path);
            setValue(data.map(({name}) => ({value: name})));
        } catch (error) {}
    }

    return(
        <>
            <div className={`row ${s["mt-25"]} ${searchStyles["form"]} ${s["row-gap-20"]}`}>
                <div className="col-12 col-md-4">
                    <p className={searchStyles["label"]}>Issuing country</p>
                    <SearchSelect data={countries} value={country} setValue={setCountry} />
                </div>
                <div className={"col-12 col-md-7"}>
                    <p className={searchStyles["label"]}>Price</p>
                    <div className="d-flex">
                        <p className={`${s["p-12"]} ${s["pr-5"]}`}>from</p>
                        <div className="col-5 col-md-3">
                            <SearchInput value={priceFrom} type={"number"} setValue={setPriceFrom}/>
                        </div>
                        <p className={`${s["p-12"]} ${s["to"]}`}>to</p>
                        <div className="col-5 col-md-3">
                            <SearchInput value={priceTo} type={"number"} setValue={setPriceTo}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`row ${s["mt-25"]} ${searchStyles["form"]} ${s["row-gap-20"]}`}>
                <div className="col-12 col-md-4">
                    <p className={searchStyles["label"]}>Metal</p>
                    <SearchSelect data={compositions} value={composition} setValue={setComposition} />
                </div>
                <div className={"col-12 col-md-7"}>
                    <p className={searchStyles["label"]}>Year of issue</p>
                    <div className="d-flex">
                        <p className={`${s["p-12"]} ${s["pr-5"]}`}>from</p>
                        <div className="col-5 col-md-3">
                            <SearchInput value={yearFrom} type={"number"} setValue={setYearFrom}/>
                        </div>
                        <p className={`${s["p-12"]} ${s["to"]}`}>to</p>
                        <div className="col-5 col-md-3">
                            <SearchInput value={yearTo} type={"number"} setValue={setYearTo}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"row " + s["mt-25"]}>
                <div className="col-12 col-md-4">
                    <p className={searchStyles["label"]}>Quality of the coin</p>
                    <SearchSelect data={qualities} value={quality} setValue={setQuality} />
                </div>
            </div>
        </>
    )
}