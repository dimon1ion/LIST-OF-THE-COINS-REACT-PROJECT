import SearchInput from "../../../UI/SearchInput/SearchInput";
import SearchSelect from "../../../UI/SearchSelect";
import searchStyles from "../Search.module.css";
import s from "./AdvancedFilter.module.css";

export default function AdvancedFilter() {
    

    return(
        <>
            <div className={"row " + s["mt-25"] + " " + searchStyles["form"]}>
                <div className="col-4">
                    <p className={searchStyles["label"]}>Issuing country</p>
                    <SearchSelect data={[{value: "Canada"}, {value: "Baku"}]} />
                </div>
                <div className={"col-7 "}>
                    <p className={searchStyles["label"]}>Price</p>
                    <div className="d-flex">
                        <p className={`${s["p-12"]} ${s["pr-5"]}`}>from</p>
                        <div className="col-3">
                            <SearchInput />
                        </div>
                        <p className={`${s["p-12"]} ${s["to"]}`}>to</p>
                        <div className="col-3">
                            <SearchInput />
                        </div>
                    </div>
                </div>
            </div>
            <div className={"row " + s["mt-25"] + " " + searchStyles["form"]}>
                <div className="col-4">
                    <p className={searchStyles["label"]}>Metal</p>
                    <SearchSelect data={[{value: "Gold"}, {value: "Silver"}]} />
                </div>
                <div className={"col-7 "}>
                    <p className={searchStyles["label"]}>Year of issue</p>
                    <div className="d-flex">
                        <p className={`${s["p-12"]} ${s["pr-5"]}`}>from</p>
                        <div className="col-3">
                            <SearchInput />
                        </div>
                        <p className={`${s["p-12"]} ${s["to"]}`}>to</p>
                        <div className="col-3">
                            <SearchInput />
                        </div>
                    </div>
                </div>
            </div>
            <div className={"row " + s["mt-25"]}>
                <div className="col-4">
                    <p className={searchStyles["label"]}>Quality of the coin</p>
                    <SearchSelect data={[{value: "Proof"}, {value: "Bad"}]} />
                </div>
            </div>
        </>
    )
}